import Link from "next/link";

export function Footer() {
  return (
    <>
      <section className="credential-banner" aria-label="TB Electrical credentials">
        <div className="shell credential-banner-inner">
          <p><span>Qualified and covered</span><strong>Professional standards, backed up.</strong></p>
          <div className="credential-banner-logos">
            <a href="https://www.napit.org.uk/" target="_blank" rel="noreferrer" aria-label="Visit NAPIT">
              <img src="/media/napit-logo.svg" alt="NAPIT" />
            </a>
            <a href="https://www.trustmark.org.uk/firms/TB%20Electrical%20Herts%20Ltd-4136741-SG5%204SN?id=6a0f78e4-068a-4311-bbf1-663f7f6bd737" target="_blank" rel="noreferrer" aria-label="View TB Electrical on TrustMark">
              <img src="/media/trustmark-logo.svg" alt="TrustMark Government Endorsed Quality" />
            </a>
            <a href="https://www.cityandguilds.com/what-we-offer/certificates-and-credentials" target="_blank" rel="noreferrer" aria-label="Visit City and Guilds">
              <img src="/media/city-and-guilds-logo.png" alt="City & Guilds" />
            </a>
            <a href="https://www.rhinotradeinsurance.com/" target="_blank" rel="noreferrer" aria-label="Visit Rhino Trade Insurance">
              <img src="/media/rhino-trade-insurance-logo.svg" alt="Rhino Trade Insurance" />
            </a>
          </div>
        </div>
      </section>
      <footer className="site-footer">
        <div className="shell footer-top">
          <div className="footer-brand">
            <img src="/media/tb-logo-white.webp" alt="TB Electrical" />
            <p>Safe. Tidy. Straightforward.</p>
          </div>
          <div className="footer-links">
            <div><span>Explore</span><Link href="/services">Services</Link><Link href="/projects">Projects</Link><Link href="/about">About</Link><Link href="/ev-chargers">EV charging</Link></div>
            <div><span>Contact</span><a href="tel:+447484605599">07484 605 599</a><a href="mailto:tyler@tbelectrical.co.uk">tyler@tbelectrical.co.uk</a><a href="https://wa.me/447484605599" target="_blank" rel="noreferrer">WhatsApp</a></div>
            <div><span>Follow</span><a href="https://www.facebook.com/tbelectricalherts/" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.instagram.com/tbelectricalhertsltd" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.trustmark.org.uk/firms/TB%20Electrical%20Herts%20Ltd-4136741-SG5%204SN?id=6a0f78e4-068a-4311-bbf1-663f7f6bd737" target="_blank" rel="noreferrer">TrustMark</a></div>
          </div>
        </div>
        <div className="shell footer-bottom"><p>© 2026 TB Electrical Herts Ltd · Company no. 16596265</p><p>NAPIT registered · TrustMark approved</p></div>
      </footer>
    </>
  );
}
