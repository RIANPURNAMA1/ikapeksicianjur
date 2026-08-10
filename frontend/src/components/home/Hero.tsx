"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { SITE } from "@/lib/constants";

const HERO_IMAGES = [
  "https://picsum.photos/seed/ikapeksi-hero-1/1200/1000",
  "https://picsum.photos/seed/ikapeksi-hero-2/1200/1000",
  "https://picsum.photos/seed/ikapeksi-hero-3/1200/1000",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

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
    <section className="relative overflow-hidden bg-ink text-white pt-20 lg:pt-28 pb-0">
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
              idx === current ? "opacity-[0.05]" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`${SITE.name} hero background ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 right-8 z-20 hidden items-center gap-3 lg:flex">
        <button
          onClick={prev}
          className="btn-focus flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          aria-label="Slide sebelumnya"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="btn-focus flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          aria-label="Slide selanjutnya"
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
            aria-label={`Ke slide ${idx + 1}`}
          />
        ))}
      </div>

      <Container className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-8">
        {/* Kolom Kiri: Tipografi & CTA */}
        <div className="flex flex-col justify-center pb-20 lg:pb-32 lg:pr-8">
          <span className="text-sm font-semibold tracking-widest text-white/70 uppercase mb-4">
            Sejak {SITE.foundedYear} &middot; Kabupaten Cianjur
          </span>

          <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.5rem] uppercase">
            <span className="block">Satu Paspor</span>
            <span className="block">Pengalaman,</span>
            <span className="block text-primary-light mt-2">Seribu Langkah</span>
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-white/60">Didukung oleh</span>
            <div className="text-xl font-bold italic tracking-tighter text-white">IKAPEKSI</div>
          </div>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80">
            {SITE.fullName} menghimpun alumni pemagangan kerja luar negeri asal Cianjur untuk terus tumbuh,
            berbagi ilmu, dan membangun kampung halaman bersama.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/alumni" size="lg" className="rounded-full px-8 font-semibold shadow-lg shadow-primary/20">
              Gabung Program
            </Button>
            <Button
              href="/tentang"
              variant="outline"
              size="lg"
              className="rounded-full border-white/40 text-white hover:bg-white hover:text-ink px-8 font-semibold flex items-center gap-2 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.347-.272.273-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Konsultasi Gratis
            </Button>
          </div>
        </div>

        {/* Kolom Kanan: placeholder untuk carousel background */}
        <div className="relative mx-auto w-full h-[400px] sm:h-[500px] lg:h-[650px] flex justify-center lg:justify-end pointer-events-none">
          <div className="absolute bottom-0 w-[120%] h-[110%] max-w-[800px] -mr-8 lg:-mr-16" />
        </div>
      </Container>
    </section>
  );
}
