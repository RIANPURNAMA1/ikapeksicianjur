"use client";

import { FormEvent, useState } from "react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import type { SelectOption } from "@/types/common";

const PROVINCES: SelectOption[] = [
  { label: "Jawa Barat", value: "jawa-barat" },
  { label: "Jawa Tengah", value: "jawa-tengah" },
  { label: "Jawa Timur", value: "jawa-timur" },
  { label: "DKI Jakarta", value: "dki-jakarta" },
  { label: "Banten", value: "banten" },
];

const ROLE_OPTIONS: SelectOption[] = [
  { label: "Alumni", value: "alumni" },
  { label: "Calon Alumni", value: "calon-alumni" },
  { label: "UMKM Binaan IKAPEKSI", value: "umkm-binaan" },
];

const PATH_OPTIONS: SelectOption[] = [
  { label: "IM Japan", value: "im-japan" },
  { label: "Swasta", value: "swasta" },
];

const DURATION_OPTIONS: SelectOption[] = [
  { label: "< 1 tahun", value: "lt-1" },
  { label: "1 - 3 tahun", value: "1-3" },
  { label: "3 - 5 tahun", value: "3-5" },
  { label: "> 5 tahun", value: "gt-5" },
];

const PREFECTURE_OPTIONS: SelectOption[] = [
  { label: "Tokyo", value: "tokyo" },
  { label: "Osaka", value: "osaka" },
  { label: "Aichi", value: "aichi" },
  { label: "Chiba", value: "chiba" },
  { label: "Saitama", value: "saitama" },
];

const STATUS_OPTIONS: SelectOption[] = [
  { label: "Masih Bekerja", value: "working" },
  { label: "Sudah Kembali", value: "returned" },
  { label: "Wirausaha", value: "entrepreneur" },
  { label: "Pencari Kerja", value: "job-seeker" },
];

const FIELD_OPTIONS: SelectOption[] = [
  { label: "Pertanian", value: "pertanian" },
  { label: "Perikanan", value: "perikanan" },
  { label: "Manufaktur", value: "manufaktur" },
  { label: "Konstruksi", value: "konstruksi" },
  { label: "Perhotelan", value: "perhotelan" },
  { label: "Kesehatan", value: "kesehatan" },
  { label: "Kuliner", value: "kuliner" },
  { label: "Lainnya", value: "lainnya" },
];

const EXPECTATIONS = [
  "Business Matching",
  "Buyer Jepang",
  "Informasi Magang Jepang",
  "Investasi",
  "Lowongan Kerja",
  "Networking Alumni",
  "Pelatihan",
  "Peluang Ekspor",
  "Pendampingan UMKM",
  "Promosi Produk",
  "Sertifikasi",
];

const BENEFITS = [
  "Direktori Nasional Alumni Kenshusei",
  "Business Matching antar alumni",
  "Peluang kerja sama bisnis & investasi",
  "Informasi buyer dan peluang ekspor ke Jepang",
  "Pelatihan, sertifikasi, dan pengembangan SDM",
  "Informasi lowongan kerja & rekrutmen",
  "Program pemberdayaan UMKM alumni",
  "Dasar penyusunan program nasional IKAPEKSI",
];

export default function PendataanPage() {
  const [expectations, setExpectations] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function toggleExpectation(value: string) {
    setExpectations((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (prev.length >= 3) return prev;
      return [...prev, value];
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="bg-ink py-20 text-white">
        <Container className="mx-auto max-w-2xl text-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
            <p className="text-4xl">✅</p>
            <h1 className="mt-4 text-2xl font-extrabold sm:text-3xl">Pendataan Berhasil Terkirim!</h1>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Terima kasih telah mengisi Pendataan Nasional Alumni Magang/Kerja Jepang. Data Anda akan
              segera diproses oleh tim DPP IKAPEKSI.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-ink py-16 text-white">
      <Container className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="stamp-label border-white/30 bg-white/10 text-white">
             Pendataan Alumni Magang/Kerja Jepang Cianjur
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
            Pendataan  Alumni Magang/Kerja Jepang IM Japan dan Swasta
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold text-primary-light sm:text-base">
           Mari Bersatu dalam Satu Data, Satu Jaringan, dan Satu Semangat Membangun Negeri
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
            DPC IKAPEKSI menginisiasi Pendataan Alumni Magang/Kerja Jepang sebagai langkah
            strategis untuk membangun database alumni yang akurat, terintegrasi, dan bermanfaat bagi
            seluruh alumni di Indonesia. Pendataan ini terbuka untuk seluruh alumni Kenshusei, baik
            yang sudah menjadi anggota IKAPEKSI maupun yang belum bergabung.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="font-bold text-white">Manfaat Pendataan:</p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex gap-2">
                <span aria-hidden="true">✅</span>
                {benefit}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-semibold text-primary-light">
            ⏱️ Waktu pengisian hanya sekitar 2 menit.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Mari bersama membangun kekuatan jaringan alumni Kenshusei Indonesia melalui satu data yang
            akurat dan bermanfaat.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <Select
            id="saya-adalah"
            label="Saya Adalah *"
            options={ROLE_OPTIONS}
            placeholder="-- Pilih --"
            required
            variant="dark"
          />

          <h2 className="pt-2 text-lg font-bold text-white">Data Diri</h2>
          <Input id="nama" label="Nama Lengkap *" placeholder="Nama Lengkap Anda" required variant="dark" />
          <Input id="wa" label="Nomor WhatsApp Aktif *" placeholder="08xxxxxxxxxx" required variant="dark" />
          <Input id="email" type="email" label="Email (Opsional)" placeholder="nama@email.com" variant="dark" />
          <Select id="provinsi" label="Provinsi *" options={PROVINCES} placeholder="-- Pilih Provinsi --" required variant="dark" />
          <Input id="kota" label="Kota/Kabupaten Domisili Saat Ini *" placeholder="-- Pilih Provinsi terlebih dahulu --" required variant="dark" />
          <Input id="pekerjaan" label="Usaha/Pekerjaan Saat Ini *" placeholder="Usaha/Pekerjaan Anda" required variant="dark" />

          <h2 className="pt-2 text-lg font-bold text-white">Data Kenshusei</h2>
          <Select id="jalur" label="Jalur Pemagangan Jepang" options={PATH_OPTIONS} placeholder="-- Pilih --" variant="dark" />
          <Input id="angkatan" label="Jika Alumni IM Japan, Angkatan Berapa?" placeholder="Contoh: 2019" variant="dark" />
          <Select id="durasi" label="Durasi Magang di Jepang" options={DURATION_OPTIONS} placeholder="-- Pilih --" variant="dark" />
          <Select id="prefektur" label="Prefektur Penempatan (Jepang)" options={PREFECTURE_OPTIONS} placeholder="-- Pilih (opsional) --" variant="dark" />
          <Input id="tahun" label="Tahun Kepulangan ke Indonesia" placeholder="Contoh: 2024" variant="dark" />

          <h2 className="pt-2 text-lg font-bold text-white">Status Saat Ini</h2>
          <Select id="status" label="Status Saat Ini" options={STATUS_OPTIONS} placeholder="-- Pilih --" variant="dark" />
          <Input id="perusahaan" label="Nama Perusahaan/Usaha" placeholder="Nama perusahaan/usaha" variant="dark" />
          <Select id="bidang" label="Bidang Usaha/Profesi Tempat Bekerja" options={FIELD_OPTIONS} placeholder="-- Pilih --" variant="dark" />

          <div className="pt-2">
            <p className="text-sm font-semibold text-white">
              Harapan dari IKAPEKSI <span className="font-normal text-white/50">(Pilih maksimal 3.)</span>
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {EXPECTATIONS.map((item) => {
                const checked = expectations.includes(item);
                const disabled = !checked && expectations.length >= 3;
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleExpectation(item)}
                    disabled={disabled}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${
                      checked
                        ? "border-primary bg-primary/20 text-white"
                        : "border-white/15 bg-white/5 text-white/70 hover:border-primary/50"
                    } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-xs ${
                        checked ? "border-primary bg-primary text-white" : "border-white/30"
                      }`}
                    >
                      {checked && "✓"}
                    </span>
                    {item}
                  </button>
                );
              })}
            </div>
            <input
              id="harapan-lainnya"
              placeholder="Lainnya (opsional)"
              className="btn-focus mt-3 w-full rounded-md border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary"
            />
          </div>

          <div className="pt-2">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-white/80">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 accent-primary"
              />
              <span>
                Saya telah membaca dan memahami tujuan pendataan ini serta menyetujui penggunaan data
                saya oleh DPC IKAPEKSI CIANJUR. *
              </span>
            </label>
          </div>

          <Button type="submit" disabled={!agreed} className="btn-shine w-full !rounded-full !bg-primary-dark py-4 text-base font-bold hover:!bg-primary-darker">
            Daftar Sekarang
          </Button>
        </form>
      </Container>
    </section>
  );
}