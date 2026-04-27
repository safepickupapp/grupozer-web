import { getTranslations } from "next-intl/server";
import { Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export async function FuturePortfolioGrid() {
  const t = await getTranslations("portfolio.future");

  return (
    <Section className="bg-paper">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="border-2 border-dashed border-gray-20 rounded-md p-8 flex flex-col items-center justify-center text-center hover:border-solid hover:border-sky transition-all duration-[250ms] ease-brand-out min-h-[200px]"
            >
              <Clock size={32} className="text-gray-60 mb-4" />
              <h3 className="text-base font-bold text-navy mb-1">{t("t")}</h3>
              <p className="text-sm text-gray">{t("b")}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
