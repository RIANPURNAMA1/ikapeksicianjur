"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import Container from "@/components/layout/Container";

/*
  Token warna:
  merah   #E3202B (tint #FFDAD6)
  kuning  #FEDC00
  ink     #0A0304 / navy #111827
  muted   #4B5563
  garis   #E5E7EB
  surface #F9FAFB / #F3F4F6
*/

/* ---------- Ikon (SVG outline) ---------- */

type IconName =
  | "network"
  | "bulb"
  | "store"
  | "handshake"
  | "award"
  | "shield"
  | "users"
  | "shieldAt"
  | "building"
  | "briefcase"
  | "building2"
  | "cap"
  | "expand"
  | "exchange";

const ICONS: Record<IconName, ReactNode> = {
  network: (
    <>
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="4" r="1.5" />
      <circle cx="4.5" cy="18" r="1.5" />
      <circle cx="19.5" cy="18" r="1.5" />
      <path d="M12 6v4M10.4 13.2 5.8 16.8M13.6 13.2l4.6 3.6" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3Z" />
    </>
  ),
  store: (
    <>
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M4 9v11h16V9" />
      <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14.5-1.5 7 5-3 5 3-1.5-7" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  shieldAt: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
      <circle cx="12" cy="11" r="2.5" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
      <path d="M14 10h5a1 1 0 0 1 1 1v10" />
      <path d="M3 21h18M8 8h2M8 12h2M8 16h2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  building2: (
    <>
      <path d="M3 21V4h10v17M13 9h8v12M7 8h2M7 12h2M7 16h2M17 13h.01M17 17h.01" />
    </>
  ),
  cap: (
    <>
      <path d="M2 10l10-5 10 5-10 5-10-5z" />
      <path d="M6 12v5c0 2 2.7 3 6 3s6-1 6-3v-5" />
      <path d="M22 11v5" />
    </>
  ),
  expand: <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />,
  exchange: <path d="M17 3l4 4-4 4M21 7H8M7 21l-4-4 4-4M3 17h13" />,
};

function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

/* ---------- Data ---------- */

const PILLARS: {
  code: string;
  title: string;
  desc: string;
  footer: string;
  icon: IconName;
}[] = [
  {
    code: "P-01",
    title: "Penguatan Organisasi & Jejaring",
    desc: "Direktori alumni terverifikasi lintas 32 kecamatan di Cianjur, konsolidasi rutin pengurus, serta sinkronisasi arahan bersama DPD Jabar.",
    footer: "Database Terpadu",
    icon: "network",
  },
  {
    code: "P-02",
    title: "Pengembangan SDM & Pelatihan",
    desc: "Penyelenggaraan Pelatda terpadu, kemitraan LPK kredibel, sertifikasi bahasa, serta pengasahan hard skill manufaktur & pertanian.",
    footer: "Standar Industri Jepang",
    icon: "bulb",
  },
  {
    code: "P-03",
    title: "Pemberdayaan Ekonomi & UMKM",
    desc: "Pelatihan wirausaha mandiri, forum sharing bisnis antarmantan pemagang, fasilitasi akses kemitraan perbankan & promosi produk.",
    footer: "Wirausaha Berdikari",
    icon: "store",
  },
  {
    code: "P-04",
    title: "Kemitraan & Kepedulian Sosial",
    desc: "Audiensi berkala ke Disnaker Cianjur, HIPMI, Pemkab; menjalin jejaring bilateral Indonesia-Jepang, serta aksi bakti sosial peduli sesama.",
    footer: "Dampak Bagi Masyarakat",
    icon: "handshake",
  },
];

const VALUES: {
  title: string;
  desc: string;
  icon: IconName;
  iconBox: string;
  featured?: boolean;
}[] = [
  {
    title: "1. Profesionalisme",
    desc: "Program terencana rapi, terukur hasilnya, dan berorientasi pada peningkatan mutu layanan serta perlindungan maksimal bagi seluruh anggota alumni maupun calon peserta.",
    icon: "award",
    iconBox: "bg-[#E3202B] text-[#FFFFFF]",
  },
  {
    title: "2. Integritas",
    desc: "Transparan dan akuntabel di semua lini. Berpegang teguh pada edukasi jalur resmi kenegaraan serta komitmen penuh memberantas praktik calo penipuan tenaga kerja.",
    icon: "shield",
    iconBox: "bg-[#111827] text-[#FFFFFF]",
    featured: true,
  },
  {
    title: "3. Kolaborasi",
    desc: "Bersinergi secara harmonis dengan pemerintah daerah (Disnaker), dunia industri usaha, jejaring perbankan, LPK berizin, serta DPD IKAPEKSI Jawa Barat.",
    icon: "users",
    iconBox: "bg-[#E3202B] text-[#FFFFFF]",
  },
];

const PARTNERS: { name: string; sub: string; icon: IconName }[] = [
  { name: "Disnaker Kab. Cianjur", sub: "Dinas Tenaga Kerja Daerah", icon: "shieldAt" },
  { name: "Pemerintah Kabupaten", sub: "Pemkab Cianjur", icon: "building" },
  { name: "BPC HIPMI Cianjur", sub: "Himpunan Pengusaha Muda", icon: "briefcase" },
  { name: "DPD IKAPEKSI Jabar", sub: "Pengurus Wilayah Provinsi", icon: "building2" },
  { name: "LPK Mitra Terakreditasi", sub: "Lembaga Pelatihan Resmi", icon: "cap" },
];

const AGENDA: {
  title: string;
  desc: string;
  footer: string;
  icon: IconName;
  numBox: string;
}[] = [
  {
    title: "Pelatda Calon Peserta Magang",
    desc: "Pemusatan latihan fisik berkala, bimbingan mental, drill tata bahasa Jepang, dan simulasi tahapan seleksi langsung bersama instruktur purna magang.",
    footer: "Intensif & Rutin",
    icon: "expand",
    numBox: "bg-[#E3202B]",
  },
  {
    title: "Silaturahmi & Solidaritas Alumni",
    desc: "Kopdar triwulanan dan networking session antarkenshusei lintas angkatan guna membahas kolaborasi wirausaha dan gotong royong anggota.",
    footer: "Kopdar Berkala",
    icon: "users",
    numBox: "bg-[#111827]",
  },
  {
    title: "Audiensi & Kemitraan Strategis",
    desc: "Dialog terbuka dengan Disnaker Kab. Cianjur, Pemda, perbankan, dan pengusaha HIPMI demi memperluas serapan produk dan lapangan kerja.",
    footer: "Advokasi Resmi",
    icon: "handshake",
    numBox: "bg-[#E3202B]",
  },
  {
    title: "Raker & Konsolidasi DPD Jabar",
    desc: "Sinkronisasi berkala program kerja dengan pengurus DPD Provinsi Jawa Barat untuk memastikan koordinasi satu komando selaras DPP.",
    footer: "Hierarki Wilayah",
    icon: "exchange",
    numBox: "bg-[#111827]",
  },
];

/* ---------- Komponen kecil ---------- */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-md bg-[#FFDAD6]/70 px-3.5 py-1.5 text-[12px] font-bold uppercase leading-4 tracking-[0.08em] text-[#E3202B]">
      {children}
    </span>
  );
}

function SectionHead({
  eyebrow,
  title,
  desc,
  align = "center",
  size = "lg",
}: {
  eyebrow?: string;
  title: string | React.ReactNode;
  desc: string;
  align?: "center" | "left";
  size?: "md" | "lg";
}) {
  const alignCls =
    align === "center" ? "mx-auto items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`mb-10 flex max-w-3xl flex-col lg:mb-12 ${alignCls}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={`font-jakarta font-extrabold tracking-[-0.025em] text-[#0A0304] ${
          eyebrow ? "mt-4" : ""
        } ${
           size === "lg"
             ? "text-[48px] leading-[56px]"
             : "text-[48px] leading-[56px]"
        }`}
      >
        {title}
      </h2>
      <p className="mt-2 text-[15px] leading-[24px] text-[#4B5563] sm:text-[16px]">
        {desc}
      </p>
    </Reveal>
  );
}

/* ---------- Section ---------- */

export default function ProgramSection() {
  return (
    <>
      {/* 1. EMPAT PILAR PROGRAM STRATEGIS */}
      <section className="w-full border-b border-[#E5E7EB] bg-[#F9FAFB] py-14 text-[#0A0304] lg:py-16">
        <Container>
          <SectionHead
            title={
              <>
                Empat Pilar{" "}
                <span className="text-[#E3202B] underline decoration-[#FEDC00] decoration-[4px] underline-offset-[6px]">
                  Program Strategis
                </span>
              </>
            }
            desc="Struktur pilar berkelanjutan yang menopang seluruh agenda kerja DPC Cianjur"
            size="md"
          />

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, idx) => (
              <li key={p.code} className="flex">
                <Reveal delay={idx * 80} className="flex w-full">
                  <article className="flex w-full flex-col rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-[#FFDAD6]/70 px-2 py-1 font-mono text-[12px] font-bold leading-4 tracking-[0.04em] text-[#E3202B]">
                        {p.code}
                      </span>
                      <Icon name={p.icon} className="h-5 w-5 text-[#4B5563]" />
                    </div>

                    <h3 className="mt-5 text-[16px] font-bold leading-6 text-[#0A0304]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[22px] text-[#4B5563]">
                      {p.desc}
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="border-t border-[#E5E7EB] pt-4 text-[12px] font-bold leading-4 text-[#E3202B]">
                        {p.footer}
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 2. KOMITMEN & NILAI ORGANISASI */}
      <section className="w-full bg-[#FFFFFF] py-16 text-[#0A0304] lg:py-20">
        <Container>
          <SectionHead
            eyebrow="Integritas Kami"
            title={
              <>
                Komitmen &amp; Nilai{" "}
                <span className="text-[#E3202B] underline decoration-[#FEDC00] decoration-[4px] underline-offset-[6px]">
                  Organisasi
                </span>
              </>
            }
            desc="Prinsip teguh yang membimbing setiap langkah pengurus dan anggota IKAPEKSI DPC Cianjur."
          />

          <ul className="grid grid-cols-1 gap-6 pt-3 md:grid-cols-3">
            {VALUES.map((v, idx) => (
              <li key={v.title} className="flex">
                <Reveal delay={idx * 100} className="flex w-full">
                  <article
                    className={`relative flex w-full flex-col items-center rounded-xl p-8 text-center ${
                      v.featured
                        ? "border-2 border-[#E3202B]/40 bg-[#F9FAFB]"
                        : "border border-[#E5E7EB] bg-[#F9FAFB]"
                    }`}
                  >
                    {v.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#FEDC00] px-2.5 py-0.5 text-[10px] font-bold uppercase leading-4 tracking-[0.04em] text-[#0A0304]">
                        Prinsip Mutlak
                      </span>
                    )}

                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-xl ${v.iconBox}`}
                    >
                      <Icon name={v.icon} className="h-8 w-8" />
                    </div>

                    <h3 className="mt-6 font-jakarta text-[20px] font-bold leading-7 text-[#0A0304]">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[24px] text-[#4B5563]">
                      {v.desc}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3. KEMITRAAN STRATEGIS & EKOSISTEM */}
      <section className="w-full border-y border-[#E5E7EB] bg-[#F9FAFB] py-16 text-[#0A0304] lg:py-20">
        <Container>
          <SectionHead
            eyebrow="Jaringan Ekosistem"
            title={
              <>
                Kemitraan Strategis &amp;{" "}
                <span className="text-[#E3202B] underline decoration-[#FEDC00] decoration-[4px] underline-offset-[6px]">
                  Ekosistem
                </span>
              </>
            }
             desc="Pembinaan calon peserta dan alumni dijalankan bersama instansi pemerintah dan mitra resmi terakreditasi guna menjamin kepastian masa depan pejuang devisa."
           />

          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {PARTNERS.map((p, idx) => (
              <li key={p.name} className="flex">
                <Reveal delay={idx * 60} className="flex w-full">
                  <article className="flex w-full flex-col items-center rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] px-4 py-6 text-center shadow-sm">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#E3202B]">
                      <Icon name={p.icon} className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 text-[14px] font-bold leading-5 text-[#0A0304]">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[12px] leading-4 text-[#4B5563]">
                      {p.sub}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 4. PROGRAM KERJA UTAMA CIANJUR */}
      <section className="w-full bg-[#FFFFFF] py-16 text-[#0A0304] lg:py-20">
        <Container>
          <SectionHead
            eyebrow="Agenda Prioritas"
            title={
              <>
                Program Kerja Utama{" "}
                <span className="text-[#E3202B] underline decoration-[#FEDC00] decoration-[4px] underline-offset-[6px]">
                  Cianjur
                </span>
              </>
            }
            desc="Rangkaian aksi nyata yang dijadwalkan secara teratur untuk kemaslahatan anggota dan masyarakat umum."
          />

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AGENDA.map((a, idx) => (
              <li key={a.title} className="flex">
                <Reveal delay={idx * 80} className="flex w-full">
                  <article className="flex w-full flex-col rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 shadow-sm">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-[14px] font-bold text-[#FFFFFF] ${a.numBox}`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    <h3 className="mt-5 text-[17px] font-bold leading-[26px] text-[#0A0304]">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[22px] text-[#4B5563]">
                      {a.desc}
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4">
                        <span className="text-[12px] font-bold leading-4 text-[#E3202B]">
                          {a.footer}
                        </span>
                        <Icon name={a.icon} className="h-4 w-4 text-[#4B5563]" />
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}