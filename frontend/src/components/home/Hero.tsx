"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { SITE } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";

const HERO_IMAGES = ["/images/carausel/carausel.webp"];
const HERO_BLUR =
  "data:image/webp;base64,UklGRhIBAABXRUJQVlA4IAYBAAAQBgCdASogABMAPxFwr1AsJiQisAgBgCIJYwDE3a+YyuOTqZJeCEHn6Tw9g6O002od/QdGX00c78AA/tc6GZ83hej0ct14+vgc8YBW/LarOJ1d7TTQCOJmw9qz483NG3gxGI4kQw3R4tBpedDUlYGzWQiCQx2TLcSg6v9VGgD/XEIerz2w13XQfz8pDHgc15TloS+gqwrIq++zeV76J3AhVvLaKqyUCzfhPaWnMJiWEXhy+C5NaJC4+t+Ib6GQxgUaj/SfZZLq8KakQ4lkAqtbflUxY9uKPGEiloyA2Kq2ue53JVYHEPNPnGcXIqvnG32Dc6WyKGK4xHGYEugmQYYJP/giQAAA";


export default function Hero() {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative -mt-16 flex min-h-screen items-center overflow-hidden bg-ink text-white pt-20 lg:pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-stamp-lines opacity-10 mix-blend-overlay" />
      <div className="absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((src, idx) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
                                              <Image
              src={src}
              alt={`${SITE.name} hero background ${idx + 1}`}
              fill
              sizes="100vw"
              loading={idx === 0 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL={HERO_BLUR}
              quality={75}
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {/* Gradasi Hitam (Kiri) ke Transparan (Kanan) */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-black from-20% via-black/70 to-transparent pointer-events-none" />

      {/* Carousel Controls */}
      <div className="absolute bottom-8 right-8 z-20 hidden items-center gap-3 lg:flex">
        <button
          onClick={prev}
          className="btn-focus flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          aria-label={t("hero.slidePrev")}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="btn-focus flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          aria-label={t("hero.slideNext")}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:hidden">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`btn-focus h-2 rounded-full transition-all ${
              idx === current ? "w-6 bg-white" : "w-2 bg-white/40"
            }`}
            aria-label={t("hero.gotoSlide", { n: idx + 1 })}
          />
        ))}
      </div>

      <Container className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
        {/* Kolom Kiri: Tipografi & CTA */}
        <div className="flex flex-col justify-center lg:pr-8">
          <span className="text-sm font-semibold tracking-widest text-white/70 uppercase mb-4">
            {t("hero.eyebrow")}
          </span>

          <h1 className="text-[2.6rem] font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.5rem] uppercase">
            <span className="block">{t("hero.line1")}</span>
            <span className="block">{t("hero.line2")}</span>
            <span className="block text-primary-light mt-2">{t("hero.line3")}</span>
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-white/60">{t("hero.supportedBy")}</span>
            <div className="text-xl font-bold italic tracking-tighter text-white">IKAPEKSI</div>
          </div>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80">
            {t("hero.description", { name: SITE.fullName })}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
            <Button href="/pendataan" size="lg" className="btn-shine !rounded-full px-8 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40">
              {t("hero.daftar")}
            </Button>
            <Button
              href="https://wa.me/62895391685825"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
              className="group relative overflow-hidden !rounded-full border-white/40 text-white hover:border-[#25D366] hover:text-white px-8 font-semibold"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-[101%] bg-[#25D366] transition-transform duration-300 ease-out group-hover:translate-x-0"
              />
              <svg
                className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.347-.272.273-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="relative z-10">{t("hero.konsultasi")}</span>
            </Button>
          </div>
        </div>

        {/* Kolom Kanan: placeholder untuk carousel background */}
        <div className="relative mx-auto flex h-auto w-full justify-center lg:justify-end pointer-events-none">
          <div className="absolute bottom-0 w-[120%] h-[110%] max-w-[800px] -mr-8 lg:-mr-16" />
        </div>
      </Container>
    </section>
  );
}