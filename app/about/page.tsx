import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = { title: "About TB Electrical", description: "Meet TB Electrical, a family-run NAPIT registered and TrustMark approved electrical contractor based in Hitchin." };

export default function AboutPage() {
  return <><Header /><main className="subpage about-page">
    <section className="page-hero shell"><p className="eyebrow dark"><span /> About TB Electrical</p><h1>Built on standards.<br /><em>Known for service.</em></h1><p>A family-run electrical contractor based in Hitchin, serving homes, businesses and industrial clients across the region.</p></section>
    <section className="about-story section shell"><div className="about-story-images"><img src="/media/TBE-84.webp" alt="Neatly installed electrical controls" /><img src="/media/TBE-56.webp" alt="Completed exterior lighting project" /></div><div className="about-story-copy"><p className="eyebrow dark"><span /> The way we work</p><h2>Skilled hands.<br />Straight answers.</h2><p>With more than eight years of industry experience, TB Electrical was built around a simple idea: customers should not have to choose between excellent electrical work and excellent service.</p><p>That means clear quotes, sensible advice, dependable timings and the same attention to detail on every job. We carry out low-voltage domestic, commercial and industrial work, backed by a 12-month workmanship guarantee.</p><div className="credential-grid"><a href="https://www.napit.org.uk/" target="_blank" rel="noreferrer"><b>NAPIT</b><span>Registered electrician</span></a><a href="https://www.trustmark.org.uk/firms/TB%20Electrical%20Herts%20Ltd-4136741-SG5%204SN?id=6a0f78e4-068a-4311-bbf1-663f7f6bd737" target="_blank" rel="noreferrer"><b>TrustMark</b><span>Government endorsed quality</span></a></div></div></section>
    <section className="principles-section section"><div className="shell"><div className="section-heading section-heading-light"><p className="eyebrow"><span /> What matters to us</p><h2>Professional is<br /><em>a way of working.</em></h2></div><div className="principle-grid"><article><span>01</span><h3>Communicate</h3><p>We keep the scope, timing and cost clear from first message to final test.</p></article><article><span>02</span><h3>Respect</h3><p>We work carefully around your property, team and day-to-day routine.</p></article><article><span>03</span><h3>Finish well</h3><p>Safe installations, neat details, full testing and a clean handover.</p></article></div></div></section>
    <section className="cta-ribbon"><div className="shell"><div><p>Need an electrician you can rely on?</p><h2>Tell us what<br />you’re planning.</h2></div><Link className="button button-primary" href="/contact">Start a conversation <span>↗</span></Link></div></section>
  </main><Footer /></>;
}
