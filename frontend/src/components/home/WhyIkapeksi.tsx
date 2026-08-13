"use client";

import Container from "@/components/layout/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n";

const reasons = [
  {
    titleKey: "why.r1.title",
    descKey: "why.r1.desc",
  },
  {
    titleKey: "why.r2.title",
    descKey: "why.r2.desc",
  },
  {
    titleKey: "why.r3.title",
    descKey: "why.r3.desc",
  },
  {
    titleKey: "why.r4.title",
    descKey: "why.r4.desc",
  },
];

export default function WhyIkapeksi() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden py-24 text-white">
      {/* Pattern Latar Belakang */}
      <div
        className="absolute inset-0 bg-grid-squares bg-[length:24px_24px] opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 60%, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 60%, black 100%)",
        }}
      />
      <Container className="relative z-10">
        {/* =========================================
            HEADER SECTION (Tanpa SectionHeading)
            ========================================= */}
        <div className="mx-auto max-w-3xl text-center mb-16 flex flex-col items-center">
          {/* Eyebrow (Teks kecil di atas) */}
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C62930]">
            {t("why.eyebrow")}
          </span>

          {/* Judul Utama */}
          <h2 className="mt-4 font-mona text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-white from-65% to-[#C62930] bg-clip-text text-transparent">
            {t("why.title")}
          </h2>

          {/* Sub-judul / Deskripsi Tambahan (Sesuai Referensi Gambar) */}
          <p className="mt-4 text-base leading-relaxed text-zinc-400 max-w-2xl">
            {t("why.subtitle")}
          </p>
        </div>

        {/* =========================================
            GRID KARTU ALASAN
            ========================================= */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, idx) => (
            <Reveal key={reason.titleKey} delay={idx * 120} className="h-full">
              <div className="doc-card group relative flex h-full flex-col rounded-xl border border-white/10 bg-[#111111] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#C62930]/50 hover:bg-[#111111] hover:shadow-[0_8px_30px_-10px_rgba(198,41,48,0.2)]">
                {/* Header Kartu: Angka (Kiri) & Label (Kanan) */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C62930]/10 border border-[#C62930]/20 text-sm font-black text-[#C62930] transition-all duration-300 group-hover:bg-[#C62930] group-hover:text-white">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 transition-colors duration-300 group-hover:text-[#C62930]/80">
                    {t("why.reasonLabel")}
                  </span>
                </div>

                {/* Konten Kartu */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-zinc-100 transition-colors duration-300 group-hover:text-white">
                    {t(reason.titleKey)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                    {t(reason.descKey)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

