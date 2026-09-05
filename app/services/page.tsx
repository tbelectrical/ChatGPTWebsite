import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = { title: "Electrical Services", description: "Domestic, commercial and industrial electrical services across Hertfordshire, Bedfordshire and Buckinghamshire." };

const sectors = [
  { id: "domestic", number: "01", label: "Domestic", title: "Electrical work that feels considered.", image: "/media/TBE-33.webp", body: "Whether it is a single repair or a full renovation, we protect your home, communicate clearly and leave the finish as clean as the installation.", items: ["Full and partial rewires", "Consumer unit replacements", "Additional sockets and circuits", "Interior and garden lighting", "Fault finding and repairs", "EICRs and landlord testing", "Smoke and heat alarms", "Heating and control wiring"] },
  { id: "commercial", number: "02", label: "Commercial", title: "Practical systems for busy businesses.", image: "/media/hero-img.webp", body: "Reliable installations and responsive maintenance for offices, retail, hospitality, managed property and commercial projects.", items: ["Fit-outs and refurbishments", "Lighting and emergency lighting", "Distribution and power", "Inspection and testing", "Planned maintenance", "Fault finding", "Data and containment", "Workplace EV charging"] },
  { id: "industrial", number: "03", label: "Industrial", title: "Robust work for demanding sites.", image: "/media/consumer-unit.webp", body: "Industrial electrical work planned around safety, uptime and the operational needs of your site.", items: ["Three-phase installations", "Distribution and containment", "Machinery supplies", "Lighting upgrades", "Inspection and remedials", "Planned maintenance", "Fault diagnosis", "Project installations"] },
];

export default function ServicesPage() {
  return <><Header /><main className="subpage">
    <section className="page-hero shell"><p className="eyebrow dark"><span /> Electrical services</p><h1>One reliable team.<br /><em>Everyday to complex.</em></h1><p>Domestic, commercial and industrial electrical work—planned carefully, completed safely and communicated clearly.</p></section>
    <section className="scope-banner"><div className="shell"><p><b>We cover</b> low-voltage electrical work across all three sectors.</p><p><b>We don’t cover</b> solar PV, battery storage or high-voltage work.</p></div></section>
    {sectors.map((sector) => <section className="sector-detail section shell" id={sector.id} key={sector.id}>
      <div className="sector-detail-image"><img src={sector.image} alt={`${sector.label} electrical installation by TB Electrical`} /></div>
      <div className="sector-detail-copy"><p className="eyebrow dark"><span /> {sector.number} · {sector.label}</p><h2>{sector.title}</h2><p>{sector.body}</p><ul>{sector.items.map(item => <li key={item}>{item}<span>↗</span></li>)}</ul><Link className="button button-dark" href="/contact">Discuss your project <span>↗</span></Link></div>
    </section>)}
    <section className="cta-ribbon"><div className="shell"><div><p>Not sure what you need?</p><h2>Show us the problem.<br />We’ll find the route forward.</h2></div><Link className="button button-primary" href="/contact">Ask an electrician <span>↗</span></Link></div></section>
  </main><Footer /></>;
}
