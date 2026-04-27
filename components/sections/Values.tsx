import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export async function Values() {
  const t = await getTranslations("values");

  return (
    <Section>
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky mb-4">{t("eyebrow")}</p>
        <h2 className="text-h2 font-extrabold text-navy mb-12">{t("title")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="bg-paper rounded-md p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-sky mb-2">0{n}</p>
              <h3 className="text-base font-bold text-navy mb-1">{t(`v${n}.t`)}</h3>
              <p className="text-sm text-gray leading-relaxed">{t(`v${n}.b`)}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
