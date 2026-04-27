import { getTranslations } from "next-intl/server";
import { Mail, MapPin } from "lucide-react";

export async function ContactSidebar() {
  const t = await getTranslations("contact.side");

  return (
    <div className="bg-paper rounded-md p-8">
      <h3 className="text-lg font-bold text-navy mb-2">{t("title")}</h3>
      <p className="text-sm text-gray mb-6">{t("body")}</p>
      <div className="space-y-4">
        <a
          href="mailto:ngiudicelli@zergrupo.com"
          className="flex items-center gap-3 text-sm text-navy hover:text-sky transition-colors"
        >
          <Mail size={16} className="text-sky shrink-0" />
          ngiudicelli@zergrupo.com
        </a>
        <a
          href="mailto:mjpena@zergrupo.com"
          className="flex items-center gap-3 text-sm text-navy hover:text-sky transition-colors"
        >
          <Mail size={16} className="text-sky shrink-0" />
          mjpena@zergrupo.com
        </a>
        <div className="flex items-center gap-3 text-sm text-gray">
          <MapPin size={16} className="text-sky shrink-0" />
          {t("loc")}
        </div>
      </div>
    </div>
  );
}
