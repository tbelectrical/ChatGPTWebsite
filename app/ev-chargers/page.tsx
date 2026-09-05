import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: "EV Charger Installation Hertfordshire",
  description: "Home and workplace EV charger installation across Hertfordshire, Bedfordshire and Buckinghamshire. We check, fit, test and explain your charger.",
};

const faqs = [
  ["Can you install a charger I have already bought?", "Usually, yes. We first check the charger, your electrical supply, the cable route and the maker’s instructions. If anything looks wrong, we will tell you before we start."],
  ["Will my electrical supply cope?", "We check that as part of the job. We look at your current setup and how much power you already use, then suggest a safe option that suits the property."],
  ["How long does an installation take?", "We can often finish a simple home installation in one day. A long cable route, groundwork or supply changes may take longer. We will explain that before the work starts."],
  ["Do you install workplace chargers?", "Yes. We fit charge points at homes, workplaces and other commercial properties. We plan the job around your parking spaces, daily use and current electrical setup."],
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
              <p>We fit neat, safe charge points at homes and workplaces across Hertfordshire, Bedfordshire and Buckinghamshire.</p>
              <div className="ev-hero-points"><span>Supply check</span><span>Full test</span><span>Clear handover</span></div>
              <a className="button button-primary" href="#ev-quote">Request an EV quote <span>↗</span></a>
            </div>
            <div className="ev-hero-image">
              <img src="/media/tbelec-2.webp" alt="Electrician installing an EV charge point at a residential property" />
              <div className="charge-line"><span /><i /></div>
            </div>
          </div>
        </section>

        <section className="ev-intro section shell">
          <div className="ev-intro-title"><p className="eyebrow dark"><span /> Ready when you are</p><h2>Charging that fits<br />your day.</h2></div>
          <div className="ev-intro-copy"><p>A good charger install starts before we run a cable. We check your current setup, ask how you use the car and find the cleanest route to the charging point.</p><p>Once the charger is in, we test everything and give you the right certificate. We will also show you how to use it, so you are not left guessing.</p></div>
        </section>

        <section className="ev-benefits section">
          <div className="shell">
            <div className="section-heading section-heading-light"><p className="eyebrow"><span /> What you can expect</p><h2>We handle<br /><em>the whole job.</em></h2></div>
            <div className="benefit-grid">
              <article><b>01</b><h3>A proper check</h3><p>We check your supply, consumer unit, earthing, power use and cable route before work starts.</p></article>
              <article><b>02</b><h3>A tidy fit</h3><p>We choose a careful route and keep the finish neat, both inside and outside your property.</p></article>
              <article><b>03</b><h3>A clear handover</h3><p>We test the charger, give you the certificate and talk you through how it works.</p></article>
              <article><b>04</b><h3>Help afterwards</h3><p>You get a 12-month workmanship guarantee and a local number to call if you need us.</p></article>
            </div>
          </div>
        </section>

        <section className="ev-process section shell">
          <div className="section-heading"><p className="eyebrow dark"><span /> How it works</p><h2>From first message<br />to first charge.</h2></div>
          <ol className="process-list">
            <li><span>01</span><div><h3>Tell us about your setup</h3><p>Send your postcode, car or charger details, parking setup and a few clear photos.</p></div></li>
            <li><span>02</span><div><h3>Agree the job</h3><p>We confirm the work and the price. If anything extra is needed, we tell you before we start.</p></div></li>
            <li><span>03</span><div><h3>We fit the charger</h3><p>We install and test it, show you how it works and leave the area clean.</p></div></li>
          </ol>
        </section>

        <section className="ev-work section">
          <div className="shell ev-work-grid">
            <div className="ev-work-image"><img src="/media/hero-img.webp" alt="Exterior lighting and electrical installation completed by TB Electrical" /></div>
            <div className="ev-work-copy"><span>Home · Workplace · Fleet</span><h2>Need more than<br />a charger?</h2><p>Perhaps you also need new lighting, a consumer unit upgrade or other electrical work. We can plan it all together and save you the hassle of booking two jobs.</p><Link className="text-link" href="/services">View all electrical services <span>→</span></Link></div>
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
            <div className="quote-copy"><p className="eyebrow"><span /> Get an EV charger quote</p><h2>Ready to plug<br /><em>in at home?</em></h2><p>Tell us what you drive, where you park and which charger you have in mind. Not sure which one to choose? That is fine too.</p><a className="phone-link" href="tel:+447484605599"><span>Call</span> 07484 605 599</a></div>
            <ContactForm source="ev-landing-page" evFocused />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
