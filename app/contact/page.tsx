import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: "Get an Electrical Quote in Hitchin",
  description: "Contact TB Electrical for electrical work in Hitchin, Stevenage, Letchworth, Bedford, Welwyn, Hatfield, Harpenden and surrounding areas.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact TB Electrical", description: "Tell our Hitchin-based electricians about your job and request a free quote.", url: "/contact" },
};

export default function ContactPage() {
  return <><Header /><main className="subpage contact-page">
    <section className="contact-hero"><div className="shell quote-grid"><div className="quote-copy"><p className="eyebrow"><span /> Contact TB Electrical</p><h1>Tell us what<br />needs <em>doing.</em></h1><p>Got a fault, a new project or a job you are not quite sure about? Send us the basics and we will take a look.</p><div className="contact-options"><a href="tel:+447484605599"><span>Call</span><b>07484 605 599</b></a><a href="mailto:tyler@tbelectrical.co.uk"><span>Email</span><b>tyler@tbelectrical.co.uk</b></a><a href="https://wa.me/447484605599" target="_blank" rel="noreferrer"><span>WhatsApp</span><b>Start a chat ↗</b></a></div><div className="service-area"><span>Based in Hitchin</span><p>Stevenage · Letchworth · Bedford · Welwyn · Hatfield · Harpenden<br />Wider areas for selected commercial projects</p></div></div><ContactForm source="contact-page" /></div></section>
  </main><Footer /></>;
}
