# TB Electrical website

This is the source code for the TB Electrical Herts Ltd website. It is ready to run in a Cloudflare account owned by the business and can deploy automatically from a private GitHub repository.

## What you need

- A Cloudflare account
- A private GitHub repository
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
3. Add the DNS records supplied by Resend to Cloudflare. This uses a subdomain and should not replace the records for your normal inbox.
4. Create a Resend API key with sending permission.
5. Keep the API key out of GitHub. Add it to Cloudflare as a secret named `RESEND_API_KEY`.

For local testing, copy `.env.example` to `.env.local` and replace the sample value. Never commit `.env.local`.

The normal recipient and sender are already set in `wrangler.jsonc`:

- Recipient: `tyler@tbelectrical.co.uk`
- Sender: `TB Electrical Website <enquiries@forms.tbelectrical.co.uk>`

To send to a second inbox as well, separate the addresses in `CONTACT_TO_EMAIL` with a comma.

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

1. Create a private GitHub repository and push this project to its `main` branch.
2. In Cloudflare, open the Worker and go to **Settings → Builds**.
3. Connect the GitHub repository and use `main` as the production branch.
4. Leave the build command empty and set the deploy command to `pnpm run deploy`.
5. Add `RESEND_API_KEY` as an encrypted build or Worker secret.

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
