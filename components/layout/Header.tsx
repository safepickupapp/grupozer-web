"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { LangSwitcher } from "@/components/interactive/LangSwitcher";
import { MobileMenu } from "@/components/interactive/MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}/about`, label: t("nav.about") },
    { href: `/${locale}/portfolio`, label: t("nav.portfolio") },
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 h-[76px] flex items-center bg-white/85 backdrop-blur-[14px] backdrop-saturate-[160%] transition-[border-color] duration-200 ${
        scrolled ? "border-b border-gray-20" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-container mx-auto px-7 max-[720px]:px-5 w-full flex items-center justify-between">
        <Logo size="lg" locale={locale} />
        <nav className="hidden lg:flex items-center gap-9">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray hover:text-navy transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LangSwitcher />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
