import { getTranslations } from "next-intl/server";

export async function PhoneMock() {
  const t = await getTranslations("portfolio.sp.phone");

  return (
    <div className="w-[240px] shrink-0">
      <div className="relative bg-white rounded-[24px] shadow-lg p-3 aspect-[9/19] flex flex-col">
        <div className="bg-gray-10 rounded-[16px] flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-navy uppercase tracking-wider">{t("status")}</span>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-sm p-3 shadow-sm">
                <p className="text-[10px] text-gray">{t("s1")}</p>
                <p className="text-xs font-bold text-sky">{t("p1")}</p>
              </div>
              <div className="bg-white rounded-sm p-3 shadow-sm">
                <p className="text-[10px] text-gray">{t("s2")}</p>
                <p className="text-xs font-bold text-green-600">{t("p2")}</p>
              </div>
              <div className="bg-white rounded-sm p-3 shadow-sm">
                <p className="text-[10px] text-gray">{t("s3")}</p>
                <p className="text-xs font-bold text-navy">{t("p3")}</p>
              </div>
            </div>
          </div>
          <div className="h-1 w-1/3 mx-auto bg-gray-20 rounded-full mt-2" />
        </div>
      </div>
    </div>
  );
}
