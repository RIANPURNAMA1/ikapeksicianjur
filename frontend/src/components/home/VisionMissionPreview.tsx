"use client";

import Reveal from "@/components/ui/Reveal";
import Container from "@/components/layout/Container";

/*
  Token warna:
  merah   #E3202B (tint #FFDAD6, teks badge #BB001A)
  kuning  #FEDC00
  navy    #111827 (kartu visi)
  garis   #E5E7EB
  surface #F9FAFB
  muted   #4B5563
*/

const MISSIONS = [
  {
    title: "Pendataan & Konsolidasi Alumni",
    desc: "Menghimpun dan mendata seluruh alumni kenshusei dan jisshusei se-Kabupaten Cianjur dalam satu basis data terverifikasi.",
  },
  {
    title: "Pengembangan SDM",
    desc: "Pelatihan intensif bahasa, etika kerja, dan pembinaan karakter bagi calon dan mantan peserta magang Jepang.",
  },
  {
    title: "Pemberdayaan Ekonomi",
    desc: "Membuka akses kerja sama bisnis, pembiayaan modal UMKM, dan penciptaan lapangan kerja produktif baru bagi alumni.",
  },
  {
    title: "Kolaborasi Kelembagaan",
    desc: "Bermitra erat secara resmi dengan pemerintah kabupaten (Disnaker), dunia industri/usaha (HIPMI), dan LPK terpercaya.",
  },
  {
    title: "Kepedulian Sosial",
    desc: "Aktif dalam agenda bakti sosial kemanusiaan, tanggap darurat bencana daerah, dan gotong royong warga Cianjur.",
  },
  {
    title: "Edukasi Jalur Resmi",
    desc: "Sosialisasi literasi migrasi kerja resmi agar generasi muda Cianjur terhindar dari jeratan calo ilegal tak berizin.",
  },
];

export default function VisionMissionPreview() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FAFAFA] py-16 text-[#0A0304] sm:py-20 lg:py-24">
      <Container>
        {/* Header section */}
        <Reveal className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center lg:mb-16">
          <span className="inline-flex items-center rounded-md bg-[#FFDAD6] px-4 py-1.5 text-[12px] font-bold uppercase leading-4 tracking-[0.1em] text-[#E3202B]">
            Arah &amp; Fokus Strategis
          </span>
          <h2 className="mt-4 font-jakarta text-[28px] font-extrabold leading-[34px] tracking-[-0.025em] text-[#0A0304] sm:text-[36px] sm:leading-[44px]">
            Visi &amp; Misi Organisasi
          </h2>
          <p className="mt-3 text-[16px] leading-[26px] text-[#4B5563] sm:text-[18px] sm:leading-[30px]">
            Landasan kerja DPC Kabupaten Cianjur untuk mewujudkan masyarakat
            mandiri, berdaya saing global, dan berdampak nyata bagi daerah.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* KIRI: Kartu Visi (gelap) */}
          <Reveal delay={100} className="lg:col-span-5">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#111827] p-8 shadow-[0_12px_32px_-8px_rgba(17,24,39,0.35)] sm:p-10">
              {/* Cahaya merah halus di pojok kanan atas */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#E3202B]/20 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative flex flex-1 flex-col">
                <span className="inline-flex w-fit items-center rounded-md bg-[#E3202B] px-3 py-1.5 text-[11px] font-bold uppercase leading-4 tracking-[0.08em] text-[#FFFFFF]">
                  Visi Kami
                </span>

                <blockquote className="mt-8 font-jakarta text-[28px] font-extrabold leading-[1.22] tracking-[-0.025em] text-[#FFFFFF] sm:text-[32px]">
                  &ldquo;Menjadi wadah alumni magang Jepang Kabupaten Cianjur
                  yang <span className="text-[#FEDC00]">mandiri</span>,{" "}
                  <span className="text-[#FEDC00]">berdaya saing</span>, dan
                  berperan aktif dalam{" "}
                  <span className="underline decoration-[#E3202B] decoration-[3px] underline-offset-[5px]">
                    pertumbuhan ekonomi daerah
                  </span>
                  .&rdquo;
                </blockquote>

                <p className="mt-6 text-[15px] leading-[26px] text-[#D1D5DB]">
                  Mencetak ekosistem wirausaha dan profesional yang tangguh,
                  memanfaatkan etos disiplin 5S dari Jepang demi akselerasi
                  kemajuan Cianjur.
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-[#FFFFFF]/10 pt-5">
                  <span className="mt-8 text-[13px] text-[#9CA3AF]">
                    DPC IKAPEKSI Cianjur
                  </span>
                  <span className="mt-8 text-[13px] font-bold text-[#FEDC00]">
                    Periode Berjalan
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* KANAN: 6 kartu misi (2 kolom) */}
          <Reveal delay={250} className="lg:col-span-7">
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {MISSIONS.map((m, idx) => (
                <li
                  key={m.title}
                  className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 shadow-sm"
                >
                  <div className="text-[24px] font-extrabold leading-8 tracking-[-0.015em] text-[#E3202B]">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 text-[16px] font-bold leading-6 text-[#0A0304]">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[24px] text-[#4B5563]">
                    {m.desc}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}