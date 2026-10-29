# Hostinger dependency remediation, 29 October 2026

## Findings and source mismatch

Four supplied screenshots list 39 findings: 17 high, 16 moderate and 6 low, across six packages. They report undici 7.24.8, ws 8.18.0, sharp 0.34.5, esbuild 0.27.3, image-size 2.0.2 and satori 0.16.0. The complete transcribed list is in the adjacent JSON file.

Current GitHub main at `2bd1e4b` already locked five of these packages to patched releases. Its pnpm audit found one remaining moderate advisory in Satori. Therefore the screenshots do not describe that source tree. An older deployment, install path or scan is possible; this cannot be resolved from screenshots alone. Do not claim the live Hostinger environment is clean without deploying the tested commit and rescanning it.

## Durable source patch

| Package | Screenshot | Patched source |
| --- | --- | --- |
| undici | 7.24.8 | 7.30.1 |
| ws | 8.18.0 | 8.21.0 |
| sharp | 0.34.5 | 0.35.5 |
| esbuild | 0.27.3 | 0.28.2 |
| image-size | 2.0.2 | 2.0.3 |
| satori | 0.16.0 | 0.33.5 |

- Apply exact pnpm workspace overrides and matching native npm root overrides. npm does not use a `pnpm.overrides` configuration block.
- Pin the existing package manager to pnpm 11.25.0 and regenerate its lockfile. No second tracked lockfile or package-manager migration is introduced.
- Allow installation scripts only for the existing, known native tools esbuild, workerd and sharp.
- Upgrade `@vercel/og` to 1.0.3 because 0.8.6 embeds Satori 0.16.0 in its distributed JavaScript. Overriding the standalone Satori dependency alone leaves that embedded code unchanged. The new parent bundle was inspected and references Satori 0.33.5.
- Pin the separately installed `fflate` to 0.8.3 after the audit found its older release in the rendering dependency chain.
- Align React and React DOM at 19.2.8 with react-server-dom-webpack 19.2.8. This fixes the peer conflict found during a clean npm resolution check.
- Add a prebuild version guard that follows reachable npm nested dependencies and pnpm symlinks. It rejects vulnerable duplicate versions while ignoring unreachable virtual-store cache remnants. A fixture test verifies both behaviours.
- No website copy, design, forms, email addresses, domains or cookie behaviour is changed.

## Validation

See `security-validation-2026-10-29.json` for audit summaries and checked versions. Run:

```sh
pnpm install --frozen-lockfile
pnpm run security:check
pnpm run security:audit
pnpm run build
node --test tests/*.test.mjs
```

The Next.js build and regression suite cover the existing public pages, hidden EICR page, EV funnel, contact validation and consent-gated enquiry handling. A native Sharp test verifies that the installed image processor can decode and resize the existing website social image. No real enquiry emails are sent by tests.

A separate temporary npm project resolves the same package.json with native overrides and is audited as an additional check. Its package-lock.json is intentionally not committed: pnpm remains the established deployment workflow.

The website serves static `og.png` and has no ImageResponse route. A direct-import test of the vendor's raw Node ESM renderer exposed an upstream HarfBuzz loader limitation; this is not an exercised website route and dynamic OG rendering is not claimed as validated. The site's static image path and both production builds are checked. The parent package upgrade is still necessary to replace its embedded vulnerable Satori code.

## Hostinger verification

Deploy the final GitHub commit from the correct repository/branch and root directory. Confirm the dependency install uses pnpm 11.25.0 and its frozen lockfile, and that the prebuild version guard prints the patched versions. Then run Hostinger's scanner again. If the old versions remain listed, compare the deployment commit, build log and scan timestamp; repeating a source patch cannot change an older deployment or cached scan.

Do not edit managed production node_modules through File Manager: Hostinger replaces deployment-managed files. The durable fix belongs in source manifests and the lockfile.

## Primary references

- [Satori advisory and patched version](https://github.com/vercel/satori/security/advisories/GHSA-wx4j-mvgx-mqwp)
- [Undici TLS advisory and patched branches](https://github.com/nodejs/undici/security/advisories/GHSA-qrxm-fqhp-jwvm)
- [fflate fixed release](https://github.com/101arrowz/fflate/releases/tag/v0.8.3)
- [Withdrawn esbuild advisory](https://github.com/advisories/GHSA-gv7w-rqvm-qjhr)
- [npm root overrides](https://docs.npmjs.com/cli/configuring-npm/package-json/)
- [Hostinger package-manager detection](https://www.hostinger.com/support/how-to-deploy-monorepos-with-npm-yarn-or-pnpm-on-hostinger/)
- [Hostinger deployment lifecycle](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)
