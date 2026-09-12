"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";
import { ReactNode } from "react";

const STRUCTURE_PATHS = {
  nasional: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 10h.01M15 10h.01M9 14h.01M15 14h.01",
  provinsi: "M9 20l-5.5-3V4L9 7l6-3 5.5 3v13L15 17l-6 3zm0 0V7m6 10V4",
  kabupaten: "M3 10.5L12 3l9 7.5M5 10v10h14V10M9.5 20v-6h5v6",
} as const;

function StructureIcon({ type }: { type: keyof typeof STRUCTURE_PATHS }) {
  return (
    <svg 
      className="h-4 w-4" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={1.8} 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={STRUCTURE_PATHS[type]} />
    </svg>
  );
}

function TimelineItem({
  icon,
  name,
  desc,
  highlight = false,
  badge,
}: {
  icon: ReactNode;
  name: string;
  desc: string;
  highlight?: boolean;
  badge?: string;
}) {
  return (
    <li className="relative pl-12">
      <span
        className={`absolute left-0 top-1 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full transition-all duration-300 ${
          highlight
            ? "bg-gradient-to-br from-[#C62930] to-[#ff7e84] text-white shadow-[0_0_16px_rgba(198,41,48,0.55)]"
            : "border border-white/20 bg-[#16080a] text-[#e8555c]"
        }`}
      >
        {icon}
      </span>

      <div
        className={`rounded-md border px-5 py-4 transition-all duration-300 ${
          highlight
            ? "border-primary/50 bg-primary/10"
            : "border-white/10 bg-white/[0.03] hover:border-white/25"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-mona text-base font-semibold leading-tight text-white">{name}</p>
          {highlight && badge && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.12em] text-white">
              {badge}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-white/60">{desc}</p>
      </div>
    </li>
  );
}

export default function AboutPreview() {
  const { t } = useLanguage();

  return (
    <section id="tentang" className="relative scroll-mt-16 overflow-hidden bg-[linear-gradient(to_bottom,black_0%,black_25%,#0c0506_60%,#070304_100%)] text-white">

      <div className="absolute inset-0 bg-stamp-lines opacity-10 mix-blend-overlay" />

      {/* 
        GRID UTAMA (3 KOLOM):
        Sama persis seperti section WhyIkapeksi agar garis vertikal sejajar lurus.
      */}
      <div className="relative z-10 flex w-full border-t border-white/10">

        {/* Kolom 1: Ruang Kosong Kiri (Garis Vertikal Kiri) */}
        {/* bg dan backdrop-blur juga diberikan ke bagian kolom kosong agar efek glassmorphism nya nyambung */}
        <div className="border-stripe-r hidden md:block w-[3%] lg:w-[4%] xl:w-[10%] 2xl:w-[15%] bg-white/[0.02] backdrop-blur-sm shrink-0" />

        {/* Kolom 2: Konten Tengah (Bagi 2 lagi untuk Kiri-Kanan) */}
        <div className="flex-1 w-full grid lg:grid-cols-2 divide-y divide-white/15 lg:divide-y-0 lg:divide-x bg-white/[0.02] backdrop-blur-sm">

          {/* Konten Kiri (Struktur Organisasi) */}
          {/* Hapus padding persentase (pl-[10%]), ganti dengan padding fix agar rapi karena margin layar sudah diatasi kolom 1 */}
          <div className="order-2 lg:order-1 py-16 px-6 sm:px-12 lg:py-24 lg:px-10 xl:px-24 flex flex-col justify-center">
            <Reveal delay={100}>
              <div className="py-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e8555c]">
                  {t("about.structure.label")}
                </span>

                <div className="relative mt-7">
                  <span className="absolute bottom-4 left-0 top-2 w-px bg-gradient-to-b from-[#C62930]/60 via-white/20 to-[#C62930]/60" />

                  <ol className="space-y-6">
                    <TimelineItem
                      icon={<StructureIcon type="nasional" />}
                      name={t("about.structure.dpp.name")}
                      desc={t("about.structure.dpp.desc")}
                    />
                    <TimelineItem
                      icon={<StructureIcon type="provinsi" />}
                      name={t("about.structure.dpd.name")}
                      desc={t("about.structure.dpd.desc")}
                    />
                    <TimelineItem
                      icon={<StructureIcon type="kabupaten" />}
                      name={t("about.structure.dpc.name")}
                      desc={t("about.structure.dpc.desc")}
                      highlight
                      badge={t("about.structure.dpc.badge")}
                    />
                  </ol>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Konten Kanan (Teks Penjelasan) */}
          <div className="order-1 lg:order-2 flex flex-col justify-center py-16 px-6 sm:px-12 lg:py-24 lg:px-10 xl:px-24 bg-white/[0.01]">
            <Reveal delay={150}>
              <SectionHeading
                eyebrow={t("about.eyebrow")}
                title={t("about.title")}
                className="[&_h2]:font-mona [&_h2]:font-normal [&_h2]:bg-gradient-to-r [&_h2]:from-white [&_h2]:from-55% [&_h2]:to-primary [&_h2]:bg-clip-text [&_h2]:text-transparent [&_h2::after]:content-none  [&_span]:!bg-transparent  [&_span]:!border-0  [&_span]:!text-primary"
              />
            </Reveal>

            <Reveal delay={250}>
              <p className="mt-5 text-base leading-relaxed text-white/70">
                {t("about.description", { year: SITE.foundedYear, name: SITE.fullName })}
              </p>
            </Reveal>

            <Reveal delay={700}>
              <div className="mt-10">
                <Button href="/tentang" variant="outline">
                  {t("about.kenali")}
                </Button>
              </div>
            </Reveal>
          </div>

        </div>

        {/* Kolom 3: Ruang Kosong Kanan (Garis Vertikal Kanan) */}
        <div className="border-stripe-l hidden md:block w-[3%] lg:w-[4%] xl:w-[10%] 2xl:w-[15%] bg-white/[0.02] backdrop-blur-sm shrink-0" />

      </div>
    </section>
  );
}