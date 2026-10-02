# TB Electrical website

This is the source code for the TB Electrical Herts Ltd website. The default build runs on Hostinger's Next.js hosting. The existing Cloudflare Worker deployment remains available separately.

## What you need

- A Hostinger plan with Node.js Web Apps, or a Cloudflare account
- Access to the `tbelectrical/ChatGPTWebsite` GitHub repository
- Control of the `tbelectrical.co.uk` domain
- A Resend account for dependable contact-form delivery
- Node.js 22.13 or newer and pnpm for local changes

## Run the website locally

```bash
pnpm install
pnpm run dev
```

Open the local address shown in the terminal. Check a production build with:

```bash
pnpm run build
pnpm test
```

## Set up contact-form email

The form sends through a server endpoint. Visitors do not need an email app, and the page only shows success after Resend accepts the message.

1. Create a Resend account.
2. In Resend, add and verify the sending subdomain `forms.tbelectrical.co.uk`.
3. Add the DNS records supplied by Resend wherever your domain's DNS is managed. This uses a subdomain and should not replace the records for your normal inbox.
4. Create a Resend API key with sending permission.
5. Keep the API key out of GitHub. Add it to your host's environment variables as `RESEND_API_KEY`.

For local testing, copy `.env.example` to `.env.local` and replace the sample value. Never commit `.env.local`.

The normal recipient and sender are listed in `.env.example` and set for Cloudflare in `wrangler.jsonc`:

- Recipient: `tyler@tbelectrical.co.uk`
- Sender: `TB Electrical Website <enquiries@forms.tbelectrical.co.uk>`

To send to a second inbox as well, separate the addresses in `CONTACT_TO_EMAIL` with a comma.

## Deploy on Hostinger

Connect the `main` branch of `tbelectrical/ChatGPTWebsite` as a Node.js Web App. Select **Next.js** as the framework. Use these build settings:

| Setting | Value |
| --- | --- |
| Node.js | 22.x or newer |
| Root directory | Repository root |
| Package manager | pnpm |
| Build command | `pnpm run build` |
| Output directory | `.next` |
| Entry file | Leave blank for the Next.js preset |
| Start command, if requested | `pnpm start` |

Add these environment variables in Hostinger:

| Key | Value |
| --- | --- |
| `RESEND_API_KEY` | Your private Resend sending API key |
| `CONTACT_TO_EMAIL` | `tyler@tbelectrical.co.uk` |
| `CONTACT_FROM_EMAIL` | `TB Electrical Website <enquiries@forms.tbelectrical.co.uk>` |

Verify `forms.tbelectrical.co.uk` in Resend before testing email. The key must be available to the running Node.js application, not only while building. After deployment, open the home page, `/ev-chargers`, `/robots.txt`, and `/sitemap.xml`; then send a test enquiry and check both the inbox and Resend delivery log. Keep the current live site and domain settings in place until those checks pass.

## First Cloudflare deployment

Install the project, then sign in to the Cloudflare account:

```bash
pnpm install
pnpm exec wrangler login
pnpm run deploy
```

The first deployment creates a `workers.dev` test address. Add the email secret in the Cloudflare dashboard under **Workers & Pages → tb-electrical-herts → Settings → Variables and Secrets**. Use the name `RESEND_API_KEY`, mark it as encrypted, then deploy again.

## Connect the business domain

Keep the existing website online until this version has been tested.

1. Add `tbelectrical.co.uk` to the Cloudflare account if it is not there already.
2. Open **Workers & Pages → tb-electrical-herts → Settings → Domains & Routes**.
3. Choose **Add → Custom Domain**.
4. Add `tbelectrical.co.uk` and `www.tbelectrical.co.uk`.
5. Check the home page, EV page and contact form before changing or cancelling any old hosting.

Cloudflare creates the site DNS records and SSL certificates. Existing email DNS records must stay in place.

## Automatic deployment from GitHub

1. Use the `tbelectrical/ChatGPTWebsite` GitHub repository on its `main` branch.
2. In Cloudflare, open the Worker and go to **Settings → Builds**.
3. Connect the GitHub repository and use `main` as the production branch.
4. Leave the build command empty and set the deploy command to `pnpm run deploy`.
5. Add `RESEND_API_KEY` as an encrypted Worker secret.

After this, an approved push to `main` rebuilds and publishes the website.

## Form safeguards

The contact endpoint includes:

- server-side field checks
- same-site request checks
- a hidden spam trap
- request-size limits
- escaped email content
- a single safe retry for short provider failures
- an idempotency key to prevent duplicate emails during a retry
- a clear phone fallback if delivery fails

Resend keeps delivery logs, so a failed or rejected email can be traced. If the API key is not configured yet, the current email-app fallback remains available instead of losing the enquiry.
