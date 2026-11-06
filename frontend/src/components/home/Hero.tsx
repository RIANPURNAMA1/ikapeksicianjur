"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { SITE } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";

/*
  Token warna:
  merah     #E3202B  (hover #C62930, teks badge #BB001A, tint #FFDAD6)
  kuning    #FEDC00
  hijau     #00873C
  ink       #0A0304
  muted     #4B5563
  garis     #E5E7EB
  surface   #F9FAFB / #F3F4F6

  Parallax:
  --p  : progres scroll hero, 0 (di atas) -> 1 (hero keluar layar)
  --mx : posisi kursor horizontal, -1 -> 1
  --my : posisi kursor vertikal,   -1 -> 1
*/

const SLIDES = [
  {
    src: "/images/carausel/hero.jpg",
    alt: "Alumni pemagangan Jepang IKAPEKSI Cianjur",
  },
];

const AUTOPLAY_MS = 6000;

const STATS: {
  value: string;
  label: string;
  desc: string;
  red: boolean;
  icon: ReactNode;
}[] = [
  {
    value: "32",
    label: "Kecamatan",
    desc: "",
    red: false,
    icon: (
      <>
        <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  {
    value: "354",
    label: "Desa",
    desc: "",
    red: false,
    icon: (
      <>
        <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    value: "4 Pilar",
    label: "Pemberdayaan",
    desc: "Berkelanjutan bagi Anggota",
    red: false,
    icon: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 13 9 5 9-5" />
      </>
    ),
  },
  {
    value: "Resmi",
    label: "Struktur Sah",
    desc: "Di bawah Pengurus Jawabarat & Pengurus Pusat",
    red: false,
    icon: (
      <>
        <path d="M3 21h18M5 21V4h9v17M14 9h5v12" />
        <path d="M8 8h2M8 12h2M8 16h2" />
      </>
    ),
  },
];

/* Animasi masuk bertahap (hanya opacity + translate, GPU friendly) */
const ENTER =
  "opacity-0 translate-y-6 animate-[heroIn_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:animate-none";

function delay(ms: number): CSSProperties {
  return { animationDelay: `${ms}ms` };
}

/* Hitung naik dari 0 ke angka tujuan. Teks tanpa angka (mis. "Resmi") tampil apa adanya. */
function CountUp({
  value,
  run,
  delayMs = 0,
  duration = 1800,
}: {
  value: string;
  run: boolean;
  delayMs?: number;
  duration?: number;
}) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!match || !run) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setN(target);
      return;
    }

    let raf = 0;
    let startTime = 0;
    const easeOutExpo = (x: number) =>
      x === 1 ? 1 : 1 - Math.pow(2, -10 * x);

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      setN(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, target, delayMs, duration]);

  if (!match) return <>{value}</>;

  return (
    <span className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Autoplay carousel
  useEffect(() => {
    if (SLIDES.length < 2) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      AUTOPLAY_MS
    );
    return () => window.clearInterval(id);
  }, []);

  // Mulai hitung saat strip statistik terlihat (sekali saja)
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Parallax: scroll + mouse -> CSS variable (tanpa re-render React)
  useEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    if (!root || !hero) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

    let raf = 0;
    let targetMx = 0;
    let targetMy = 0;
    let curMx = 0;
    let curMy = 0;

    const update = () => {
      raf = 0;

      const h = hero.offsetHeight || 1;
      const p = Math.min(Math.max(window.scrollY / h, 0), 1);
      root.style.setProperty("--p", p.toFixed(4));

      curMx += (targetMx - curMx) * 0.08;
      curMy += (targetMy - curMy) * 0.08;
      root.style.setProperty("--mx", curMx.toFixed(4));
      root.style.setProperty("--my", curMy.toFixed(4));

      if (
        Math.abs(targetMx - curMx) > 0.001 ||
        Math.abs(targetMy - curMy) > 0.001
      ) {
        raf = requestAnimationFrame(update);
      }
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      targetMx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      request();
    };

    const onLeave = () => {
      targetMx = 0;
      targetMy = 0;
      request();
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    if (canHover.matches) {
      hero.addEventListener("mousemove", onMouse);
      hero.addEventListener("mouseleave", onLeave);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      hero.removeEventListener("mousemove", onMouse);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative -mt-[72px] w-full bg-[#FFFFFF] font-jakarta text-[#0A0304] antialiased"
      style={{ "--p": 0, "--mx": 0, "--my": 0 } as CSSProperties}
    >
      <style>{`
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ============ HERO (background carousel) ============ */}
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden bg-[#0A0304] pb-36 pt-32 lg:pb-44 lg:pt-40"
      >
        {/* LAYER 1: Gambar + parallax */}
        <div
          className="absolute -inset-x-6 -inset-y-10 will-change-transform"
          style={{
            transform:
              "translate3d(calc(var(--mx) * -14px), calc(var(--p) * 140px + var(--my) * -10px), 0) scale(calc(1.08 + var(--p) * 0.12))",
          }}
          aria-hidden="true"
        >
          {SLIDES.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover object-center transition-opacity duration-1000 ease-out motion-reduce:transition-none ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* LAYER 2: Gradasi hitam (kiri) -> merah transparan (kanan) */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0A0304]/95 via-[#0A0304]/85 to-[#E3202B]/40"
          aria-hidden="true"
        />

        {/* Pola titik halus */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_right,black,transparent_70%)]"
          aria-hidden="true"
        />

        {/* LAYER 3: Gelap bertambah seiring scroll */}
        <div
          className="pointer-events-none absolute inset-0 bg-[#0A0304]"
          style={{ opacity: "calc(var(--p) * 0.55)" }}
          aria-hidden="true"
        />

        {/* LAYER 4: Cahaya merah mengikuti kursor */}
        <div
          className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-[#E3202B]/25 blur-[110px] will-change-transform motion-reduce:hidden"
          style={{
            transform:
              "translate3d(calc(var(--mx) * 40px), calc(var(--p) * -60px + var(--my) * 30px), 0)",
          }}
          aria-hidden="true"
        />

        {/* Gradasi bawah */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A0304]/60 to-transparent"
          aria-hidden="true"
        />

        {/* LAYER 5: Konten */}
        <div
          className="will-change-transform"
          style={{
            transform: "translate3d(0, calc(var(--p) * 70px), 0)",
            opacity: "calc(1 - var(--p) * 0.9)",
          }}
        >
          <Container size="wide" className="relative z-10">
            {/* Eyebrow */}
            <div className={`mb-7 ${ENTER}`} style={delay(100)}>
              <span className="inline-flex items-center gap-2.5 py-2 text-[11px] font-bold uppercase leading-4 tracking-[0.14em] text-[#FFFFFF]/90 backdrop-blur-md sm:text-[12px]">
                {t("hero.eyebrow")}
              </span>
            </div>

            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="flex flex-col lg:col-span-7">
                <h1
                  className={`text-[36px] font-extrabold leading-[42px] tracking-[-0.04em] text-[#FFFFFF] sm:text-[48px] sm:leading-[56px] lg:text-[60px] lg:leading-[66px] ${ENTER}`}
                  style={delay(220)}
                >
                  <span className="block">{t("hero.line1")}</span>
                  <span className="block text-[#FEDC00]">
                    {t("hero.line2")}
                  </span>
                  <span className="block">{t("hero.line3")}</span>
                </h1>

                <p
                  className={`mt-6 max-w-xl text-[16px] font-normal leading-[27px] tracking-[-0.01em] text-[#FFFFFF]/85 sm:text-[18px] sm:leading-[29px] ${ENTER}`}
                  style={delay(360)}
                >
                  {t("hero.description", { name: SITE.fullName })}
                </p>

                {/* CTA */}
                <div
                  className={`mt-8 flex flex-wrap items-center gap-4 ${ENTER}`}
                  style={delay(500)}
                >
                  <Button
                    href="/pendataan"
                    className="group/btn inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#E3202B] px-6 py-3.5 text-[15px] font-semibold tracking-[-0.01em] text-[#FFFFFF] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C62930] hover:shadow-[0_10px_24px_-6px_rgba(227,32,43,0.6)] motion-reduce:transition-none"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                      <rect x="9" y="3" width="6" height="4" rx="1" />
                      <path d="m9 14 2 2 4-4" />
                    </svg>
                    {t("hero.daftar")}
                  </Button>

                </div>

                {/* Didukung oleh IKAPEKSI Indonesia */}
                <div
                  className={`mt-8 flex items-center gap-4 border-t border-[#FFFFFF]/15 pt-6 ${ENTER}`}
                  style={delay(780)}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#FFFFFF]/20 bg-[#FFFFFF]/10 text-[#FEDC00] backdrop-blur-md">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase leading-4 tracking-[0.18em] text-[#FFFFFF]/60">
                      Didukung oleh
                    </p>
                    <p className="text-[16px] font-bold leading-6 tracking-[-0.02em] text-[#FFFFFF]">
                      IKAPEKSI Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Indikator carousel (di luar wadah parallax agar posisinya stabil) */}
        {SLIDES.length > 1 && (
          <div
            className="absolute bottom-28 right-4 z-10 flex items-center gap-2 sm:right-6 lg:bottom-32 lg:right-10"
            role="tablist"
            aria-label="Pilih slide"
          >
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                  i === active
                    ? "w-8 bg-[#E3202B]"
                    : "w-5 bg-[#FFFFFF]/50 hover:bg-[#FFFFFF]/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ============ STRIP STATISTIK ============ */}
      <Container size="wide" className="relative z-20 -mt-20 pb-16 lg:pb-20">
        <div
          ref={statsRef}
          className={`grid grid-cols-2 overflow-hidden rounded-2xl bg-[#FFFFFF] shadow-[0_16px_40px_-12px_rgba(10,3,4,0.25)] will-change-transform sm:grid-cols-4 ${ENTER}`}
          style={{
            ...delay(900),
            translate: "0 calc(var(--p) * -36px)",
          }}
        >
          {STATS.map((s, idx) => (
            <div
              key={s.label}
              className={`group relative px-5 py-6 transition-colors duration-300 hover:bg-[#F9FAFB] motion-reduce:transition-none lg:px-8 lg:py-7 ${
                idx > 0 ? "sm:border-l sm:border-[#E5E7EB]" : ""
              } ${idx % 2 === 1 ? "border-l border-[#E5E7EB] sm:border-l" : ""} ${
                idx >= 2 ? "border-t border-[#E5E7EB] sm:border-t-0" : ""
              }`}
            >
              {/* Garis aksen merah saat hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#E3202B] transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />

              <div className="flex items-start justify-between gap-3">
                <div
                  className={`text-[30px] font-extrabold leading-[38px] tracking-[-0.04em] sm:text-[38px] sm:leading-[46px] ${
                    s.red ? "text-[#E3202B]" : "text-[#0A0304]"
                  }`}
                >
                  <CountUp
                    value={s.value}
                    run={statsVisible}
                    delayMs={idx * 120 + 900}
                  />
                </div>
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#0A0304] transition-colors duration-300 group-hover:bg-[#E3202B] group-hover:text-[#FFFFFF] motion-reduce:transition-none">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {s.icon}
                  </svg>
                </span>
              </div>
              <div className="mt-1 text-[11px] font-bold uppercase leading-4 tracking-[0.04em] text-[#0A0304]">
                {s.label}
              </div>
              <div className="mt-1.5 text-[12px] font-normal leading-4 tracking-[-0.01em] text-[#4B5563]">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}