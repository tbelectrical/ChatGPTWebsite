import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "./components/ContactForm";
import { ExperimentGate } from "./components/ExperimentGate";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export const metadata: Metadata = {
  title: "Electricians in Hertfordshire",
  description:
    "Local, NAPIT registered electricians for homes, businesses and industrial sites across Hertfordshire, Bedfordshire and Buckinghamshire.",
};

const services = [
  ["01", "Rewires & alterations", "From one new circuit to a full rewire, we plan the work around your property.", "/services#domestic"],
  ["02", "Consumer units", "We replace and upgrade consumer units, add surge protection and put faults right.", "/services#domestic"],
  ["03", "Inspection & testing", "We carry out EICRs, find faults, issue certificates and handle regular checks.", "/services#domestic"],
  ["04", "Lighting & power", "Sockets, supplies and lighting for inside, outside, daily use or emergencies.", "/services#domestic"],
  ["05", "Commercial fit-outs", "We install practical systems that work for your team and keep the job on track.", "/services#commercial"],
  ["06", "Industrial electrical", "Three-phase power, distribution, maintenance and new site installations.", "/services#industrial"],
];

const projects = [
  { src: "/media/lighting_1318092111.webp", title: "Pool & landscape lighting", className: "project-wide" },
  { src: "/media/consumer-unit.webp", title: "Distribution upgrade", className: "project-tall" },
  { src: "/media/tbelec-16.webp", title: "Kitchen power installation", className: "" },
  { src: "/media/TBE-12.webp", title: "Bathroom lighting", className: "" },
];

const googleMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=TB+Electrical+Herts+Ltd+Hitchin";

export default function Home() {
  return (
    <>
      <ExperimentGate />
      <Header />
      <main className="home-main">
        <section className="hero" id="top">
          <div className="hero-grid shell">
            <div className="hero-copy reveal">
              <p className="eyebrow"><span /> NAPIT registered · TrustMark approved</p>
              <h1>Electrical work,<br /><em>done properly.</em></h1>
              <p className="hero-intro">
                We handle electrical work for homes, businesses and industrial sites
                across Hertfordshire and nearby counties. Big job or small, you get a clear answer.
              </p>
              <div className="button-row">
                <a className="button button-primary" href="#quote">Get a free quote <span>↗</span></a>
                <Link className="text-link" href="/projects">See our work <span>→</span></Link>
              </div>
            </div>
            <div className="hero-visual reveal reveal-delay">
              <div className="hero-image-frame">
                <img src="/media/TBE-56.webp" alt="Illuminated garden and swimming pool electrical project" />
              </div>
              <div className="hero-float hero-float-top">
                <span className="status-dot" />
                Taking bookings
              </div>
              <div className="hero-location">
                <span>Based in Hitchin</span>
                <b>Herts · Beds · Bucks</b>
              </div>
            </div>
            <div className="hero-proof" aria-label="Key business information">
              <div><strong>Fully</strong><span>insured electrical contractor</span></div>
              <div><strong>8+</strong><span>years’ experience</span></div>
              <div><strong>12</strong><span>month workmanship guarantee</span></div>
            </div>
          </div>
          <div className="hero-ticker" aria-hidden="true">
            <div className="ticker-track">
              {[0, 1].map((copy) => (
                <div className="ticker-group" key={copy}>
                  <span>Domestic</span>
                  <span>Commercial</span>
                  <span>Industrial</span>
                  <span>EV charging</span>
                  <span>Inspection &amp; testing</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sector-section section" id="sectors">
          <div className="sector-lines" aria-hidden="true">
            <span /><span /><span /><span /><span /><span /><span />
          </div>
          <div className="shell sector-intro">
            <p className="eyebrow dark"><span /> Homes, businesses and industrial sites</p>
            <h2>From the front room<br />to the <em>factory floor.</em></h2>
            <p>Whatever the size of the job, we work carefully, keep things tidy and tell you what is happening.</p>
          </div>
          <div className="shell sector-flow">
            <Link className="sector-story sector-domestic" href="/services#domestic" aria-label="View domestic electrical services">
              <span className="sector-photo"><img src="/media/TBE-33.webp" alt="Feature lighting installed in a domestic property" /></span>
              <span className="sector-copy"><i>01 / Homes</i><strong>Domestic</strong><small>Rewires, upgrades, lighting, extra power and fault finding.</small><b>View domestic services <span>→</span></b></span>
            </Link>
            <Link className="sector-story sector-commercial" href="/services#commercial" aria-label="View commercial electrical services">
              <span className="sector-photo"><img src="/media/hero-img.webp" alt="Commercial electrical installation by TB Electrical" /></span>
              <span className="sector-copy"><i>02 / Businesses</i><strong>Commercial</strong><small>Fit-outs, maintenance and testing that works around your business.</small><b>View commercial services <span>→</span></b></span>
            </Link>
            <Link className="sector-story sector-industrial" href="/services#industrial" aria-label="View industrial electrical services">
              <span className="sector-photo"><img src="/media/consumer-unit.webp" alt="Industrial distribution equipment installed by TB Electrical" /></span>
              <span className="sector-copy"><i>03 / Sites</i><strong>Industrial</strong><small>Reliable power, distribution and maintenance for busy sites.</small><b>View industrial services <span>→</span></b></span>
            </Link>
            <div className="sector-signoff" aria-hidden="true"><span>One team</span><b>Three sectors.</b></div>
          </div>
        </section>

        <section className="services-section section" id="services">
          <div className="shell">
            <div className="section-heading section-heading-light">
              <p className="eyebrow"><span /> What we do</p>
              <h2>Small jobs.<br /><em>Bigger projects.</em></h2>
              <p>Need a quick repair or a complete installation? We can help with both.</p>
            </div>
            <div className="service-list">
              {services.map(([number, title, body, href]) => (
                <Link className="service-row" href={href} key={title}>
                  <span>{number}</span><h3>{title}</h3><p>{body}</p><span className="service-arrow">→</span>
                </Link>
              ))}
            </div>
            <div className="scope-note">
              <span>We can help with</span>
              <p>Low-voltage work in homes, businesses and industrial sites.</p>
              <span>Not our area</span>
              <p>Solar PV, battery storage and high-voltage work.</p>
            </div>
            <div className="center-action"><Link className="button button-ghost" href="/services">See all services <span>→</span></Link></div>
          </div>
        </section>

        <section className="ev-spotlight section" id="ev-charging">
          <div className="ev-wire" aria-hidden="true"><span /></div>
          <div className="shell ev-grid">
            <div className="ev-image-wrap">
              <img src="/media/tbelec-2.webp" alt="TB Electrical installing a modern electric vehicle charge point" />
              <div className="ev-badge"><span>EV</span> charge point<br />installation</div>
            </div>
            <div className="ev-copy">
              <p className="eyebrow dark"><span /> EV charging spotlight</p>
              <h2>Park up.<br /><em>Plug in.</em><br />Wake up ready.</h2>
              <p>We check your supply, plan a neat cable route, fit the charger and test it. Then we show you how it all works. Simple, really.</p>
              <ul className="tick-list">
                <li>Home and workplace installations</li>
                <li>Supply and load assessment</li>
                <li>Testing, certification and handover</li>
              </ul>
              <Link className="button button-dark" href="/ev-chargers">Explore EV charging <span>↗</span></Link>
            </div>
          </div>
        </section>

        <section className="split-only section shell" aria-label="More about TB Electrical">
          <div className="split-links">
            <Link href="/projects"><span>Selected work</span><strong>See recent projects</strong><i>↗</i></Link>
            <Link href="/about"><span>Why TB Electrical</span><strong>Meet your contractor</strong><i>↗</i></Link>
            <a href={googleMapsUrl} target="_blank" rel="noreferrer"><span>Customer reviews</span><strong>Read Google reviews</strong><i>↗</i></a>
          </div>
        </section>

        <div className="long-only">
          <section className="projects-section section" id="projects">
            <div className="shell section-heading heading-row project-heading">
              <div><p className="eyebrow"><span /> Selected work</p><h2>Details matter.<br /><em>Here is the proof.</em></h2></div>
              <div className="project-heading-side"><span>04 recent projects</span><Link className="text-link" href="/projects">See the full portfolio <b>→</b></Link></div>
            </div>
            <div className="project-grid shell">
              {projects.map((project) => (
                <Link className={`project-card ${project.className}`} href="/projects" key={project.src} aria-label={`View project: ${project.title}`}>
                  <img src={project.src} alt={project.title} />
                  <span className="project-caption"><strong>{project.title}</strong><i>View project →</i></span>
                </Link>
              ))}
            </div>
            <div className="shell project-footnote"><span>Homes</span><i /> <span>Businesses</span><i /> <span>Industrial sites</span></div>
          </section>

          <section className="reviews-section section" id="reviews">
            <div className="shell reviews-grid">
              <div className="reviews-copy">
                <p className="eyebrow"><span /> Customer feedback</p>
                <h2>Good work matters.<br /><em>So does good service.</em></h2>
                <blockquote>“Friendly, reliable, and did a really great job. Turned up on time and explained everything clearly.”</blockquote>
                <div className="review-source"><span>★★★★★</span><p>Verified customer review<br /><b>MyBuilder · May 2026</b></p></div>
              </div>
              <div className="google-card">
                <div className="google-card-top"><span className="google-g">G</span><div><b>TB Electrical Herts Ltd</b><span>Live Google business profile</span></div></div>
                <iframe
                  title="TB Electrical Herts Ltd on Google Maps"
                  src="https://www.google.com/maps?q=TB%20Electrical%20Herts%20Ltd%2C%20Hitchin&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a href={googleMapsUrl} target="_blank" rel="noreferrer">See live reviews on Google <span>↗</span></a>
              </div>
            </div>
          </section>

          <section className="about-section section shell" id="about">
            <div className="about-visual">
              <div className="about-photo"><img src="/media/rewires1509-1.webp" alt="Electrical first-fix wiring during a property renovation" /></div>
              <div className="about-stamp"><strong>TB</strong><span>Owner-led<br />Hitchin based</span></div>
              <p>“You should know who is turning up and what the job involves.”</p>
            </div>
            <div className="about-copy">
              <p className="eyebrow dark"><span /> Who you are hiring</p>
              <h2>A proper local<br />electrical contractor.</h2>
              <p>We are a family-run electrical business based in Hitchin. We turn up when we say we will, explain the work and leave a clean finish. Honestly, that should be the standard.</p>
              <div className="about-values">
                <div><b>01</b><span>The work agreed before we start</span></div>
                <div><b>02</b><span>Safe, compliant workmanship</span></div>
                <div><b>03</b><span>Tidy work and honest advice</span></div>
              </div>
              <Link className="text-link dark-link" href="/about">More about TB Electrical <span>→</span></Link>
            </div>
          </section>
        </div>

        <section className="quote-section section" id="quote">
          <div className="shell quote-grid">
            <div className="quote-copy">
              <p className="eyebrow"><span /> Tell us what you need</p>
              <h2>What needs<br /><em>sorting?</em></h2>
              <p>Tell us a bit about the job and we will get back to you. Prefer a quick chat? Give us a call.</p>
              <a className="phone-link" href="tel:+447484605599"><span>Call</span> 07484 605 599</a>
              <div className="service-area"><span>Based in Hitchin</span><p>Hertfordshire · Bedfordshire · Buckinghamshire<br />Nationwide for selected commercial projects</p></div>
            </div>
            <ContactForm source="homepage" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
