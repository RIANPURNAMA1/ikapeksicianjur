"use client";

import Image from "next/image";
import Link from "next/link";
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
*/

const STATS = [
  { value: "32", label: "Kecamatan Cianjur", desc: "Terdata di direktori wilayah", red: false },
  { value: "100%", label: "Jalur Legal", desc: "Terverifikasi & bebas calo", red: true },
  { value: "4 Pilar", label: "Pemberdayaan", desc: "Berkelanjutan bagi alumni", red: false },
  { value: "Resmi", label: "Struktur Sah", desc: "Di bawah DPD Jabar & DPP", red: false },
];

const TIERS = [
  {
    no: "01",
    title: "DPP IKAPEKSI",
    desc: "Dewan Pimpinan Pusat \u2014 Tingkat Nasional",
    icon: "shield",
  },
  {
    no: "02",
    title: "DPD Jawa Barat",
    desc: "Dewan Pimpinan Daerah \u2014 Tingkat Provinsi",
    icon: "building",
  },
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative -mt-16 w-full overflow-hidden bg-[#FFFFFF] pt-28 pb-16 font-jakarta text-[#0A0304] lg:pt-36 lg:pb-24">
      {/* Latar titik halus */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FFFFFF] to-transparent"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        {/* Baris pill */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-md bg-[#E3202B] px-3 py-1.5 text-[11px] font-bold uppercase leading-4 tracking-[0.06em] text-[#FFFFFF]">
        
            {t("hero.eyebrow")} {/* Alternatif teks statis: IKAPEKSI DPC KABUPATEN CIANJUR */}
          </span>

        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Kiri */}
          <div className="flex flex-col lg:col-span-7">
            <h1 className="text-[36px] font-extrabold leading-[42px] tracking-[-0.03em] text-[#0A0304] sm:text-[44px] sm:leading-[52px] lg:text-[56px] lg:leading-[60px]">
              <span className="block">{t("hero.line1")}</span>
              <span className="block text-[#E3202B] underline decoration-[#FEDC00] decoration-[4px] underline-offset-[6px]">
                {t("hero.line2")}
              </span>
              <span className="block">{t("hero.line3")}</span>
            </h1>

            <p className="mt-6 max-w-xl text-[18px] leading-[28px] text-[#4B5563]">
              {t("hero.description", { name: SITE.fullName })}
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                href="/pendataan"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#E3202B] px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-[#FFFFFF] shadow-md transition-colors hover:bg-[#C62930]"
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

              <Button
                href="https://wa.me/62895391685825"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-[#0A0304] shadow-sm transition-colors hover:bg-[#F9FAFB]"
              >
                <svg
                  className="h-5 w-5 text-[#00873C]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.347-.272.273-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {t("hero.konsultasi")} {/* Teks statis: Konsultasi Gratis */}
              </Button>

           
            </div>

            {/* Statistik: 4 kartu */}
            <div className="mt-10 border-t border-[#E5E7EB] pt-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-4 shadow-sm"
                  >
                    <div
                      className={`text-[32px] font-extrabold leading-[40px] tracking-[-0.02em] ${
                        s.red ? "text-[#E3202B]" : "text-[#0A0304]"
                      }`}
                    >
                      {s.value}
                    </div>
                    <div className="mt-1 text-[12px] font-bold uppercase leading-4 tracking-[0.04em] text-[#0A0304]">
                      {s.label}
                    </div>
                    <div className="mt-2 text-[12px] leading-4 text-[#4B5563]">
                      {s.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kanan */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Kartu foto */}
            <div className="group overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_8px_24px_-6px_rgba(10,3,4,0.12)]">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/carausel/hero.jpg"
                  alt="Alumni pemagangan Jepang IKAPEKSI Cianjur"
                  width={800}
                  height={450}
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="aspect-[16/9] w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-md bg-[#0A0304]/85 px-3 py-1.5 text-[12px] font-semibold leading-4 text-[#FFFFFF] backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#FEDC00]" />
                  Kenshusei &amp; Jisshusei Cianjur
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div>
                  <p className="text-[16px] font-bold leading-6 text-[#0A0304]">
                    Keluarga Besar Alumni Magang Jepang
                  </p>
                  <p className="text-[13px] leading-5 text-[#4B5563]">
                    Inkubasi wirausaha mandiri di tatar Cianjur
                  </p>
                </div>
                <span className="shrink-0 rounded bg-[#FEDC00] px-2.5 py-1 text-[11px] font-bold uppercase leading-4 tracking-[0.04em] text-[#0A0304]">
                  Terakreditasi
                </span>
              </div>
            </div>

            {/* Kartu hierarki organisasi */}
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between border-b border-[#E5E7EB] pb-4">
                <div className="flex items-center gap-2.5">
                  <svg
                    className="h-5 w-5 text-[#E3202B]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="6" height="6" rx="1" />
                    <rect x="15" y="3" width="6" height="6" rx="1" />
                    <rect x="15" y="15" width="6" height="6" rx="1" />
                    <path d="M9 6h6M6 9v9h9" />
                  </svg>
                  <h3 className="text-[13px] font-bold uppercase leading-4 tracking-[0.06em] text-[#0A0304]">
                    Hierarki Resmi Organisasi
                  </h3>
                </div>
                <span className="rounded bg-[#FFDAD6] px-2 py-1 text-[12px] font-semibold leading-4 text-[#BB001A]">
                  Tingkat DPC
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {TIERS.map((tier) => (
                  <div
                    key={tier.no}
                    className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F3F4F6] text-[13px] font-medium text-[#4B5563]">
                        {tier.no}
                      </div>
                      <div>
                        <h4 className="text-[15px] font-semibold leading-5 text-[#0A0304]">
                          {tier.title}
                        </h4>
                        <p className="text-[13px] leading-5 text-[#4B5563]">
                          {tier.desc}
                        </p>
                      </div>
                    </div>
                    <svg
                      className="h-5 w-5 shrink-0 text-[#4B5563]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {tier.icon === "shield" ? (
                        <>
                          <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
                          <path d="m9 12 2 2 4-4" />
                        </>
                      ) : (
                        <>
                          <path d="M3 21h18M5 21V4h9v17M14 9h5v12" />
                          <path d="M8 8h2M8 12h2M8 16h2M16.5 13h.01M16.5 17h.01" />
                        </>
                      )}
                    </svg>
                  </div>
                ))}

                {/* Tingkat 3: DPC (highlight) */}
                <div className="flex items-start justify-between rounded-lg border-2 border-[#E3202B] bg-[#FFFFFF] px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#E3202B] text-[13px] font-bold text-[#FFFFFF]">
                      03
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-[16px] font-bold leading-6 text-[#0A0304]">
                          DPC Kabupaten Cianjur
                        </h4>
                        <span className="rounded bg-[#FEDC00] px-1.5 py-0.5 text-[10px] font-bold uppercase leading-[14px] tracking-[0.04em] text-[#0A0304]">
                          Cabang Resmi
                        </span>
                      </div>
                      <p className="mt-1 text-[14px] leading-5 text-[#4B5563]">
                        Rumah bersama alumni dan pejuang kerja Jepang di
                        Kabupaten Cianjur.
                      </p>
                    </div>
                  </div>
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#E3202B]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}