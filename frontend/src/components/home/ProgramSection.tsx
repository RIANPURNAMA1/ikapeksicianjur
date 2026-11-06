"use client";

import Reveal from "@/components/ui/Reveal";
import Container from "@/components/layout/Container";

/*
  Token warna (mengikuti referensi UI):
  latar section : #F5F3F1
  kartu         : #FFFFFF
  kotak fokus   : #F7F5F3
  ink           : #1A1415
  merah         : #B3101B
  kuning        : #F5C518
  maroon tua    : #5E0B14
  muted         : #4B4747

  Font: Plus Jakarta Sans (font-jakarta)
*/

/* ---------- Data ---------- */

type Pillar = {
  tag: string;
  tagClass: string;
  mission: string;
  title: string;
  subtitle: string;
  desc: string;
  focus: { lead: string; text: string }[];
  goal: string;
};

const PILLARS: Pillar[] = [
  {
    tag: "Pilar 01 · Fondasi",
    tagClass: "bg-[#1A1415] text-white",
    mission: "Misi 01 · Menghimpun",
    title: "Rumah Alumni Cianjur",
    subtitle: "Konsolidasi dan keanggotaan",
    desc: "Mendata dan menghimpun alumni program kerja Jepang di Cianjur dalam satu wadah keanggotaan yang aktif.",
    focus: [
      {
        lead: "Pendataan alumni:",
        text: "basis data alumni dan usaha alumni, dengan persetujuan pemilik data.",
      },
      {
        lead: "Rekrutmen anggota:",
        text: "jalur pendaftaran yang jelas, dibantu database DPD/DPP.",
      },
      {
        lead: "Temu alumni:",
        text: "pertemuan rutin untuk silaturahmi dan berbagi peluang.",
      },
    ],
    goal: "Alumni Jepang di Cianjur terdata, terhubung, dan aktif berorganisasi.",
  },
  {
    tag: "Pilar 02 · Unggulan",
    tagClass: "bg-[#B3101B] text-white",
    mission: "Misi 02 · Membuka Jalan",
    title: "SMART IKAPEKSI Plus Cianjur",
    subtitle: "Seleksi magang terpadu berbasis kompetensi dan standar industri Jepang",
    desc: "Mendekatkan kesempatan magang ke Jepang bagi warga Cianjur, dari informasi hingga seleksi untuk Program Magang IM Japan.",
    focus: [
      {
        lead: "Sosialisasi jalur resmi:",
        text: "untuk berkarier di Jepang, termasuk bahaya jalur ilegal.",
      },
      {
        lead: "SELEKNAS IM Japan di Cianjur:",
        text: "diselenggarakan bersama Disnakertrans.",
      },
      {
        lead: "Rujukan ke LPK anggota:",
        text: "persiapan bahasa, fisik, dan budaya oleh LPK anggota IKAPEKSI.",
      },
    ],
    goal: "Lebih banyak warga Cianjur berangkat lewat jalur resmi, aman, dan terpercaya.",
  },
  {
    tag: "Pilar 03 · Unggulan",
    tagClass: "bg-[#F5C518] text-[#1A1415]",
    mission: "Misi 03 · Menumbuhkan Usaha",
    title: "Usaha Alumni & Anggota Naik Kelas",
    subtitle: "Pendampingan kewirausahaan",
    desc: "Mengubah pengalaman dan budaya kerja Jepang menjadi modal usaha yang tumbuh.",
    focus: [
      {
        lead: "UMKM Binaan IKAPEKSI:",
        text: "pendampingan kepada UMKM di Cianjur dengan hasil terukur.",
      },
      {
        lead: "Legalitas usaha:",
        text: "pendampingan NIB, PIRT, dan sertifikasi halal.",
      },
      {
        lead: "Kaizen/5S dan digital marketing:",
        text: "keunggulan khas alumni Jepang.",
      },
      {
        lead: "Jejaring bisnis antaranggota:",
        text: "kolaborasi dan peluang pasar bersama.",
      },
    ],
    goal: "Usaha alumni, anggota, dan UMKM binaan lebih legal, lebih rapi, dan lebih luas pasarnya.",
  },
  {
    tag: "Pilar 04 · Penguat",
    tagClass: "bg-[#5E0B14] text-white",
    mission: "Misi 04 · Bermitra untuk Cianjur",
    title: "Mitra Pembangunan Cianjur",
    subtitle: "Kemitraan strategis",
    desc: "Bersinergi dengan Pemkab, Disnakertrans, dan dunia usaha dalam pengembangan tenaga kerja dan ekonomi daerah.",
    focus: [
      {
        lead: "Kolaborasi lintas lembaga:",
        text: "dengan Pemkab, dinas-dinas terkait, dan organisasi lainnya di Kabupaten Cianjur.",
      },
      {
        lead: "Temu bisnis dan katalog usaha:",
        text: "mempertemukan usaha anggota dengan pelaku usaha dan calon mitra.",
      },
      {
        lead: "Jejaring Indonesia–Jepang:",
        text: "menghubungkan anggota dengan perusahaan dan mitra di Jepang.",
      },
      {
        lead: "Kegiatan sosial:",
        text: "kontribusi alumni untuk masyarakat Cianjur.",
      },
    ],
    goal: "IKAPEKSI Cianjur diakui sebagai mitra resmi pembangunan daerah.",
  },
];

/* ---------- Komponen kecil ---------- */

function CheckIcon() {
  return (
    <svg
      className="mt-[3px] h-4 w-4 shrink-0 text-[#B3101B]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PillarCard({ p }: { p: Pillar }) {
  return (
    <article className="flex h-full w-full flex-col rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgba(26,20,21,0.04)] sm:p-7">
      {/* Baris atas: tag pilar + misi */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <span
          className={`inline-flex items-center whitespace-nowrap rounded px-3 py-1.5 text-[10px] font-bold uppercase leading-none tracking-[0.12em] ${p.tagClass}`}
        >
          {p.tag}
        </span>
        <span className="text-[11px] font-normal leading-4 text-[#6B6666]">
          {p.mission}
        </span>
      </div>

      {/* Judul */}
      <h3 className="mt-5 text-[22px] font-bold leading-7 tracking-[-0.03em] text-[#1A1415]">
        {p.title}
      </h3>
      <p className="mt-2 text-[10.5px] font-bold uppercase leading-4 tracking-[0.1em] text-[#B3101B]">
        {p.subtitle}
      </p>
      <p className="mt-4 text-[13px] font-normal leading-[20px] text-[#4B4747]">
        {p.desc}
      </p>

      {/* Fokus program */}
      <div className="mt-5 rounded-xl bg-[#F7F5F3] p-5">
        <p className="text-[10px] font-bold uppercase leading-4 tracking-[0.14em] text-[#1A1415]">
          Fokus Program
        </p>
        <ul className="mt-3 space-y-3">
          {p.focus.map((f) => (
            <li key={f.lead} className="flex gap-3">
              <CheckIcon />
              <p className="text-[12px] font-normal leading-[18px] text-[#4B4747]">
                <strong className="font-bold text-[#1A1415]">{f.lead}</strong>{" "}
                {f.text}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Tujuan */}
      <div className="mt-auto pt-6">
        <div className="border-t border-[#EFEBE8] pt-4">
          <p className="text-[10px] font-normal leading-4 text-[#6B6666]">
            Tujuan
          </p>
          <p className="mt-1 text-[13px] font-semibold leading-[20px] text-[#1A1415]">
            {p.goal}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ---------- Section ---------- */

export default function ProgramSection() {
  return (
    <section className="w-full bg-[#F5F3F1] py-16 font-jakarta text-[#1A1415] antialiased sm:py-20 lg:py-24">
      <Container>
        {/* Header */}
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-[#E7E2DE] bg-white px-4 py-1.5 text-[10px] font-bold uppercase leading-4 tracking-[0.16em] text-[#B3101B]">
            Arah Strategis
          </span>

          <h2 className="mt-6 text-[32px] font-bold leading-[38px] tracking-[-0.045em] text-[#1A1415] sm:text-[40px] sm:leading-[46px]">
            4 Pilar Program Strategis
            <span className="block text-[#B3101B]">
              IKAPEKSI Kabupaten Cianjur
            </span>
          </h2>

          <p className="mt-5 text-[13px] font-bold leading-5 tracking-[-0.01em] text-[#5E0B14] sm:text-[14px]">
            Bergerak · Berdampak · Berdaya
          </p>

          <p className="mt-5 max-w-[620px] text-[13px] font-normal leading-[22px] text-[#4B4747] sm:text-[14px]">
            Empat pilar ini menerjemahkan visi DPC sebagai rumah bagi alumni dan
            calon alumni pejuang Indonesia–Jepang: dari menghimpun alumni,
            membuka jalan bagi warga Cianjur, menumbuhkan usaha, hingga bermitra
            membangun daerah.
          </p>
        </Reveal>

        {/* Kartu pilar */}
        <ul className="mx-auto mt-12 grid max-w-[1040px] grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14">
          {PILLARS.map((p, idx) => (
            <li key={p.tag} className="flex">
              <Reveal delay={idx * 80} className="flex w-full">
                <PillarCard p={p} />
              </Reveal>
            </li>
          ))}
        </ul>

      </Container>
    </section>
  );
}