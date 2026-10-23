import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../build/browser-polyfills.js", import.meta.url), "utf8");

test("supported browsers without URL.canParse can validate absolute and relative URLs", () => {
  // Model a browser where the API is absent, including the inheritance chain.
  const NativeURL = function (...args) { return new URL(...args); };
  runInNewContext(source, { URL: NativeURL });
  assert.equal(NativeURL.canParse("https://example.com"), true);
  assert.equal(NativeURL.canParse("/contact", "https://example.com"), true);
  assert.equal(NativeURL.canParse("/contact"), false);
  assert.equal(NativeURL.canParse("https://[invalid"), false);
  assert.equal(NativeURL.canParse("https://example.com", "invalid base"), false);
});

test("preserves an existing native URL.canParse implementation", () => {
  const native = () => true;
  const BrowserURL = { canParse: native };
  runInNewContext(source, { URL: BrowserURL });
  assert.equal(BrowserURL.canParse, native);
});
