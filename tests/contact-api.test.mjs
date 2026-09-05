import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("contact-test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const ctx = { waitUntil() {}, passThroughOnException() {} };
const validPayload = {
  name: "Alex Smith",
  phone: "07123456789",
  email: "alex@example.com",
  postcode: "SG5 1AA",
  service: "EV charger installation",
  message: "Please quote for a charger beside my driveway.",
  source: "contact page",
  variant: "long",
  website: "",
  submissionId: "12345678-abcd-4abc-9abc-123456789abc",
};

function request(payload = validPayload) {
  return new Request("https://tbelectrical.co.uk/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://tbelectrical.co.uk" },
    body: JSON.stringify(payload),
  });
}

test("rejects incomplete contact submissions", async () => {
  const response = await worker.fetch(request({ ...validPayload, message: "Too short" }), {}, ctx);
  assert.equal(response.status, 400);
  assert.equal((await response.json()).ok, false);
});

test("does not email submissions caught by the spam trap", async () => {
  const response = await worker.fetch(request({ ...validPayload, website: "spam.example" }), {}, ctx);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
});

test("reports missing email configuration without losing the browser fallback", async () => {
  const response = await worker.fetch(request(), {}, ctx);
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.equal(body.code, "FORM_NOT_CONFIGURED");
});

test("sends a validated enquiry through the email provider", async () => {
  const originalFetch = globalThis.fetch;
  let providerRequest;
  globalThis.fetch = async (input, init) => {
    providerRequest = { input, init };
    return Response.json({ id: "email_123" });
  };

  try {
    const response = await worker.fetch(request(), {
      RESEND_API_KEY: "re_test_key",
      CONTACT_TO_EMAIL: "tyler@tbelectrical.co.uk",
      CONTACT_FROM_EMAIL: "TB Electrical Website <enquiries@forms.tbelectrical.co.uk>",
    }, ctx);

    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
    assert.equal(providerRequest.input, "https://api.resend.com/emails");
    assert.equal(providerRequest.init.method, "POST");
    assert.equal(providerRequest.init.headers["Idempotency-Key"], `tb-contact-${validPayload.submissionId}`);

    const email = JSON.parse(providerRequest.init.body);
    assert.deepEqual(email.to, ["tyler@tbelectrical.co.uk"]);
    assert.equal(email.reply_to, "alex@example.com");
    assert.match(email.text, /Please quote for a charger/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
