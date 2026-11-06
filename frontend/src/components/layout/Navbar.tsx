"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { useScroll } from "@/hooks/useScroll";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

/*
  Token warna:
  merah   #E3202B (hover #C62930)
  ink     #0A0304
  muted   #4B5563
  garis   #E5E7EB

  Mode navbar:
  - overlay : di beranda & belum di-scroll -> transparan + scrim halus,
              teks putih, menyatu dengan background hero
  - solid   : setelah scroll / halaman lain -> putih
*/

const NAV_LABEL_KEY: Record<string, string> = {
  "/": "nav.beranda",
  "/tentang": "nav.tentang",
  "/program": "nav.program",
  "/alumni": "nav.alumniNav",
  "/kegiatan": "nav.kegiatan",
  "/berita": "nav.berita",
  "/galeri": "nav.galeri",
  "/kontak": "nav.kontak",
};

export default function Navbar() {
  const { isOpen, toggle, close } = useMobileMenu();
  const scrolled = useScroll();
  const pathname = usePathname();
  const { t } = useLanguage();
  const enabledNav = new Set(["/", "/tentang"]);

  // Transparan hanya di beranda saat posisi paling atas
  const overlay = pathname === "/" && !scrolled;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-300",
          overlay
            ? "border-b border-transparent bg-transparent"
            : scrolled
              ? "border-b border-[#E5E7EB] bg-[#FFFFFF]/85 shadow-[0_12px_32px_-24px_rgba(10,3,4,0.45)] backdrop-blur-xl"
              : "border-b border-[#E5E7EB]/70 bg-[#FFFFFF]"
        )}
      >
        {/* Scrim transparan agar teks tetap terbaca di atas foto hero */}
        {overlay && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A0304]/55 via-[#0A0304]/15 to-transparent"
          />
        )}

        <Container size="wide" className="relative">
          <div className="flex h-[72px] items-center justify-between gap-4 sm:gap-6">
            {/* LEFT: LOGO + NAVIGATION */}
            <div className="flex h-full min-w-0 items-center gap-6 xl:gap-10">
              {/* LOGO (logo2 putih saat overlay, logo1 normal saat solid) */}
              <Link
                href="/"
                className="btn-focus flex shrink-0 items-center"
              >
                <Image
                  src={
                    overlay
                      ? "/images/logo/logo2.png"
                      : "/images/logo/logo1.png"
                  }
                  alt={`${SITE.name} logo`}
                  width={160}
                  height={52}
                  className="h-10 w-auto object-contain transition-opacity duration-300"
                  priority
                />
              </Link>

              {/* DESKTOP NAVIGATION */}
              <nav className="hidden h-full items-stretch gap-5 lg:flex xl:gap-7">
                {NAV_LINKS.map((link) => {
                  const disabled = !enabledNav.has(link.href);

                  if (disabled) {
                    return (
                      <span
                        key={link.href}
                        className={cn(
                          "inline-flex h-full cursor-not-allowed items-center whitespace-nowrap border-b-2 border-transparent text-[14px] font-semibold tracking-[0.02em] transition-colors duration-300",
                          overlay ? "text-[#FFFFFF]/40" : "text-[#4B5563]/40"
                        )}
                      >
                        {t(NAV_LABEL_KEY[link.href] ?? "nav.beranda")}
                      </span>
                    );
                  }

                  const active =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex h-full items-center whitespace-nowrap border-b-2 text-[14px] tracking-[0.02em] transition-colors duration-200",
                        active
                          ? cn(
                              "border-[#E3202B] font-bold",
                              overlay ? "text-[#FFFFFF]" : "text-[#E3202B]"
                            )
                          : overlay
                            ? "border-transparent font-semibold text-[#FFFFFF]/85 hover:text-[#FFFFFF]"
                            : "border-transparent font-semibold text-[#4B5563] hover:text-[#0A0304]"
                      )}
                    >
                      {t(NAV_LABEL_KEY[link.href] ?? "nav.beranda")}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* RIGHT */}
            <div className="hidden items-center gap-4 lg:flex">
              {/* LANGUAGE SWITCHER */}
              <LanguageSwitcher onDark={overlay} />

              {/* CTA */}
              <Link
                href="/pendataan"
                className={cn(
                  "btn-focus inline-flex items-center justify-center gap-2",
                  "rounded-full px-6 py-2.5",
                  "bg-[#E3202B] text-[14px] font-semibold tracking-[0.02em] text-[#FFFFFF] shadow-sm",
                  "transition-colors duration-200 hover:bg-[#C62930]"
                )}
              >
                {/* User Plus Icon */}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0"
                  />
                </svg>

                {t("nav.gabungAlumni")}
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={toggle}
              aria-label={isOpen ? t("nav.tutupMenu") : t("nav.bukaMenu")}
              aria-expanded={isOpen}
              className={cn(
                "btn-focus flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                "transition-colors duration-200 lg:hidden",
                overlay
                  ? "text-[#FFFFFF] hover:bg-[#FFFFFF]/10"
                  : "text-[#0A0304]/70 hover:bg-[#F3F4F6] hover:text-[#0A0304]"
              )}
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M6 18L18 6"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* MOBILE NAVIGATION (di luar <header> agar tidak terkurung backdrop-filter) */}
      <MobileMenu isOpen={isOpen} onClose={close} />
    </>
  );
}