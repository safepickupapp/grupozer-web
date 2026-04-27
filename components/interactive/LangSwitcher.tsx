"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center border border-gray-20 rounded-full p-[3px]">
      <button
        onClick={() => switchTo("es")}
        aria-pressed={locale === "es"}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
          locale === "es" ? "bg-navy text-white" : "text-gray hover:text-navy"
        }`}
      >
        SPA
      </button>
      <button
        onClick={() => switchTo("en")}
        aria-pressed={locale === "en"}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
          locale === "en" ? "bg-navy text-white" : "text-gray hover:text-navy"
        }`}
      >
        ENG
      </button>
    </div>
  );
}
