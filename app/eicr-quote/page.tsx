import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { CookieSettings } from "../components/CookieConsent";
import { pageMetadata, siteUrl } from "../lib/seo";
import "./eicr.css";

// Paid-search destination: publicly accessible, absent from navigation/sitemap.
// Keep crawl access open so Google Ads can assess the destination.
export const metadata: Metadata = {
  ...pageMetadata(
    "EICR Testing in Hitchin | Landlord Electrical Reports",
    "EICR due at your rental property? Book a qualified local electrician in Hitchin and nearby towns. Clear quote before testing. Request your EICR quote.",
    "/eicr-quote",
  ),
  title: { absolute: "EICR Testing in Hitchin | TB Electrical" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

const faqs = [
  ["How much does an EICR cost?", "We quote for your property before you book. The size of the installation, number of circuits and access needed affect the price. Send the postcode and property type. If you have an old report or a photo of the consumer unit, we may ask for it when we reply. Repairs are quoted separately."],
  ["How often does a rental property need an EICR?", "In England, most private rented homes must have the electrical installation inspected and tested at intervals of no more than five years, or sooner if the last report specifies an earlier date. You need a suitable report before a new tenancy begins, but a new tenancy does not automatically mean a new inspection if the existing report remains valid. We can help you check what is due."],
  ["Will the power need to be switched off?", "Yes. Testing involves switching circuits off, and we need access to the consumer unit and electrical points. Tell us about anyone working from home or any equipment that must stay powered. We will agree access and explain the disruption before the visit."],
  ["What if the report is unsatisfactory?", "We explain the observations and what needs attention. C1 means danger is present, C2 means potentially dangerous, and FI means further investigation is required. C3 is an improvement recommendation and does not, by itself, make the report unsatisfactory. Any repair work is separate from the inspection and needs your agreement. For rented homes covered by the regulations, required remedial or investigative work must be completed within 28 days, or sooner if the report specifies."],
  ["When will I get the report?", "We confirm the expected report turnaround when we book the inspection. If you have a tenancy start date or a request from your agent, tell us before booking so we can check whether we can meet it. Sending this form requests a quote; it does not reserve an appointment."],
  ["Do you inspect homes being bought or sold?", "Yes. We also carry out EICRs for homeowners and buyers. There is no general legal requirement to obtain an EICR simply to sell an owner-occupied home in England, but it can help you understand the condition of the electrics. If you are buying, access needs to be agreed with the seller or agent."],
  ["Can you quote for a business or several properties?", "Yes. Tell us about the premises or the number of properties in your message. Commercial inspections need an agreed scope and a plan for switching circuits off. The inspection interval depends on the installation and its use; there is no single five-year rule for every business."],
];

const serviceSchema = {
  "@context": "https://schema.org", "@type": "Service",
  "@id": `${siteUrl}/eicr-quote#service`,
  name: "Electrical Installation Condition Reports in Hitchin",
  serviceType: "Electrical installation inspection and testing (EICR)",
  url: `${siteUrl}/eicr-quote`, provider: { "@id": `${siteUrl}/#business` },
  areaServed: ["Hitchin", "Baldock", "Letchworth Garden City", "Stevenage", "Langford", "Biggleswade"].map(name => ({ "@type": "Place", name })),
};

export default function EicrQuotePage() {
  return <div className="eicr-page">
    <header className="eicr-header"><div className="shell eicr-header-inner">
      <a href="/" aria-label="TB Electrical home"><img src="/media/tb-logo-white.webp" alt="TB Electrical" width={164} height={72} /></a>
      <div className="eicr-header-contact"><div><span>Speak to Tyler</span><a href="tel:+447484605599">07484 605 599</a></div><a className="button button-primary eicr-header-quote" href="#eicr-enquiry">Get a quote <span aria-hidden="true">↗</span></a></div>
    </div></header>
    <main id="main-content">
      <section className="eicr-hero" aria-labelledby="eicr-heading"><div className="shell eicr-hero-grid">
        <div className="eicr-pitch">
          <p className="eyebrow"><span /> Landlord EICRs · Hitchin & nearby towns</p><p className="eicr-hero-trust">NAPIT registered <span aria-hidden="true">·</span> Fully insured</p>
          <h1 id="eicr-heading">Your EICR.<br /><em>Sorted properly.</em></h1>
          <p className="eicr-lead">Electrical inspection and testing<br className="eicr-desktop-break" /> from a local electrician you can trust.</p>
          <p className="eicr-intro">I’m Tyler, an electrician based in Hitchin. I’ll inspect your rental’s electrics and explain the report. You’ll know the price before you book, with any repairs quoted separately.</p>
          <div className="eicr-hero-actions"><a className="button button-primary" href="#eicr-enquiry">Get my EICR quote <span aria-hidden="true">↗</span></a><a className="eicr-underlink" href="tel:+447484605599">Or call me directly</a></div>
          <p className="eicr-cta-note">Free quote. Tell me your postcode and when the report is due.</p>
          <a className="eicr-mini-review" href="#eicr-customer-review"><span className="eicr-stars" aria-label="A five-star customer review">★★★★★</span><span>“Reliable, fairly priced sparky”<small>From a customer’s Google review ↗</small></span></a>
        </div>
        <figure className="eicr-hero-portrait"><img src="/media/tyler-eicr-electrician-portrait.webp" alt="Tyler Baker, your local Hitchin electrician, beside his van" width={900} height={675} fetchPriority="high" decoding="async" /><figcaption><span>YOUR LOCAL ELECTRICIAN</span><strong>Tyler Baker</strong><p>TB Electrical Herts Ltd · Hitchin</p></figcaption><div className="eicr-portrait-stamp"><span aria-hidden="true">✓</span> NAPIT registered</div></figure>
      </div></section>
      <section className="eicr-credentials" aria-label="Professional credentials"><div className="shell">
        <div><img src="/media/napit-red-tick.png" alt="NAPIT" width={600} height={600} /><span>NAPIT registered</span></div><div><strong>2391-52</strong><span>City & Guilds qualified</span></div><div><strong>Fully insured</strong><span>For your peace of mind</span></div><a href="https://www.trustmark.org.uk/firms/TB%20Electrical%20Herts%20Ltd-4136741-SG5%204SN?id=6a0f78e4-068a-4311-bbf1-663f7f6bd737" target="_blank" rel="noreferrer"><img src="/media/trustmark-logo.svg" alt="TrustMark" width={130} height={52} /><span>View my profile ↗</span></a>
      </div></section>
      <section className="eicr-contact-band" aria-labelledby="eicr-contact-heading"><div className="shell eicr-contact-grid">
        <div className="eicr-contact-pitch"><p className="eyebrow"><span /> Let’s get yours sorted</p><h2 id="eicr-contact-heading">EICR coming due?<br /><em>Let’s get it sorted.</em></h2><p>Whether you have one rental or several, send me a few details. I’ll confirm the inspection price and discuss available dates with you.</p><div className="eicr-contact-points"><p><span aria-hidden="true">✓</span> Inspection price agreed before booking</p><p><span aria-hidden="true">✓</span> Access and disruption planned with you</p></div><div className="eicr-direct"><span>Prefer a quick conversation?</span><a href="tel:+447484605599">07484 605 599 <span aria-hidden="true">↗</span></a><small>You’ll be speaking to Tyler.</small></div><p className="eicr-local"><strong>Based in Hitchin. Working locally.</strong>Hitchin · Baldock · Letchworth<br />Stevenage · Langford · Biggleswade</p></div>
        <div className="eicr-quote-panel" id="eicr-enquiry"><p className="eicr-panel-kicker">Free, no-obligation quote</p><h2>Tell me about<br />your property.</h2><p>A few details are all I need to get started.</p><ContactForm source="eicr-landing-page" eicrFocused /><p className="eicr-form-alternative">Homeowner or buying a property? I can help with that too.</p></div>
      </div></section>
      <section className="shell eicr-section eicr-choice" aria-labelledby="eicr-choice-heading">
        <div className="eicr-section-heading"><p className="eyebrow dark"><span /> Why choose TB Electrical?</p><h2 id="eicr-choice-heading">Easy to deal with.<br /><em>Careful with the details.</em></h2><p>Getting your rental’s electrical report sorted should feel straightforward. You want someone who takes the inspection seriously and treats your property with respect.</p></div>
        <div className="eicr-reasons">
          <article><span aria-hidden="true">↗</span><h3>You speak to me</h3><p>You’ll have my number from the start. Tell me what you need, and I’ll talk you through the inspection and booking.</p></article>
          <article><span aria-hidden="true">↗</span><h3>You know the cost upfront</h3><p>I’ll quote for your property before you book. If the inspection finds anything that needs repairing, I’ll explain it and quote separately.</p></article>
          <article><span aria-hidden="true">↗</span><h3>The report makes sense</h3><p>I’ll explain the findings in plain English, including anything that needs attention. You can ask questions without feeling out of your depth.</p></article>
          <article><span aria-hidden="true">↗</span><h3>Your property gets looked after</h3><p>I take care over how I work in people’s homes. We’ll agree access and power interruptions beforehand, so you can prepare your tenants.</p></article>
        </div>
      </section>
      <section className="eicr-review" id="eicr-customer-review" aria-labelledby="eicr-review-heading"><div className="shell eicr-review-inner">
        <div><p className="eyebrow"><span /> A customer’s words</p><h2 id="eicr-review-heading">The kind of service<br /><em>you come back for.</em></h2><span className="eicr-stars" aria-label="Five out of five stars for this review">★★★★★</span><a href="https://www.google.com/maps/search/?api=1&query=TB+Electrical+Herts+Ltd+Hitchin" target="_blank" rel="noreferrer">Read reviews on Google ↗</a></div>
        <div className="eicr-review-quote"><span aria-hidden="true" className="eicr-quote-mark">“</span><blockquote><p>I’ve had Tyler out a couple of times now for sockets and a new garage consumer unit, and the work is always immaculate.</p><p>I’ve always struggled to find a reliable, fairly priced sparky, so I feel very lucky to have found him.</p></blockquote><p className="eicr-review-caption">Excerpts from one Google review of installation work.</p></div>
      </div></section>
      <section className="shell eicr-section eicr-included" id="eicr-included">
        <div className="eicr-section-heading"><p className="eyebrow dark"><span /> Your electrical condition report</p><h2>A clear picture<br /><em>of your electrics.</em></h2><p>An EICR helps you understand whether the existing installation is satisfactory for continued use. Here’s what you’re booking.</p><a className="eicr-inline-link" href="#eicr-enquiry">Ask about your property <span aria-hidden="true">↗</span></a></div>
        <div className="eicr-included-list">
          <article><span aria-hidden="true">01</span><div><h3>A proper inspection</h3><p>I inspect and test the fixed installation within an agreed scope, including the consumer unit and earthing. Accessible electrical points are checked, with any limitations recorded.</p></div></article>
          <article><span aria-hidden="true">02</span><div><h3>Your EICR, explained</h3><p>You receive an Electrical Installation Condition Report recording the findings and the recommended next inspection date. I’ll explain whether anything needs attention.</p></div></article>
          <article><span aria-hidden="true">03</span><div><h3>Help with the next step</h3><p>If repairs are needed, we can discuss getting them put right. Repairs are quoted separately, and any extra work needs your agreement.</p></div></article>
        </div>
      </section>
      <section className="shell eicr-section eicr-next"><div><p className="eyebrow dark"><span /> What happens next?</p><h2>Here’s how<br /><em>it works.</em></h2></div><ol><li><span>01</span><div><h3>We agree the details</h3><p>I’ll confirm the inspection scope and price, then we’ll arrange a date. Tell me about any tenant access requirements or deadlines.</p></div></li><li><span>02</span><div><h3>I inspect and report</h3><p>Testing involves switching circuits off. Once the inspection is complete, I’ll prepare your report and explain the findings. We agree the expected turnaround when booking.</p></div></li></ol></section>
      <section className="eicr-faq-band"><div className="shell eicr-section eicr-faq"><div><p className="eyebrow dark"><span /> Before you book</p><h2>A few things<br /><em>you might be wondering.</em></h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary><span>{question}</span><i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}<p className="eicr-guidance">For rental requirements in England, see the <a href="https://www.gov.uk/government/publications/electrical-safety-standards-in-the-private-and-social-rented-sectors-guidance/electrical-safety-standards-in-the-private-and-social-rented-sectors-guidance" target="_blank" rel="noreferrer">government’s electrical safety guidance ↗</a>.</p></div></div></section>
      <section className="eicr-final"><div className="shell"><p className="eyebrow dark"><span /> Your local EICR electrician</p><h2>Feel good about<br />who you <em>let in.</em></h2><p>Let’s get your property’s electrical inspection sorted.</p><div className="eicr-final-actions"><a className="button button-dark" href="#eicr-enquiry">Get my EICR quote <span aria-hidden="true">↗</span></a><a href="tel:+447484605599">Call Tyler on 07484 605 599</a></div></div></section>
    </main>
    <footer className="eicr-footer"><div className="shell"><div><a href="/" aria-label="TB Electrical home"><img src="/media/tb-logo-white.webp" alt="TB Electrical" width={164} height={72} loading="lazy" /></a><p>TB Electrical Herts Ltd · Company no. 16596265<br />Based in Hitchin, Hertfordshire</p></div><div><a href="mailto:tyler@tbelectrical.co.uk">tyler@tbelectrical.co.uk</a><a href="/privacy">Privacy notice</a><a href="/cookies">Cookie policy</a><CookieSettings /></div></div></footer>
    <nav className="eicr-mobile-actions" aria-label="EICR enquiry actions"><a href="tel:+447484605599">Call Tyler</a><a href="#eicr-enquiry">Get my EICR quote <span aria-hidden="true">↗</span></a></nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
  </div>;
}
