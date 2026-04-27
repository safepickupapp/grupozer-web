import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactSidebar } from "@/components/sections/ContactSidebar";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "meta.contact" });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zergrupo.com";
  return {
    title: t("title"),
    description: t("desc"),
    alternates: {
      languages: {
        es: `${base}/es/contact`,
        en: `${base}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations("contact");

  return (
    <main>
      <Section>
        <Container>
          <div className="max-w-[760px] mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky mb-4">
              {t("eyebrow")}
            </p>
            <h1 className="text-h1 font-extrabold text-navy">{t("title")}</h1>
            <p className="text-lede text-gray mt-4">{t("body")}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div>
              <ContactSidebar />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
