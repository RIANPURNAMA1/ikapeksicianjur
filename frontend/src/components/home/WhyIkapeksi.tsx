"use client";

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
    // Hapus py-24 di sini agar garis vertikal bisa menyentuh ujung paling atas dan bawah
    <section className="relative overflow-hidden text-white">
      {/* Pattern Latar Belakang */}
      <div
        className="absolute inset-0 bg-grid-squares bg-[length:24px_24px] opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 60%, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 60%, black 100%)",
        }}
      />

      {/* 
        GRID UTAMA (3 KOLOM):
        Menciptakan garis pinggir (vertikal) di kiri dan kanan layar yang menyambung.
      */}
      <div className="relative z-10 flex w-full border-t border-white/10">
        
        {/* Kolom 1: Ruang Kosong Kiri (Garis Vertikal Kiri) */}
        {/* Lebarnya disamakan dengan padding lg:pl-[10%] pada section Tentang */}
        <div className="border-stripe-r hidden md:block w-[3%] lg:w-[4%] xl:w-[10%] 2xl:w-[15%] bg-white/[0.02] backdrop-blur-sm shrink-0" />

        {/* Kolom 2: Konten Tengah — border kiri & kanan kini dipegang oleh kolom gutter, sama seperti section lain */}
        <div className="flex-1 w-full flex flex-col">
          
          {/* =========================================
              HEADER SECTION
              ========================================= */}
          <div className="px-6 py-20 lg:py-24 flex flex-col items-center text-center">
            <Reveal>
              <span className="inline-flex items-center text-xs font-bold tracking-[0.15em] text-[#e8555c]">
                {t("why.eyebrow")}
              </span>

              <h2 className="mt-6 font-mona text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
                {t("why.title")}
              </h2>

              <p className="mt-5 text-base leading-relaxed text-white/60 max-w-2xl mx-auto">
                {t("why.subtitle")}
              </p>
            </Reveal>
          </div>

          {/* =========================================
              GRID KARTU ALASAN (2x2)
              ========================================= */}
          {/* Ada border-t pemisah antara Teks Header dan Kartu di bawahnya */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/10 bg-white/[0.01] backdrop-blur-sm">
            {reasons.map((reason, idx) => {
              // Logika penempatan garis pembatas (border) agar tidak dobel/tumpang tindih
              const borderClasses = `
                border-white/10 
                ${idx === 0 ? "border-b md:border-r" : ""}
                ${idx === 1 ? "border-b" : ""}
                ${idx === 2 ? "border-b md:border-b-0 md:border-r" : ""}
              `;

              return (
                <div 
                  key={reason.titleKey} 
                  className={`group relative flex flex-col p-8 sm:p-12 transition-colors duration-500 hover:bg-white/[0.03] ${borderClasses}`}
                >
                  <Reveal delay={idx * 100} className="h-full flex flex-col">
                    {/* Header Kartu */}
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-sm font-black text-white/50 transition-all duration-500 group-hover:bg-[#C62930]/20 group-hover:border-[#C62930]/50 group-hover:text-[#C62930] group-hover:shadow-[0_0_20px_rgba(198,41,48,0.3)]">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 transition-colors duration-500 group-hover:text-[#C62930]/80">
                        {t("why.reasonLabel")}
                      </span>
                    </div>

                    {/* Konten Kartu */}
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-mona text-xl font-bold text-white/80 transition-colors duration-300 group-hover:text-white">
                        {t(reason.titleKey)}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70">
                        {t(reason.descKey)}
                      </p>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>

        </div>

        {/* Kolom 3: Ruang Kosong Kanan (Garis Vertikal Kanan) */}
        <div className="border-stripe-l hidden md:block w-[3%] lg:w-[4%] xl:w-[10%] 2xl:w-[15%] bg-white/[0.02] backdrop-blur-sm shrink-0" />
      
      </div>
    </section>
  );
}