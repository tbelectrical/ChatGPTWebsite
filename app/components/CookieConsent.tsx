"use client";

import { SiteLink as Link } from "./SiteLink";
import { createContext, useContext, useEffect, useState } from "react";

const key = "tb-cookie-choice-v1";
const lifetime = 180 * 24 * 60 * 60 * 1000;
type Choice = "accepted" | "denied" | null;
const ConsentContext = createContext({ choice: null as Choice, open: () => {} });

export function CookieConsent({ children }: { children: React.ReactNode }) {
  const [choice, setChoice] = useState<Choice>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "null");
      if (saved && ["accepted", "denied"].includes(saved.choice) && saved.expires > Date.now()) {
        setChoice(saved.choice);
        return;
      }
    } catch { /* Storage may be unavailable; default to no optional content. */ }
    setVisible(true);
  }, []);

  function choose(next: Exclude<Choice, null>) {
    try { localStorage.setItem(key, JSON.stringify({ choice: next, expires: Date.now() + lifetime })); } catch { /* Choice still applies for this visit. */ }
    setChoice(next);
    setVisible(false);
    if (next === "denied") window.dataLayer = [];
  }

  return <ConsentContext.Provider value={{ choice, open: () => setVisible(true) }}>
    {children}
    {visible && <section className="cookie-banner" role="region" aria-label="Cookie preferences">
      <div><strong>Your cookie choice</strong><p>We remember your choice on this device. Accept to load Google Maps, which may use cookies. Deny keeps it off. <Link href="/cookies">Cookie details</Link>.</p></div>
      <div className="cookie-actions"><button onClick={() => choose("accepted")}>Accept</button><button onClick={() => choose("denied")}>Deny</button></div>
    </section>}
  </ConsentContext.Provider>;
}

export function CookieSettings() {
  const { open } = useContext(ConsentContext);
  return <button className="cookie-settings" onClick={open}>Cookie settings</button>;
}

export function ConsentMap() {
  const { choice, open } = useContext(ConsentContext);
  if (choice !== "accepted") return <div className="map-consent"><p>The Google map is off until you accept optional cookies. You can still read our reviews using the link below.</p><button className="button button-dark" onClick={open}>Cookie settings</button></div>;
  return <iframe title="TB Electrical Herts Ltd on Google Maps" src="https://www.google.com/maps?q=TB%20Electrical%20Herts%20Ltd%2C%20Hitchin&output=embed" loading="lazy" referrerPolicy="no-referrer" />;
}

export function useOptionalConsent() { return useContext(ConsentContext).choice === "accepted"; }
