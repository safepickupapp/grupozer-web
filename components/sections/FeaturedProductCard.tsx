import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PhoneMock } from "@/components/interactive/PhoneMock";

export async function FeaturedProductCard() {
  const t = await getTranslations("portfolio");

  return (
    <Section>
      <Container>
        <div className="bg-gradient-to-br from-navy via-navy-90 to-navy-80 rounded-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-10 p-10 lg:p-14">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky mb-3">{t("flagship")}</p>
              <h3 className="text-h2 font-extrabold text-white mb-2">SafePickup</h3>
              <p className="text-xs text-white/50 mb-4">{t("sp.cat")}</p>
              <p className="text-lede text-white/70 leading-relaxed">{t("sp.desc")}</p>
              <div className="flex flex-wrap gap-6 mt-8 mb-8">
                <div>
                  <p className="text-2xl font-extrabold text-white">3+</p>
                  <p className="text-xs text-white/50">{t("sp.s1")}</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">500+</p>
                  <p className="text-xs text-white/50">{t("sp.s2")}</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-sky">{t("sp.s3num")}</p>
                  <p className="text-xs text-white/50">{t("sp.s3")}</p>
                </div>
              </div>
              <a
                href="https://safepickup.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sky text-white font-semibold rounded-sm hover:bg-sky/90 transition-colors"
              >
                {t("sp.cta")}
              </a>
            </div>
            <PhoneMock />
          </div>
        </div>
      </Container>
    </Section>
  );
}
