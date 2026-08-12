"use client";

import { FormEvent, useEffect, useState, type ReactNode } from "react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { apiFetch } from "@/lib/api";
import type { SelectOption } from "@/types/common";

type Kategori = "alumni" | "calon-alumni" | "umkm-binaan";

const KATEGORI: {
  value: Kategori;
  label: string;
  desc: string;
  icon: ReactNode;
}[] = [
  {
    value: "alumni",
    label: "Alumni",
    desc: "Sudah pernah magang/kerja di Jepang",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6-3.5V12m12 1.5V12" />
      </svg>
    ),
  },
  {
    value: "calon-alumni",
    label: "Calon Alumni",
    desc: "Sedang proses magang/kerja ke Jepang",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    ),
  },
  {
    value: "umkm-binaan",
    label: "Binaan UMKM",
    desc: "Pelaku usaha binaan IKAPEKSI",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
      </svg>
    ),
  },
];

interface WilayahItem {
  id: string;
  name: string;
}

const JALUR_OPTIONS: SelectOption[] = [
  { label: "IM Japan", value: "im-japan" },
  { label: "Swasta", value: "swasta" },
];

const DURASI_OPTIONS: SelectOption[] = [
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
  { label: "Kanagawa", value: "kanagawa" },
  { label: "Fukuoka", value: "fukuoka" },
  { label: "Lainnya", value: "lainnya" },
];

const STATUS_OPTIONS: SelectOption[] = [
  { label: "Bekerja", value: "bekerja" },
  { label: "Wirausaha", value: "wirausaha" },
  { label: "Pencari Kerja", value: "pencari-kerja" },
  { label: "Lainnya", value: "lainnya" },
];

const BIDANG_OPTIONS: SelectOption[] = [
  { label: "Pertanian", value: "pertanian" },
  { label: "Perikanan", value: "perikanan" },
  { label: "Manufaktur", value: "manufaktur" },
  { label: "Konstruksi", value: "konstruksi" },
  { label: "Perhotelan", value: "perhotelan" },
  { label: "Kesehatan", value: "kesehatan" },
  { label: "Kuliner", value: "kuliner" },
  { label: "Lainnya", value: "lainnya" },
];

const STATUS_PROSES_OPTIONS: SelectOption[] = [
  { label: "Baru Mendaftar", value: "baru-mendaftar" },
  { label: "Sedang Seleksi", value: "seleksi" },
  { label: "Diterima LPK", value: "diterima-lpk" },
  { label: "Menunggu Keberangkatan", value: "menunggu-keberangkatan" },
];

const BIDANG_UMKM_OPTIONS: SelectOption[] = [
  { label: "Kuliner", value: "kuliner" },
  { label: "Fashion", value: "fashion" },
  { label: "Pertanian", value: "pertanian" },
  { label: "Kerajinan", value: "kerajinan" },
  { label: "Jasa", value: "jasa" },
  { label: "Lainnya", value: "lainnya" },
];

const LEGALITAS_OPTIONS: SelectOption[] = [
  { label: "Sudah", value: "ya" },
  { label: "Belum", value: "tidak" },
];

const KAPASITAS_OPTIONS: SelectOption[] = [
  { label: "< 10 unit", value: "lt-10" },
  { label: "10 - 50 unit", value: "10-50" },
  { label: "50 - 200 unit", value: "50-200" },
  { label: "> 200 unit", value: "gt-200" },
];

const OMZET_OPTIONS: SelectOption[] = [
  { label: "< 5 juta/bulan", value: "lt-5jt" },
  { label: "5 - 15 juta/bulan", value: "5-15jt" },
  { label: "15 - 50 juta/bulan", value: "15-50jt" },
  { label: "> 50 juta/bulan", value: "gt-50jt" },
];

const PEMASARAN_OPTIONS: SelectOption[] = [
  { label: "Lokal / Tetangga", value: "lokal" },
  { label: "Kecamatan / Kota", value: "kota" },
  { label: "Provinsi / Nasional", value: "nasional" },
  { label: "Online / Marketplace", value: "online" },
  { label: "Ekspor", value: "ekspor" },
];

const KEBUTUHAN_OPTIONS = ["Buyer", "Ekspor", "Modal", "Marketing", "Pendampingan"];

const HARAPAN_OPTIONS = [
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

interface DataDiriState {
  nama: string;
  whatsapp: string;
  email: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  desa: string;
  pekerjaan: string;
}

interface AlumniState {
  jalur: string;
  angkatan: string;
  durasi: string;
  prefektur: string;
  tahunKepulangan: string;
  status: string;
  pekerjaan: string;
  perusahaan: string;
  usaha: string;
}

interface CalonState {
  jalur: string;
  lpk: string;
  bidang: string;
  statusProses: string;
  targetKeberangkatan: string;
  targetPrefektur: string;
}

interface UmkmState {
  namaUsaha: string;
  bidang: string;
  produk: string;
  tahunBerdiri: string;
  karyawan: string;
  nib: string;
  halal: string;
  pirt: string;
  bpom: string;
  kapasitas: string;
  omzet: string;
  pemasaran: string;
  ekspor: string;
  kebutuhan: string[];
}

function SectionCard({
  step,
  title,
  subtitle,
  children,
}: {
  step: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-black text-white">
          {step}
        </span>
        <div>
          <h2 className="text-lg font-bold leading-tight text-white">{title}</h2>
          {subtitle && <p className="text-xs text-white/50">{subtitle}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export default function PendataanForm() {
  const [kategori, setKategori] = useState<Kategori | "">("");
  const [dataDiri, setDataDiri] = useState<DataDiriState>({
    nama: "",
    whatsapp: "",
    email: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
    pekerjaan: "",
  });
  const [provinsiOptions, setProvinsiOptions] = useState<SelectOption[]>([]);
  const [kabupatenOptions, setKabupatenOptions] = useState<SelectOption[]>([]);
  const [kecamatanOptions, setKecamatanOptions] = useState<SelectOption[]>([]);
  const [desaOptions, setDesaOptions] = useState<SelectOption[]>([]);
  const [loadingKabupaten, setLoadingKabupaten] = useState(false);
  const [loadingKecamatan, setLoadingKecamatan] = useState(false);
  const [loadingDesa, setLoadingDesa] = useState(false);
  const [wilayahError, setWilayahError] = useState("");
  const [alumni, setAlumni] = useState<AlumniState>({
    jalur: "",
    angkatan: "",
    durasi: "",
    prefektur: "",
    tahunKepulangan: "",
    status: "",
    pekerjaan: "",
    perusahaan: "",
    usaha: "",
  });
  const [calon, setCalon] = useState<CalonState>({
    jalur: "",
    lpk: "",
    bidang: "",
    statusProses: "",
    targetKeberangkatan: "",
    targetPrefektur: "",
  });
  const [umkm, setUmkm] = useState<UmkmState>({
    namaUsaha: "",
    bidang: "",
    produk: "",
    tahunBerdiri: "",
    karyawan: "",
    nib: "",
    halal: "",
    pirt: "",
    bpom: "",
    kapasitas: "",
    omzet: "",
    pemasaran: "",
    ekspor: "",
    kebutuhan: [],
  });
  const [harapan, setHarapan] = useState<string[]>([]);
  const [harapanLainnya, setHarapanLainnya] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function setData<K extends keyof DataDiriState>(key: K, value: string) {
    setDataDiri((prev) => ({ ...prev, [key]: value }));
  }

  function toTitleCase(value: string): string {
    return value
      .toLowerCase()
      .split(" ")
      .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
      .join(" ");
  }

  async function loadWilayahOptions(
    kind: "regencies" | "districts" | "villages",
    parentId: string
  ): Promise<SelectOption[]> {
    const data = await apiFetch<WilayahItem[]>(`/api/wilayah/${kind}/${parentId}`);
    return data.map((item) => ({ label: toTitleCase(item.name), value: item.id }));
  }

  useEffect(() => {
    apiFetch<WilayahItem[]>("/api/wilayah/provinces")
      .then((data) =>
        setProvinsiOptions(data.map((item) => ({ label: toTitleCase(item.name), value: item.id })))
      )
      .catch(() => setWilayahError("Gagal memuat data provinsi."));
  }, []);

  function handleProvinsiChange(value: string) {
    setDataDiri((prev) => ({
      ...prev,
      provinsi: value,
      kabupaten: "",
      kecamatan: "",
      desa: "",
    }));
    setKabupatenOptions([]);
    setKecamatanOptions([]);
    setDesaOptions([]);
    setWilayahError("");
    if (!value) return;
    setLoadingKabupaten(true);
    loadWilayahOptions("regencies", value)
      .then(setKabupatenOptions)
      .catch(() => setWilayahError("Gagal memuat data kabupaten/kota."))
      .finally(() => setLoadingKabupaten(false));
  }

  function handleKabupatenChange(value: string) {
    setDataDiri((prev) => ({
      ...prev,
      kabupaten: value,
      kecamatan: "",
      desa: "",
    }));
    setKecamatanOptions([]);
    setDesaOptions([]);
    setWilayahError("");
    if (!value) return;
    setLoadingKecamatan(true);
    loadWilayahOptions("districts", value)
      .then(setKecamatanOptions)
      .catch(() => setWilayahError("Gagal memuat data kecamatan."))
      .finally(() => setLoadingKecamatan(false));
  }

  function handleKecamatanChange(value: string) {
    setDataDiri((prev) => ({
      ...prev,
      kecamatan: value,
      desa: "",
    }));
    setDesaOptions([]);
    setWilayahError("");
    if (!value) return;
    setLoadingDesa(true);
    loadWilayahOptions("villages", value)
      .then(setDesaOptions)
      .catch(() => setWilayahError("Gagal memuat data desa/kelurahan."))
      .finally(() => setLoadingDesa(false));
  }

  function setAlumniField<K extends keyof AlumniState>(key: K, value: string) {
    setAlumni((prev) => ({ ...prev, [key]: value }));
  }

  function setCalonField<K extends keyof CalonState>(key: K, value: string) {
    setCalon((prev) => ({ ...prev, [key]: value }));
  }

  function setUmkmField<K extends keyof Omit<UmkmState, "kebutuhan">>(key: K, value: string) {
    setUmkm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleKebutuhan(value: string) {
    setUmkm((prev) => ({
      ...prev,
      kebutuhan: prev.kebutuhan.includes(value)
        ? prev.kebutuhan.filter((k) => k !== value)
        : [...prev.kebutuhan, value],
    }));
  }

  function toggleHarapan(value: string) {
    setHarapan((prev) => {
      if (prev.includes(value)) {
        return prev.filter((h) => h !== value);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, value];
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError("");

    if (!kategori) {
      setSubmitError("Silakan pilih kategori terlebih dahulu.");
      return;
    }

    setSubmitting(true);
    apiFetch("/api/pendaftaran", {
      method: "POST",
      body: JSON.stringify(buildPayload()),
    })
      .then(() => {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((err) => {
        setSubmitError(
          err instanceof Error ? err.message : "Gagal mengirim data. Silakan coba lagi."
        );
      })
      .finally(() => setSubmitting(false));
  }

  function labelOf(options: SelectOption[], value: string): string {
    return options.find((opt) => opt.value === value)?.label ?? value;
  }

  function buildPayload(): Record<string, unknown> {
    const payload: Record<string, unknown> = {
      kategori,
      nama: dataDiri.nama,
      whatsapp: dataDiri.whatsapp,
      email: dataDiri.email,
      provinsi: labelOf(provinsiOptions, dataDiri.provinsi),
      kabupaten: labelOf(kabupatenOptions, dataDiri.kabupaten),
      kecamatan: labelOf(kecamatanOptions, dataDiri.kecamatan),
      desa: labelOf(desaOptions, dataDiri.desa),
      pekerjaan: dataDiri.pekerjaan,
      harapan,
      harapan_lainnya: harapanLainnya,
      agreed,
    };

    if (kategori === "alumni") {
      Object.assign(payload, {
        jalur: labelOf(JALUR_OPTIONS, alumni.jalur),
        angkatan: alumni.angkatan,
        durasi: labelOf(DURASI_OPTIONS, alumni.durasi),
        prefektur: labelOf(PREFECTURE_OPTIONS, alumni.prefektur),
        tahun_kepulangan: alumni.tahunKepulangan,
        status_saat_ini: labelOf(STATUS_OPTIONS, alumni.status),
        pekerjaan_saat_ini: alumni.pekerjaan,
        perusahaan: alumni.perusahaan,
        usaha: alumni.usaha,
      });
    } else if (kategori === "calon-alumni") {
      Object.assign(payload, {
        jalur: labelOf(JALUR_OPTIONS, calon.jalur),
        lpk: calon.lpk,
        bidang: labelOf(BIDANG_OPTIONS, calon.bidang),
        status_proses: labelOf(STATUS_PROSES_OPTIONS, calon.statusProses),
        target_keberangkatan: calon.targetKeberangkatan,
        target_prefektur: labelOf(PREFECTURE_OPTIONS, calon.targetPrefektur),
      });
    } else if (kategori === "umkm-binaan") {
      Object.assign(payload, {
        nama_usaha: umkm.namaUsaha,
        bidang_usaha: labelOf(BIDANG_UMKM_OPTIONS, umkm.bidang),
        produk: umkm.produk,
        tahun_berdiri: umkm.tahunBerdiri,
        jumlah_karyawan: umkm.karyawan,
        nib: labelOf(LEGALITAS_OPTIONS, umkm.nib),
        halal: labelOf(LEGALITAS_OPTIONS, umkm.halal),
        pirt: labelOf(LEGALITAS_OPTIONS, umkm.pirt),
        bpom: labelOf(LEGALITAS_OPTIONS, umkm.bpom),
        kapasitas: labelOf(KAPASITAS_OPTIONS, umkm.kapasitas),
        omzet: labelOf(OMZET_OPTIONS, umkm.omzet),
        pemasaran: labelOf(PEMASARAN_OPTIONS, umkm.pemasaran),
        ekspor: labelOf(LEGALITAS_OPTIONS, umkm.ekspor),
        kebutuhan: umkm.kebutuhan,
      });
    }

    return payload;
  }

  if (submitted) {
    return (
      <section className="bg-ink py-20 text-white">
        <Container className="mx-auto max-w-2xl text-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
            <p className="text-4xl">✅</p>
            <h1 className="mt-4 text-2xl font-extrabold sm:text-3xl">Registrasi Berhasil Terkirim!</h1>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Terima kasih telah mengisi Registrasi IKAPEKSI. Data Anda akan segera diproses oleh
              tim DPC IKAPEKSI Cianjur.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-ink py-16 text-white">
      <Container className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="stamp-label border-white/30 bg-white/10 text-white">
            Registrasi IKAPEKSI
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
            Registrasi Data Alumni, Calon Alumni & Binaan UMKM
          </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
            Lengkapi data sesuai kategori Anda. Formulir akan menyesuaikan kebutuhan data secara
            otomatis setelah memilih kategori di bawah.
          </p>

          {/* Penjelasan & Manfaat Pendataan */}
          <div className="mx-auto mt-8 max-w-3xl space-y-6 text-sm leading-relaxed text-white/80">
            <div className="rounded-2xl border border-white/5 bg-white/5 p-6 text-center">
              <p className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                <span>🇮🇩</span> 🇯🇵 <span>Mari Bersatu</span>
              </p>
              <p className="mt-1 text-base font-semibold text-white">
                dalam Satu Data, Satu Jaringan, dan Satu Semangat Membangun Negeri
              </p>
            </div>

            <p className="max-w-2xl text-center">
              DPc IKAPEKSI menginisiasi{" "}
              <span className="font-semibold text-white">Pendataan Alumni jepang/Kerja Jepang</span>{" "}
              sebagai langkah strategis untuk membangun database alumni yang akurat, terintegrasi, dan
              bermanfaat bagi seluruh alumni di Cianjur. Pendataan ini terbuka untuk seluruh alumni
              Jepang, baik yang sudah menjadi anggota IKAPEKSI maupun yang belum bergabung.
            </p>

            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {[
                "Direktori Nasional Alumni Kenshusei",
                "Business Matching antar alumni",
                "Peluang kerja sama bisnis & investasi",
                "Informasi buyer dan peluang ekspor ke Jepang",
                "Pelatihan, sertifikasi, dan pengembangan SDM",
                "Informasi lowongan kerja & rekrutmen",
                "Program pemberdayaan UMKM alumni",
                "Dasar penyusunan program nasional IKAPEKSI",
              ].map((manfaat) => (
                <div
                  key={manfaat}
                  className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/5 p-3"
                >
                  <span className="mt-0.5 text-base" aria-hidden="true">
                    ✅
                  </span>
                  <span>{manfaat}</span>
                </div>
              ))}
            </div>

            <p className="flex items-center justify-center gap-2 text-center text-sm">
              <span aria-label="Estimasi waktu" title="Estimasi waktu">
                ⏱️
              </span>
              <span>
                <span className="font-semibold text-white">Waktu pengisian hanya sekitar 2 menit.</span>
              </span>
            </p>

            <p className="text-center italic">
              Mari bersama membangun kekuatan jaringan alumni Kenshusei Indonesia melalui satu data
              yang akurat dan bermanfaat.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          {/* STEP 1: Saya Adalah */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-black text-white">
                1
              </span>
              <div>
                <h2 className="text-lg font-bold leading-tight text-white">Saya Adalah *</h2>
                <p className="text-xs text-white/50">Pilih kategori Anda untuk menampilkan form yang sesuai.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {KATEGORI.map((k) => {
                const active = kategori === k.value;
                return (
                  <button
                    type="button"
                    key={k.value}
                    onClick={() => setKategori(k.value)}
                    aria-pressed={active}
                    className={`flex flex-col items-start gap-3 rounded-xl border p-5 text-left transition-all ${
                      active
                        ? "border-primary bg-primary/15 ring-1 ring-primary"
                        : "border-white/15 bg-white/5 hover:border-primary/50 hover:bg-white/10"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        active ? "bg-primary text-white" : "bg-white/10 text-white/70"
                      }`}
                    >
                      {k.icon}
                    </span>
                    <span className="text-sm font-bold text-white">{k.label}</span>
                    <span className="text-xs leading-snug text-white/50">{k.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Data Diri */}
          <SectionCard step="2" title="Data Diri" subtitle="Isi data kontak yang valid untuk keperluan pendataan.">
            <Input
              id="nama"
              label="Nama Lengkap *"
              placeholder="Nama Lengkap Anda"
              required
              variant="dark"
              value={dataDiri.nama}
              onChange={(e) => setData("nama", e.target.value)}
            />
            <Input
              id="whatsapp"
              label="Nomor WhatsApp *"
              placeholder="08xxxxxxxxxx"
              required
              variant="dark"
              value={dataDiri.whatsapp}
              onChange={(e) => setData("whatsapp", e.target.value)}
            />
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="nama@email.com"
              variant="dark"
              value={dataDiri.email}
              onChange={(e) => setData("email", e.target.value)}
            />
            {wilayahError && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-300 sm:col-span-2">
                {wilayahError}
              </div>
            )}
            <Select
              id="provinsi"
              label="Provinsi *"
              options={provinsiOptions}
              placeholder="-- Pilih Provinsi --"
              required
              variant="dark"
              value={dataDiri.provinsi}
              onChange={(e) => handleProvinsiChange(e.target.value)}
            />
            <Select
              id="kabupaten"
              label="Kabupaten / Kota *"
              options={kabupatenOptions}
              placeholder={loadingKabupaten ? "Memuat data..." : "-- Pilih Kabupaten / Kota --"}
              required
              disabled={!dataDiri.provinsi || loadingKabupaten}
              variant="dark"
              value={dataDiri.kabupaten}
              onChange={(e) => handleKabupatenChange(e.target.value)}
            />
            <Select
              id="kecamatan"
              label="Kecamatan *"
              options={kecamatanOptions}
              placeholder={loadingKecamatan ? "Memuat data..." : "-- Pilih Kecamatan --"}
              required
              disabled={!dataDiri.kabupaten || loadingKecamatan}
              variant="dark"
              value={dataDiri.kecamatan}
              onChange={(e) => handleKecamatanChange(e.target.value)}
            />
            <Select
              id="desa"
              label="Desa / Kelurahan *"
              options={desaOptions}
              placeholder={loadingDesa ? "Memuat data..." : "-- Pilih Desa / Kelurahan --"}
              required
              disabled={!dataDiri.kecamatan || loadingDesa}
              variant="dark"
              value={dataDiri.desa}
              onChange={(e) => setData("desa", e.target.value)}
            />
            <Input
              id="pekerjaan"
              label="Pekerjaan *"
              placeholder="Pekerjaan / profesi Anda"
              required
              variant="dark"
              value={dataDiri.pekerjaan}
              onChange={(e) => setData("pekerjaan", e.target.value)}
            />
          </SectionCard>

          {/* STEP 3+: Kondisional sesuai kategori */}
          {kategori === "alumni" && (
            <>
              <SectionCard
                step="3"
                title="Data Kenshusei"
                subtitle="Data masa magang / kerja di Jepang."
              >
                <Select
                  id="al-jalur"
                  label="Jalur Pemagangan *"
                  options={JALUR_OPTIONS}
                  placeholder="-- Pilih --"
                  required
                  variant="dark"
                  value={alumni.jalur}
                  onChange={(e) => setAlumniField("jalur", e.target.value)}
                />
                <Input
                  id="al-angkatan"
                  label="Angkatan"
                  placeholder="Contoh: 2019"
                  variant="dark"
                  value={alumni.angkatan}
                  onChange={(e) => setAlumniField("angkatan", e.target.value)}
                />
                <Select
                  id="al-durasi"
                  label="Durasi Magang"
                  options={DURASI_OPTIONS}
                  placeholder="-- Pilih --"
                  variant="dark"
                  value={alumni.durasi}
                  onChange={(e) => setAlumniField("durasi", e.target.value)}
                />
                <Select
                  id="al-prefektur"
                  label="Prefektur Penempatan"
                  options={PREFECTURE_OPTIONS}
                  placeholder="-- Pilih --"
                  variant="dark"
                  value={alumni.prefektur}
                  onChange={(e) => setAlumniField("prefektur", e.target.value)}
                />
                <Input
                  id="al-tahun"
                  label="Tahun Kepulangan"
                  placeholder="Contoh: 2024"
                  variant="dark"
                  value={alumni.tahunKepulangan}
                  onChange={(e) => setAlumniField("tahunKepulangan", e.target.value)}
                />
              </SectionCard>

              <SectionCard step="4" title="Status Saat Ini" subtitle="Kondisi Anda setelah kembali ke Indonesia.">
                <Select
                  id="al-status"
                  label="Status Saat Ini *"
                  options={STATUS_OPTIONS}
                  placeholder="-- Pilih --"
                  required
                  variant="dark"
                  value={alumni.status}
                  onChange={(e) => setAlumniField("status", e.target.value)}
                />
                <Input
                  id="al-pekerjaan"
                  label="Pekerjaan"
                  placeholder="Pekerjaan saat ini"
                  variant="dark"
                  value={alumni.pekerjaan}
                  onChange={(e) => setAlumniField("pekerjaan", e.target.value)}
                />
                <Input
                  id="al-perusahaan"
                  label="Perusahaan"
                  placeholder="Nama perusahaan / instansi"
                  variant="dark"
                  value={alumni.perusahaan}
                  onChange={(e) => setAlumniField("perusahaan", e.target.value)}
                />
                <Input
                  id="al-usaha"
                  label="Usaha"
                  placeholder="Nama usaha / UMKM (jika ada)"
                  variant="dark"
                  value={alumni.usaha}
                  onChange={(e) => setAlumniField("usaha", e.target.value)}
                />
              </SectionCard>
            </>
          )}

          {kategori === "calon-alumni" && (
            <SectionCard
              step="3"
              title="Program Jepang"
              subtitle="Data rencana magang / kerja ke Jepang."
            >
              <Select
                id="ca-jalur"
                label="Jalur *"
                options={JALUR_OPTIONS}
                placeholder="-- Pilih --"
                required
                variant="dark"
                value={calon.jalur}
                onChange={(e) => setCalonField("jalur", e.target.value)}
              />
              <Input
                id="ca-lpk"
                label="LPK"
                placeholder="Nama LPK / penyalur"
                variant="dark"
                value={calon.lpk}
                onChange={(e) => setCalonField("lpk", e.target.value)}
              />
              <Select
                id="ca-bidang"
                label="Bidang"
                options={BIDANG_OPTIONS}
                placeholder="-- Pilih --"
                variant="dark"
                value={calon.bidang}
                onChange={(e) => setCalonField("bidang", e.target.value)}
              />
              <Select
                id="ca-status"
                label="Status Proses *"
                options={STATUS_PROSES_OPTIONS}
                placeholder="-- Pilih --"
                required
                variant="dark"
                value={calon.statusProses}
                onChange={(e) => setCalonField("statusProses", e.target.value)}
              />
              <Input
                id="ca-keberangkatan"
                label="Target Keberangkatan"
                placeholder="Contoh: Kuartal I 2027"
                variant="dark"
                value={calon.targetKeberangkatan}
                onChange={(e) => setCalonField("targetKeberangkatan", e.target.value)}
              />
              <Select
                id="ca-target-prefektur"
                label="Target Prefektur"
                options={PREFECTURE_OPTIONS}
                placeholder="-- Pilih --"
                variant="dark"
                value={calon.targetPrefektur}
                onChange={(e) => setCalonField("targetPrefektur", e.target.value)}
              />
            </SectionCard>
          )}

          {kategori === "umkm-binaan" && (
            <>
              <SectionCard step="3" title="Profil UMKM" subtitle="Informasi dasar usaha Anda.">
                <Input
                  id="um-nama"
                  label="Nama Usaha *"
                  placeholder="Nama usaha / brand"
                  required
                  variant="dark"
                  value={umkm.namaUsaha}
                  onChange={(e) => setUmkmField("namaUsaha", e.target.value)}
                />
                <Select
                  id="um-bidang"
                  label="Bidang Usaha *"
                  options={BIDANG_UMKM_OPTIONS}
                  placeholder="-- Pilih --"
                  required
                  variant="dark"
                  value={umkm.bidang}
                  onChange={(e) => setUmkmField("bidang", e.target.value)}
                />
                <Input
                  id="um-produk"
                  label="Produk"
                  placeholder="Produk unggulan / utama"
                  variant="dark"
                  value={umkm.produk}
                  onChange={(e) => setUmkmField("produk", e.target.value)}
                />
                <Input
                  id="um-berdiri"
                  label="Tahun Berdiri"
                  placeholder="Contoh: 2020"
                  variant="dark"
                  value={umkm.tahunBerdiri}
                  onChange={(e) => setUmkmField("tahunBerdiri", e.target.value)}
                />
                <Input
                  id="um-karyawan"
                  label="Jumlah Karyawan"
                  placeholder="Contoh: 5 orang"
                  variant="dark"
                  value={umkm.karyawan}
                  onChange={(e) => setUmkmField("karyawan", e.target.value)}
                />
              </SectionCard>

              <SectionCard step="4" title="Legalitas" subtitle="Kelengkapan izin dan sertifikasi usaha.">
                <Select
                  id="um-nib"
                  label="NIB (Nomor Induk Berusaha)"
                  options={LEGALITAS_OPTIONS}
                  placeholder="-- Pilih --"
                  variant="dark"
                  value={umkm.nib}
                  onChange={(e) => setUmkmField("nib", e.target.value)}
                />
                <Select
                  id="um-halal"
                  label="Sertifikat Halal"
                  options={LEGALITAS_OPTIONS}
                  placeholder="-- Pilih --"
                  variant="dark"
                  value={umkm.halal}
                  onChange={(e) => setUmkmField("halal", e.target.value)}
                />
                <Select
                  id="um-pirt"
                  label="PIRT"
                  options={LEGALITAS_OPTIONS}
                  placeholder="-- Pilih --"
                  variant="dark"
                  value={umkm.pirt}
                  onChange={(e) => setUmkmField("pirt", e.target.value)}
                />
                <Select
                  id="um-bpom"
                  label="BPOM"
                  options={LEGALITAS_OPTIONS}
                  placeholder="-- Pilih --"
                  variant="dark"
                  value={umkm.bpom}
                  onChange={(e) => setUmkmField("bpom", e.target.value)}
                />
              </SectionCard>

              <SectionCard step="5" title="Usaha" subtitle="Skala produksi dan pemasaran usaha.">
                <Select
                  id="um-kapasitas"
                  label="Kapasitas Produksi"
                  options={KAPASITAS_OPTIONS}
                  placeholder="-- Pilih --"
                  variant="dark"
                  value={umkm.kapasitas}
                  onChange={(e) => setUmkmField("kapasitas", e.target.value)}
                />
                <Select
                  id="um-omzet"
                  label="Omzet per Bulan"
                  options={OMZET_OPTIONS}
                  placeholder="-- Pilih --"
                  variant="dark"
                  value={umkm.omzet}
                  onChange={(e) => setUmkmField("omzet", e.target.value)}
                />
                <Select
                  id="um-pemasaran"
                  label="Pemasaran"
                  options={PEMASARAN_OPTIONS}
                  placeholder="-- Pilih --"
                  variant="dark"
                  value={umkm.pemasaran}
                  onChange={(e) => setUmkmField("pemasaran", e.target.value)}
                />
                <Select
                  id="um-ekspor"
                  label="Sudah/Ekspor ke Luar Negeri"
                  options={LEGALITAS_OPTIONS}
                  placeholder="-- Pilih --"
                  variant="dark"
                  value={umkm.ekspor}
                  onChange={(e) => setUmkmField("ekspor", e.target.value)}
                />
              </SectionCard>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-black text-white">
                    6
                  </span>
                  <div>
                    <h2 className="text-lg font-bold leading-tight text-white">Kebutuhan</h2>
                    <p className="text-xs text-white/50">Pilih bantuan yang dibutuhkan usaha Anda.</p>
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {KEBUTUHAN_OPTIONS.map((need) => {
                    const checked = umkm.kebutuhan.includes(need);
                    return (
                      <button
                        type="button"
                        key={need}
                        onClick={() => toggleKebutuhan(need)}
                        aria-pressed={checked}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${
                          checked
                            ? "border-primary bg-primary/20 text-white"
                            : "border-white/15 bg-white/5 text-white/70 hover:border-primary/50"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs ${
                            checked ? "border-primary bg-primary text-white" : "border-white/30"
                          }`}
                        >
                          {checked && "✓"}
                        </span>
                        {need}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* HARAPAN DARI IKAPEKSI */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-black text-white">
                7
              </span>
              <div>
                <h2 className="text-lg font-bold leading-tight text-white">Harapan dari IKAPEKSI</h2>
                <p className="text-xs text-white/50">Pilih maksimal 3 harapan Anda dari IKAPEKSI.</p>
              </div>
              <span className="ml-auto shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-white/70">
                {harapan.length}/3
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {HARAPAN_OPTIONS.map((item) => {
                const checked = harapan.includes(item);
                const disabled = !checked && harapan.length >= 3;
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleHarapan(item)}
                    aria-pressed={checked}
                    disabled={disabled}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${
                      checked
                        ? "border-primary bg-primary/20 text-white"
                        : disabled
                          ? "cursor-not-allowed border-white/10 bg-white/5 text-white/40"
                          : "border-white/15 bg-white/5 text-white/70 hover:border-primary/50"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs ${
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
            <div className="mt-4">
              <Input
                id="harapan-lainnya"
                label="Lainnya (opsional)"
                placeholder="Harapan lain di luar daftar di atas"
                variant="dark"
                value={harapanLainnya}
                onChange={(e) => setHarapanLainnya(e.target.value)}
              />
            </div>
          </div>

          {/* PERSETUJUAN DATA */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-black text-white">
                8
              </span>
              <h2 className="text-lg font-bold leading-tight text-white">Persetujuan Data</h2>
            </div>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-white/80">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 accent-primary"
              />
              <span>
                Saya menyatakan bahwa data yang saya isi adalah benar, serta menyetujui penggunaan
                data oleh DPC IKAPEKSI CIANJUR untuk keperluan pendataan dan program organisasi. *
              </span>
            </label>
            {submitError && (
              <p className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {submitError}
              </p>
            )}
            <Button
              type="submit"
              disabled={!kategori || !agreed || submitting}
              className="btn-shine mt-6 w-full !rounded-full !bg-primary py-4 text-base font-bold hover:!bg-primary-dark"
            >
              {submitting ? "Mengirim Data..." : "Daftar Sekarang"}
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
}
