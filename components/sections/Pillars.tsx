import { getTranslations } from "next-intl/server";
import { Lightbulb, Zap, Heart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const icons = [Lightbulb, Zap, Heart];

export async function Pillars() {
  const t = await getTranslations("pillars");

  return (
    <Section className="bg-paper">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky mb-4">{t("eyebrow")}</p>
        <h2 className="text-h2 font-extrabold text-navy max-w-[600px]">{t("title")}</h2>
        <p className="text-lede text-gray mt-4 max-w-[640px]">{t("lede")}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          {[1, 2, 3].map((n) => {
            const Icon = icons[n - 1];
            return (
              <div
                key={n}
                className="bg-white rounded-md p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-[250ms] ease-brand-out"
              >
                <div className="w-12 h-12 rounded-sm bg-sky-soft flex items-center justify-center mb-5">
                  <Icon size={24} className="text-sky" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-sky mb-2">0{n}</p>
                <h3 className="text-h3 font-bold text-navy mb-2">{t(`p${n}.title`)}</h3>
                <p className="text-base text-gray leading-relaxed">{t(`p${n}.body`)}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
