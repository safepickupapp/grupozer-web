import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const founders = [
  { initials: "NSG", name: "Nazha Stephanie Giudicelli", key: "l1" },
  { initials: "MJP", name: "Miguel José Peña", key: "l2" },
];

export async function Leadership() {
  const t = await getTranslations("leaders");

  return (
    <Section className="bg-paper">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky mb-4">{t("eyebrow")}</p>
        <h2 className="text-h2 font-extrabold text-navy mb-12">{t("title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((f) => (
            <div key={f.key} className="flex items-start gap-6 bg-white rounded-md p-8 shadow-sm">
              <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-white">{f.initials}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy">{f.name}</h3>
                <p className="text-xs font-semibold text-sky mb-2">{t("role")}</p>
                <p className="text-sm text-gray leading-relaxed">{t(f.key)}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
