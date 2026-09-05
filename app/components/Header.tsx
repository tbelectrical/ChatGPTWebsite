"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <div className="shell"><span>Hitchin-based · Covering Herts, Beds & Bucks</span><a href="tel:+447484605599">07484 605 599</a></div>
      </div>
      <header className="site-header">
        <div className="shell header-inner">
          <Link href="/" className="brand" aria-label="TB Electrical home">
            <img src="/media/tb-logo.webp" alt="TB Electrical" />
          </Link>
          <button className={`menu-toggle ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
            <span /><span />
          </button>
          <nav className={open ? "is-open" : ""} aria-label="Main navigation">
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/projects" onClick={() => setOpen(false)}>Projects</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/#reviews" onClick={() => setOpen(false)}>Reviews</Link>
            <Link href="/ev-chargers" className="nav-ev" onClick={() => setOpen(false)}>EV charging <span>↗</span></Link>
          </nav>
          <Link className="header-cta" href="/contact">Get a quote <span>↗</span></Link>
        </div>
      </header>
    </>
  );
}
