"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { useScroll } from "@/hooks/useScroll";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { isOpen, toggle, close } = useMobileMenu();
  const scrolled = useScroll();
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-paper-line bg-white/95 backdrop-blur shadow-sm"
          : "border-transparent bg-ink"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          {/* =========================
              LOGO / BRAND
          ========================== */}
          <Link
            href="/"
            className="btn-focus flex shrink-0 items-center gap-2.5"
          >
            {/* Logo */}
            <Image
              src="/images/logo/logo.png"
              alt={`${SITE.name} logo`}
              width={480}
              height={156}
              className={cn(
                "h-10 w-auto object-contain transition-all duration-300",
                !scrolled && "brightness-0 invert"
              )}
            />
            {/* Brand */}
            <div className={cn("leading-tight", scrolled ? "text-ink" : "text-white")}>
              <div className="text-base font-bold">{SITE.name}</div>
              {SITE.tagline && (
                <div className={cn("text-[10px] font-medium uppercase tracking-wider", scrolled ? "text-ink/50" : "text-white/50")}>
                  {SITE.tagline}
                </div>
              )}
            </div>
          </Link>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}
          <nav className="hidden h-full items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative h-full flex items-center text-sm font-medium transition-colors duration-200",
                    active
                      ? scrolled
                        ? "text-primary"
                        : "text-white"
                      : scrolled
                        ? "text-ink/60 hover:text-primary"
                        : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                  {/* Active underline */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-primary transition-all duration-300",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* =========================
              RIGHT ACTION
          ========================== */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/kontak"
              className={cn(
                "btn-focus inline-flex items-center justify-center gap-2",
                "rounded-lg px-5 py-2.5",
                "bg-primary text-sm font-semibold text-white",
                "transition-all duration-200",
                "hover:bg-primary-dark hover:shadow-sm"
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
              Gabung Alumni
            </Link>
          </div>

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}
          <button
            onClick={toggle}
            aria-label="Buka menu"
            aria-expanded={isOpen}
            className={cn(
              "btn-focus flex h-10 w-10 shrink-0 items-center justify-center",
              "transition-colors lg:hidden",
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
      </Container>

      {/* Mobile Navigation */}
      <MobileMenu
        isOpen={isOpen}
        onClose={close}
      />
    </header>
  );
}
