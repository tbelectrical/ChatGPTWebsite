export function CalloutRates() {
  return (
    <section className="callout-rates" id="call-out-rates" aria-labelledby="callout-rates-heading">
      <div className="shell">
        <div className="callout-rates-heading">
          <p className="eyebrow dark"><span /> Clear prices before we visit</p>
          <h2 id="callout-rates-heading">Call-out &amp;<br />fault-finding rates.</h2>
          <p>Know the cost before booking. We investigate the problem, explain what we find and agree any further work with you.</p>
        </div>
        <div className="callout-rate-grid">
          <article className="callout-rate-card callout-rate-featured">
            <p className="callout-rate-label">Local weekday call-out</p>
            <p className="callout-rate-price">£80</p>
            <h3>Attendance + the first hour</h3>
            <p>Includes travel within 10 road miles of Hitchin and up to one hour on site during normal weekday working hours.</p>
          </article>
          <article className="callout-rate-card">
            <p className="callout-rate-label">Additional labour</p>
            <p className="callout-rate-price">£50 <span>per hour</span></p>
            <h3>Further time, agreed with you</h3>
            <p>If more time is needed after the included first hour, we explain the next steps and agree the cost before continuing.</p>
          </article>
          <article className="callout-rate-card">
            <p className="callout-rate-label">Evening / weekend emergency</p>
            <p className="callout-rate-price">£120</p>
            <h3>Attendance + the first hour</h3>
            <p>Includes up to one hour on site. Call to check availability; any further labour charges are agreed before work continues.</p>
          </article>
        </div>
        <div className="callout-rate-details">
          <div><h3>What to expect</h3><p>The attendance charge is a minimum charge, even if the fault is identified in less than an hour. It covers the visit and investigation, including when the next step needs to be handled by your energy supplier or another specialist.</p></div>
          <div><h3>Any extras, agreed upfront</h3><p>Materials are extra and agreed before fitting. Travel beyond 10 road miles of Hitchin and chargeable parking are agreed when booking. Emergency attendance is subject to availability. No VAT is currently charged.</p></div>
        </div>
        <a className="button button-dark" href="tel:+447484605599">Call to arrange a visit <span>↗</span></a>
      </div>
    </section>
  );
}
