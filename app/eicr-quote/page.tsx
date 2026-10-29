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
    <header className="eicr-header">
      <div className="shell eicr-header-inner">
        <a href="/" aria-label="TB Electrical home"><img src="/media/tb-logo-white.webp" alt="TB Electrical" width={164} height={72} /></a>
        <div><span>Speak to Tyler</span><a href="tel:+447484605599">07484 605 599</a></div>
      </div>
    </header>
    <main id="main-content">
      <section className="eicr-hero" aria-labelledby="eicr-heading">
        <div className="shell eicr-hero-grid">
          <div className="eicr-pitch">
            <p className="eyebrow"><span /> Local electrical inspection & testing</p>
            <h1 id="eicr-heading">EICR testing<br /><em>in Hitchin.</em></h1>
            <p className="eicr-lead">Rental property due an electrical check?</p>
            <p className="eicr-intro">We’ll inspect the electrics and give you a report you can understand. You’ll know the inspection cost before you book, with any repairs quoted separately.</p>
            <div className="eicr-hero-actions"><a className="button button-primary" href="#eicr-enquiry">Get my EICR quote <span aria-hidden="true">↗</span></a><a className="eicr-underlink" href="#eicr-included">What’s included? ↓</a></div>
            <p className="eicr-local">Hitchin · Baldock · Letchworth ·<br className="eicr-mobile-break" /> Stevenage · Langford · Biggleswade</p>
            <div className="eicr-inspector">
              <img src="/media/tyler-eicr-local-electrician.webp" alt="Tyler Baker of TB Electrical beside his van" width={360} height={270} decoding="async" />
              <div><strong>Tyler Baker</strong><span>Your local electrician</span><p>City & Guilds 2391-52 qualified in inspection and testing.</p></div>
            </div>
          </div>
          <div className="eicr-quote-panel" id="eicr-enquiry">
            <p className="eicr-panel-kicker">Free, no-obligation quote</p>
            <h2>Tell us about<br />your property.</h2>
            <p>We’ll confirm the price and discuss available dates.</p>
            <ContactForm source="eicr-landing-page" eicrFocused />
            <p className="eicr-form-alternative">Rather talk it through? <a href="tel:+447484605599">Call Tyler</a>.</p>
          </div>
        </div>
      </section>
      <section className="eicr-credentials" aria-label="Professional credentials">
        <div className="shell"><img src="/media/napit-red-tick.png" alt="NAPIT" width={600} height={600} /><span>NAPIT registered</span><span>Fully insured</span><span>Based in Hitchin</span><a href="https://www.trustmark.org.uk/firms/TB%20Electrical%20Herts%20Ltd-4136741-SG5%204SN?id=6a0f78e4-068a-4311-bbf1-663f7f6bd737" target="_blank" rel="noreferrer">View our TrustMark profile ↗</a></div>
      </section>
      <section className="shell eicr-section eicr-included" id="eicr-included">
        <div className="eicr-section-heading"><p className="eyebrow dark"><span /> A proper inspection</p><h2>More than<br /><em>a piece of paper.</em></h2><p>An Electrical Installation Condition Report records the condition of an existing installation. It isn’t a certificate for new work, and it isn’t a promise that every property will pass.</p></div>
        <div className="eicr-included-list">
          <article><span aria-hidden="true">01</span><div><h3>Inspection and testing</h3><p>We check the fixed wiring within an agreed scope, including the consumer unit and earthing. Accessible electrical points are inspected and circuits are tested, with any limitations recorded.</p></div></article>
          <article><span aria-hidden="true">02</span><div><h3>Your condition report</h3><p>You receive an EICR recording the findings and whether the installation is satisfactory for continued use. We explain the observations and the recommended next inspection date.</p></div></article>
          <article><span aria-hidden="true">03</span><div><h3>A clear next step</h3><p>If we find a problem, we explain what needs attention. Remedial work is not included in the inspection price. We agree any extra work with you first.</p></div></article>
        </div>
      </section>
      <section className="eicr-review" aria-labelledby="eicr-review-heading"><div className="shell eicr-review-inner"><div><p className="eyebrow"><span /> From a Google customer review</p><h2 id="eicr-review-heading">Care for<br /><em>your property.</em></h2></div><div><blockquote>“I’ve had Tyler out a couple of times now for sockets and a new garage consumer unit, and the work is always immaculate.”</blockquote><p>An extract from a customer’s review of installation work.</p><a href="https://www.google.com/maps/search/?api=1&query=TB+Electrical+Herts+Ltd+Hitchin" target="_blank" rel="noreferrer">Read our reviews on Google ↗</a></div></div></section>
      <section className="shell eicr-section eicr-booking" aria-labelledby="eicr-booking-heading">
        <div><p className="eyebrow dark"><span /> Before we visit</p><h2 id="eicr-booking-heading">Let’s make<br /><em>access simple.</em></h2><p>Let us know if the property is occupied and when the report is due. We’ll agree a date with you and explain what needs to be accessible.</p><a className="button button-dark" href="#eicr-enquiry">Ask about your property <span aria-hidden="true">↗</span></a></div>
        <aside className="eicr-access"><h3>Power will need to go off</h3><p>Testing means switching circuits off. We plan this with you, so you can let tenants know and make arrangements for any essential equipment.</p><hr /><h3>More than one rental?</h3><p>Send us the property locations and due dates. We can discuss inspections across your portfolio and quote for the work involved.</p></aside>
      </section>
      <section className="eicr-faq-band"><div className="shell eicr-section eicr-faq"><div><p className="eyebrow dark"><span /> Before you book</p><h2>Questions<br /><em>about EICRs.</em></h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary><span>{question}</span><i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}<p className="eicr-guidance">For rental requirements in England, see the <a href="https://www.gov.uk/government/publications/electrical-safety-standards-in-the-private-and-social-rented-sectors-guidance/electrical-safety-standards-in-the-private-and-social-rented-sectors-guidance" target="_blank" rel="noreferrer">government’s electrical safety guidance ↗</a>.</p></div></div></section>
      <section className="shell eicr-section eicr-final"><p className="eyebrow dark"><span /> Hitchin & surrounding towns</p><h2>EICR coming due?<br /><em>Let’s get it booked.</em></h2><p>Tell us about the property and any deadline. We’ll come back to you with the next step.</p><div className="eicr-final-actions"><a className="button button-dark" href="#eicr-enquiry">Get my EICR quote <span aria-hidden="true">↗</span></a><a href="tel:+447484605599">Call 07484 605 599</a></div></section>
    </main>
    <footer className="eicr-footer"><div className="shell"><div><a href="/" aria-label="TB Electrical home"><img src="/media/tb-logo-white.webp" alt="TB Electrical" width={164} height={72} loading="lazy" /></a><p>TB Electrical Herts Ltd · Company no. 16596265<br />Based in Hitchin, Hertfordshire</p></div><div><a href="mailto:tyler@tbelectrical.co.uk">tyler@tbelectrical.co.uk</a><a href="/privacy">Privacy notice</a><a href="/cookies">Cookie policy</a><CookieSettings /></div></div></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
  </div>;
}
