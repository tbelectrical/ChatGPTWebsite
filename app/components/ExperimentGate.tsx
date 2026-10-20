"use client";

import { useOptionalConsent } from "./CookieConsent";

import { useLayoutEffect } from "react";

export function ExperimentGate() {
  const consent = useOptionalConsent();
  useLayoutEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("variant");
    const variant = requested === "split" ? "split" : "long";
    document.documentElement.dataset.homeVariant = variant;
    if (consent) { window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "homepage_variant_view", homepage_variant: variant });
    }
    return () => { delete document.documentElement.dataset.homeVariant; };
  }, [consent]);
  return null;
}
