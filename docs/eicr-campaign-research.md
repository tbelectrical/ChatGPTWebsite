# TB Electrical: EICR landing page and Google Search campaign

Research checked 29 October 2026. Recommendation and draft campaign only; no ads launched or spend authorised.

## Recommendation

Launch one focused Search campaign for private landlords with an inspection coming due, covering Hitchin and nearby service towns. Reach letting agents and portfolio owners through the same enquiry route, but do not limit eligibility to large landlords. Keep commercial and homebuyer campaigns separate when the first campaign proves profitable. This is a strategic inference from the evidence below, not measured advertising performance.

The campaign page is `/eicr-quote`. It is accessible without sign-in, excluded from the navigation and sitemap, and marked `noindex, follow`. The existing `/services/eicr` page remains the organic search destination. Hidden means unlisted, not private. Robots.txt continues to allow crawling, including destination assessment by Google Ads.

## Audience comparison

| Audience | Buying trigger | Commercial opportunity | Constraint | Decision |
| --- | --- | --- | --- | --- |
| Private landlords, including one-property owners | Report expiry, new letting without a suitable report, agent request | Clear booking intent; potential future inspections and separately agreed repairs | Price shopping; tenant access; cannot promise a satisfactory result | Primary paid-search audience |
| Portfolio landlords and letting/property managers | Several due reports, contractor availability | Multiple sites and recurring relationship | May have an incumbent; lower rates and admin expectations | Secondary enquiry route; targeted outreach alongside search |
| Homebuyers and sellers | Survey/conveyancing query or concern about existing electrics | Time-sensitive decision, potential later works | Not automatically a legal requirement for an owner-occupied sale | Separate next test with buyer-specific headline |
| General homeowners | Ageing installation or reassurance | Larger pool of homes; trust matters | Usually lower urgency; not a blanket five-year legal obligation | Retain on organic service page; accept inbound leads |
| Small commercial premises and commercial landlords | Insurer, lease, safety plan or previous report | Better alignment with Tyler's commercial goal; potentially larger scope | Site survey, number of boards/circuits, shutdown planning, variable intervals | Separate scoped commercial campaign later |
| Industrial sites, hospitality, facilities managers | Planned shutdown, maintenance/compliance programme | Larger contracts and follow-on work | Longer buying cycle, procurement and out-of-hours demands | Relationship-led outreach before general paid search |
| HMOs | Existing report due, licensing/management requirement | Larger inspections and repeat portfolio work | More complex scope, access and local licensing conditions | Quote individually; no standard flat-price promise |
| Social housing providers | Regulatory programme and procurement | Subcontract packages | Scale, procurement and urgent deadlines poorly fit Friday-only guaranteed capacity | Explore contractor relationships; not initial consumer ads |
| Tenants, students, DIY researchers | Safety concern, information or training | Often not the commissioning decision-maker | High risk of paying for informational clicks | Do not actively target; review queries rather than blanket-excluding all tenant language |

## Evidence and limits

- ONS Census 2021: 15.4% of North Hertfordshire households rented privately, against 64.8% owning. This is a dated local tenure snapshot, not current demand or a count of EICRs due. A smaller segment can still be better for advertising when the buying trigger is stronger. [ONS](https://www.ons.gov.uk/visualisations/censusareachanges/E07000099/)
- English Private Landlord Survey 2024: 45% of surveyed direct landlords owned one property, 38% owned two to four, and 17% owned five or more; the last group represented 49% of tenancies. Results cover direct deposit-registering landlords and must not be treated as every landlord or local paid-search demand. Do not build the page solely for five-plus-property portfolios or exclude by age/gender. [MHCLG](https://www.gov.uk/government/statistics/english-private-landlord-survey-2024-main-report/english-private-landlord-survey-2024-main-report)
- England rental guidance supports a recurring inspection trigger, with a five-year maximum or earlier report date. A new tenancy does not automatically require a fresh inspection where the existing report remains suitable. Social-sector extensions exist, but they do not make a small local business an appropriate buyer of urgent large-volume work. [Government guidance](https://www.gov.uk/government/publications/electrical-safety-standards-in-the-private-and-social-rented-sectors-guidance/electrical-safety-standards-in-the-private-and-social-rented-sectors-guidance)
- Home inspections are also recommended around buying/selling; an owner-occupied sale is not a universal statutory EICR trigger. [Electrical Safety First](https://www.electricalsafetyfirst.org.uk/find-a-registered-electrician/periodic-inspection-and-testing/) and [Timms Solicitors](https://www.timms-law.com/do-i-need-an-eicr-to-sell-my-house/)
- HSE says inspection frequency should prevent deterioration leading to danger; do not advertise a universal legal five-year rule for all commercial premises. [HSE](https://www.hse.gov.uk/electricity/faq.htm)

## Local advertised competition

Snapshot of sellers' own published pages, not independently verified quotations or service-quality checks. Scope, circuits, access and tax treatment differ. These are not comparable market averages.

| Advertiser | Advertised price | Published position | Implication for TB Electrical |
| --- | --- | --- | --- |
| JKN Electrical, Hitchin page | Studio/1-bed £150; 2/3-bed £200; 4-bed £300; all excluding VAT | Local contractor, reviews, free quote | A local service can sit above headline bargain offers |
| AC1 Electrical, Hitchin page | Domestic and commercial reports from £100; full tax/scope basis not established from page | Broad certificate offering, trust badges | Do not match a starting price without checking scope |
| Same Day Certificates, Hitchin page | Studio/1-bed £99; 2-bed £119; 3-bed £139; stated inclusive of VAT | Speed and bundled compliance certificates | A low-price tier exists; compete on named local inspector and clarity |

Sources: [JKN](https://www.jknelectrical.com/eicr-hitchin), [AC1](https://www.ac1electricalservices.com/electricians-in-hertfordshire/hitchin-sg4/electrical-reports-and-certificates-eicr), [Same Day Certificates](https://samedaycertificates.co.uk/hitchin/).

Do not copy competitors' regulatory claims. Some pages suggest that every new tenancy needs a new inspection, which is not a safe blanket statement. Do not advertise guaranteed passes, same-day reports, immediate appointments or a repair-inclusive price without operational evidence. No new public price or VAT claim has been introduced; the page requests a property-specific quote.

## Positioning implemented

Named local electrician, NAPIT registration, existing inspection/testing qualification, clear scope, and a quote before booking. Explain power interruption and separately agreed repairs. Use an actual existing business photo. The testimonial is a supplied review of installation work and is explicitly labelled as such, not presented as an EICR case study. Do not invent a star average, review count or inspection success rate.

Main ad-to-page promise: local EICR testing with a clear quote. Hero, form, repeated CTAs and FAQs all support the same action. Form asks the customer category so actual qualified enquiries can inform the next campaign decision. No unrelated EV or general-services menu distracts from the enquiry.

## Draft campaign setup

- Search only; one landlord/local EICR campaign initially. Keep Display expansion and Search Partners off for the first controlled test.
- Core geography: Hitchin plus Baldock, Letchworth, Stevenage, Langford and Biggleswade where available. Start with presence targeting and inspect the actual property postcode for every lead. Out-of-area landlords can be tested later with exact town-qualified searches in a separate capped campaign, rather than widening everything.
- Target buying intent, not assumptions about age, gender or household income. Keep unknown demographic groups eligible.
- Start with exact and phrase EICR terms. Avoid broad match and vague `electrician` terms for this test. Assets and starter keywords are in `eicr-google-ads.json`.
- Manual CPC, if available, or capped Maximise Clicks can establish initial traffic. Do not pick a CPC cap without current account/Keyword Planner data and delivery margins. Move to conversion-based bidding only when reliable conversion and booked-job data support it.
- Proposed learning allowance: £10/day over 14 days, £140 planned spend, subject to approval. Daily budgets are averages; Google may spend more on an individual day. Use a dated campaign and monitor spend. This is a test envelope, not a CPC forecast or guarantee of enough leads. Pause when near-term capacity is full.
- Schedule call assets only when Tyler can answer. The form can remain available outside those hours; do not promise instant callbacks or seven-day service. Friday-only guaranteed job capacity is a delivery constraint.
- Begin with one complete responsive search ad and review results before splitting a small budget. Do not manufacture multiple landing pages just to satisfy ad-strength suggestions. Draft assets meet 30-character headlines / 90-character descriptions.
- Use successful, server-acknowledged enquiries and qualified calls as primary conversions once tags are configured. A button click, validation error or opened email draft is not a completed lead. The existing consent-gated `generate_lead` dataLayer event is retained, with `lead_source=eicr-landing-page`. That event alone does not install Google Ads/GA4 tags or configure conversion actions. No new tracking tags were added.

References: [Google location options](https://support.google.com/google-ads/answer/1722038?hl=en), [responsive search ads](https://support.google.com/google-ads/answer/7684791?hl=en), [daily budgets](https://support.google.com/google-ads/answer/6385083?hl=en).

## Margin guardrail

Judge the campaign on booked work and contribution, not clicks or cheap forms. No verified CPC, monthly keyword volume, conversion rate or ROAS is available; those need live account data.

Maximum acquisition cost per job = collected fee minus delivery cost (including paid labour, travel and overhead allocation) minus required contribution. Maximum cost per qualified lead = maximum job acquisition cost multiplied by lead-to-booking rate. Maximum CPC = allowable lead cost multiplied by click-to-qualified-lead rate.

Illustration only, not a quote or forecast: £200 revenue, £100 delivery cost, £40 required contribution leaves £60 per acquired job. At a 25% lead-to-booking rate that means £15 per qualified lead; at a 10% click-to-qualified-lead rate that implies £1.50 per click. If auctions exceed that, improve economics or conversion before scaling. Do not justify losses by assuming profitable remedials will be needed.

## Testing and improvement plan

1. Technical QA: production builds, all existing public-page/contact tests, hidden-page metadata/crawl contract and structured-data checks. Inspect mobile and desktop; keyboard focus, details toggles, anchor links and form states need browser QA.
2. Submission QA should use a local test response, never a real outgoing customer email. Check success, server validation error, unavailable email configuration and network failure before launching ads. Ensure source and customer category reach the request; only successful sends generate the consent-gated lead event.
3. Before launch: verify the production domain serves the GitHub deployment, check Resend configuration with an owner-approved delivery test, configure consent-compatible conversion tags and call measurement, and validate the final destination in the ad account. No real email has been sent during this build.
4. During an approved live test: record source, search term, customer category, property postcode, quoted price, booking, delivery cost and collected payment. Review search terms and delivery capacity twice weekly.
5. Treat the first 14 days as directional evidence. Low-volume results cannot prove the page is perfect. If spend reaches the allowable cost of one acquired job with no booking, pause and inspect search intent, missed calls and quotation follow-up before increasing budget.
6. Test one substantive change at a time: first qualification/CTA, then price presentation after a public price and tax basis are approved. Use a Google Ads experiment or controlled periods; do not claim statistical significance from a handful of enquiries. Compare booked-job acquisition cost and contribution, not just click-through rate.
7. After viable landlord economics, test a separate buyer campaign or scoped commercial page. Choose the next segment using observed lead quality and capacity, not speculative impressions.


## Build QA record

- Next.js production build passed after layout revisions; all 23 tests passed, including the new EICR form request and failure-state tests. Existing public pages and the EV funnel remain covered.
- Sites production build and all 20 tests passed before final packaging.
- Desktop browser inspection found inherited form padding and heading sizing; corrected both before final release. No horizontal overflow observed at the inspected desktop viewport. FAQ and enquiry-anchor checks recorded separately at handover.
- Mobile CSS includes single-column form and sections, 16px input text, wrapping FAQ labels, 46px minimum field heights and large CTAs. Device-width browser emulation was unavailable, and a separate iframe preview was blocked by browser policy. Mobile visual QA is not claimed complete. Do not describe this page as proven conversion-optimised or perfect.
- Downsized the existing 1,601,948-byte portrait to a dedicated 18,116-byte WebP thumbnail for this page. No external fonts, new trackers or map embeds added.
- No real form email sent. The form success, rejected-request, network-error and email-draft fallback paths were tested with simulated responses. Real configured-email delivery and ad conversion tagging remain pre-launch checks.
- The production canonical origin follows current GitHub `app/lib/seo.ts`: `https://www.tbelectrical.co.uk`. Earlier `tbelectricalherts.co.uk` references have not been reintroduced. The Sites preview retains its own existing origin.


## Conversion redesign and audit, 29 October 2026

This revision supersedes the first layout description above. The opening now sells Tyler's personal service, with service/locality, NAPIT registration, insurance, price reassurance and an enquiry action before the main photo in document order. The photo establishes who will attend. One genuine customer's review appears as a short excerpt in the opening and clearly labelled excerpts further down; these are not different reviewers or a business-wide star average.

The complete enquiry form follows the hero/credentials, ahead of the longer sales sections. A sticky desktop header and mobile call/quote bar provide a direct route without reading to the bottom. The mobile bar is below cookie preferences in stacking order, respects safe-area padding and hides during form focus. FAQ detail is last because it answers secondary objections; essential pricing and booking information remains near the first action. Four short reasons-to-choose sections replace a long introductory explanation.

This layout decision follows [Google's landing-page guidance](https://support.google.com/google-ads/answer/6238826?hl=en-Gb): keep the offer relevant to the ad and make the next action easy to find. [NN/g's early-exit research](https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/) supports communicating value quickly, but is older general research, not a prediction of this page's dwell time. [NN/g's scanning research](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) describes several eye-movement patterns; no heatmap or eye tracking has been measured on this page.

The new audit is reproducible with `node scripts/audit-eicr.mjs` after a Next.js production build. `docs/eicr-page-audit.json` records 19 passing technical/conversion-contract checks, not a Google score. Both builds pass; 23 Next.js tests and 20 Sites tests pass. New checks verify that the first CTA precedes the photo and that the form precedes the extended sales content. Draft ad assets have been aligned with the personal-service wording and character-checked.

A PageSpeed Insights API request returned HTTP 429: its daily query quota was exhausted. No Lighthouse performance, accessibility, SEO or Best Practices score is claimed. Real-user Core Web Vitals, Google Ads Quality Score and conversion performance remain unmeasured. [Google describes Quality Score](https://support.google.com/google-ads/answer/6167118?hl=en) as a keyword-level diagnostic; an offline checklist cannot supply it.

`noindex, follow` remains intentional for the unlisted campaign page. Removing it merely to chase an SEO score would change the agreed purpose. [Google's noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing) explains why crawlers must still be allowed to access the page. The indexable organic service page and existing production canonical origin remain unchanged. The new full-size hero photo is an optimised 85,746-byte WebP; no extra JavaScript dependency was added for the persistent actions.

Suggested live validation after approved launch: inspect qualified-lead and booked-job rates, missed calls and customer category. Add consent-compatible scroll/form-start measurement only after tag setup is agreed; no new trackers, session replay or heatmap scripts were installed. Test one variable at a time. Do not use duration alone as success: a quick, successful phone call may be more valuable than several minutes of browsing.

Desktop visual QA of the redesign confirmed no horizontal overflow at 1363 × 936 CSS pixels, a loaded hero portrait, and both hero call/quote links within the initial viewport (quote top approximately 642px). Header quote navigation reaches the enquiry section. These are single-viewport observations, not a claim about every screen size or a measured user-attention heatmap.
