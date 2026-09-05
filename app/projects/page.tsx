import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = { title: "Electrical Projects", description: "See how TB Electrical has helped homes, businesses and other working sites." };

const gallery = [
  ["/media/lighting_1318092111.webp", "Exterior", "Pool and landscape lighting"], ["/media/TBE-12.webp", "Domestic", "Illuminated bathroom mirror and lighting"], ["/media/tbelec-16.webp", "Domestic", "Kitchen power installation"], ["/media/consumer-unit.webp", "Distribution", "Consumer unit installation"], ["/media/TBE-33.webp", "Lighting", "Feature chandelier installation"], ["/media/TBE-56.webp", "Exterior", "Garden and pool lighting"], ["/media/rewires1509-1.webp", "Renovation", "Full property first fix"], ["/media/TBE-81.webp", "Controls", "Heating control installation"], ["/media/TBE-20.webp", "Distribution", "Consumer unit upgrade"], ["/media/tbelec-2.webp", "EV charging", "Residential EV charge point"], ["/media/TBE-44.webp", "Lighting", "Decorative lighting installation"], ["/media/TBE-62.webp", "Power", "Socket and circuit alteration"],
];

export default function ProjectsPage() {
  return <><Header /><main className="subpage projects-page">
    <section className="page-hero shell"><p className="eyebrow dark"><span /> Recent work</p><h1>Good work stands up<br /><em>to a closer look.</em></h1><p>Here are a few installations, upgrades and smaller details from our recent jobs.</p></section>
    <section className="gallery-section shell section"><div className="masonry-gallery">{gallery.map(([src, type, title], i) => <figure className={i % 5 === 0 ? "gallery-feature" : ""} key={src}><img src={src} alt={title} /><figcaption><span>{type}</span><b>{title}</b></figcaption></figure>)}</div></section>
    <section className="cta-ribbon"><div className="shell"><div><p>Got a project in mind?</p><h2>Tell us what<br />you’re planning.</h2></div><Link className="button button-primary" href="/contact">Get a free quote <span>↗</span></Link></div></section>
  </main><Footer /></>;
}
