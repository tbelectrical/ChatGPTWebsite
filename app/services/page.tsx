import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = { title: "Electrical Services", description: "Electrical work for homes, businesses and industrial sites across Hertfordshire, Bedfordshire and Buckinghamshire." };

const sectors = [
  { id: "domestic", number: "01", label: "Domestic", title: "Good electrical work should fit your home.", image: "/media/TBE-33.webp", body: "Need one small repair or a full renovation? We look after your home, keep you in the loop and leave the work area tidy.", items: ["Full and partial rewires", "Consumer unit replacements", "Additional sockets and circuits", "Interior and garden lighting", "Fault finding and repairs", "EICRs and landlord testing", "Smoke and heat alarms", "Heating and control wiring"] },
  { id: "commercial", number: "02", label: "Commercial", title: "Electrical systems that work as hard as you do.", image: "/media/hero-img.webp", body: "We install and maintain electrics for offices, shops, hospitality venues, managed buildings and larger commercial projects.", items: ["Fit-outs and refurbishments", "Lighting and emergency lighting", "Distribution and power", "Inspection and testing", "Planned maintenance", "Fault finding", "Data and containment", "Workplace EV charging"] },
  { id: "industrial", number: "03", label: "Industrial", title: "Reliable power for demanding sites.", image: "/media/consumer-unit.webp", body: "We plan industrial work around your site, your safety rules and the need to keep things running.", items: ["Three-phase installations", "Distribution and containment", "Machinery supplies", "Lighting upgrades", "Inspection and remedials", "Planned maintenance", "Fault diagnosis", "Project installations"] },
];

export default function ServicesPage() {
  return <><Header /><main className="subpage">
    <section className="page-hero shell"><p className="eyebrow dark"><span /> Electrical services</p><h1>One reliable team.<br /><em>Small job or big project.</em></h1><p>We plan the work, do it safely and keep you updated. You should never have to chase your electrician for an answer.</p></section>
    <section className="scope-banner"><div className="shell"><p><b>What we do</b> Low-voltage work across homes, businesses and industrial sites.</p><p><b>What we don’t do</b> Solar PV, battery storage or high-voltage work.</p></div></section>
    {sectors.map((sector) => <section className="sector-detail section shell" id={sector.id} key={sector.id}>
      <div className="sector-detail-image"><img src={sector.image} alt={`${sector.label} electrical installation by TB Electrical`} /></div>
      <div className="sector-detail-copy"><p className="eyebrow dark"><span /> {sector.number} · {sector.label}</p><h2>{sector.title}</h2><p>{sector.body}</p><ul>{sector.items.map(item => <li key={item}>{item}<span>↗</span></li>)}</ul><Link className="button button-dark" href="/contact">Tell us about the job <span>↗</span></Link></div>
    </section>)}
    <section className="cta-ribbon"><div className="shell"><div><p>Not sure what the job involves?</p><h2>Show us the problem.<br />We’ll work it out.</h2></div><Link className="button button-primary" href="/contact">Ask an electrician <span>↗</span></Link></div></section>
  </main><Footer /></>;
}
