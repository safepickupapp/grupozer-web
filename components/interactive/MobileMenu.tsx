"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  const links = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}/about`, label: t("nav.about") },
    { href: `/${locale}/portfolio`, label: t("nav.portfolio") },
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden p-2 text-navy"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      {open && (
        <div className="fixed inset-0 top-[76px] bg-white z-40 lg:hidden">
          <nav className="flex flex-col items-center gap-8 pt-12">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-xl font-semibold text-navy hover:text-sky transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
