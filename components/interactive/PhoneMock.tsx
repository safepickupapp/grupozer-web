import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function AppScreenshots() {
  const t = await getTranslations("portfolio.sp.app");

  return (
    <div className="relative w-[280px] h-[400px] shrink-0 max-lg:mx-auto">
      {/* Back phone - admin view */}
      <div className="absolute left-0 top-4 w-[200px] rounded-[38px] overflow-hidden shadow-lg opacity-80 -rotate-[9deg] border-[7px] border-gray-10">
        <Image
          src={t("admin")}
          alt={t("adminAlt")}
          width={400}
          height={800}
          className="w-full h-auto"
        />
      </div>
      {/* Front phone - guardian view */}
      <div className="absolute right-0 top-0 w-[200px] rounded-[38px] overflow-hidden shadow-lg rotate-[5deg] border-[7px] border-gray-10 z-10">
        <Image
          src={t("guardian")}
          alt={t("guardianAlt")}
          width={400}
          height={800}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
