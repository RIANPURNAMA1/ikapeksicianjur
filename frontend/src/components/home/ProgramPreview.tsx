"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Reveal from "@/components/ui/Reveal";
import { kegiatanExcerpt, kegiatanImage, type KegiatanCard } from "@/lib/kegiatan";

/*
  Token warna (sama dengan ProgramSection & OrganizationCommitment):
  latar section : #FFFFFF
  kartu         : #F7F5F3
  garis         : #EFEBE8
  ink           : #1A1415
  merah         : #B3101B
  kuning        : #F5C518
  muted         : #4B4747

  Data kegiatan berasal dari database dan dikelola melalui /admin/kegiatan.
  Setiap kegiatan punya `slug`; tombol "Lihat Detail" menuju /kegiatan/[slug].
*/

const INITIAL_COUNT = 3; // jumlah kartu yang tampil di awal
const STEP = 3; // jumlah kartu tambahan setiap klik "Muat Lebih Banyak"

export default function ProgramPreview({ items }: { items: KegiatanCard[] }) {
  const [visible, setVisible] = useState(INITIAL_COUNT);

  const total = items.length;
  const shown = Math.min(visible, total);
  const hasMore = shown < total;

  return (
    <section id="kegiatan" className="w-full bg-white py-16 font-sans text-[#1A1415] antialiased sm:py-20 lg:py-24">
      <Container>
        {/* Header */}
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase leading-4 tracking-[0.18em] text-[#B3101B]">
            Aksi Nyata Daerah
          </span>
          <h2 className="text-[32px] font-bold leading-[38px] tracking-[-0.045em] text-[#1A1415] sm:text-[40px] sm:leading-[46px]">
            Kegiatan <span className="text-[#B3101B]">IKAPEKSI Cianjur</span>
          </h2>
          <p className="mt-5 max-w-[620px] text-[13px] font-normal leading-[22px] text-[#4B4747] sm:text-[14px]">
            Kegiatan-kegiatan strategis IKAPEKSI Kabupaten Cianjur.
          </p>
        </Reveal>

        {total === 0 ? (
          <p className="mx-auto mt-12 max-w-[620px] rounded-2xl border border-dashed border-[#E5E0DC] bg-[#F7F5F3] px-6 py-10 text-center text-[13px] leading-[22px] text-[#4B4747]">
            Belum ada kegiatan yang dipublikasikan.
          </p>
        ) : (
          <ul className="mx-auto mt-12 grid max-w-[1040px] grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {items.slice(0, shown).map((item, idx) => (
              <li key={item.id} className="flex">
                {/* Delay diulang per kelompok agar kartu baru muncul berurutan */}
                <Reveal delay={(idx % STEP) * 80} className="flex w-full">
                  <Link
                    href={`/kegiatan/${item.slug}`}
                    aria-label={`Lihat detail: ${item.judul}`}
                    className="group relative flex h-full w-full flex-col overflow-hidden rounded-md border  bg-[rgb(249,250,251)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_32px_-16px_rgba(26,20,21,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B3101B] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    {/* Foto */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFEBE8]">
                      <Image
                        src={kegiatanImage(item)}
                        alt={item.judul}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                      {/* Garis aksen tiga warna di bawah foto */}
                      <div
                        className="absolute inset-x-0 bottom-0 flex h-1"
                        aria-hidden="true"
                      >
                        <span className="h-full w-1/2 bg-[#B3101B]" />
                        <span className="h-full w-1/3 bg-[#F5C518]" />
                        <span className="h-full flex-1 bg-[#1A1415]" />
                      </div>
                    </div>

                    {/* Isi */}
                    <div className="flex flex-1 flex-col p-6">
                      {(item.tanggal || item.lokasi) && (
                        <p className="text-[11px] font-bold uppercase leading-4 tracking-[0.12em] text-[#B3101B]">
                          {[item.tanggal, item.lokasi]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      )}
                      <h3 className="mt-2 text-[18px] font-bold leading-6 tracking-[-0.03em] text-[#1A1415]">
                        {item.judul}
                      </h3>
                      <p className="mt-3 text-[13px] font-normal leading-[21px] text-[#4B4747]">
                        {kegiatanExcerpt(item)}
                      </p>

                      <div className="mt-auto border-t border-[#E5E0DC] pt-5">
                        <span className="inline-flex items-center gap-2 text-[12px] font-bold leading-none text-[#1A1415] transition-colors duration-200 group-hover:text-[#B3101B]">
                         Baca Selengkapnya
                          <svg
                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
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
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        {/* Muat lebih banyak */}
        {total > INITIAL_COUNT && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <p
              className="text-[12px] font-normal leading-4 text-[#6B6666]"
              aria-live="polite"
            >
              Menampilkan {shown} dari {total} kegiatan
            </p>

            {/* Progress tipis */}
            <div
              className="h-1 w-40 overflow-hidden rounded-full bg-[#EFEBE8]"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full bg-[#B3101B] transition-all duration-500"
                style={{ width: `${(shown / total) * 100}%` }}
              />
            </div>

            {hasMore && (
              <button
                type="button"
                onClick={() => setVisible((v) => v + STEP)}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-[#1A1415] px-6 py-3.5 text-[13px] font-bold leading-none text-white transition-colors duration-200 hover:bg-[#B3101B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B3101B]"
              >
                Muat Lebih Banyak
              </button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}