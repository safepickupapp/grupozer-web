import { setRequestLocale } from "next-intl/server";
import { PortfolioIntro } from "@/components/sections/PortfolioIntro";
import { FeaturedProductCard } from "@/components/sections/FeaturedProductCard";
import { FuturePortfolioGrid } from "@/components/sections/FuturePortfolioGrid";
import { RevealOnScroll } from "@/components/interactive/RevealOnScroll";

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
