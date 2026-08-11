"use client";

import Link from "next/link";
import {
  DUMMY_ALUMNI,
  DUMMY_BERITA,
  DUMMY_GRAFIK_PENDAFTAR,
  DUMMY_PENDAFTAR,
  DUMMY_STATS,
} from "@/lib/dummy";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<string, string> = {
  "Bekerja": "bg-green-100 text-green-700",
  "Kembali": "bg-blue-100 text-blue-700",
  "Wirausaha": "bg-amber-100 text-amber-700",
  "Cari Kerja": "bg-purple-100 text-purple-700",
  "Terbit": "bg-green-100 text-green-700",
  "Draft": "bg-gray-200 text-gray-600",
  "Baru": "bg-blue-100 text-blue-700",
  "Diproses": "bg-amber-100 text-amber-700",
  "Diterima": "bg-green-100 text-green-700",
  "Ditolak": "bg-red-100 text-red-700",
};

const STAT_CARDS = [
  { label: "Total Alumni", value: DUMMY_STATS.alumni, trend: "+4,2%", icon: "alumni", color: "bg-primary" },
  { label: "Alumni Baru", value: DUMMY_STATS.alumniBaru, trend: "bulan ini", icon: "user-plus", color: "bg-blue-600" },
  { label: "UMKM Binaan", value: DUMMY_STATS.umkm, trend: "+9 UMKM", icon: "umkm", color: "bg-amber-500" },
  { label: "Berita Terbit", value: DUMMY_STATS.berita, trend: "142 total", icon: "berita", color: "bg-green-600" },
];

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
  berita: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h10M14 18h6v-8h-6v8z" />
    </svg>
  ),
};

export default function AdminDashboardPage() {
  const maxGrafik = Math.max(...DUMMY_GRAFIK_PENDAFTAR.map((d) => d.jumlah));
  const pendaftarBaru = DUMMY_PENDAFTAR.filter((p) => p.status === "Baru").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Ringkasan data {new Date().getFullYear()} — IKAPEKSI Cianjur
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/pendaftaran"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Pendaftaran Baru
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-paper-line bg-white p-5 shadow-card"
          >
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
            <p className="mt-3 text-xs font-medium text-primary">{card.trend}</p>
          </div>
        ))}
      </div>

      {/* Grafik + ringkasan */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-xl border border-paper-line bg-white p-6 shadow-card xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-ink">Pendaftar per Bulan</h2>
            <span className="text-xs text-ink-muted">2026</span>
          </div>
          <div className="mt-6 flex h-48 items-end gap-3">
            {DUMMY_GRAFIK_PENDAFTAR.map((d) => (
              <div key={d.bulan} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[11px] font-semibold text-ink-muted">{d.jumlah}</span>
                <div
                  className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                  style={{ height: `${(d.jumlah / maxGrafik) * 100}%` }}
                />
                <span className="text-[11px] font-medium text-ink-muted">{d.bulan}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-paper-line bg-white p-6 shadow-card">
          <h2 className="text-base font-bold text-ink">Ringkasan</h2>
          <ul className="mt-4 space-y-4">
            <RingkasanRow label="Total Pendaftar" value={DUMMY_STATS.pendaftar} color="bg-primary" />
            <RingkasanRow label="Pendaftar Baru (hari ini)" value={pendaftarBaru} color="bg-blue-500" />
            <RingkasanRow label="Anggota Aktif" value={DUMMY_STATS.anggotaAktif} color="bg-green-500" />
            <RingkasanRow label="Berita Bulan Ini" value={12} color="bg-amber-500" />
          </ul>
        </div>
      </div>

      {/* Tabel pendaftar terbaru */}
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
                <th className="px-6 py-3 font-semibold">Asal</th>
                <th className="px-6 py-3 font-semibold">Tujuan</th>
                <th className="hidden px-6 py-3 font-semibold md:table-cell">Tanggal</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {DUMMY_PENDAFTAR.slice(0, 5).map((p) => (
                <tr key={p.id} className="border-b border-paper-line last:border-0 hover:bg-paper-warm">
                  <td className="px-6 py-3.5 font-medium text-ink">{p.nama}</td>
                  <td className="px-6 py-3.5 text-ink-muted">{p.asal}</td>
                  <td className="px-6 py-3.5 text-ink-muted">{p.tujuan}</td>
                  <td className="hidden px-6 py-3.5 text-ink-muted md:table-cell">{formatDate(p.tanggal)}</td>
                  <td className="px-6 py-3.5">
                    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", STATUS_STYLE[p.status])}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alumni & berita */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-xl border border-paper-line bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-paper-line px-6 py-4">
            <h2 className="text-base font-bold text-ink">Alumni Terbaru</h2>
            <Link href="/admin/alumni" className="text-sm font-semibold text-primary hover:text-primary-dark">
              Lihat semua
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-paper-line bg-paper-warm text-xs uppercase tracking-wider text-ink-muted">
                  <th className="px-6 py-3 font-semibold">Nama</th>
                  <th className="px-6 py-3 font-semibold">Tahun</th>
                  <th className="hidden px-6 py-3 font-semibold sm:table-cell">Jepang</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_ALUMNI.slice(0, 5).map((a) => (
                  <tr key={a.id} className="border-b border-paper-line last:border-0 hover:bg-paper-warm">
                    <td className="px-6 py-3.5 font-medium text-ink">{a.nama}</td>
                    <td className="px-6 py-3.5 text-ink-muted">{a.tahun}</td>
                    <td className="hidden px-6 py-3.5 text-ink-muted sm:table-cell">{a.jepang}</td>
                    <td className="px-6 py-3.5">
                      <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", STATUS_STYLE[a.status])}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-paper-line bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-paper-line px-6 py-4">
            <h2 className="text-base font-bold text-ink">Berita Terbaru</h2>
            <Link href="/admin/berita" className="text-sm font-semibold text-primary hover:text-primary-dark">
              Lihat semua
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-paper-line bg-paper-warm text-xs uppercase tracking-wider text-ink-muted">
                  <th className="px-6 py-3 font-semibold">Judul</th>
                  <th className="hidden px-6 py-3 font-semibold md:table-cell">Tanggal</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_BERITA.slice(0, 5).map((b) => (
                  <tr key={b.id} className="border-b border-paper-line last:border-0 hover:bg-paper-warm">
                    <td className="max-w-[240px] truncate px-6 py-3.5 font-medium text-ink">{b.judul}</td>
                    <td className="hidden px-6 py-3.5 text-ink-muted md:table-cell">{formatDate(b.tanggal)}</td>
                    <td className="px-6 py-3.5">
                      <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", STATUS_STYLE[b.status])}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
