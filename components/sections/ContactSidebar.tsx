import { getTranslations } from "next-intl/server";
import { Mail, MapPin } from "lucide-react";

export async function ContactSidebar() {
  const t = await getTranslations("contact.side");

  return (
    <div className="bg-paper rounded-md p-8">
      <h3 className="text-lg font-bold text-navy mb-2">{t("title")}</h3>
      <p className="text-sm text-gray mb-6">{t("body")}</p>
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray mb-1">{t("generalLabel")}</p>
          <a href="mailto:info@zergrupo.com" className="flex items-center gap-3 text-sm text-navy hover:text-sky transition-colors">
            <Mail size={16} className="text-sky shrink-0" />
            info@zergrupo.com
          </a>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray">
          <MapPin size={16} className="text-sky shrink-0" />
          {t("loc")}
        </div>
      </div>
    </div>
  );
}
