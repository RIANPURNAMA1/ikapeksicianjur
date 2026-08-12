"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Kategori = "alumni" | "calon-alumni" | "umkm-binaan";

interface GrafikItem {
  bulan: string;
  jumlah: number;
}

interface PendaftarTerbaru {
  id: number;
  kategori: Kategori;
  nama: string;
  whatsapp: string;
  email: string | null;
  provinsi: string | null;
  kabupaten: string | null;
  kecamatan: string | null;
  desa: string | null;
  nama_usaha: string | null;
  created_at: string;
}

interface DashboardStats {
  total_pendaftar: number;
  alumni: number;
  calon_alumni: number;
  umkm_binaan: number;
  pendaftar_bulan_ini: number;
  pendaftar_hari_ini: number;
  total_pengguna: number;
}

const KATEGORI_META: Record<Kategori, { label: string; badge: string; bar: string }> = {
  alumni: { label: "Alumni", badge: "bg-primary-tint text-primary", bar: "bg-primary" },
  "calon-alumni": {
    label: "Calon Alumni",
    badge: "bg-amber-100 text-amber-700",
    bar: "bg-amber-500",
  },
  "umkm-binaan": {
    label: "Binaan UMKM",
    badge: "bg-emerald-100 text-emerald-700",
    bar: "bg-emerald-500",
  },
};

const ICONS: Record<string, React.ReactNode> = {
  alumni: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  "user-plus": (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ),
  umkm: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
    </svg>
  ),
  calon: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
    </svg>
  ),
};

export default function AdminDashboardPage() {
  const toast = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [grafik, setGrafik] = useState<GrafikItem[]>([]);
  const [terbaru, setTerbaru] = useState<PendaftarTerbaru[]>([]);

  useEffect(() => {
    apiFetch<{ stats: DashboardStats; grafik: GrafikItem[]; terbaru: PendaftarTerbaru[] }>(
      "/api/dashboard"
    )
      .then((data) => {
        setStats(data.stats);
        setGrafik(data.grafik);
        setTerbaru(data.terbaru);
      })
      .catch((err) => {
        toast.error(err instanceof Error ? err.message : "Gagal memuat dashboard.");
      });
  }, [toast]);

  const maxGrafik = Math.max(...grafik.map((d) => d.jumlah), 1);
  const distribusi = [
    { key: "alumni" as Kategori, value: stats?.alumni ?? 0 },
    { key: "calon-alumni" as Kategori, value: stats?.calon_alumni ?? 0 },
    { key: "umkm-binaan" as Kategori, value: stats?.umkm_binaan ?? 0 },
  ];
  const totalKategori = distribusi.reduce((acc, d) => acc + d.value, 0);

  const STAT_CARDS = [
    { label: "Total Pendaftar", value: stats?.total_pendaftar ?? 0, icon: "user-plus", color: "bg-primary" },
    { label: "Alumni", value: stats?.alumni ?? 0, icon: "alumni", color: "bg-blue-600" },
    { label: "Calon Alumni", value: stats?.calon_alumni ?? 0, icon: "calon", color: "bg-amber-500" },
    { label: "Binaan UMKM", value: stats?.umkm_binaan ?? 0, icon: "umkm", color: "bg-emerald-600" },
  ];

  return (
    <div className="space-y-8">
      <Reveal delay={0}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-ink">Dashboard</h1>
            <p className="mt-1 text-sm text-ink-muted">
              Ringkasan data {new Date().getFullYear()} — IKAPEKSI Cianjur
            </p>
          </div>
          <Link
            href="/admin/pendaftaran"
            className="btn-focus inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Pendaftaran Baru
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STAT_CARDS.map((card, i) => (
          <Reveal key={card.label} delay={100 + i * 100}>
            <div className="rounded-xl border border-paper-line bg-white p-5 shadow-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-ink-muted">{card.label}</p>
                  <p className="mt-1 text-3xl font-extrabold text-ink">
                    {card.value.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className={cn("flex h-11 w-11 items-center justify-center rounded-lg text-white", card.color)}>
                  {ICONS[card.icon]}
                </div>
              </div>
              <p className="mt-3 text-xs font-medium text-primary">
                {stats?.pendaftar_hari_ini ?? 0} pendaftar hari ini
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Reveal delay={500} className="xl:col-span-2">
          <div className="rounded-xl border border-paper-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-ink">Pendaftar per Bulan</h2>
              <span className="text-xs text-ink-muted">{new Date().getFullYear()}</span>
            </div>
            <div className="mt-6 flex h-48 items-stretch gap-2 sm:gap-3">
              {grafik.map((d, i) => (
                <div key={d.bulan} className="flex flex-1 flex-col items-center">
                  <span className="text-[11px] font-semibold text-ink-muted">{d.jumlah ?? 0}</span>
                  <div className="mt-1 flex w-full flex-1 items-end justify-center">
                    <div
                      className="bar-grow w-6 rounded-t-md bg-primary/80 transition-colors hover:bg-primary sm:w-8"
                      style={{ height: `${(d.jumlah / maxGrafik) * 100}%`, animationDelay: `${i * 60}ms` }}
                    />
                  </div>
                  <span className="mt-1.5 text-[11px] font-medium text-ink-muted">{d.bulan}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <div className="rounded-xl border border-paper-line bg-white p-6 shadow-card">
            <h2 className="text-base font-bold text-ink">Ringkasan</h2>
            <ul className="mt-4 space-y-4">
              <RingkasanRow label="Total Pendaftar" value={stats?.total_pendaftar ?? 0} color="bg-primary" />
              <RingkasanRow label="Pendaftar Bulan Ini" value={stats?.pendaftar_bulan_ini ?? 0} color="bg-blue-500" />
              <RingkasanRow label="Pendaftar Hari Ini" value={stats?.pendaftar_hari_ini ?? 0} color="bg-green-500" />
              <RingkasanRow label="Pengguna Sistem" value={stats?.total_pengguna ?? 0} color="bg-amber-500" />
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={700}>
        <div className="rounded-xl border border-paper-line bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-paper-line px-6 py-4">
            <h2 className="text-base font-bold text-ink">Pendaftar Terbaru</h2>
            <Link href="/admin/pendaftaran" className="text-sm font-semibold text-primary hover:text-primary-dark">
              Lihat semua
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-paper-line bg-paper-warm text-xs uppercase tracking-wider text-ink-muted">
                  <th className="px-6 py-3 font-semibold">Nama</th>
                  <th className="px-6 py-3 font-semibold">Kategori</th>
                  <th className="px-6 py-3 font-semibold">Domisili</th>
                  <th className="hidden px-6 py-3 font-semibold md:table-cell">Kontak</th>
                  <th className="px-6 py-3 font-semibold">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {terbaru.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-ink-muted">
                      Belum ada data pendaftar.
                    </td>
                  </tr>
                ) : (
                  terbaru.map((p) => (
                    <tr key={p.id} className="border-b border-paper-line last:border-0 hover:bg-paper-warm">
                      <td className="px-6 py-3.5 font-medium text-ink">
                        <p>{p.nama}</p>
                        {p.nama_usaha && <p className="text-xs text-ink-muted">{p.nama_usaha}</p>}
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-xs font-bold",
                            KATEGORI_META[p.kategori].badge
                          )}
                        >
                          {KATEGORI_META[p.kategori].label}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-ink-muted">
                        <p>{p.kabupaten || "-"}</p>
                        {p.provinsi && <p className="text-xs text-ink-muted">{p.provinsi}</p>}
                      </td>
                      <td className="hidden px-6 py-3.5 text-ink-muted md:table-cell">
                        <p>{p.whatsapp}</p>
                        {p.email && <p className="text-xs">{p.email}</p>}
                      </td>
                      <td className="px-6 py-3.5 text-ink-muted">{p.created_at}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      <Reveal delay={800}>
        <div className="rounded-xl border border-paper-line bg-white p-6 shadow-card">
          <h2 className="text-base font-bold text-ink">Distribusi Kategori</h2>
          <div className="mt-6 space-y-5">
            {distribusi.map((d) => {
              const meta = KATEGORI_META[d.key];
              const pct = totalKategori > 0 ? Math.round((d.value / totalKategori) * 100) : 0;
              return (
                <div key={d.key}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{meta.label}</span>
                    <span className="text-ink-muted">
                      {d.value.toLocaleString("id-ID")} · {pct}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-paper-warm">
                    <div
                      className={cn("h-full rounded-full transition-all", meta.bar)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function RingkasanRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <li className="flex items-center justify-between">
      <span className="flex items-center gap-2.5 text-sm text-ink-muted">
        <span className={cn("h-2.5 w-2.5 rounded-full", color)} />
        {label}
      </span>
      <span className="text-sm font-bold text-ink">{value.toLocaleString("id-ID")}</span>
    </li>
  );
}
