"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";
import Container from "./Container";

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
      <path d="M19.83 10.75c-.19-.2-4.3-.13-8.34 0-1.43.07-2.37.12-2.45.14.02-.1.04-2.24.06-3.96.02-1.73-.01-3.6-.04-4.74A5.92 5.92 0 0 0 9.32 0C7.18 0 5.46.68 4.15 1.86 2.83 3.04 2 4.77 2 7.06c0 2.3-.04 5.06-.06 5.77-.02.67-.25 2.36-.33 2.9l-.08 1.63h3.04c1.95 0 3.53-.03 3.9-.08l2.07-1.13 2.4-.43 1.18-4.18.86-3.92c.07-3.33-.07-5.6-.85-6.62-.28-.4-.78-.84-1.46-1.25-.68-.4-1.5-.7-2.42-.86-1.8-.35-2.88-.07-5.66-.6-1.35-.28-1.75-.57-2.13-1.12a3.79 3.79 0 0 1-.38-.72c-.08-.2-.31-.6-.53-.93-.2-.33-.5-.7-.86-1.03-.37-.33-.87-.6-1.48-.75-2.3-.4-4.4-.42-4.57-.42v-.28c.56-.35 1.2-.78 2-1.02.8-.25 1.78-.37 2.7-.37 1.12 0 2.3-.12 3.3-.5.86-.3 1.87-.8 2.72-1.4A9.61 9.61 0 0 0 15 0c-.75.7-1.88 1.85-3 2.76-.37.25-.73.5-1 .75-.4.32-.83.66-1.15 1.12v.28c.56.05 1.1.18 1.58.4.73.3 1.38.78 1.9 1.4.37.46.67 1 .88 1.55.1.22.27.84.38 1.27.03.12.08.35.13.52.08.28.3.1 1.93.02 1.63-.08 2.25.02 3.77.33 1.34.27 1.9.43 2.5.7.25.1.6.3 1 .4-.18.22-.43.35-.68.48-1.46.68-2.28.93-4.33 1.17-1.26.16-2.52.3-3.84.36-1.32.06-1.55.04-2.1.07-.67.03-1.05.08-1.32.14l-2.07 1.13c-2.22 1.18-2.95 3.06-2.82 5.27-.17 0-.35 0-.54.02-1.2.18-2.5.08-4.63-.3-2.13-.37-4.46-.92-4.46-.92v.58c0 .98.3 1.95.9 2.7 1.2 1.5 2.88 2.56 4.7 3.03.36.07.72.13 1.08.18 1.38.2 2.67.34 4.17.47 1.5.14 3.29.28 4.49.28h.02l.56-.03c1.03-.05 2.12-.14 3.27-.35 1.15-.21 2.27-.53 3.34-.96.52-.2 1.04-.48 1.48-.92.43-.44.83-.94 1.18-1.5.33-.53.6-1.1.76-1.73.15-.6.22-1.2.26-1.86.02-.33.03-.67.03-1v-2.23c0-1.83-.17-3.6-1.02-5.05-.28-.47-.6-.9-1.01-1.27-.2-.17-.4-.3-.62-.4-.22-.1-.44-.2-.66-.25-1.5-.34-2.7-.28-4.77-.27-2.07.01-2.38-.03-4.44-.25-2.06-.23-4.28-.63-4.28-.63s-.22-2.86-.27-4.15c-.02-1.3-.02-2.86.04-4.6.06-1.6.33-3.18.93-4.5.6-1.34 1.5-2.47 2.62-3.22.25-.17.5-.3.76-.4.25-.1.5-.16.76-.2 1.32-.2 2.66-.3 4.14-.3.95 0 2.2-.05 3.53-.2 1.33-.14 2.87-.38 4.25-.52.07-.63.18-1.23 0 0z" />
      <path d="M14.01 15.43c-.15-.03-2.3-.08-4.06-.02-1.76.06-2.66.25-3.7.5-.28.08-1.34.45-1.48.52-.5.18-1.1.42-1.66.72-.32.18-.66.44-.8.57-.15.14-.4.36-.48.56-.14.3-.18.58-.16.8.03.26.3.93.4.98.08.06.02.13-.05.2-1.31.5-2.52 1.12-3.98 2.18-.31.23-.31.23-.66.56-.35.32-.7.68-1.1 1.11-.4.42-.8.85-.8.85v3.92c0 1.86 2.37 3.98 4.18 5.07 1.81 1.09 2.58 1.46 4.38 1.46.72 0 1.3-.06 1.8-.15 1.18-.21 2.1-.47 3.13-.8.4-.13 1.2-.42 1.53-.6.08-.04.2-.05.28-.1.07-.05.2-.13.26-.2.3-.22.55-.45.76-.63.23-.22.54-.51.74-.72.2-.2.38-.38.53-.57.15-.2.36-.38.4-.41.03-.04.05-.1.23-.4 1.75-3.05 4.26-5.7 6.5-7.95.07-.07.13-.14.18-.2 0 0 0 0 0 0 0 0 .06-.58-.1-1.26-2.62-.03-.09-.23-.46-.47-.82-.04-.04-.1-.1-.16-.15z" />
    </svg>
  ),
};

export default function Footer() {
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
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">{SITE.description}</p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">Navigasi</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="btn-focus hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">Lainnya</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {NAV_LINKS.slice(4).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="btn-focus hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">Kontak</h4>
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
          <p>&copy; {new Date().getFullYear()} {SITE.name}. Seluruh hak cipta dilindungi.</p>
          <p>Didirikan sejak {SITE.foundedYear} &middot; Kabupaten Cianjur, Jawa Barat</p>
        </Container>
      </div>
    </footer>
  );
}
