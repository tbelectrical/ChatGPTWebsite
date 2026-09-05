"use client";

import { useLayoutEffect } from "react";

export function ExperimentGate() {
  useLayoutEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("variant");
    const variant = requested === "split" ? "split" : "long";
    document.documentElement.dataset.homeVariant = variant;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "homepage_variant_view", homepage_variant: variant });
    return () => { delete document.documentElement.dataset.homeVariant; };
  }, []);
  return null;
}
