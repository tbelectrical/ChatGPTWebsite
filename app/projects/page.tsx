import { PageBreadcrumb } from "../components/PageBreadcrumb";
import { pageMetadata } from "../lib/seo";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata = pageMetadata('Electrical Work in Hertfordshire | Projects', 'See domestic, commercial, industrial and EV charger projects completed by TB Electrical across Hertfordshire and nearby areas.', '/projects');

const gallery = [
  ["/media/simpson-partners-ev-charger-installation.webp", "EV charging", "Simpson & Partners charger installation"],
  ["/media/simpson-partners-ev-charger-detail.webp", "EV charging", "Simpson & Partners charger close-up"],
  ["/media/garage-consumer-unit-completed.webp", "Garage electrics", "Garage consumer unit and socket installation"],
  ["/media/garage-consumer-unit-wiring-detail.webp", "Electrical installation", "Garage consumer unit wiring detail"],
  ["/media/TBE-12.webp", "Domestic", "Illuminated bathroom mirror and lighting"], ["/media/tbelec-16.webp", "Domestic", "Kitchen power installation"], ["/media/consumer-unit.webp", "Distribution", "Consumer unit installation"], ["/media/TBE-33.webp", "Lighting", "Feature chandelier installation"], ["/media/TBE-56.webp", "Exterior", "Garden and pool lighting"], ["/media/rewires1509-1.webp", "Renovation", "Full property first fix"], ["/media/TBE-81.webp", "Controls", "Heating control installation"], ["/media/TBE-20.webp", "Distribution", "Consumer unit upgrade"], ["/media/tbelec-2.webp", "EV charging", "Residential EV charge point"], ["/media/TBE-44.webp", "Lighting", "Decorative lighting installation"], ["/media/TBE-62.webp", "Power", "Socket and circuit alteration"],
];

export default function ProjectsPage() {
  return <><Header /><main id="main-content" className="subpage projects-page">
    <section className="page-hero shell"><PageBreadcrumb name="Electrical projects" path="/projects" /><p className="eyebrow dark"><span /> Recent work</p><h1>Electrical work.<br /><em>Worth a closer look.</em></h1><p>Explore our domestic, commercial and industrial electrical work, from lighting and consumer units to rewires and EV charging. Based in Hitchin, serving Hertfordshire and nearby Bedfordshire.</p></section>
    <section className="gallery-section shell section"><div className="masonry-gallery">{gallery.map(([src, type, title], i) => <figure className={i % 5 === 0 ? "gallery-feature" : ""} key={src}><img src={src} alt={title} loading="lazy" decoding="async" /><figcaption><span>{type}</span><b>{title}</b></figcaption></figure>)}</div></section>
    <section className="cta-ribbon"><div className="shell"><div><p>Got a project in mind?</p><h2>Tell us what<br />you’re planning.</h2></div><Link className="button button-primary" href="/contact">Get a free quote <span>↗</span></Link></div></section>
  </main><Footer /></>;
}
