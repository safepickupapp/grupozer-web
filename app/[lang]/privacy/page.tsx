import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "meta.privacy" });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zergrupo.com";
  return {
    title: t("title"),
    alternates: {
      languages: {
        es: `${base}/es/privacy`,
        en: `${base}/en/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  setRequestLocale(lang);

  return (
    <main>
      <Section>
        <Container className="max-w-[760px]">
          <h1 className="text-h2 font-extrabold text-navy mb-8">
            {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
          </h1>
          <div className="prose text-gray">
            <p>{lang === "es"
              ? "Esta página se encuentra en preparación. Próximamente publicaremos nuestra política de privacidad completa."
              : "This page is under preparation. We will publish our full privacy policy soon."
            }</p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
