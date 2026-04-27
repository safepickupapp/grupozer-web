import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Story } from "@/components/sections/Story";
import { MissionVision } from "@/components/sections/MissionVision";
import { Values } from "@/components/sections/Values";
import { Leadership } from "@/components/sections/Leadership";
import { CorporatePurpose } from "@/components/sections/CorporatePurpose";
import { RevealOnScroll } from "@/components/interactive/RevealOnScroll";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "meta.about" });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zergrupo.com";
  return {
    title: t("title"),
    description: t("desc"),
    alternates: {
      languages: {
        es: `${base}/es/about`,
        en: `${base}/en/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  setRequestLocale(lang);
  return (
    <main>
      <RevealOnScroll><Story /></RevealOnScroll>
      <RevealOnScroll><MissionVision /></RevealOnScroll>
      <RevealOnScroll><Values /></RevealOnScroll>
      <RevealOnScroll><Leadership /></RevealOnScroll>
      <RevealOnScroll><CorporatePurpose /></RevealOnScroll>
    </main>
  );
}
