import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export async function PortfolioIntro() {
  const t = await getTranslations("portfolio");

  return (
    <Section>
      <Container className="max-w-[760px]">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky mb-4">{t("eyebrow")}</p>
        <h1 className="text-h1 font-extrabold text-navy">{t("title")}</h1>
        <p className="text-lede text-gray mt-6 leading-relaxed">{t("body")}</p>
      </Container>
    </Section>
  );
}
