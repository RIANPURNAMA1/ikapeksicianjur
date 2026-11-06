import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import Reveal from "@/components/ui/Reveal";

/*
  Token warna (sama dengan ProgramSection):
  latar section : #FFFFFF
  kartu         : #F7F5F3
  garis         : #EFEBE8
  ink           : #1A1415
  merah         : #B3101B
  kuning        : #F5C518
  muted         : #4B4747
*/

type Commitment = {
  number: string;
  title: string;
  desc: string;
  iconBox: string;
  icon: ReactNode;
};

const commitments: Commitment[] = [
  {
    number: "01",
    title: "Profesionalisme",
    desc: "Mengembangkan program yang terencana, terukur, dan berorientasi pada peningkatan kualitas pelayanan serta kompetensi anggota secara berkelanjutan.",
    iconBox: "bg-[#1A1415] text-white",
    icon: (
      <>
        <circle cx="12" cy="9" r="6" />
        <path d="m8.5 14.5-1.5 7 5-3 5 3-1.5-7" />
      </>
    ),
  },
  {
    number: "02",
    title: "Integritas",
    desc: "Menjunjung tinggi transparansi, akuntabilitas, dan tanggung jawab dalam setiap aktivitas organisasi maupun kerja sama kelembagaan.",
    iconBox: "bg-[#B3101B] text-white",
    icon: <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />,
  },
  {
    number: "03",
    title: "Kolaborasi",
    desc: "Membangun sinergi antara pemerintah, dunia industri, lembaga pendidikan, alumni, dan mitra strategis untuk menciptakan manfaat yang lebih luas.",
    iconBox: "bg-[#F5C518] text-[#1A1415]",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
];

export default function OrganizationCommitment() {
  return (
    <section className="w-full bg-[rgb(249,250,251)] py-16 font-jakarta text-[#1A1415] antialiased sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto grid max-w-[1040px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* KIRI: Header */}
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
               <span className="inline-flex w-fit items-center rounded bg-[#F3F4F6] px-3 py-1 text-[10px] font-bold uppercase leading-4 tracking-[0.02em] text-[#E3202B]">
                 Nilai Utama Organisasi
              </span>
              <h2 className=" text-[32px] font-bold leading-[38px] tracking-[-0.045em] text-[#1A1415] sm:text-[40px] sm:leading-[46px]">
                Komitmen Kami
              </h2>

              <p className="mt-5 max-w-[420px] text-[13px] font-normal leading-[22px] text-[#4B4747] sm:text-[14px]">
                IKAPEKSI DPC Kabupaten Cianjur meyakini bahwa organisasi yang
                kuat dibangun melalui kepercayaan, tata kelola yang
                bertanggung jawab, serta manfaat nyata bagi alumni dan
                masyarakat Cianjur.
              </p>

              {/* Aksen tiga warna */}
              <div className="mt-8 flex items-center gap-1.5" aria-hidden="true">
                <span className="h-1 w-10 rounded-full bg-[#1A1415]" />
                <span className="h-1 w-6 rounded-full bg-[#B3101B]" />
                <span className="h-1 w-3 rounded-full bg-[#F5C518]" />
              </div>
            </div>
          </Reveal>

          {/* KANAN: Daftar komitmen */}
          <ul className="flex flex-col gap-4 lg:col-span-7">
            {commitments.map((item, idx) => (
              <li key={item.title} className="flex">
                <Reveal delay={idx * 80} className="flex w-full">
                  <article className="group flex w-full items-start gap-5 rounded-2xl bg-white p-6 transition-all duration-300 hover:bg-white hover:shadow-[0_12px_32px_-12px_rgba(26,20,21,0.15)] sm:p-7">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.iconBox}`}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </svg>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-[20px] font-bold leading-7 tracking-[-0.03em] text-[#1A1415]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[13px] font-normal leading-[21px] text-[#4B4747]">
                        {item.desc}
                      </p>
                    </div>

                    <span className="text-[13px] font-bold leading-7 tracking-[0.04em] text-[#B3101B]">
                      {item.number}
                    </span>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}