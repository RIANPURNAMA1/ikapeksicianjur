"use client";

import type { ReactNode } from "react";
import Image from "next/image";
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
  facebook: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  ),
  youtube: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33zM9.75 15.02V8.48l5.75 3.27z" />
    </svg>
  ),
  whatsapp: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
};

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className=" bg-ink text-white">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo/logo.png"
            alt={`${SITE.name} logo`}
            width={240}
            height={78}
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">{t("footer.description")}</p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">{t("footer.navigasi")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <li key={link.href}>
                <span className="cursor-text">{t(NAV_LABEL_KEY[link.href] ?? "nav.beranda")}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">{t("footer.lainnya")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {NAV_LINKS.slice(4).map((link) => (
              <li key={link.href}>
                <span className="cursor-text">{t(NAV_LABEL_KEY[link.href] ?? "nav.beranda")}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">{t("footer.kontak")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>{SITE.address}</li>
            <li>{SITE.phone}</li>
            <li>{SITE.email}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="btn-focus flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:border-primary hover:text-primary-light hover:bg-primary"
              >
                {SOCIAL_ICONS[social.icon]}
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. {t("footer.copyright")}</p>
          <p>{t("footer.founded", { year: SITE.foundedYear })} &middot; Kabupaten Cianjur, Jawa Barat</p>
        </Container>
      </div>
    </footer>
  );
}

