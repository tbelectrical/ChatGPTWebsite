import { SiteLink as Link } from "../components/SiteLink";
import { ContactForm } from "../components/ContactForm";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageBreadcrumb } from "../components/PageBreadcrumb";
import { locations } from "../lib/content";
import { pageMetadata, siteUrl } from "../lib/seo";

export const metadata = pageMetadata(
  "EV Charger Installation in Hitchin & Nearby Towns",
  "Get a quote for home or workplace EV charger installation in Hitchin, Baldock, Letchworth, Stevenage, Langford or Biggleswade. Call TB Electrical.",
  "/ev-chargers",
);

const faqs = [
  ["How much does an installation cost?", "The price depends on the charger and the work needed at your property. Send us a few details and we’ll put a quote together. If we need to visit first, we’ll let you know."],
  ["Can you help me choose a charger?", "Of course. Tell us which car you have and where you normally park. We’ll talk through the options with you, including anything you want from the charger’s app."],
  ["I already have a charger. Can you fit it?", "Usually, yes. Send us the make and model so we can check it’s suitable before quoting for the installation."],
  ["How long will it take?", "A straightforward home installation can often be finished in a day. If your job needs more work, we’ll explain that before you book."],
  ["Do you cover my area?", "We’re based in Hitchin and cover nearby Hertfordshire and Bedfordshire towns. The main areas are listed below. Send us your postcode if you’re unsure whether we can get to you."],
  ["Will I get a certificate?", "Yes. We test the work and provide the relevant electrical certificate. We’ll also show you how to use your charger before we leave."],
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/ev-chargers#service`,
  name: "EV charger installation",
  serviceType: "Home and workplace electric vehicle chargepoint installation",
  url: `${siteUrl}/ev-chargers`,
  provider: { "@id": `${siteUrl}/#business` },
  areaServed: locations.map(area => ({ "@type": "Place", name: area.name })),
};

export default function EVChargersPage() {
  return <div className="ev-sales">
    <Header />
    <main id="main-content">
      <section className="ev-sales-hero">
        <div className="shell ev-sales-grid">
          <div className="ev-sales-pitch">
            <PageBreadcrumb name="EV charger installation" path="/ev-chargers" />
            <p className="eyebrow"><span /> Your local EV charger installer</p>
            <h1>EV charger<br /><em>installation.</em></h1>
            <p className="ev-sales-intro">We fit home chargers across Hitchin and the surrounding area. If you’re not sure which one to buy, we’ll help you work out what suits your car.</p>
            <p className="ev-sales-area">Hitchin · Baldock · Letchworth · Stevenage · Langford · Biggleswade</p>
            <p className="ev-sales-reassurance">We’re NAPIT registered and fully insured. Our installation work comes with a 12-month workmanship guarantee.</p>
            <a className="button button-primary ev-sales-mobile-cta" href="#charger-quote">Get a free quote ↗</a>
            <div className="ev-sales-photo">
              <img src="/media/simpson-partners-ev-charger-installation.webp" alt="Simpson & Partners home EV charger installed by TB Electrical on timber cladding" width={1500} height={2000} fetchPriority="high" decoding="async" />
              <div><strong>Charge at home.</strong><span>We’ll take care of the installation.</span></div>
            </div>
          </div>
          <div id="charger-quote" className="ev-sales-form">
            <p className="eyebrow"><span /> Free, no-obligation quote</p>
            <h2>Tell us what<br /><em>you need.</em></h2>
            <p>Let us know which car you have and where you’d like the charger. We’ll be in touch to talk it through.</p>
            <ContactForm source="ev-chargers-page" evFocused />
            <p className="ev-sales-form-note">Prefer to call? <a href="tel:+447484605599">Speak to Tyler on 07484 605 599</a>.</p>
          </div>
        </div>
      </section>

      <section className="ev-sales-proof" aria-label="Our credentials">
        <ul className="shell"><li><span aria-hidden="true">✓</span>NAPIT registered</li><li><span aria-hidden="true">✓</span>OZEV approved EV charger installer</li><li><span aria-hidden="true">✓</span>Fully insured</li><li><span aria-hidden="true">✓</span>12-month workmanship guarantee</li></ul>
      </section>

      <section className="section shell ev-sales-section">
        <p className="eyebrow dark"><span /> What to expect</p>
        <h2>A charger that<br />works for <em>you.</em></h2>
        <div className="ev-sales-benefits">
          <article><h3>We check your setup first</h3><p>Before we start, we check whether your electrical supply can support the charger. We’ll explain if anything needs changing.</p></article>
          <article><h3>The cable route matters</h3><p>We agree where the charger will go and how the cable will get there. We take care over the finish, especially where it’s on show.</p></article>
          <article><h3>You’ll know how to use it</h3><p>Once the work is tested, we’ll show you how the charger works and help you get started with its settings.</p></article>
          <article><h3>You can call us afterwards</h3><p>If you have a question after the installation, you’ll have our number. We won’t leave you trying to work it out on your own.</p></article>
        </div>
      </section>

      <section className="ev-sales-review">
        <div className="shell"><p className="eyebrow"><span /> Customer review on Google</p><blockquote cite="https://www.google.com/maps/place/TB+Electrical/@51.8819953,-0.2751439,10z/data=!3m1!4b1!4m6!3m5!1s0x9937ba829112f47:0x6bed24b04c381747!8m2!3d51.8819953!4d-0.2751439!16s%2Fg%2F11xmzhp_y9?entry=ttu&g_ep=EgoyMDI2MTAxNC4wIKXMDSoASAFQAw%3D%3D">“I recently had Tyler carry out some electrical work at my home, and I couldn’t be happier with the service he provided.”</blockquote><p style={{ lineHeight: 1.8 }}><span aria-label="5 out of 5 stars" style={{ color: "var(--yellow)", letterSpacing: "3px" }}>★★★★★</span><br /><strong>Sudheer Sulaiman</strong> · Google review excerpt<br /><a href="https://www.google.com/maps/place/TB+Electrical/@51.8819953,-0.2751439,10z/data=!3m1!4b1!4m6!3m5!1s0x9937ba829112f47:0x6bed24b04c381747!8m2!3d51.8819953!4d-0.2751439!16s%2Fg%2F11xmzhp_y9?entry=ttu&g_ep=EgoyMDI2MTAxNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>Read reviews on Google ↗</a></p></div>
      </section>

      <section className="section shell ev-sales-section">
        <div className="ev-sales-two-col">
          <div>
            <p className="eyebrow dark"><span /> Your installation quote</p>
            <h2>Know the cost<br /><em>before we start.</em></h2>
            <p>Every property is different, so we quote for the work your installation needs. You’ll know what’s included before you agree to go ahead.</p>
            <p>If you’ve already bought a charger, send us the make and model. We can usually fit a suitable charger you’ve supplied.</p>
            <a className="button button-dark" href="#charger-quote">Ask for a quote ↗</a>
          </div>
          <div className="ev-sales-checklist">
            <h3>We’ll agree the details with you</h3>
            <ul><li>Which charger we’re fitting</li><li>Where you want it installed</li><li>The route for the cable</li><li>Any changes needed to your electrics</li><li>What the installation will cost</li></ul>
            <p>If groundwork or other additional work is needed, it will be set out in the quote.</p>
          </div>
        </div>
      </section>

      <section className="ev-sales-process">
        <div className="shell">
          <p className="eyebrow"><span /> Getting it fitted</p>
          <h2>What happens<br /><em>next?</em></h2>
          <ol>
            <li><strong>Before installation</strong><p>Send us your postcode and a bit about the job. We may ask for photos or arrange a visit before quoting. Once you’re happy with the quote, we’ll agree a date.</p></li>
            <li><strong>On the day</strong><p>We’ll fit the charger and test the work. Before we leave, we’ll show you how to use it and explain the certification.</p></li>
          </ol>
        </div>
      </section>

      <section className="section shell ev-sales-section ev-sales-faq" aria-labelledby="ev-faq-heading">
        <p className="eyebrow dark"><span /> Before you book</p>
        <h2 id="ev-faq-heading">Got a <em>question?</em></h2>
        <div className="faq-list">
          {faqs.map(([question, answer]) => <details key={question}>
            <summary><span className="ev-faq-question">{question}</span><i aria-hidden="true">+</i></summary>
            <p>{answer}</p>
          </details>)}
        </div>
      </section>

      <section className="section shell ev-sales-section ev-sales-coverage">
        <p className="eyebrow dark"><span /> Based in Hitchin</p>
        <h2>Do we cover<br /><em>your area?</em></h2>
        <p>We fit chargers in the towns below and nearby villages. We also install workplace chargers. Get in touch if you’d like us to look at a job further afield.</p>
        <div className="area-links">{locations.map(area => <Link key={area.slug} href={`/areas/${area.slug}`}>{area.name} →</Link>)}</div>
      </section>

      <section className="ev-sales-final">
        <div className="shell"><p className="eyebrow"><span /> EV charging at home or work</p><h2>Need a charger<br /><em>fitted?</em></h2><p>Send us a few details or give Tyler a call.</p><div className="button-row"><a className="button button-primary" href="#charger-quote">Get a free quote ↗</a><a className="text-link" href="tel:+447484605599">Call 07484 605 599 →</a></div></div>
      </section>
    </main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <Footer />
  </div>;
}
