"use client";

import { useEffect } from "react";

export function ExperimentGate() {
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("variant");
    const variant = requested === "split" ? "split" : "long";
    document.documentElement.dataset.homeVariant = variant;
    return () => { delete document.documentElement.dataset.homeVariant; };
  }, []);
  return null;
}
