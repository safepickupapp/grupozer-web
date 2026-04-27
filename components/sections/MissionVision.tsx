import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export async function MissionVision() {
  const t = await getTranslations("mvv");

  return (
    <Section className="bg-paper">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-md p-10 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky mb-3">{t("missionLabel")}</p>
            <h2 className="text-h3 font-extrabold text-navy mb-3">{t("missionTitle")}</h2>
            <p className="text-base text-gray leading-relaxed">{t("missionBody")}</p>
          </div>
          <div className="bg-navy rounded-md p-10 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky mb-3">{t("visionLabel")}</p>
            <h2 className="text-h3 font-extrabold text-white mb-3">{t("visionTitle")}</h2>
            <p className="text-base text-white/70 leading-relaxed">{t("visionBody")}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
