"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LABEL_KEY: Record<string, string> = {
  "/": "nav.beranda",
  "/tentang": "nav.tentang",
  "/program": "nav.program",
  "/alumni": "nav.alumni",
  "/kegiatan": "nav.kegiatan",
  "/berita": "nav.berita",
  "/galeri": "nav.galeri",
  "/kontak": "nav.kontak",
};

const STRUCTURE_PATHS = {
  nasional: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 10h.01M15 10h.01M9 14h.01M15 14h.01",
  provinsi: "M9 20l-5.5-3V4L9 7l6-3 5.5 3v13L15 17l-6 3zm0 0V7m6 10V4",
  kabupaten: "M3 10.5L12 3l9 7.5M5 10v10h14V10M9.5 20v-6h5v6",
} as const;

type StructureType = keyof typeof STRUCTURE_PATHS;

interface StructureItemProps {
  type: StructureType;
  name: string;
  desc: string;
  highlight?: boolean;
  badge?: string;
}

function StructureItem({ type, name, desc, highlight = false, badge }: StructureItemProps) {
  return (
    <li className="relative pl-12">
      <span
        className={`absolute left-0 top-1 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full ${
          highlight
            ? "bg-gradient-to-br from-[#C62930] to-[#ff7e84] text-white shadow-[0_0_16px_rgba(198,41,48,0.55)]"
            : "border border-white/20 bg-[#16080a] text-[#e8555c]"
        }`}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={STRUCTURE_PATHS[type]} />
        </svg>
      </span>

      <div
        className={`rounded-md border px-4 py-3.5 ${
          highlight ? "border-primary/50 bg-primary/10" : "border-white/10 bg-white/[0.03]"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-mona text-sm font-extrabold leading-tight text-white">{name}</p>
          {highlight && badge && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.12em] text-white">
              {badge}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-white/60">{desc}</p>
      </div>
    </li>
  );
}

const MENU_ICONS: Record<string, ReactNode> = {
  "/": (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5M5 9.5V21h14V9.5" />
    </svg>
  ),
  "/tentang": (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-2a3 3 0 10-3-3" />
    </svg>
  ),
  "/program": (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  "/alumni": (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  "/kegiatan": (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  "/berita": (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 18h6v-8h-6z" />
    </svg>
  ),
  "/galeri": (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
    </svg>
  ),
  "/kontak": (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.9 5.9a2 2 0 002.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useLanguage();

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col bg-ink transition-all duration-300 md:hidden ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="flex h-16 items-center justify-between px-5">
        <Image
          src="/images/logo/logo2.png"
          alt={`${SITE.name} logo`}
          width={240}
          height={78}
          className="h-8 w-auto object-contain"
        />
        <button
          onClick={onClose}
          aria-label={t("nav.tutupMenu")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto pb-8">
          <div className="flex flex-col gap-1 px-8 pt-6">
            <div className="mb-4 flex justify-center">
              <LanguageSwitcher onDark />
            </div>
            {NAV_LINKS.map((link) => {
              const label = t(NAV_LABEL_KEY[link.href] ?? "nav.beranda");
              if (link.href !== "/") {
                return (
                  <span
                    key={link.href}
                    className="flex items-center justify-center gap-3 py-3.5 text-xl font-semibold text-white/50"
                  >
                    {MENU_ICONS[link.href]}
                    {label}
                  </span>
                );
              }
              return (
                <Link
                  key={link.href}
                  href="/"
                  onClick={onClose}
                  className="flex items-center justify-center gap-3 py-3.5 text-xl font-semibold text-white transition-colors hover:text-primary-light"
                >
                  {MENU_ICONS[link.href]}
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 border-t border-white/10 bg-white/[0.03] px-6 py-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e8555c]">
              {t("about.structure.label")}
            </span>

            <div className="relative mt-6">
              <span className="absolute bottom-3 left-0 top-2 w-px bg-gradient-to-b from-[#C62930]/60 via-white/20 to-[#C62930]/60" />
              <ol className="space-y-5">
                <StructureItem
                  type="nasional"
                  name={t("about.structure.dpp.name")}
                  desc={t("about.structure.dpp.desc")}
                />
                <StructureItem
                  type="provinsi"
                  name={t("about.structure.dpd.name")}
                  desc={t("about.structure.dpd.desc")}
                />
                <StructureItem
                  type="kabupaten"
                  name={t("about.structure.dpc.name")}
                  desc={t("about.structure.dpc.desc")}
                  highlight
                  badge={t("about.structure.dpc.badge")}
                />
              </ol>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.03] px-6 py-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e8555c]">
              {t("about.eyebrow")}
            </span>
            <h3 className="mt-5 font-mona text-2xl font-normal leading-snug text-white">
              {t("about.title")}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {t("about.description", { year: SITE.foundedYear, name: SITE.fullName })}
            </p>
            <div className="mt-7">
              <Link
                href="/tentang"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border-2 border-primary px-5 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                {t("about.kenali")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}