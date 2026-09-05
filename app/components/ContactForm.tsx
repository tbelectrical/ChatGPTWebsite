"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  source?: string;
  evFocused?: boolean;
};

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

export function ContactForm({ source = "website", evFocused = false }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const variant = new URLSearchParams(window.location.search).get("variant") || "long";
    const submissionId = window.crypto.randomUUID();
    const mailBody = [
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      `Email: ${form.get("email") || "Not provided"}`,
      `Location: ${form.get("postcode")}`,
      `Service: ${form.get("service")}`,
      "",
      "Project details:",
      String(form.get("message")),
      "",
      `Website source: ${source}`,
      `Homepage test variant: ${variant}`,
    ].join("\n");

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          postcode: form.get("postcode"),
          service: form.get("service"),
          message: form.get("message"),
          website: form.get("website"),
          source,
          variant,
          submissionId,
        }),
      });
      const result = await response.json() as { ok?: boolean; code?: string; message?: string };

      if (!response.ok || !result.ok) {
        if (result.code === "FORM_NOT_CONFIGURED") {
          window.location.href = `mailto:tyler@tbelectrical.co.uk?subject=${encodeURIComponent(`Website enquiry: ${form.get("service")}`)}&body=${encodeURIComponent(mailBody)}`;
          setStatus("idle");
          return;
        }
        throw new Error(result.message || "Your enquiry did not send. Please try again.");
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "generate_lead", lead_source: source, homepage_variant: variant });
      formElement.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Your enquiry did not send. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submitEnquiry}>
      <div className="form-heading"><span>{evFocused ? "EV quote request" : "Quick enquiry"}</span><b>We usually reply within one working day</b></div>
      <label className="form-honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-grid">
        <label><span>Your name *</span><input name="name" autoComplete="name" required placeholder="e.g. Alex Smith" /></label>
        <label><span>Phone number *</span><input name="phone" type="tel" autoComplete="tel" required placeholder="07..." /></label>
        <label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label>
        <label><span>Postcode / area *</span><input name="postcode" autoComplete="postal-code" required placeholder="e.g. SG5" /></label>
        <label className="form-full"><span>What can we help with? *</span>
          <select name="service" required defaultValue={evFocused ? "EV charger installation" : ""}>
            <option value="" disabled>Select a service</option>
            <option>EV charger installation</option><option>Consumer unit / fuse board</option><option>Rewire or alteration</option><option>Inspection / EICR</option><option>Lighting or power</option><option>Commercial project</option><option>Industrial project</option><option>Fault finding</option><option>Something else</option>
          </select>
        </label>
        <label className="form-full"><span>Tell us a little about the job *</span><textarea name="message" required rows={4} placeholder={evFocused ? "Which car or charger, where should we fit it, and when do you need it?" : "What needs doing, what type of property is it, and when do you need the work?"} /></label>
      </div>
      <button className="button button-primary form-submit" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending..." : "Send enquiry"} <span>↗</span></button>
      <p className="form-note">Your details are sent securely to TB Electrical and used only to reply to your enquiry.</p>
      {status === "success" && <p className="form-success" role="status">Thanks, your enquiry has been sent. We will be in touch soon.</p>}
      {status === "error" && <p className="form-error" role="alert">{errorMessage} You can also call <a href="tel:+447484605599">07484 605 599</a>.</p>}
    </form>
  );
}
