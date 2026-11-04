# minimatch security update, 4 November 2026

Hostinger reported CVE-2026-118764 against minimatch 10.2.6 and 3.1.5.
The corrected CVE record, updated on 3 November, identifies affected versions
as `>=7.0.0, <11.0.1`:

https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/118xxx/CVE-2026-118764.json

The npm and pnpm overrides upgrade affected versions to 11.0.1. The lockfile
preserves minimatch 3.1.5 for the existing ESLint tools: it is outside the
affected range and uses a different CommonJS API. Forcing those callers onto
the v11 API would break linting. A scanner that still flags 3.1.5 for this CVE
is using an overly broad version range. No advisory is suppressed.

The prebuild security guard now scans all reachable minimatch copies and fails
on an affected version, including nested npm and symlinked pnpm dependencies.
Regression fixtures cover the vulnerable range and unaffected legacy copies.

Google Ads identifiers, consent handling, enquiry submission code and email
configuration are outside this change. The dependency audit workflow now uses
the declared pnpm version and Node 22, matching production.

Validation on Node 22.23.4 with pnpm 11.25.0:

- Full `pnpm audit --json`: zero vulnerabilities, including development dependencies.
- Frozen lockfile check: passed.
- `pnpm run build:cloudflare`: passed.
- `pnpm test`: production Next.js build and all 35 tests passed, including the
  Google Ads consent/conversion and contact API/form tests.
- ESLint loaded and ran without minimatch compatibility errors. Its eight errors
  and two warnings are in unchanged application/test files and predate this patch.
