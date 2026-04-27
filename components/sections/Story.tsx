import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export async function Story() {
  const t = await getTranslations("story");

  return (
    <Section>
      <Container className="max-w-[760px]">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky mb-4">{t("eyebrow")}</p>
        <h1 className="text-h1 font-extrabold text-navy">{t("title")}</h1>
        <p className="text-lede text-gray mt-8 leading-relaxed">{t("body1")}</p>
        <p className="text-lede text-gray mt-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t("body2") }} />
      </Container>
    </Section>
  );
}
