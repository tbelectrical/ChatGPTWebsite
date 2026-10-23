// All other Next.js module polyfills are native in its supported browsers.
// URL.canParse arrived later, including Safari 17 and Firefox 115.
if (!("canParse" in URL)) {
  URL.canParse = function canParse(input, base) {
    try {
      new URL(input, base);
      return true;
    } catch {
      return false;
    }
  };
}
