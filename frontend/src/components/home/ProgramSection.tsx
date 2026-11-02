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
  surface #F9FAFB / #F3F4F6

  Font: Plus Jakarta Sans (font-jakarta) untuk seluruh teks

  Skala ukuran font (konsisten di semua kartu):
  - Judul section   : 32px → 44px, semibold
  - Subjudul        : 16px → 17px
  - Judul kartu     : 19px semibold (nilai: 20px)
  - Deskripsi kartu : 14px
  - Label / tag     : 10px bold uppercase
  - Nomor           : 26px extrabold
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
  shield: <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />,
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
    <path d="M3 21V4h10v17M13 9h8v12M7 8h2M7 12h2M7 16h2M17 13h.01M17 17h.01" />
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
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* ---------- Kelas hover bersama ---------- */

/* Dipasang pada <article>. Anak elemen memakai group-hover:... */
const CARD_HOVER =
  "group relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-12px_rgba(10,3,4,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

/* Garis aksen merah di tepi atas kartu (muncul saat hover) */
const ACCENT_BAR =
  "pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#E3202B] transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none";

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
    title: "Profesionalisme",
    desc: "Program terencana rapi, terukur hasilnya, dan berorientasi pada peningkatan mutu layanan serta perlindungan maksimal bagi seluruh anggota alumni maupun calon peserta.",
    icon: "award",
    iconBox: "bg-[#E3202B] text-[#FFFFFF]",
  },
  {
    title: "Integritas",
    desc: "Transparan dan akuntabel di semua lini. Berpegang teguh pada edukasi jalur resmi kenegaraan serta komitmen penuh memberantas praktik calo penipuan tenaga kerja.",
    icon: "shield",
    iconBox: "bg-[#111827] text-[#FFFFFF]",
    featured: true,
  },
  {
    title: "Kolaborasi",
    desc: "Bersinergi secara harmonis dengan pemerintah daerah (Disnaker), dunia industri usaha, jejaring perbankan, LPK berizin, serta DPD IKAPEKSI Jawa Barat.",
    icon: "users",
    iconBox: "bg-[#E3202B] text-[#FFFFFF]",
  },
];

const PARTNERS: { name: string; sub: string; icon: IconName }[] = [
  {
    name: "Disnaker Kab. Cianjur",
    sub: "Dinas Tenaga Kerja Daerah",
    icon: "shieldAt",
  },
  { name: "Pemerintah Kabupaten", sub: "Pemkab Cianjur", icon: "building" },
  {
    name: "BPC HIPMI Cianjur",
    sub: "Himpunan Pengusaha Muda",
    icon: "briefcase",
  },
  {
    name: "DPD IKAPEKSI Jabar",
    sub: "Pengurus Wilayah Provinsi",
    icon: "building2",
  },
  {
    name: "LPK Mitra Terakreditasi",
    sub: "Lembaga Pelatihan Resmi",
    icon: "cap",
  },
];

const AGENDA: {
  title: string;
  desc: string;
  footer: string;
  icon: IconName;
}[] = [
  {
    title: "Pelatda Calon Peserta Magang",
    desc: "Pemusatan latihan fisik berkala, bimbingan mental, drill tata bahasa Jepang, dan simulasi tahapan seleksi langsung bersama instruktur purna magang.",
    footer: "Intensif & Rutin",
    icon: "expand",
  },
  {
    title: "Silaturahmi & Solidaritas Alumni",
    desc: "Kopdar triwulanan dan networking session antarkenshusei lintas angkatan guna membahas kolaborasi wirausaha dan gotong royong anggota.",
    footer: "Kopdar Berkala",
    icon: "users",
  },
  {
    title: "Audiensi & Kemitraan Strategis",
    desc: "Dialog terbuka dengan Disnaker Kab. Cianjur, Pemda, perbankan, dan pengusaha HIPMI demi memperluas serapan produk dan lapangan kerja.",
    footer: "Advokasi Resmi",
    icon: "handshake",
  },
  {
    title: "Raker & Konsolidasi DPD Jabar",
    desc: "Sinkronisasi berkala program kerja dengan pengurus DPD Provinsi Jawa Barat untuk memastikan koordinasi satu komando selaras DPP.",
    footer: "Hierarki Wilayah",
    icon: "exchange",
  },
];

/* ---------- Komponen kecil ---------- */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded bg-[#F3F4F6] px-3 py-1 text-[10px] font-bold uppercase leading-4 tracking-[0.02em] text-[#E3202B]">
      {children}
    </span>
  );
}

function SectionHead({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: ReactNode;
  desc: string;
}) {
  return (
    <Reveal className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center lg:mb-16">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-[32px] font-semibold leading-[40px] tracking-[-0.04em] text-[#0A0304] sm:text-[44px] sm:leading-[52px]">
        {title}
      </h2>
      <p className="mt-4 text-[16px] font-normal leading-[24px] tracking-[-0.02em] text-[#4B5563] sm:text-[17px]">
        {desc}
      </p>
    </Reveal>
  );
}

/* Kotak ikon: berubah merah saat card di-hover */
function IconBox({
  name,
  tone = "white",
}: {
  name: IconName;
  tone?: "white" | "surface";
}) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-lg text-[#0A0304] transition-colors duration-300 group-hover:bg-[#E3202B] group-hover:text-[#FFFFFF] motion-reduce:transition-none ${
        tone === "white" ? "bg-[#FFFFFF]" : "bg-[#F3F4F6]"
      }`}
    >
      <Icon name={name} className="h-[18px] w-[18px]" />
    </div>
  );
}

/* ---------- Section ---------- */

export default function ProgramSection() {
  return (
    <div className="font-jakarta text-[#0A0304] antialiased">
      {/* 1. EMPAT PILAR PROGRAM STRATEGIS */}
      <section className="w-full bg-[#FFFFFF] py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHead
            eyebrow="Pilar Program"
            title="Empat Pilar Program Strategis"
            desc="Struktur pilar berkelanjutan yang menopang seluruh agenda kerja DPC Cianjur"
          />

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, idx) => (
              <li key={p.code} className="flex">
                <Reveal delay={idx * 80} className="flex w-full">
                  <article
                    className={`${CARD_HOVER} flex w-full flex-col rounded-2xl bg-gradient-to-b from-[#F3F4F6] via-[#F9FAFB]/60 to-transparent p-6`}
                  >
                    <span className={ACCENT_BAR} aria-hidden="true" />

                    <div className="flex items-start justify-between">
                      <span className="text-[26px] font-extrabold leading-8 tracking-[-0.03em] text-[#E3202B]">
                        {p.code}
                      </span>
                      <IconBox name={p.icon} />
                    </div>

                    <h3 className="mt-5 text-[19px] font-semibold leading-[26px] tracking-[-0.03em] text-[#0A0304]">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[14px] font-normal leading-[22.5px] tracking-[-0.02em] text-[#4B5563]">
                      {p.desc}
                    </p>

                    <div className="mt-auto pt-10">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase leading-4 tracking-[0.04em] text-[#E3202B]">
                        {p.footer}
                        <ArrowRight />
                      </span>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 2. KOMITMEN & NILAI ORGANISASI */}
      <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHead
            eyebrow="Integritas Kami"
            title="Komitmen & Nilai Organisasi"
            desc="Prinsip teguh yang membimbing setiap langkah pengurus dan anggota IKAPEKSI DPC Cianjur."
          />

          <ul className="grid grid-cols-1 gap-6 pt-3 md:grid-cols-3">
            {VALUES.map((v, idx) => (
              <li key={v.title} className="flex">
                <Reveal delay={idx * 100} className="flex w-full">
                  {/* Tanpa overflow-hidden agar badge "Prinsip Mutlak" tidak terpotong */}
                  <article
                    className={`group relative flex w-full flex-col items-center rounded-2xl bg-[#FFFFFF] p-8 text-center shadow-[0_1px_3px_rgba(10,3,4,0.06)] ring-2 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-12px_rgba(10,3,4,0.18)] hover:ring-[#E3202B]/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                      v.featured
                        ? "ring-[#E3202B]/40 hover:ring-[#E3202B]"
                        : "ring-transparent"
                    }`}
                  >
                    {v.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#FEDC00] px-2.5 py-1 text-[10px] font-bold uppercase leading-4 tracking-[0.04em] text-[#0A0304]">
                        Prinsip Mutlak
                      </span>
                    )}

                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 motion-reduce:transition-none motion-reduce:group-hover:transform-none ${v.iconBox}`}
                    >
                      <Icon name={v.icon} className="h-7 w-7" />
                    </div>

                    <h3 className="mt-6 text-[20px] font-semibold leading-7 tracking-[-0.03em] text-[#0A0304]">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-[14px] font-normal leading-[22.5px] tracking-[-0.02em] text-[#4B5563]">
                      {v.desc}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* [HIDDEN] 3. KEMITRAAN STRATEGIS & EKOSISTEM */}

      {/* 4. PROGRAM KERJA UTAMA CIANJUR */}
      <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHead
            eyebrow="Agenda Prioritas"
            title={
              <>
                Program Kerja Utama{" "}
                <span className="text-[#E3202B]">Cianjur</span>
              </>
            }
            desc="Rangkaian aksi nyata yang dijadwalkan secara teratur untuk kemaslahatan anggota dan masyarakat umum."
          />

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AGENDA.map((a, idx) => (
              <li key={a.title} className="flex">
                <Reveal delay={idx * 80} className="flex w-full">
                  <article
                    className={`${CARD_HOVER} flex w-full flex-col rounded-2xl bg-gradient-to-b from-[#F3F4F6] via-[#F9FAFB]/60 to-transparent p-6`}
                  >
                    <span className={ACCENT_BAR} aria-hidden="true" />

                    <div className="flex items-start justify-between">
                      <span className="text-[26px] font-extrabold leading-8 tracking-[-0.03em] text-[#E3202B]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <IconBox name={a.icon} tone="surface" />
                    </div>

                    <h3 className="mt-5 text-[19px] font-semibold leading-[26px] tracking-[-0.03em] text-[#0A0304]">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-[14px] font-normal leading-[22.5px] tracking-[-0.02em] text-[#4B5563]">
                      {a.desc}
                    </p>

                    <div className="mt-auto pt-10">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase leading-4 tracking-[0.04em] text-[#E3202B]">
                        {a.footer}
                        <ArrowRight />
                      </span>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}
