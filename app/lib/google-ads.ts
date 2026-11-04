export const GOOGLE_ADS_ID = "AW-17708437290";
export const GOOGLE_ADS_LEAD_ACTION = `${GOOGLE_ADS_ID}/I0MgCLKs-robEKqehfxB`;

type GoogleTag = (...args: unknown[]) => void;
type AdsWindow = { dataLayer?: unknown[]; gtag?: GoogleTag };
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: GoogleTag; }
}

const denied = {
  ad_storage: "denied", ad_user_data: "denied",
  ad_personalization: "denied", analytics_storage: "denied",
};
const granted = { ...denied, ad_storage: "granted", ad_user_data: "granted" };
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// The factory also lets tests exercise the actual lifecycle without Google/network access.
export function createGoogleAdsTracker(browser: AdsWindow, document: Document) {
  let consent = false;
  let consentGeneration = 0;
  let initialized = false;
  let configured = false;
  let loading: Promise<boolean> | undefined;
  const recorded = new Set<string>();

  function tag(...args: unknown[]) {
    browser.gtag?.(...args);
  }

  function loadTag() {
    if (loading) return loading;
    if (!initialized) {
      browser.dataLayer = browser.dataLayer || [];
      browser.gtag = browser.gtag || function () { browser.dataLayer!.push(arguments); };
      tag("consent", "default", denied);
      tag("set", "ads_data_redaction", true);
      tag("set", "allow_ad_personalization_signals", false);
      tag("set", "allow_google_signals", false);
      initialized = true;
    }
    loading = new Promise<boolean>(resolve => {
      const script = document.createElement("script");
      script.id = "tb-google-ads-tag";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
      script.onload = () => resolve(true);
      script.onerror = () => { script.remove(); loading = undefined; resolve(false); };
      document.head.appendChild(script);
    });
    return loading;
  }

  async function enableTag(generation: number) {
    const ready = await loadTag();
    if (!ready || !consent || generation !== consentGeneration) return false;
    tag("consent", "update", granted);
    if (!configured) {
      tag("js", new Date());
      tag("config", GOOGLE_ADS_ID, {
        allow_ad_personalization_signals: false,
        allow_google_signals: false,
      });
      configured = true;
    }
    return true;
  }

  return {
    setConsent(next: boolean) {
      if (next === consent) return;
      // Update synchronously so an in-flight form cannot use its old React closure.
      consent = next;
      consentGeneration++;
      if (next) void enableTag(consentGeneration);
      else if (initialized) tag("consent", "update", denied);
    },
    beginSubmission() { return consent ? consentGeneration : null; },
    async recordLead(reference: unknown, submissionId: string, generation: number | null) {
      // The API's honeypot response has no reference. Only an acknowledged UUID
      // matching this submission can count; no form fields are sent to Google.
      if (typeof reference !== "string" || !uuid.test(reference) || reference !== submissionId
        || generation === null || !consent || generation !== consentGeneration || recorded.has(reference)) return false;
      // Keep pending conversions out of dataLayer until the library is ready.
      if (!await enableTag(generation) || !consent || generation !== consentGeneration || recorded.has(reference)) return false;
      recorded.add(reference);
      tag("event", "conversion", { send_to: GOOGLE_ADS_LEAD_ACTION, transaction_id: reference });
      return true;
    },
  };
}

let tracker: ReturnType<typeof createGoogleAdsTracker> | undefined;
export function getGoogleAdsTracker() {
  if (typeof window === "undefined") return undefined;
  return tracker ??= createGoogleAdsTracker(window, document);
}
