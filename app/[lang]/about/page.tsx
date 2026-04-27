import { setRequestLocale } from "next-intl/server";
import { Story } from "@/components/sections/Story";
import { MissionVision } from "@/components/sections/MissionVision";
import { Values } from "@/components/sections/Values";
import { Leadership } from "@/components/sections/Leadership";
import { CorporatePurpose } from "@/components/sections/CorporatePurpose";
import { RevealOnScroll } from "@/components/interactive/RevealOnScroll";

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
