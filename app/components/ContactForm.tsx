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
  const [prepared, setPrepared] = useState(false);

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const variant = new URLSearchParams(window.location.search).get("variant") || "long";
    const body = [
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
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "generate_lead", lead_source: source, homepage_variant: variant });
    setPrepared(true);
    window.location.href = `mailto:tyler@tbelectrical.co.uk?subject=${encodeURIComponent(`Website enquiry — ${form.get("service")}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact-form" onSubmit={submitEnquiry}>
      <div className="form-heading"><span>{evFocused ? "EV quote request" : "Quick enquiry"}</span><b>Usually replies within one working day</b></div>
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
        <label className="form-full"><span>Tell us a little about the job *</span><textarea name="message" required rows={4} placeholder={evFocused ? "Which vehicle/charger, where it will be fitted and your preferred timing…" : "What needs doing, the property type and your preferred timing…"} /></label>
      </div>
      <button className="button button-primary form-submit" type="submit">Prepare my enquiry <span>↗</span></button>
      <p className="form-note">This opens your email app with the details pre-filled. Your information is not stored on this website.</p>
      {prepared && <p className="form-success" role="status">Your enquiry is ready in your email app. Please press send to finish.</p>}
    </form>
  );
}
