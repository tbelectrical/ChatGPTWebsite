export const COOKIE_PREFERENCES_KEY = "tb-cookie-choice-v2";
export const LEGACY_COOKIE_KEY = "tb-cookie-choice-v1";
export const COOKIE_PREFERENCES_LIFETIME = 180 * 24 * 60 * 60 * 1000;
export type CookiePreferences = { maps: boolean; advertising: boolean };
export const noOptionalCookies: CookiePreferences = { maps: false, advertising: false };

export function readCookiePreferences(storage: Pick<Storage, "getItem">, now = Date.now()) {
  try {
    const saved = JSON.parse(storage.getItem(COOKIE_PREFERENCES_KEY) || "null");
    if (saved?.version === 2 && typeof saved.maps === "boolean" && typeof saved.advertising === "boolean"
      && typeof saved.expires === "number" && saved.expires > now) {
      return { preferences: { maps: saved.maps, advertising: saved.advertising }, needsChoice: false };
    }
    const legacy = JSON.parse(storage.getItem(LEGACY_COOKIE_KEY) || "null");
    if (legacy && ["accepted", "denied"].includes(legacy.choice) && legacy.expires > now) {
      // The old choice only covered Maps. It is never advertising consent.
      return { preferences: { maps: legacy.choice === "accepted", advertising: false }, needsChoice: true };
    }
  } catch { /* Unavailable or malformed storage leaves optional services off. */ }
  return { preferences: { ...noOptionalCookies }, needsChoice: true };
}

export function saveCookiePreferences(storage: Pick<Storage, "setItem" | "removeItem">, preferences: CookiePreferences) {
  storage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify({ version: 2, ...preferences, expires: Date.now() + COOKIE_PREFERENCES_LIFETIME }));
  storage.removeItem(LEGACY_COOKIE_KEY);
}
