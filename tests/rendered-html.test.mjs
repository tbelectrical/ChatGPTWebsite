import assert from "node:assert/strict";
import { spawn } from "node:child_process";
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
  assert.match(html, /home and workplace grant schemes/i);
  assert.match(html, /Hitchin/);
  assert.match(html, /Harpenden/);
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
