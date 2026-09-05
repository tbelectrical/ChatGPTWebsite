import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: "EV Charger Installation Hertfordshire",
  description: "Professional home and workplace EV charger installation across Hertfordshire, Bedfordshire and Buckinghamshire. Survey, installation, testing and handover.",
};

const faqs = [
  ["Can you install a charger I have already bought?", "In many cases, yes. We will first check the unit, your supply, the proposed cable route and the manufacturer’s requirements before confirming the installation."],
  ["Will my electrical supply cope?", "That is part of the assessment. We check your existing installation and anticipated demand, then advise on the safest practical setup for your property."],
  ["How long does an installation take?", "A straightforward home installation can often be completed within a day. Longer cable routes, groundwork or supply alterations may take more time; your quote will make that clear."],
  ["Do you install workplace chargers?", "Yes. We install EV charge points for homes, workplaces and commercial properties, with the scope planned around parking, usage and the existing electrical installation."],
];

export default function EvChargersPage() {
  return (
    <>
      <Header />
      <main className="subpage ev-page">
        <section className="ev-hero">
          <div className="shell ev-hero-grid">
            <div className="ev-hero-copy">
              <p className="eyebrow"><span /> EV charger installation</p>
              <h1>Your car charges.<br /><em>Life carries on.</em></h1>
              <p>Smart, tidy charge point installations for homes and workplaces across Hertfordshire, Bedfordshire and Buckinghamshire.</p>
              <div className="ev-hero-points"><span>Supply assessed</span><span>Fully tested</span><span>Handover included</span></div>
              <a className="button button-primary" href="#ev-quote">Request an EV quote <span>↗</span></a>
            </div>
            <div className="ev-hero-image">
              <img src="/media/tbelec-2.webp" alt="Electrician installing an EV charge point at a residential property" />
              <div className="charge-line"><span /><i /></div>
            </div>
          </div>
        </section>

        <section className="ev-intro section shell">
          <div className="ev-intro-title"><p className="eyebrow dark"><span /> Ready when you are</p><h2>Charging that fits<br />around your routine.</h2></div>
          <div className="ev-intro-copy"><p>Good EV charging starts before a cable is run. We assess your existing installation, listen to how you use the vehicle and plan a route that looks considered—not added as an afterthought.</p><p>Once fitted, we test the installation, provide the relevant certification and show you how to use your new charger confidently.</p></div>
        </section>

        <section className="ev-benefits section">
          <div className="shell">
            <div className="section-heading section-heading-light"><p className="eyebrow"><span /> What you can expect</p><h2>One installer.<br /><em>The complete job.</em></h2></div>
            <div className="benefit-grid">
              <article><b>01</b><h3>Proper assessment</h3><p>Your supply, consumer unit, earthing, demand and proposed cable route are checked before work begins.</p></article>
              <article><b>02</b><h3>Clean installation</h3><p>Careful routing and a neat finish inside and out, with disruption kept to a minimum.</p></article>
              <article><b>03</b><h3>Safe handover</h3><p>Testing, certification and a clear walkthrough so you know exactly how everything works.</p></article>
              <article><b>04</b><h3>Ongoing support</h3><p>A 12-month workmanship guarantee and a local team you can contact if you need help.</p></article>
            </div>
          </div>
        </section>

        <section className="ev-process section shell">
          <div className="section-heading"><p className="eyebrow dark"><span /> A simple route to charging</p><h2>From first message<br />to first charge.</h2></div>
          <ol className="process-list">
            <li><span>01</span><div><h3>Tell us about the property</h3><p>Share your postcode, vehicle or charger, parking setup and a few clear photos.</p></div></li>
            <li><span>02</span><div><h3>Receive a clear quote</h3><p>We confirm the scope and price, including any additional work identified during the assessment.</p></div></li>
            <li><span>03</span><div><h3>Installation day</h3><p>We fit, test and commission the charger, then leave the area clean and ready to use.</p></div></li>
          </ol>
        </section>

        <section className="ev-work section">
          <div className="shell ev-work-grid">
            <div className="ev-work-image"><img src="/media/hero-img.webp" alt="Exterior lighting and electrical installation completed by TB Electrical" /></div>
            <div className="ev-work-copy"><span>Home · Workplace · Fleet</span><h2>Thinking beyond<br />a single socket.</h2><p>If your project includes lighting, distribution upgrades or wider electrical works, we can plan them together for a cleaner, more efficient installation.</p><Link className="text-link" href="/services">View all electrical services <span>→</span></Link></div>
          </div>
        </section>

        <section className="faq-section section shell">
          <div className="section-heading"><p className="eyebrow dark"><span /> Common questions</p><h2>EV charging,<br />made clear.</h2></div>
          <div className="faq-list">
            {faqs.map(([q, a], index) => <details key={q} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{q}<i>+</i></summary><p>{a}</p></details>)}
          </div>
        </section>

        <section className="quote-section section" id="ev-quote">
          <div className="shell quote-grid">
            <div className="quote-copy"><p className="eyebrow"><span /> Get an EV charger quote</p><h2>Ready to plug<br /><em>in at home?</em></h2><p>Tell us what you drive, where you park and which charger you have in mind. We’ll take it from there.</p><a className="phone-link" href="tel:+447484605599"><span>Call</span> 07484 605 599</a></div>
            <ContactForm source="ev-landing-page" evFocused />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
