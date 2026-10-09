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

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",

        scrolled
          ? "border-b border-black/[0.06] bg-white/95 shadow-sm backdrop-blur-md"
          : "border-b border-white/[0.05] bg-[#0a0304]/95 backdrop-blur-md"
      )}
    >
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-6">

          {/* =========================================
              LEFT SECTION
              LOGO + NAVIGATION
              ========================================= */}
          <div className="flex h-full items-center gap-8 lg:gap-12">

            {/* LOGO */}
            <Link
              href="/"
              className="btn-focus flex shrink-0 items-center"
            >
              <Image
                src={scrolled ? "/images/logo/logo1.png" : "/images/logo/logo2.png"}
                alt={`${SITE.name} logo`}
                width={160}
                height={52}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>

            {/* =========================================
                DESKTOP NAVIGATION
                ========================================= */}
            <nav className="hidden h-full items-center gap-6 lg:flex">
              {NAV_LINKS.map((link) => {
                const disabled = !enabledNav.has(link.href);

                if (disabled) {
                  return (
                    <span
                      key={link.href}
                      className={cn(
                        "flex h-full cursor-not-allowed items-center text-[15px] font-medium",
                        scrolled ? "text-[#0a0304]/30" : "text-white/40"
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
                    className={cn(
                      "group relative flex h-full items-center text-[15px] font-medium transition-colors duration-200",

                      active
                        ? scrolled
                          ? "text-[#0a0304]"
                          : "text-white"
                        : scrolled
                          ? "text-[#0a0304]/60 hover:text-[#C62930]"
                          : "text-white/70 hover:text-white"
                    )}
                  >
                    {t(NAV_LABEL_KEY[link.href] ?? "nav.beranda")}

                    {/* Arrow */}
                    <svg
                      className={cn(
                        "ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:rotate-180",
                        active
                          ? "opacity-100"
                          : "opacity-60"
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>

                    {/* Active underline */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-[#C62930] transition-all duration-300",

                        active
                          ? "scale-x-100 opacity-100"
                          : "scale-x-75 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* =========================================
              RIGHT SECTION
              ========================================= */}
          <div className="hidden items-center gap-4 lg:flex">

            {/* =====================================
                LANGUAGE SWITCHER
                🇮🇩 / 🇯🇵
                ===================================== */}
            <LanguageSwitcher onDark={!scrolled} />

            {/* =====================================
                CTA
                ===================================== */}
            <Link
              href="/pendataan"
              className={cn(
                "btn-focus inline-flex items-center justify-center gap-2",
                "rounded-full px-6 py-2.5",
                "bg-[#C62930] text-sm font-semibold text-white",
                "transition-all duration-300",
                "hover:-translate-y-0.5",
                "hover:bg-[#a52127]",
                "hover:shadow-lg hover:shadow-[#C62930]/30"
              )}
            >
              {/* User Plus Icon */}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

          {/* =========================================
              MOBILE MENU BUTTON
              ========================================= */}
          <button
            onClick={toggle}
            aria-label={isOpen ? t("nav.tutupMenu") : t("nav.bukaMenu")}
            aria-expanded={isOpen}
            className={cn(
              "btn-focus flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              "transition-all duration-300 lg:hidden",

              scrolled
                ? "text-[#0a0304]/70 hover:bg-black/5 hover:text-[#0a0304]"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
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

    {/* =========================================
        MOBILE NAVIGATION
        Dirender di luar <header> agar tidak terkurung oleh
        backdrop-filter (containing block) pada header sticky.
        ========================================= */}
    <MobileMenu isOpen={isOpen} onClose={close} />
    </>
  );
}