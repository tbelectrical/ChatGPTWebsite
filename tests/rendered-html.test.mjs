import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const env = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
};
const ctx = { waitUntil() {}, passThroughOnException() {} };

test("server-renders the TB Electrical homepage", async () => {
  const response = await worker.fetch(new Request("http://localhost/", {
    headers: { accept: "text/html" },
  }), env, ctx);

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /TB Electrical/);
  assert.match(html, /Electrical work/);
  assert.match(html, /EV charging/);
  assert.match(html, /OZEV approved/);
  assert.match(html, /Stevenage/);
  assert.match(html, /Letchworth Garden City/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Send enquiry/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/i);
});

test("server-renders the local EV charger landing page", async () => {
  const response = await worker.fetch(new Request("http://localhost/ev-chargers", {
    headers: { accept: "text/html" },
  }), env, ctx);

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /OZEV approved EV charger installer/i);
  assert.match(html, /home and workplace grant schemes/i);
  assert.match(html, /Hitchin/);
  assert.match(html, /Harpenden/);
});

test("serves search engine crawl files", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([
    worker.fetch(new Request("http://localhost/robots.txt"), env, ctx),
    worker.fetch(new Request("http://localhost/sitemap.xml"), env, ctx),
  ]);

  assert.equal(robotsResponse.status, 200);
  assert.match(await robotsResponse.text(), /https:\/\/www\.tbelectrical\.co\.uk\/sitemap\.xml/);

  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /https:\/\/www\.tbelectrical\.co\.uk\/ev-chargers/);
  assert.match(sitemap, /https:\/\/www\.tbelectrical\.co\.uk\/contact/);
});
