import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "./components/ContactForm";
import { ExperimentGate } from "./components/ExperimentGate";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export const metadata: Metadata = {
  title: "Electricians in Hertfordshire",
  description:
    "NAPIT registered electrical contractors for domestic, commercial and industrial work across Hertfordshire, Bedfordshire and Buckinghamshire.",
};

const services = [
  ["01", "Rewires & alterations", "Full and partial rewires, extensions, renovations and additional circuits."],
  ["02", "Consumer units", "Modern replacements, upgrades, surge protection and remedial works."],
  ["03", "Inspection & testing", "EICRs, fault finding, certification and planned maintenance."],
  ["04", "Lighting & power", "Interior, exterior, emergency and feature lighting, sockets and supplies."],
  ["05", "Commercial fit-outs", "Practical, compliant installations that keep projects moving."],
  ["06", "Industrial electrical", "Installations, distribution, maintenance and three-phase work."],
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
      <main>
        <section className="hero" id="top">
          <div className="hero-grid shell">
            <div className="hero-copy reveal">
              <p className="eyebrow"><span /> NAPIT registered · TrustMark approved</p>
              <h1>Electrical work,<br /><em>done properly.</em></h1>
              <p className="hero-intro">
                Straight-talking electrical contractors for homes, businesses and
                industrial sites across Hertfordshire and beyond.
              </p>
              <div className="button-row">
                <a className="button button-primary" href="#quote">Get a free quote <span>↗</span></a>
                <Link className="text-link" href="/projects">See our work <span>→</span></Link>
              </div>
              <div className="hero-proof" aria-label="Key business information">
                <div><strong>8+</strong><span>years’ experience</span></div>
                <div><strong>12</strong><span>month workmanship guarantee</span></div>
                <div><strong>3</strong><span>sectors covered</span></div>
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
              <div className="hero-float hero-float-bottom">
                <b>Based in Hitchin</b>
                <span>Covering Herts, Beds & Bucks</span>
              </div>
            </div>
          </div>
          <div className="hero-ticker" aria-hidden="true">
            <div>DOMESTIC <i>✦</i> COMMERCIAL <i>✦</i> INDUSTRIAL <i>✦</i> EV CHARGING <i>✦</i> INSPECTION & TESTING <i>✦</i></div>
          </div>
        </section>

        <section className="sector-section shell section" id="sectors">
          <div className="section-heading">
            <p className="eyebrow dark"><span /> One contractor. Every environment.</p>
            <h2>From the front room<br />to the factory floor.</h2>
            <p>Considered work, clean finishes and clear communication—whatever the scale.</p>
          </div>
          <div className="sector-grid">
            <article className="sector-card sector-domestic">
              <span className="sector-number">01</span>
              <div><p>Homes</p><h3>Domestic</h3><span>Rewires, upgrades, lighting, power and fault finding.</span></div>
              <Link href="/services#domestic" aria-label="View domestic electrical services">↗</Link>
            </article>
            <article className="sector-card sector-commercial">
              <span className="sector-number">02</span>
              <div><p>Businesses</p><h3>Commercial</h3><span>Fit-outs, maintenance, testing and compliant installations.</span></div>
              <Link href="/services#commercial" aria-label="View commercial electrical services">↗</Link>
            </article>
            <article className="sector-card sector-industrial">
              <span className="sector-number">03</span>
              <div><p>Sites</p><h3>Industrial</h3><span>Robust electrical systems, distribution and maintenance.</span></div>
              <Link href="/services#industrial" aria-label="View industrial electrical services">↗</Link>
            </article>
          </div>
        </section>

        <section className="services-section section" id="services">
          <div className="shell">
            <div className="section-heading section-heading-light">
              <p className="eyebrow"><span /> What we do</p>
              <h2>Small fixes.<br /><em>Serious projects.</em></h2>
              <p>All types of low-voltage electrical work, delivered safely and tidily.</p>
            </div>
            <div className="service-list">
              {services.map(([number, title, body]) => (
                <article className="service-row" key={title}>
                  <span>{number}</span><h3>{title}</h3><p>{body}</p><span className="service-arrow">↗</span>
                </article>
              ))}
            </div>
            <div className="scope-note">
              <span>Within scope</span>
              <p>Domestic, commercial and industrial low-voltage work.</p>
              <span>Outside scope</span>
              <p>Solar PV, battery storage and high-voltage work.</p>
            </div>
            <div className="center-action"><Link className="button button-ghost" href="/services">Explore all services <span>→</span></Link></div>
          </div>
        </section>

        <section className="ev-spotlight section" id="ev-charging">
          <div className="shell ev-grid">
            <div className="ev-image-wrap">
              <img src="/media/tbelec-2.webp" alt="TB Electrical installing a modern electric vehicle charge point" />
              <div className="ev-badge"><span>EV</span> charge point<br />installation</div>
            </div>
            <div className="ev-copy">
              <p className="eyebrow dark"><span /> EV charging spotlight</p>
              <h2>Park up.<br /><em>Plug in.</em><br />Wake up ready.</h2>
              <p>Neat, compliant home and workplace charger installations—surveyed, fitted, tested and explained by one reliable team.</p>
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
            <a href={googleMapsUrl} target="_blank" rel="noreferrer"><span>Independent feedback</span><strong>Read Google reviews</strong><i>↗</i></a>
          </div>
        </section>

        <div className="long-only">
          <section className="projects-section section shell" id="projects">
            <div className="section-heading heading-row">
              <div><p className="eyebrow dark"><span /> Selected work</p><h2>Details make<br />the difference.</h2></div>
              <Link className="text-link dark-link" href="/projects">View the portfolio <span>→</span></Link>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <figure className={`project-card ${project.className}`} key={project.src}>
                  <img src={project.src} alt={project.title} />
                  <figcaption><span>{project.title}</span><i>TB / WORKS</i></figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="reviews-section section" id="reviews">
            <div className="shell reviews-grid">
              <div className="reviews-copy">
                <p className="eyebrow"><span /> Customer feedback</p>
                <h2>Known for the work.<br /><em>Remembered for the service.</em></h2>
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
            <div className="about-photo"><img src="/media/rewires1509-1.webp" alt="Electrical first-fix wiring during a property renovation" /></div>
            <div className="about-copy">
              <p className="eyebrow dark"><span /> Built on doing things right</p>
              <h2>Friendly people.<br />Professional standards.</h2>
              <p>TB Electrical is a family-run, Hitchin-based electrical contractor. We bring the same care to a small repair as we do to a complete installation—turning up when agreed, keeping you informed and leaving a clean finish.</p>
              <div className="about-values">
                <div><b>01</b><span>Clear, transparent quotes</span></div>
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
              <h2>Let’s get your<br />project <em>moving.</em></h2>
              <p>Share a few details and we’ll prepare your enquiry. Prefer to talk? Call us directly.</p>
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
