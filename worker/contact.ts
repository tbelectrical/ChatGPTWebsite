export interface ContactEnv {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  service: string;
  message: string;
  source: string;
  variant: string;
  website: string;
  submissionId: string;
};

const services = new Set([
  "EV charger installation",
  "Consumer unit / fuse board",
  "Rewire or alteration",
  "Inspection / EICR",
  "Lighting or power",
  "Commercial project",
  "Industrial project",
  "Fault finding",
  "Something else",
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const submissionIdPattern = /^[a-zA-Z0-9-]{8,80}$/;

export async function handleContactRequest(request: Request, env: ContactEnv): Promise<Response> {
  if (request.method !== "POST") {
    return json({ ok: false, message: "Method not allowed." }, 405, { Allow: "POST" });
  }

  const contentType = request.headers.get("content-type") || "";
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (!contentType.includes("application/json") || contentLength > 25_000) {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const origin = request.headers.get("origin");
  const requestOrigin = new URL(request.url).origin;
  const fetchSite = request.headers.get("sec-fetch-site");
  if ((origin && origin !== requestOrigin) || (fetchSite && !["same-origin", "none"].includes(fetchSite))) {
    return json({ ok: false, message: "This form must be sent from the TB Electrical website." }, 403);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, message: "We could not read those details. Please check the form and try again." }, 400);
  }

  const payload = parsePayload(raw);
  if (!payload.ok) return json({ ok: false, message: payload.message }, 400);

  // Bots usually fill every input. Return a normal response without sending mail.
  if (payload.data.website) return json({ ok: true });

  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL) {
    return json({
      ok: false,
      code: "FORM_NOT_CONFIGURED",
      message: "Online sending is not switched on yet.",
    }, 503);
  }

  const recipients = (env.CONTACT_TO_EMAIL || "tyler@tbelectrical.co.uk")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  if (!recipients.length || recipients.some((address) => !emailPattern.test(address))) {
    console.error("Contact form has an invalid CONTACT_TO_EMAIL value.");
    return json({ ok: false, message: "The form is temporarily unavailable. Please call us instead." }, 503);
  }

  const sent = await sendEmail(payload.data, env, recipients);
  if (!sent.ok) {
    console.error("Contact form email failed.", { status: sent.status, providerMessage: sent.providerMessage });
    return json({
      ok: false,
      message: "Your enquiry did not send. Please try once more or call 07484 605 599.",
    }, 502);
  }

  return json({ ok: true, reference: payload.data.submissionId });
}

function parsePayload(raw: unknown): { ok: true; data: ContactPayload } | { ok: false; message: string } {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, message: "Please complete the form and try again." };
  }

  const value = raw as Record<string, unknown>;
  const data: ContactPayload = {
    name: clean(value.name, 100),
    phone: clean(value.phone, 30),
    email: clean(value.email, 160),
    postcode: clean(value.postcode, 20),
    service: clean(value.service, 80),
    message: clean(value.message, 3_000),
    source: clean(value.source, 60) || "website",
    variant: clean(value.variant, 30) || "long",
    website: clean(value.website, 200),
    submissionId: clean(value.submissionId, 80),
  };

  if (data.name.length < 2 || data.phone.length < 7 || data.postcode.length < 2 || data.message.length < 10) {
    return { ok: false, message: "Please complete all required fields with a little more detail." };
  }
  if (!services.has(data.service)) {
    return { ok: false, message: "Please choose a service from the list." };
  }
  if (data.email && !emailPattern.test(data.email)) {
    return { ok: false, message: "Please check the email address, or leave it blank." };
  }
  if (!submissionIdPattern.test(data.submissionId)) {
    return { ok: false, message: "Please refresh the page and try again." };
  }

  return { ok: true, data };
}

function clean(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().replace(/\0/g, "").slice(0, maxLength) : "";
}

async function sendEmail(payload: ContactPayload, env: ContactEnv, recipients: string[]) {
  const subject = `Website enquiry: ${payload.service} | ${payload.name} | ${payload.postcode}`;
  const text = [
    "New TB Electrical website enquiry",
    "",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email || "Not provided"}`,
    `Postcode / area: ${payload.postcode}`,
    `Service: ${payload.service}`,
    "",
    "Project details:",
    payload.message,
    "",
    `Website source: ${payload.source}`,
    `Homepage test variant: ${payload.variant}`,
    `Reference: ${payload.submissionId}`,
    `Received: ${new Date().toISOString()}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:680px;color:#171614;line-height:1.55">
      <div style="background:#171614;color:#fff;padding:24px 28px;border-top:7px solid #ffbd17">
        <p style="margin:0;color:#ffbd17;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">TB Electrical website</p>
        <h1 style="margin:8px 0 0;font-size:26px">New enquiry</h1>
      </div>
      <div style="background:#f5f3ed;padding:26px 28px">
        <table role="presentation" style="width:100%;border-collapse:collapse">
          ${row("Name", payload.name)}
          ${row("Phone", payload.phone)}
          ${row("Email", payload.email || "Not provided")}
          ${row("Postcode / area", payload.postcode)}
          ${row("Service", payload.service)}
        </table>
        <h2 style="margin:28px 0 8px;font-size:16px">Project details</h2>
        <p style="margin:0;white-space:pre-wrap">${escapeHtml(payload.message)}</p>
        <p style="margin:28px 0 0;color:#777;font-size:11px">Source: ${escapeHtml(payload.source)} · Variant: ${escapeHtml(payload.variant)} · Ref: ${escapeHtml(payload.submissionId)}</p>
      </div>
    </div>`;

  const response = await callResend({
    from: env.CONTACT_FROM_EMAIL!,
    to: recipients,
    subject,
    text,
    html,
    ...(payload.email ? { reply_to: payload.email } : {}),
  }, env.RESEND_API_KEY!, payload.submissionId);

  if (response.ok) return { ok: true, status: response.status, providerMessage: "" };

  // One immediate retry covers brief provider or network failures. The same
  // idempotency key prevents two emails if the first request actually landed.
  if (response.status === 0 || response.status === 429 || response.status >= 500) {
    return callResend({
      from: env.CONTACT_FROM_EMAIL!,
      to: recipients,
      subject,
      text,
      html,
      ...(payload.email ? { reply_to: payload.email } : {}),
    }, env.RESEND_API_KEY!, payload.submissionId);
  }

  return response;
}

async function callResend(body: Record<string, unknown>, apiKey: string, submissionId: string) {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `tb-contact-${submissionId}`,
        "User-Agent": "TB-Electrical-Website/1.0",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
    const providerMessage = response.ok ? "" : (await response.text()).slice(0, 500);
    return { ok: response.ok, status: response.status, providerMessage };
  } catch (error) {
    return { ok: false, status: 0, providerMessage: error instanceof Error ? error.message : "Network error" };
  }
}

function row(label: string, value: string) {
  return `<tr><th style="padding:7px 16px 7px 0;text-align:left;vertical-align:top;font-size:12px;color:#777">${escapeHtml(label)}</th><td style="padding:7px 0;font-size:14px;font-weight:700">${escapeHtml(value)}</td></tr>`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]!);
}

function json(body: Record<string, unknown>, status = 200, extraHeaders: Record<string, string> = {}) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}
