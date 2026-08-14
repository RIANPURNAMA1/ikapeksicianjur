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
  "/alumni": "nav.alumni",
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

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          scrolled
            ? "border-paper-line bg-white/95 backdrop-blur shadow-sm"
            : pathname === "/"
              ? "border-transparent bg-transparent"
              : "border-transparent bg-ink"
        )}
      >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 xl:gap-6">
          {/* =========================
              LOGO / BRAND
          ========================== */}
          <Link
            href="/"
            className="btn-focus flex shrink-0 items-center gap-2.5"
          >
            {/* Logo */}
            <Image
              src={scrolled ? "/images/logo/logo1.png" : "/images/logo/logo2.jpg"}
              alt={`${SITE.name} logo`}
              width={480}
              height={156}
              className="h-9 w-auto object-contain transition-all duration-300 xl:h-10"
            />
          </Link>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}
          <nav className="hidden h-full items-center gap-4 lg:flex xl:gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const label = t(NAV_LABEL_KEY[link.href] ?? "nav.beranda");
              const disabled = link.href !== "/";

              const baseClasses = cn(
                "group relative h-full flex items-center text-[13px] font-medium transition-colors duration-200 xl:text-sm",
                isActive
                  ? scrolled
                    ? "text-primary"
                    : "text-white"
                  : scrolled
                    ? "text-ink/60 group-hover:text-primary"
                    : "text-white/70 group-hover:text-white",
                disabled && "pointer-events-none"
              );

              const underline = (
                <span
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-[2px] origin-left rounded-full bg-primary transition-transform duration-300 ease-out",
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              );

              if (disabled) {
                return (
                  <span key={link.href} className={baseClasses}>
                    {label}
                    {underline}
                  </span>
                );
              }

              return (
                <Link
                  key={link.href}
                  href="/"
                  className={baseClasses}
                >
                  {label}
                  {underline}
                </Link>
              );
            })}
          </nav>

          {/* =========================
              RIGHT ACTION
          ========================== */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher onDark={!scrolled} />
            <Link
              href="/pendataan"
              className={cn(
                "btn-shine btn-focus inline-flex items-center justify-center gap-2",
                "rounded-full px-4 py-2",
                "bg-primary text-[13px] font-semibold text-white",
                "transition-all duration-200 xl:px-5 xl:py-2.5 xl:text-sm",
                "hover:bg-primary-dark hover:shadow-md"
              )}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {t("nav.gabungAlumni")}
            </Link>
          </div>

          {/* =========================
              MOBILE: LANGUAGE SWITCHER + HAMBURGER
          ========================== */}
          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <LanguageSwitcher onDark={!scrolled} />
            <button
              onClick={toggle}
              aria-label={t("nav.bukaMenu")}
              aria-expanded={isOpen}
              className={cn(
                "btn-focus flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                "transition-colors",
                scrolled
                  ? "text-ink/70 hover:text-ink hover:bg-ink/5"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              <svg
                className="h-5 w-5"
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
            </button>
          </div>
        </div>
      </Container>
      </header>

      {/* Mobile Navigation */}
      <MobileMenu
        isOpen={isOpen}
        onClose={close}
      />
    </>
  );
}
