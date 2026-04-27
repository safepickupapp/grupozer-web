import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Isotype } from "@/components/brand/Isotype";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export async function AboutTeaser() {
  const t = await getTranslations("about");
  const locale = await getLocale();

  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-navy rounded-lg aspect-[4/3] flex items-center justify-center">
            <Isotype size={80} variant="mono" color="rgba(255,255,255,0.12)" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky mb-4">{t("eyebrow")}</p>
            <h2 className="text-h2 font-extrabold text-navy">{t("title")}</h2>
            <p className="text-lede text-gray mt-4 leading-relaxed">{t("body")}</p>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-navy hover:text-sky transition-colors"
            >
              {t("link")} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
