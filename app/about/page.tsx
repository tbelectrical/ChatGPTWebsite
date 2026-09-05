import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = { title: "About TB Electrical", description: "Meet TB Electrical, a family-run, NAPIT registered and TrustMark approved electrical business based in Hitchin." };

export default function AboutPage() {
  return <><Header /><main className="subpage about-page">
    <section className="page-hero shell"><p className="eyebrow dark"><span /> About TB Electrical</p><h1>High standards.<br /><em>No fuss.</em></h1><p>We are a family-run electrical business based in Hitchin. We work in homes, businesses and industrial sites across the area.</p></section>
    <section className="about-story section shell"><div className="about-story-images"><img src="/media/TBE-84.webp" alt="Neatly installed electrical controls" /><img src="/media/TBE-56.webp" alt="Completed exterior lighting project" /></div><div className="about-story-copy"><p className="eyebrow dark"><span /> The way we work</p><h2>Skilled work.<br />Straight answers.</h2><p>We have spent more than eight years working in the electrical trade. Along the way, we noticed something. Good work is not enough if the customer never knows what is going on.</p><p>So we keep it simple. We agree the work and price before we start, offer honest advice and turn up when agreed. We give every job the same care, whether we are changing one socket or wiring a full site. Our work comes with a 12-month workmanship guarantee.</p></div></section>
    <section className="principles-section section"><div className="shell"><div className="section-heading section-heading-light"><p className="eyebrow"><span /> What matters to us</p><h2>How we treat<br /><em>every job.</em></h2></div><div className="principle-grid"><article><span>01</span><h3>Keep it clear</h3><p>We explain the work, the timing and the cost from the start.</p></article><article><span>02</span><h3>Show respect</h3><p>We work carefully around your home, your team and your normal day.</p></article><article><span>03</span><h3>Finish properly</h3><p>We test the work, check the small details and clean up before we leave.</p></article></div></div></section>
    <section className="cta-ribbon"><div className="shell"><div><p>Need an electrician you can rely on?</p><h2>Tell us what<br />you’re planning.</h2></div><Link className="button button-primary" href="/contact">Tell us about the job <span>↗</span></Link></div></section>
  </main><Footer /></>;
}
