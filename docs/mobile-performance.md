# Mobile loading improvements, 29 October 2026

The baseline was fetched from https://www.tbelectrical.co.uk/ before this change. The screenshot lists opportunities but provides no affected resource URLs or timings. These are measured resource sizes, not a new Lighthouse or Hostinger score.

## Changes and measurements

- Homepage hero: 305,502 bytes previously sent to every device. Responsive versions are 26,930 bytes at 480px, 44,966 bytes at 640px, 83,984 bytes at 960px and 143,494 bytes at 1440px. The browser chooses for its actual viewport and pixel density. The 640px version is 85% smaller; high-density phones may choose a larger version.
- Header logo: 91,592 bytes previously. The 160px version is 6,284 bytes, 320px is 13,246 bytes. The image retains intrinsic dimensions and an accurate 136px sizes hint.
- Responsive WebP derivatives cover 29 existing non-personal image assets. Original files stay untouched. Prepared at build time with the patched image processor, so the first visitor does not wait for an image optimizer. Filenames contain a content hash.
- Removed three obsolete CSS background images that duplicated the services section's actual lazy-loaded photographs. This also prevents those backgrounds bypassing native lazy loading.
- Added lazy loading to footer images. Hero remains eager and high priority, discoverable directly in the HTML. Intrinsic dimensions are supplied by the manifest where missing.
- EV sales styles are now loaded by the EV route. Homepage CSS falls from 71,810 to 63,681 bytes, or 14,924 to 13,373 bytes with gzip. The necessary shared stylesheet still blocks first paint; this change reduces it without risking unstyled content.
- Removed the hero entrance animation, which initially hid its content. The existing variant tracking now uses an effect rather than a layout effect that runs before paint.
- Added one-year immutable caching for generated, fingerprinted images and one-day caching plus stale revalidation for unversioned media. Next headers serve Hostinger; public/_headers handles Cloudflare static assets. HTML and contact API are not given these asset cache rules.

## Remaining hosting and framework considerations

The two tested HTTPS hostnames return 200 directly. HTTP apex redirects once to HTTPS apex. A multiple-redirect chain was not reproduced; no speculative redirect was added. Test adverts and links using the final HTTPS URL. The www hostname remains the existing canonical. Hostinger controls any edge-level HTTP/domain redirects and CDN response policy.

Live baseline photo responses had no Cache-Control header. Built Next responses now pass cache-header checks. Hostinger must deploy the new commit and preserve these headers; that production state needs checking after deployment. Baseline Next JS/CSS already had immutable caching.

The homepage is statically generated, with no external font download or optional Google Maps request before consent. Its React/Next application runtime remains the largest JavaScript cost. Scripts are already asynchronous and the legacy polyfill is nomodule. This update does not claim to eliminate the unused-JavaScript warning. Removing the framework requires a separate migration and is not an appropriate untested performance patch. No third-party tracking script was added.

Server latency, CDN caching/compression and the final mobile score need a fresh production speed test. A Lighthouse mobile run was not available in this environment. No speed score or Web Vitals improvement is invented from byte savings. Internal preview infrastructure was previously blocked by a runtime compatibility mismatch; published Sites QA is used for the available browser checks.

## Validation

Next production build and TypeScript checks passed. All 26 GitHub tests and 21 existing Sites tests passed, including form and consent behaviour, public metadata, EICR noindex, and patched dependencies. The added production-server test fetches the 640px hero, validates its WebP type and sub-50-KB budget, verifies responsive HTML and cache headers, and checks the homepage CSS excludes duplicated backgrounds and EV sales styles.

`pnpm build` generates the image derivatives automatically. `pnpm dev` also prepares them. The deterministic source manifests are committed; generated binary assets are excluded from Git and included in the deployment output. To regenerate manually, run `pnpm images:build`.

Reference: [Next response headers](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers), [Cloudflare asset headers](https://developers.cloudflare.com/workers/static-assets/headers/), [Chrome render blocking guidance](https://developer.chrome.com/docs/performance/insights/render-blocking).
