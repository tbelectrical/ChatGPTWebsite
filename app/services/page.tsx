import { PageBreadcrumb } from "../components/PageBreadcrumb";
import { pageMetadata } from "../lib/seo";
import { SiteLink as Link } from "../components/SiteLink";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata = pageMetadata('Domestic, Commercial & Industrial Electrician', 'Rewires, EICRs, consumer units, commercial electrical work and repairs in Hitchin, Baldock, Letchworth, Stevenage, Langford and Biggleswade.', '/services');

const sectors = [
  { id: "domestic", number: "01", label: "Domestic", title: "Good electrical work should fit your home.", image: "/media/domestic-uk-house.webp", imageAlt: "British brick house with warm exterior lighting", body: "Need one small repair or a full renovation? We look after your home, keep you in the loop and leave the work area tidy.", items: ["Full and partial rewires", "Consumer unit replacements", "Additional sockets and circuits", "Interior and garden lighting", "Fault finding and repairs", "EICRs and landlord testing", "Smoke and heat alarms", "Heating and control wiring"] },
  { id: "commercial", number: "02", label: "Commercial", title: "Electrical systems that work as hard as you do.", image: "/media/commercial-shop-lighting.webp", imageAlt: "Modern shop interior with ceiling track lighting", body: "We install and maintain electrics for offices, shops, hospitality venues, managed buildings and larger commercial projects.", items: ["Fit-outs and refurbishments", "Lighting and emergency lighting", "Distribution and power", "Inspection and testing", "Planned maintenance", "Fault finding", "Data and containment", "Workplace EV charging"] },
  { id: "industrial", number: "03", label: "Industrial", title: "Reliable power for demanding sites.", image: "/media/industrial-factory-lighting.webp", imageAlt: "Factory workshop with machinery, electrical distribution and high-bay lighting", body: "We plan industrial work around your site, your safety rules and the need to keep things running.", items: ["Three-phase installations", "Distribution and containment", "Machinery supplies", "Lighting upgrades", "Inspection and remedials", "Planned maintenance", "Fault diagnosis", "Project installations"] },
];

export default function ServicesPage() {
  return <><Header /><main id="main-content" className="subpage">
    <section className="page-hero shell"><PageBreadcrumb name="Electrical services" path="/services" /><p className="eyebrow dark"><span /> Electrical services</p><h1>Electrical services.<br /><em>Small job or big project.</em></h1><p>Domestic, commercial and industrial electrical services across Hitchin, Baldock, Letchworth, Stevenage, Langford and Biggleswade. We plan the work, do it safely and keep you updated.</p></section>
    <section className="scope-banner"><div className="shell"><p><b>What we do</b> Low-voltage work across homes, businesses and industrial sites.</p><p><b>What we don’t do</b> Solar PV, battery storage or high-voltage work.</p></div></section>
    {sectors.map((sector) => <section className="sector-detail section shell" id={sector.id} key={sector.id}>
      <div className="sector-detail-image"><img src={sector.image} alt={sector.imageAlt} width={1122} height={1402} loading="lazy" decoding="async" /></div>
      <div className="sector-detail-copy"><p className="eyebrow dark"><span /> {sector.number} · {sector.label}</p><h2>{sector.title}</h2><p>{sector.body}</p><ul>{sector.items.map(item => <li key={item}>{item}<span>↗</span></li>)}</ul><Link className="button button-dark" href="/contact">Tell us about the job <span>↗</span></Link></div>
    </section>)}
    <section className="cta-ribbon"><div className="shell"><div><p>Not sure what the job involves?</p><h2>Show us the problem.<br />We’ll work it out.</h2></div><Link className="button button-primary" href="/contact">Ask an electrician <span>↗</span></Link></div></section>
  </main><Footer /></>;
}
