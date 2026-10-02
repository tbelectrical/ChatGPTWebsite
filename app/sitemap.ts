import type { MetadataRoute } from "next";

const siteUrl = "https://www.tbelectrical.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/ev-chargers", "/projects", "/about", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-09-15"),
  }));
}
