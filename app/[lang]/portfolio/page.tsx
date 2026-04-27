import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PortfolioIntro } from "@/components/sections/PortfolioIntro";
import { FeaturedProductCard } from "@/components/sections/FeaturedProductCard";
import { FuturePortfolioGrid } from "@/components/sections/FuturePortfolioGrid";
import { RevealOnScroll } from "@/components/interactive/RevealOnScroll";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "meta.portfolio" });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zergrupo.com";
  return {
    title: t("title"),
    description: t("desc"),
    alternates: {
      languages: {
        es: `${base}/es/portfolio`,
        en: `${base}/en/portfolio`,
      },
    },
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  setRequestLocale(lang);
  return (
    <main>
      <RevealOnScroll><PortfolioIntro /></RevealOnScroll>
      <RevealOnScroll><FeaturedProductCard /></RevealOnScroll>
      <RevealOnScroll><FuturePortfolioGrid /></RevealOnScroll>
    </main>
  );
}
