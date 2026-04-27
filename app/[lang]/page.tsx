import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { FeaturedProductCard } from "@/components/sections/FeaturedProductCard";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RevealOnScroll } from "@/components/interactive/RevealOnScroll";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "meta.home" });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zergrupo.com";
  return {
    title: t("title"),
    description: t("desc"),
    alternates: {
      languages: {
        es: `${base}/es`,
        en: `${base}/en`,
      },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Grupo ZER",
  url: "https://zergrupo.com",
  logo: "https://zergrupo.com/logo/grupozer-logo.svg",
  founders: [
    { "@type": "Person", name: "Nazha Stephanie Giudicelli" },
    { "@type": "Person", name: "Miguel José Peña" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santo Domingo",
    addressCountry: "DO",
  },
};

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  setRequestLocale(lang);
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <RevealOnScroll><Pillars /></RevealOnScroll>
      <RevealOnScroll><AboutTeaser /></RevealOnScroll>
      <RevealOnScroll><FeaturedProductCard /></RevealOnScroll>
      <FinalCTA />
    </main>
  );
}
