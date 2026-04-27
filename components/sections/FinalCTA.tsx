import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export async function FinalCTA() {
  const t = await getTranslations("finalCta");
  const locale = await getLocale();

  return (
    <section className="relative bg-navy text-white py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(65,151,203,0.15),transparent_70%)]" />
      <div className="relative max-w-container mx-auto px-7 max-[720px]:px-5 text-center">
        <h2 className="text-h2 font-extrabold max-w-[700px] mx-auto">{t("title")}</h2>
        <p className="text-lede text-white/70 mt-4 max-w-[540px] mx-auto">{t("body")}</p>
        <div className="mt-8">
          <Link href={`/${locale}/contact`}>
            <Button variant="accent" size="lg">{t("cta")}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
