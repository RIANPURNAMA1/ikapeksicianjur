"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";
import Container from "./Container";

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

const SOCIAL_ICONS: Record<string, ReactNode> = {
  instagram: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  tiktok: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.55v13.67a2.9 2.9 0 01-2.9 2.9 2.9 2.9 0 01-2.9-2.9 2.9 2.9 0 012.9-2.9c.3 0 .6.05.88.14V9.28a6.4 6.4 0 00-.88-.06A6.45 6.45 0 002.92 15.67a6.45 6.45 0 006.45 6.45 6.45 6.45 0 006.45-6.45V8.7a8.3 8.3 0 004.85 1.56V6.71a4.84 4.84 0 01-1.08-.02z" />
    </svg>
  ),
};

// Hanya platform ini yang ditampilkan di footer
const ALLOWED_SOCIALS = ["instagram", "tiktok"];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className=" bg-ink text-white">
      <Container className="grid gap-8 py-12 sm:gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo/logo2.png"
            alt={`${SITE.name} logo`}
            width={240}
            height={78}
            className="h-9 w-auto object-contain"
          />
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-white/60 sm:text-sm">{t("footer.description")}</p>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-light sm:text-xs">{t("footer.navigasi")}</h4>
          <ul className="mt-3 space-y-1.5 text-xs text-white/70 sm:text-sm">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <li key={link.href} className="text-white/70">
                {t(NAV_LABEL_KEY[link.href] ?? "nav.beranda")}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-light sm:text-xs">{t("footer.lainnya")}</h4>
          <ul className="mt-3 space-y-1.5 text-xs text-white/70 sm:text-sm">
            {NAV_LINKS.slice(4).map((link) => (
              <li key={link.href} className="text-white/70">
                {t(NAV_LABEL_KEY[link.href] ?? "nav.beranda")}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-light sm:text-xs">{t("footer.kontak")}</h4>
          <ul className="mt-3 space-y-1.5 text-xs text-white/70 sm:text-sm">
            <li>{SITE.address2}</li>
            <li>{SITE.phone2}</li>
            <li>{SITE.email2}</li>
          </ul>
          <Link
            href="/pendataan"
            className="btn-shine btn-focus mt-4 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-primary-dark"
          >
            {t("nav.gabungAlumni")}
          </Link>
          <div className="mt-4 flex gap-2.5">
            {SOCIAL_LINKS.filter((social) =>
              ALLOWED_SOCIALS.includes(social.icon)
            ).map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="btn-focus flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white hover:border-primary hover:text-primary-light hover:bg-primary"
              >
                {SOCIAL_ICONS[social.icon]}
              </a>
            ))}
          </div>
        </div>
      </Container>

      {/* <div className="border-t border-white/10 py-5">
        <Container className="flex flex-col items-center justify-between gap-2 text-[11px] text-white/40 sm:flex-row sm:text-xs">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. {t("footer.copyright")}</p>
          <p>{t("footer.founded", { year: SITE.foundedYear })} &middot; Kabupaten Cianjur, Jawa Barat</p>
        </Container>
      </div> */}
    </footer>
  );
}