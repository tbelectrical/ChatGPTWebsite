"use client";

import { SiteLink as Link } from "./SiteLink";
import { createContext, useContext, useEffect, useState } from "react";
import { getGoogleAdsTracker } from "../lib/google-ads";
import {
  COOKIE_PREFERENCES_KEY, LEGACY_COOKIE_KEY, noOptionalCookies, readCookiePreferences,
  saveCookiePreferences, type CookiePreferences,
} from "../lib/cookie-preferences";

const ConsentContext = createContext({ preferences: noOptionalCookies, open: () => {} });

export function CookieConsent({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(noOptionalCookies);
  const [draft, setDraft] = useState<CookiePreferences>(noOptionalCookies);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function restore() {
      let restored = { preferences: { ...noOptionalCookies }, needsChoice: true };
      try { restored = readCookiePreferences(window.localStorage); } catch { /* Storage can be blocked. */ }
      getGoogleAdsTracker()?.setConsent(restored.preferences.advertising);
      setPreferences(restored.preferences);
      setDraft(restored.preferences);
      setVisible(restored.needsChoice);
    }
    restore();
    function changed(event: StorageEvent) {
      if (event.key === null || [COOKIE_PREFERENCES_KEY, LEGACY_COOKIE_KEY].includes(event.key)) restore();
    }
    window.addEventListener("storage", changed);
    return () => window.removeEventListener("storage", changed);
  }, []);

  function choose(next: CookiePreferences) {
    // Revoke tracking immediately, including any pending form or script load.
    getGoogleAdsTracker()?.setConsent(next.advertising);
    try { saveCookiePreferences(window.localStorage, next); } catch { /* Applies for this visit even without storage. */ }
    setPreferences(next);
    setDraft(next);
    setVisible(false);
  }

  function open() {
    setDraft(preferences);
    setVisible(true);
  }

  return <ConsentContext.Provider value={{ preferences, open }}>
    {children}
    {visible && <section className="cookie-banner" role="region" aria-label="Cookie preferences">
      <div className="cookie-copy">
        <strong>Your cookie choices</strong>
        <p>Choose whether to load Google Maps and help us measure Google Ads enquiries. Both are optional; the enquiry form works with either choice. <Link href="/cookies">Cookie details</Link>.</p>
        <fieldset className="cookie-options">
          <legend>Optional services</legend>
          <label><input type="checkbox" checked={draft.maps} onChange={event => setDraft({ ...draft, maps: event.target.checked })} /><span><b>Google Maps</b>Load the embedded map, which shares technical information with Google and may use cookies.</span></label>
          <label><input type="checkbox" checked={draft.advertising} onChange={event => setDraft({ ...draft, advertising: event.target.checked })} /><span><b>Advertising measurement</b>Let Google use cookies, ad-click and technical information to measure visits and successful enquiries from our ads. We do not send your form details or enable personalised advertising.</span></label>
        </fieldset>
      </div>
      <div className="cookie-actions">
        <button onClick={() => choose({ maps: true, advertising: true })}>Accept all</button>
        <button onClick={() => choose({ maps: false, advertising: false })}>Reject all</button>
        <button onClick={() => choose(draft)}>Save choices</button>
      </div>
    </section>}
  </ConsentContext.Provider>;
}

export function CookieSettings() {
  const { open } = useContext(ConsentContext);
  return <button className="cookie-settings" onClick={open}>Cookie settings</button>;
}

export function ConsentMap() {
  const { preferences, open } = useContext(ConsentContext);
  if (!preferences.maps) return <div className="map-consent"><p>The Google map is off until you allow Google Maps in cookie settings. You can still read our reviews using the link below.</p><button className="button button-dark" onClick={open}>Cookie settings</button></div>;
  return <iframe title="TB Electrical Herts Ltd on Google Maps" src="https://www.google.com/maps?q=TB%20Electrical%20Herts%20Ltd%2C%20Hitchin&output=embed" loading="lazy" referrerPolicy="no-referrer" />;
}
