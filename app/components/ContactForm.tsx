"use client";

import { useOptionalConsent } from "./CookieConsent";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  source?: string;
  evFocused?: boolean;
  eicrFocused?: boolean;
};

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

export function ContactForm({ source = "website", evFocused = false, eicrFocused = false }: ContactFormProps) {
  const consent = useOptionalConsent();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "email">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const variant = new URLSearchParams(window.location.search).get("variant") || "long";
    const submissionId = window.crypto.randomUUID();
    const message = eicrFocused
      ? `Property enquiry: ${form.get("propertyUse")}\n\n${form.get("message")}`
      : String(form.get("message"));
    const mailBody = [
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      `Email: ${form.get("email") || "Not provided"}`,
      `Location: ${form.get("postcode")}`,
      `Service: ${form.get("service")}`,
      "",
      "Project details:",
      message,
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
          message,
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
          setStatus("email");
          return;
        }
        throw new Error(result.message || "Your enquiry did not send. Please try again.");
      }

      if (consent) { window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "generate_lead", lead_source: source, homepage_variant: variant });
      }
      formElement.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Your enquiry did not send. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submitEnquiry}>
      <div className="form-heading"><span>{eicrFocused ? "EICR quote request" : evFocused ? "EV quote request" : "Quick enquiry"}</span><b>We usually reply within one working day</b></div>
      <label className="form-honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-grid">
        <label><span>Your name *</span><input name="name" autoComplete="name" required placeholder="e.g. Alex Smith" /></label>
        <label><span>Phone number *</span><input name="phone" type="tel" autoComplete="tel" required placeholder="07..." /></label>
        <label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label>
        <label><span>Postcode / area *</span><input name="postcode" autoComplete="postal-code" required placeholder="e.g. SG5" /></label>
        {eicrFocused && <label className="form-full"><span>Who is the inspection for? *</span><select name="propertyUse" required defaultValue=""><option value="" disabled>Select an option</option><option>Landlord</option><option>Letting agent / property manager</option><option>Homeowner</option><option>Homebuyer</option><option>Business premises</option></select></label>}
        {eicrFocused ? <input type="hidden" name="service" value="Inspection / EICR" /> : evFocused ? <input type="hidden" name="service" value="EV charger installation" /> : <label className="form-full"><span>What can we help with? *</span>
          <select name="service" required defaultValue={evFocused ? "EV charger installation" : ""}>
            <option value="" disabled>Select a service</option>
            <option>EV charger installation</option><option>Consumer unit / fuse board</option><option>Rewire or alteration</option><option>Inspection / EICR</option><option>Lighting or power</option><option>Commercial project</option><option>Industrial project</option><option>Fault finding</option><option>Something else</option>
          </select>
        </label>}
        <label className="form-full"><span>{eicrFocused ? "About the property *" : evFocused ? "Tell us about the installation *" : "Tell us a little about the job *"}</span><textarea name="message" required minLength={eicrFocused ? 10 : undefined} rows={eicrFocused ? 3 : 4} placeholder={eicrFocused ? "e.g. 2-bed rental flat in Hitchin. Report due in December. Let us know about access or a deadline." : evFocused ? "Where would you like the charger fitted? Let us know if you have already chosen one." : "What needs doing, what type of property is it, and when do you need the work?"} /></label>
      </div>
      <button className="button button-primary form-submit" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending..." : eicrFocused ? "Get my EICR quote" : evFocused ? "Get my free quote" : "Send enquiry"} <span aria-hidden="true">↗</span></button>
      <p className="form-note">We use your details to respond to your enquiry. <a href="/privacy">Read our privacy notice</a>.</p>
      {status === "email" && <p className="form-success" role="status">Your email app should open with your enquiry ready. Please press Send in your email app. This website has not sent the enquiry. If it did not open, call <a href="tel:+447484605599">07484 605 599</a> or email <a href="mailto:tyler@tbelectrical.co.uk">tyler@tbelectrical.co.uk</a>.</p>}
      {status === "success" && <p className="form-success" role="status">Thanks, your enquiry has been sent. We will be in touch soon.</p>}
      {status === "error" && <p className="form-error" role="alert">{errorMessage} You can also call <a href="tel:+447484605599">07484 605 599</a>.</p>}
    </form>
  );
}
