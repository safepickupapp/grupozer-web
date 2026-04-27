import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zergrupo.com";
  const routes = ["", "/about", "/portfolio", "/contact", "/privacy", "/terms"];
  const locales = ["es", "en"];

  return locales.flatMap((lang) =>
    routes.map((route) => ({
      url: `${base}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1.0 : 0.8,
    }))
  );
}
