import assert from "node:assert/strict";
import test from "node:test";
import { createGoogleAdsTracker, GOOGLE_ADS_ID, GOOGLE_ADS_LEAD_ACTION } from "../app/lib/google-ads.ts";
import { readCookiePreferences, saveCookiePreferences, COOKIE_PREFERENCES_KEY, LEGACY_COOKIE_KEY } from "../app/lib/cookie-preferences.ts";

const reference = "12345678-abcd-4abc-9abc-123456789abc";
function setup() {
  const dataLayer = [];
  const browser = { dataLayer };
  const scripts = [];
  const document = { createElement: () => ({ remove() {} }), head: { appendChild: script => scripts.push(script) } };
  const tracker = createGoogleAdsTracker(browser, document);
  return { tracker, browser, dataLayer, scripts,
    commands: () => dataLayer.map(args => Array.from(args)),
    conversions: () => dataLayer.map(args => Array.from(args)).filter(args => args[0] === "event" && args[1] === "conversion") };
}

test("legacy Maps acceptance never becomes advertising consent; invalid/expired storage defaults off", () => {
  const now = Date.now();
  const store = new Map([[LEGACY_COOKIE_KEY, JSON.stringify({ choice: "accepted", expires: now + 1000 })]]);
  const storage = { getItem: key => store.get(key) || null, setItem: (key, value) => store.set(key, value), removeItem: key => store.delete(key) };
  assert.deepEqual(readCookiePreferences(storage, now), { preferences: { maps: true, advertising: false }, needsChoice: true });
  saveCookiePreferences(storage, { maps: false, advertising: true });
  assert.equal(store.has(LEGACY_COOKIE_KEY), false);
  assert.deepEqual(readCookiePreferences(storage, now), { preferences: { maps: false, advertising: true }, needsChoice: false });
  for (const saved of ["not json", JSON.stringify({version:2,maps:true,advertising:true,expires:now-1})]) {
    store.set(COOKIE_PREFERENCES_KEY, saved);
    assert.deepEqual(readCookiePreferences(storage, now).preferences, { maps: false, advertising: false });
  }
  assert.equal(readCookiePreferences({ getItem() { throw new Error("blocked"); } }).needsChoice, true);
});

test("no Google script or event before explicit consent; initialization preserves dataLayer and happens once", async () => {
  const qa = setup();
  qa.tracker.setConsent(false);
  assert.equal(qa.scripts.length, 0);
  assert.equal(await qa.tracker.recordLead(reference, reference, null), false);
  qa.tracker.setConsent(true); qa.tracker.setConsent(true);
  assert.equal(qa.scripts.length, 1);
  assert.equal(qa.browser.dataLayer, qa.dataLayer);
  assert.match(qa.scripts[0].src, new RegExp(GOOGLE_ADS_ID));
  assert.equal(qa.commands()[0][1], "default");
  assert.deepEqual(qa.commands()[0][2], {ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied"});
  assert.equal(qa.commands().some(command => command[0] === "config"), false);
  qa.scripts[0].onload();
  await Promise.resolve();
  assert.equal(qa.commands().filter(command => command[0] === "config").length, 1);
});

test("confirmed matching reference emits only the Ads action, deduplicated, without form details", async () => {
  const qa = setup(); qa.tracker.setConsent(true); qa.scripts[0].onload();
  const ticket = qa.tracker.beginSubmission();
  assert.equal(await qa.tracker.recordLead(reference, reference, ticket), true);
  assert.equal(await qa.tracker.recordLead(reference, reference, ticket), false);
  assert.deepEqual(qa.conversions(), [["event", "conversion", {send_to:GOOGLE_ADS_LEAD_ACTION,transaction_id:reference}]]);
  for (const invalid of [undefined, "", "customer@example.com", "12345678-abcd-4abc-9abc-123456789abd"]) {
    assert.equal(await qa.tracker.recordLead(invalid, reference, ticket), false);
  }
});

test("withdrawal during delayed tag loading cancels the pending event and regrant never replays it", async () => {
  const qa = setup(); qa.tracker.setConsent(true);
  const ticket = qa.tracker.beginSubmission();
  const pending = qa.tracker.recordLead(reference, reference, ticket);
  assert.equal(qa.conversions().length, 0);
  qa.tracker.setConsent(false);
  qa.scripts[0].onload();
  assert.equal(await pending, false);
  qa.tracker.setConsent(true);
  await Promise.resolve();
  assert.equal(await qa.tracker.recordLead(reference, reference, ticket), false);
  assert.equal(qa.conversions().length, 0);
  assert.equal(qa.browser.dataLayer, qa.dataLayer);
});

test("withdrawal while enquiry is in flight invalidates its ticket; new consent cannot count earlier enquiries", async () => {
  const qa = setup();
  const beforeConsent = qa.tracker.beginSubmission();
  qa.tracker.setConsent(true); qa.scripts[0].onload();
  assert.equal(await qa.tracker.recordLead(reference, reference, beforeConsent), false);
  const ticket = qa.tracker.beginSubmission();
  qa.tracker.setConsent(false); qa.tracker.setConsent(true);
  assert.equal(await qa.tracker.recordLead(reference, reference, ticket), false);
  assert.equal(qa.conversions().length, 0);
});

test("blocked Google script does not emit a conversion or throw", async () => {
  const qa = setup(); qa.tracker.setConsent(true);
  const pending = qa.tracker.recordLead(reference, reference, qa.tracker.beginSubmission());
  qa.scripts[0].onerror();
  assert.equal(await pending, false);
  assert.equal(qa.conversions().length, 0);
});
