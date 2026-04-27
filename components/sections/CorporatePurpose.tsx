import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export async function CorporatePurpose() {
  const t = await getTranslations("purpose");

  return (
    <Section>
      <Container className="max-w-[760px]">
        <div className="border-l-4 border-sky pl-8">
          <p className="text-lede text-gray italic leading-relaxed">{t("body")}</p>
        </div>
      </Container>
    </Section>
  );
}
