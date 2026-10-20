import { PageBreadcrumb } from "../components/PageBreadcrumb";
import { pageMetadata } from "../lib/seo";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata = pageMetadata('Get an Electrical Quote in Hitchin', 'Contact TB Electrical for electrical work in Hitchin, Baldock, Letchworth, Stevenage, Langford, Biggleswade and surrounding areas.', '/contact');

export default function ContactPage() {
  return <><Header /><main id="main-content" className="subpage contact-page">
    <section className="contact-hero"><div className="shell quote-grid"><div className="quote-copy"><PageBreadcrumb name="Contact" path="/contact" /><p className="eyebrow"><span /> Contact TB Electrical</p><h1>Get in <em>touch.</em></h1><p>Request a quote. Tell us about your fault, upgrade or new project and we will take a look.</p><div className="contact-options"><a href="tel:+447484605599"><span>Call</span><b>07484 605 599</b></a><a href="mailto:tyler@tbelectrical.co.uk"><span>Email</span><b>tyler@tbelectrical.co.uk</b></a><a href="https://wa.me/447484605599" target="_blank" rel="noreferrer"><span>WhatsApp</span><b>Start a chat ↗</b></a></div><div className="service-area"><span>Based in Hitchin</span><p>Baldock · Letchworth · Stevenage · Langford · Biggleswade<br />Wider areas for selected commercial projects</p></div></div><ContactForm source="contact-page" /></div></section>
  </main><Footer /></>;
}
