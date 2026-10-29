import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createServer } from "node:net";
import { once } from "node:events";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
let origin;
let server;
let serverOutput = "";

async function availablePort() {
  const probe = createServer();
  probe.listen(0, "127.0.0.1");
  await once(probe, "listening");
  const port = probe.address().port;
  probe.close();
  await once(probe, "close");
  return port;
}

before(async () => {
  const port = await availablePort();
  origin = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: root,
    env: { ...process.env, RESEND_API_KEY: "", CONTACT_TO_EMAIL: "", CONTACT_FROM_EMAIL: "" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  for (const stream of [server.stdout, server.stderr]) {
    stream.on("data", chunk => { serverOutput += chunk.toString().slice(0, 2000); });
  }

  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(`Next.js exited early: ${serverOutput}`);
    try {
      const response = await fetch(origin, { signal: AbortSignal.timeout(1000) });
      if (response.ok) return;
    } catch { /* Wait for the server to finish starting. */ }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error(`Next.js did not start: ${serverOutput}`);
});

after(() => {
  server?.kill("SIGKILL");
  server?.stdout?.destroy();
  server?.stderr?.destroy();
});

test("server-renders the TB Electrical homepage", async () => {
  const response = await fetch(origin);

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /TB Electrical/);
  assert.match(html, /Electrical work/);
  assert.match(html, /EV charging/);
  assert.match(html, /OZEV approved/);
  assert.match(html, /Stevenage/);
  assert.match(html, /Letchworth Garden City/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Send enquiry/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/i);
});

test("server-renders the local EV charger landing page", async () => {
  const response = await fetch(`${origin}/ev-chargers`);

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /OZEV approved EV charger installer/i);
  assert.match(html, /EV charger installation/i);
  assert.match(html, /Hitchin/);
  assert.match(html, /Langford/);
});

test("serves search engine crawl files and approved images", async () => {
  const [robotsResponse, sitemapResponse, imageResponse] = await Promise.all([
    fetch(`${origin}/robots.txt`),
    fetch(`${origin}/sitemap.xml`),
    fetch(`${origin}/media/tyler-baker-tb-electrical-warm-v2.webp`),
  ]);

  assert.equal(robotsResponse.status, 200);
  assert.match(await robotsResponse.text(), /https:\/\/www\.tbelectrical\.co\.uk\/sitemap\.xml/);

  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /https:\/\/www\.tbelectrical\.co\.uk\/ev-chargers/);
  assert.match(sitemap, /https:\/\/www\.tbelectrical\.co\.uk\/contact/);

  assert.equal(imageResponse.status, 200);
  assert.match(imageResponse.headers.get("content-type") ?? "", /^image\/webp/);
});

test("contact endpoint validates enquiries on the Node.js server", async () => {
  const response = await fetch(`${origin}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json", origin },
    body: JSON.stringify({ name: "A", message: "Too short" }),
  });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).ok, false);
});

const publicOrigin = "https://www.tbelectrical.co.uk";
const locations = ["hitchin", "baldock", "letchworth", "langford", "stevenage", "biggleswade"];
const services = ["rewires", "consumer-units", "eicr", "commercial", "fault-finding"];
const routes = ["/", "/about", "/services", "/contact", "/ev-chargers", "/projects", "/areas", "/cookies", "/privacy", ...locations.map(a=>`/areas/${a}`), ...services.map(s=>`/services/${s}`)];

test("all twenty public pages render with unique canonical URLs and valid structured data", async () => {
  const titles = new Set();
  for (const path of routes) {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status,200,path);
    const html = await response.text();
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
    assert.equal(new URL(canonical?.[1]).href, new URL(path, publicOrigin).href,path);
    assert.equal((html.match(/<h1\b/g)||[]).length,1,path);
    assert.match(html,/id="main-content"/);
    assert.doesNotMatch(html, /tb-electrical-herts\.tybaker691\.chatgpt\.site|https:\/\/(?:www\.)?tbelectricalherts\.co\.uk/);
    const meta = (attribute, name) => html.match(new RegExp(`<meta[^>]*${attribute}="${name}"[^>]*content="([^"]+)"`))?.[1];
    assert.equal(new URL(meta("property", "og:url")).href, new URL(path, publicOrigin).href, `Open Graph URL: ${path}`);
    assert.equal(meta("property", "og:image"), `${publicOrigin}/og.png`, `Open Graph image: ${path}`);
    assert.equal(meta("name", "twitter:image"), `${publicOrigin}/og.png`, `Twitter image: ${path}`);
    const title=html.match(/<title>(.*?)<\/title>/s)?.[1];
    assert.ok(title && !titles.has(title),`unique title: ${path}`); titles.add(title);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .flatMap(match => JSON.parse(match[1]));
    const business = schemas.find(schema => schema["@type"] === "Electrician");
    const website = schemas.find(schema => schema["@type"] === "WebSite");
    assert.equal(business?.url, publicOrigin);
    assert.equal(business?.["@id"], `${publicOrigin}/#business`);
    assert.equal(business?.logo, `${publicOrigin}/media/tb-logo.webp`);
    assert.equal(business?.image, `${publicOrigin}/og.png`);
    assert.equal(business?.email, "tyler@tbelectrical.co.uk");
    assert.equal(website?.url, publicOrigin);
    assert.equal(website?.["@id"], `${publicOrigin}/#website`);
    assert.equal(website?.publisher?.["@id"], `${publicOrigin}/#business`);
    for (const schema of schemas) {
      if (schema["@type"] === "Service") {
        assert.equal(schema.url, `${publicOrigin}${path}`);
        assert.equal(schema.provider?.["@id"], `${publicOrigin}/#business`);
      }
      if (schema["@type"] === "BreadcrumbList") {
        assert.equal(schema.itemListElement.at(-1).item, `${publicOrigin}${path}`);
        for (const item of schema.itemListElement) assert.equal(new URL(item.item).origin, publicOrigin);
      }
    }
    for(const match of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
      const href=match[1];
      if(!href.startsWith("/_") && !/\.[a-z]+$/.test(href)) assert.ok(routes.includes(href),`${path} links to unknown route ${href}`);
    }
    if(path.startsWith("/areas/") || path.startsWith("/services/")) {
      assert.match(html,/Send enquiry/); assert.match(html,/BreadcrumbList/); assert.match(html,/"@type":"Service"/);
    }
  }
});

test("new landing pages appear in the sitemap and invalid locations return 404",async()=>{
  const xml=await (await fetch(`${origin}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.equal(urls.length, routes.length);
  assert.equal(new Set(urls).size, routes.length);
  for (const url of urls) assert.equal(new URL(url).origin, publicOrigin);
  for(const path of routes) assert.ok(urls.some(url => new URL(url).href === new URL(path, publicOrigin).href),path);
  const robots = await (await fetch(`${origin}/robots.txt`)).text();
  assert.match(robots, /^Host: https:\/\/www\.tbelectrical\.co\.uk$/m);
  assert.match(robots, /^Sitemap: https:\/\/www\.tbelectrical\.co\.uk\/sitemap\.xml$/m);
  for(const path of ["/areas/not-a-town","/services/not-a-service"]) {
    const response=await fetch(`${origin}${path}`);
    assert.equal(response.status,404,path);
  }
});

test("Google Maps is absent before consent and footer exposes cookie controls",async()=>{
  const html=await (await fetch(origin)).text();
  assert.doesNotMatch(html,/<iframe\b/);
  assert.doesNotMatch(html,/<script[^>]+src="https:\/\/(?:www\.google|www\.googletagmanager)/);
  assert.match(html,/Google map is off until you accept/);
  assert.match(html,/Cookie settings/);
  assert.match(html,/href="\/cookies"/); assert.match(html,/href="\/privacy"/);
});

test("the sales page is the indexable, navigable EV page with mobile FAQ markup",async()=>{
  const response=await fetch(`${origin}/ev-chargers`);
  assert.equal(response.status,200);
  const html=await response.text();
  assert.match(html,/<meta name="robots" content="index, ?follow"/);
  assert.match(html,/Tell us about the installation/);
  assert.match(html,/<input type="hidden" name="service" value="EV charger installation"/);
  assert.equal((html.match(/<form\b/g)||[]).length,1);
  assert.match(html,/href="#charger-quote"/);
  assert.match(html,/aria-label="Main navigation"/);
  assert.match(html,/class="ev-faq-question"/);
  assert.match(html,/<summary><span class="ev-faq-question">How much does an installation cost\?<\/span><i aria-hidden="true">/);
  assert.doesNotMatch(html,/—/);
  assert.doesNotMatch(html,/noindex/);
  const home=await (await fetch(origin)).text();
  assert.match(home,/href="\/ev-chargers"/);
  const xml=await (await fetch(`${origin}/sitemap.xml`)).text();
  assert.ok(xml.includes("/ev-chargers"));
  assert.ok(!xml.includes("ev-charger-quote"));
});

test("the previous EV campaign URL redirects permanently and retains campaign parameters",async()=>{
  const response=await fetch(`${origin}/ev-charger-quote?utm_source=google&utm_campaign=home&tag=one&tag=two`,{redirect:"manual"});
  assert.equal(response.status,308);
  const destination=new URL(response.headers.get("location"),"http://localhost");
  assert.equal(destination.pathname,"/ev-chargers");
  assert.equal(destination.searchParams.get("utm_source"),"google");
  assert.equal(destination.searchParams.get("utm_campaign"),"home");
  assert.deepEqual(destination.searchParams.getAll("tag"),["one","two"]);
});

test("the homepage explains its service and location in the main heading",async()=>{
 const html=await (await fetch(origin)).text();
 assert.match(html,/<h1>Electrician in Hitchin/);
 assert.match(html,/"@type":"WebSite"/);
 for(const area of ["Baldock","Letchworth","Stevenage","Langford","Biggleswade"]) assert.ok(html.includes(area));
});

// Website SEO changes must not migrate the separately configured email domain.
test("business email and Resend sending defaults remain unchanged", async () => {
  for (const path of ["../.env.example", "../wrangler.jsonc"]) {
    const config = await readFile(new URL(path, import.meta.url), "utf8");
    assert.ok(config.includes("tyler@tbelectrical.co.uk"), path);
    assert.ok(config.includes("TB Electrical Website <enquiries@forms.tbelectrical.co.uk>"), path);
  }
  const html = await (await fetch(`${origin}/contact`)).text();
  assert.ok(html.includes('href="mailto:tyler@tbelectrical.co.uk"'));
});


test("paid EICR landing page is crawlable, unlisted and ready for qualified enquiries", async () => {
  const response = await fetch(`${origin}/eicr-quote?utm_source=google&utm_campaign=landlord`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/<form\b/g) || []).length, 1);
  assert.match(html, /<meta name="robots" content="noindex, ?follow"/);
  assert.match(html, /<meta name="googlebot" content="noindex, ?follow"/);
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  assert.equal(canonical?.[1], `${publicOrigin}/eicr-quote`);
  assert.match(html, /<title>EICR Testing in Hitchin \| TB Electrical<\/title>/);
  assert.match(html, /<input type="hidden" name="service" value="Inspection \/ EICR"/);
  assert.match(html, /name="propertyUse"/);
  assert.match(html, /Get my EICR quote/);
  assert.match(html, /City &amp; Guilds qualified/);
  assert.match(html, /2391-52/);
  assert.match(html, /Repairs are quoted separately/);
  assert.match(html, /id="eicr-enquiry"/);
  assert.match(html, /Your EICR/);
  assert.match(html, /Sorted properly/);
  assert.match(html, /class="eicr-hero-trust"/);
  assert.match(html, /aria-label="EICR enquiry actions"/);
  assert.ok(html.indexOf('id="eicr-enquiry"') < html.indexOf('id="eicr-choice-heading"'), "enquiry precedes the longer sales sections");
  assert.ok(html.indexOf('href="#eicr-enquiry"') < html.indexOf('class="eicr-hero-portrait"'), "first CTA precedes the photo");
  assert.match(html, /href="tel:\+447484605599"/);
  assert.doesNotMatch(html, /aria-label="Main navigation"|OZEV|guaranteed pass|same-day report|—/i);
  for (const json of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    const schema = JSON.parse(json[1]);
    for (const item of Array.isArray(schema) ? schema : [schema]) {
      if (item['@type'] === 'Service') assert.equal(item.url, `${publicOrigin}/eicr-quote`);
    }
  }
});
