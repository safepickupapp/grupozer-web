import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export async function Hero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();

  return (
    <section className="relative bg-gradient-to-br from-navy via-navy-90 to-navy-80 text-white overflow-hidden">
      <div className="max-w-container mx-auto px-7 max-[720px]:px-5 py-24 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-sky" />
          {t("eyebrow")}
        </p>
        <h1 className="text-h1 max-w-[800px]">
          <span className="font-extralight">{t("headlineLight")}</span>
          <br />
          <span className="font-extrabold">{t("headlineBold")}</span>
        </h1>
        <p className="text-lede text-white/70 max-w-[600px] mt-6">
          {t("subhead")}
        </p>
        <div className="flex flex-wrap gap-4 mt-10">
          <Link href={`/${locale}/portfolio`}>
            <Button variant="accent" size="lg">{t("cta1")}</Button>
          </Link>
          <Link href={`/${locale}/contact`}>
            <Button variant="secondary" size="lg" className="border-white/30 text-white hover:bg-white hover:text-navy">{t("cta2")}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
