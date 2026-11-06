"use client";

import Reveal from "@/components/ui/Reveal";
import Container from "@/components/layout/Container";

/*
  Token warna:
  latar section : #FFFFFF
  garis timeline: #E5E0DC
  ink           : #1A1415
  merah         : #B3101B (tint #FDE8E9)
  muted         : #4B4747

  Font: Plus Jakarta Sans (font-jakarta)
*/

type StructureLevel = {
  number: string;
  scope: string;
  name: string;
  subtitle: string;
  badge?: string;
  desc?: string;
  highlight?: boolean;
  icon: "verified" | "corporate" | "community";
};

const LEVELS: StructureLevel[] = [
  {
    number: "01",
    scope: "Nasional",
    name: "DPP IKAPEKSI",
    subtitle: "Dewan Pimpinan Pusat — Tingkat Nasional",
    icon: "verified",
  },
  {
    number: "02",
    scope: "Provinsi",
    name: "DPD Jawa Barat",
    subtitle: "Dewan Pimpinan Daerah — Tingkat Provinsi",
    icon: "corporate",
  },
  {
    number: "03",
    scope: "Lokal",
    name: "DPC Kabupaten Cianjur",
    subtitle: "Lokal",
    badge: "DPC",
    desc: "Cabang IKAPEKSI — rumah bersama alumni dan para pejuang kerja Jepang di Kabupaten Cianjur.",
    highlight: true,
    icon: "community",
  },
];

function LevelIcon({ icon }: { icon: StructureLevel["icon"] }) {
  const common = {
    className: "h-3 w-3",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (icon === "verified") {
    return (
      <svg {...common}>
        <path d="M12 3 4.5 6v5.5c0 4.4 3 8.1 7.5 9.5 4.5-1.4 7.5-5.1 7.5-9.5V6L12 3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (icon === "corporate") {
    return (
      <svg {...common}>
        <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
        <path d="M14 9h4a2 2 0 0 1 2 2v10" />
        <path d="M8 7h2M8 11h2M8 15h2M17 13h1M17 17h1" />
        <path d="M2 21h20" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function OrganizationStructureSection() {
  return (
    <section
      id="struktur"
      className="relative w-full scroll-mt-20 overflow-hidden bg-[#F9FAFB] py-16 font-jakarta text-[#1A1415] antialiased sm:py-20 lg:py-24 border border-t border-[#E5E0DC]"
    >
      <Container>
        {/* Header */}
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase leading-4 tracking-[0.18em] text-[#B3101B]">
           
            Struktur Organisasi
           
          </span>

          <h2 className=" text-[32px] font-bold leading-[38px] tracking-[-0.045em] text-[#1A1415] sm:text-[40px] sm:leading-[46px]">
            Tingkat <span className="text-[#B3101B]">DPC</span>
          </h2>

          <p className="mt-5 max-w-[620px] text-[13px] font-normal leading-[22px] text-[#4B4747] sm:text-[14px]">
            DPC Kabupaten Cianjur bernaung di bawah DPD Jawa Barat dan DPP
            IKAPEKSI. Sinergi tiga tingkat ini memastikan setiap program berjalan
            selaras dari pusat hingga ke rumah bersama alumni di Cianjur.
          </p>
        </Reveal>

        {/* Timeline */}
        <ol className="relative mx-auto mt-14 max-w-[640px] border-s border-[#E5E0DC] lg:mt-16">
          {LEVELS.map((level, idx) => (
            <li
              key={level.number}
              className={`relative ms-6 ${
                idx === LEVELS.length - 1 ? "" : "mb-10"
              }`}
            >
              {/* Ikon di garis */}
              <span
                className={`absolute start-[calc(-2.25rem-0.5px)] top-0 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white ${
                  level.highlight
                    ? "bg-[#B3101B] text-white"
                    : "bg-[#FDE8E9] text-[#B3101B]"
                }`}
              >
                <LevelIcon icon={level.icon} />
              </span>

              <Reveal delay={idx * 100}>
                <span className="inline-block rounded border border-[#E5E0DC] bg-[#F7F5F3] px-1.5 py-0.5 text-[11px] font-medium text-[#1A1415]">
                  {level.number} · {level.scope}
                </span>

                <h3 className="my-2 flex flex-wrap items-center gap-2 text-[18px] font-semibold leading-7 tracking-[-0.02em] text-[#1A1415]">
                  {level.name}
                  {level.badge && (
                    <span className="rounded border border-[#B3101B]/30 bg-[#FDE8E9] px-1.5 py-0.5 text-[11px] font-medium leading-4 text-[#B3101B]">
                      {level.badge}
                    </span>
                  )}
                </h3>

                <p className="text-[13px] font-normal leading-[22px] text-[#4B4747] sm:text-[14px]">
                  {level.subtitle}
                </p>

                {level.desc && (
                  <p className="mt-2 text-[13px] font-normal leading-[22px] text-[#4B4747] sm:text-[14px]">
                    {level.desc}
                  </p>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}