import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";

export async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <footer className="bg-footer-bg text-white pt-20 pb-9">
      <div className="max-w-container mx-auto px-7 max-[720px]:px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Wordmark size="lg" reverse />
            <p className="mt-4 text-sm text-white/50">{t("footer.tagline")}</p>
          </div>
          {/* Nav */}
          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-white/50 mb-4">{t("footer.nav")}</h4>
            <ul className="space-y-2">
              <li><Link href={`/${locale}`} className="text-sm text-white/70 hover:text-white">{t("nav.home")}</Link></li>
              <li><Link href={`/${locale}/about`} className="text-sm text-white/70 hover:text-white">{t("nav.about")}</Link></li>
            </ul>
          </div>
          {/* Portfolio */}
          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-white/50 mb-4">{t("footer.portfolio")}</h4>
            <ul className="space-y-2">
              <li><Link href={`/${locale}/portfolio`} className="text-sm text-white/70 hover:text-white">{t("nav.portfolio")}</Link></li>
              <li><a href="https://safepickup.app" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white">SafePickup</a></li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-white/50 mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-2">
              <li><Link href={`/${locale}/contact`} className="text-sm text-white/70 hover:text-white">{t("nav.contact")}</Link></li>
              <li><a href="mailto:info@zergrupo.com" className="text-sm text-white/70 hover:text-white">info@zergrupo.com</a></li>
            </ul>
          </div>
        </div>
        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">{t("footer.copy")}</p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/privacy`} className="text-xs text-white/40 hover:text-white">{t("footer.privacy")}</Link>
            <Link href={`/${locale}/terms`} className="text-xs text-white/40 hover:text-white">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
