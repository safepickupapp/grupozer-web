import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { FeaturedProductCard } from "@/components/sections/FeaturedProductCard";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RevealOnScroll } from "@/components/interactive/RevealOnScroll";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  setRequestLocale(lang);
  return (
    <main>
      <Hero />
      <RevealOnScroll><Pillars /></RevealOnScroll>
      <RevealOnScroll><AboutTeaser /></RevealOnScroll>
      <RevealOnScroll><FeaturedProductCard /></RevealOnScroll>
      <FinalCTA />
    </main>
  );
}
