"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import Swal from "sweetalert2";

interface Alumni {
  id: number;
  nama: string;
  whatsapp: string;
  email: string | null;
  provinsi: string | null;
  kabupaten: string | null;
  kecamatan: string | null;
  desa: string | null;
  pekerjaan: string | null;
  jalur: string | null;
  angkatan: string | null;
  durasi: string | null;
  prefektur: string | null;
  tahun_kepulangan: string | null;
  status_saat_ini: string | null;
  pekerjaan_saat_ini: string | null;
  perusahaan: string | null;
  usaha: string | null;
  harapan: string[] | null;
  harapan_lainnya: string | null;
  created_at: string;
}

interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface Stats {
  total: number;
  bekerja: number;
  wirausaha: number;
  pencari_kerja: number;
}

const STATUS_STYLE: Record<string, string> = {
  Bekerja: "bg-emerald-100 text-emerald-700",
  Wirausaha: "bg-amber-100 text-amber-700",
  "Pencari Kerja": "bg-blue-100 text-blue-700",
  Lainnya: "bg-gray-100 text-gray-600",
};

const STATUS_FILTERS = [
  { value: "", label: "Semua Status" },
  { value: "Bekerja", label: "Bekerja" },
  { value: "Wirausaha", label: "Wirausaha" },
  { value: "Pencari Kerja", label: "Pencari Kerja" },
  { value: "Lainnya", label: "Lainnya" },
];

function StatCard({ label, value, accent }: { label: string; value: number | null; accent: string }) {
  return (
    <div className="rounded-xl border border-paper-line bg-white p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <p className={`mt-2 text-3xl font-extrabold ${accent}`}>{value ?? "..."}</p>
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-paper-line pb-3 last:border-0 sm:flex-row sm:gap-4">
      <dt className="w-44 shrink-0 text-sm font-medium text-ink-muted">{label}</dt>
      <dd className="text-sm font-semibold text-ink">{value || "-"}</dd>
    </div>
  );
}

export default function AdminAlumniPage() {
  const toast = useToast();
  const [items, setItems] = useState<Alumni[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<Alumni | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (appliedSearch) params.set("search", appliedSearch);
      if (status) params.set("status", status);
      const data = await apiFetch<{ alumni: Alumni[]; meta: Meta; stats: Stats }>(
        `/api/alumni?${params.toString()}`
      );
      setItems(data.alumni);
      setMeta(data.meta);
      setStats(data.stats);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal memuat data alumni.");
    } finally {
      setLoading(false);
    }
  }, [appliedSearch, status, page, toast]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  useEffect(() => {
    setPage(1);
  }, [appliedSearch, status]);

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();
    setPage(1);
    setAppliedSearch(search.trim());
  }

  async function handleDelete(item: Alumni) {
    const result = await Swal.fire({
      title: `Hapus data ${item.nama}?`,
      text: "Data alumni akan dihapus permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C62930",
      cancelButtonColor: "#6B6764",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const data = await apiFetch<{ message: string }>(`/api/pendaftaran/${item.id}`, {
        method: "DELETE",
      });
      toast.success(data.message);
      if (items.length === 1 && meta && page > 1) {
        setPage(page - 1);
      } else {
        await loadData();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus data.");
    }
  }

  const from = meta && meta.total > 0 ? (meta.current_page - 1) * meta.per_page + 1 : 0;
  const to = meta ? Math.min(meta.current_page * meta.per_page, meta.total) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Kelola Alumni</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Direktori alumni, riwayat magang di Jepang, dan status terbaru.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Alumni" value={stats?.total ?? null} accent="text-ink" />
        <StatCard label="Bekerja" value={stats?.bekerja ?? null} accent="text-emerald-600" />
        <StatCard label="Wirausaha" value={stats?.wirausaha ?? null} accent="text-amber-600" />
        <StatCard label="Pencari Kerja" value={stats?.pencari_kerja ?? null} accent="text-blue-600" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearchSubmit} className="flex w-full max-w-sm gap-2">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, prefektur, perusahaan..."
            className="btn-focus w-full rounded-lg border border-paper-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-primary"
          />
          <button
            type="submit"
            className="btn-focus shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Cari
          </button>
        </form>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="btn-focus w-full rounded-lg border border-paper-line bg-white px-4 py-2.5 text-sm text-ink focus:border-primary sm:w-52"
        >
          {STATUS_FILTERS.map((opt) => (
            <option key={opt.value || "all"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden ">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-paper-line bg-paper-warm text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-5 py-3.5 font-semibold">No</th>
                <th className="px-5 py-3.5 font-semibold">Tanggal</th>
                <th className="px-5 py-3.5 font-semibold">Nama</th>
                <th className="px-5 py-3.5 font-semibold">Angkatan</th>
                <th className="px-5 py-3.5 font-semibold">Prefektur</th>
                <th className="px-5 py-3.5 font-semibold">Tahun Pulang</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-ink-muted">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-ink-muted">
                    Belum ada data alumni.
                  </td>
                </tr>
              ) : (
                items.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="border-b border-paper-line last:border-0 hover:bg-paper-warm/60"
                  >
                    <td className="px-5 py-4 text-ink-muted">
                      {(meta?.current_page ?? 1) > 1
                        ? (meta!.current_page - 1) * meta!.per_page + idx + 1
                        : idx + 1}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-ink-muted">{item.created_at}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-tint text-sm font-bold text-primary">
                          {item.nama.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-ink">{item.nama}</p>
                          <p className="text-xs text-ink-muted">{item.whatsapp}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-ink-soft">{item.angkatan || "-"}</td>
                    <td className="px-5 py-4 text-ink-soft">{item.prefektur || "-"}</td>
                    <td className="px-5 py-4 text-ink-soft">{item.tahun_kepulangan || "-"}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
                          STATUS_STYLE[item.status_saat_ini ?? "Lainnya"] ?? STATUS_STYLE.Lainnya
                        }`}
                      >
                        {item.status_saat_ini || "Lainnya"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setDetail(item)}
                          aria-label="Detail"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition hover:bg-ink/5 hover:text-ink"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9.6 0A10.5 10.5 0 0112 5c4 0 7.3 2.6 9.6 7-2.3 4.4-5.6 7-9.6 7s-7.3-2.6-9.6-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          aria-label="Hapus"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition hover:bg-primary/10 hover:text-primary"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {meta && meta.total > 0 && (
          <div className="flex flex-col gap-3 border-t border-paper-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-muted">
              Menampilkan <span className="font-semibold text-ink">{from}</span>–
              <span className="font-semibold text-ink">{to}</span> dari{" "}
              <span className="font-semibold text-ink">{meta.total}</span> data
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={meta.current_page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="btn-focus rounded-lg border border-paper-line bg-white px-3.5 py-2 text-sm font-semibold text-ink transition hover:bg-paper-warm disabled:cursor-not-allowed disabled:opacity-50"
              >
                Sebelumnya
              </button>
              <span className="px-2 text-sm font-semibold text-ink-muted">
                {meta.current_page} / {meta.last_page}
              </span>
              <button
                disabled={meta.current_page >= meta.last_page}
                onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))}
                className="btn-focus rounded-lg border border-paper-line bg-white px-3.5 py-2 text-sm font-semibold text-ink transition hover:bg-paper-warm disabled:cursor-not-allowed disabled:opacity-50"
              >
                Berikutnya
              </button>
            </div>
          </div>
        )}
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => setDetail(null)} />
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
                    STATUS_STYLE[detail.status_saat_ini ?? "Lainnya"] ?? STATUS_STYLE.Lainnya
                  }`}
                >
                  {detail.status_saat_ini || "Lainnya"}
                </span>
                <h2 className="mt-3 text-xl font-extrabold text-ink">{detail.nama}</h2>
                <p className="mt-1 text-sm text-ink-muted">Terdaftar {detail.created_at}</p>
              </div>
              <button
                onClick={() => setDetail(null)}
                aria-label="Tutup"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-muted transition hover:bg-ink/5 hover:text-ink"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <section>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Identitas</h3>
                <dl className="space-y-3">
                  <FieldRow label="Nama Lengkap" value={detail.nama} />
                  <FieldRow label="WhatsApp" value={detail.whatsapp} />
                  <FieldRow label="Email" value={detail.email} />
                  <FieldRow label="Pekerjaan" value={detail.pekerjaan} />
                  <FieldRow label="Provinsi" value={detail.provinsi} />
                  <FieldRow label="Kabupaten / Kota" value={detail.kabupaten} />
                  <FieldRow label="Kecamatan" value={detail.kecamatan} />
                  <FieldRow label="Desa / Kelurahan" value={detail.desa} />
                </dl>
              </section>

              <section>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Data Kenshusei</h3>
                <dl className="space-y-3">
                  <FieldRow label="Jalur" value={detail.jalur} />
                  <FieldRow label="Angkatan" value={detail.angkatan} />
                  <FieldRow label="Durasi" value={detail.durasi} />
                  <FieldRow label="Prefektur" value={detail.prefektur} />
                  <FieldRow label="Tahun Kepulangan" value={detail.tahun_kepulangan} />
                </dl>
                <h3 className="mb-3 mt-6 text-xs font-bold uppercase tracking-widest text-primary">Status Saat Ini</h3>
                <dl className="space-y-3">
                  <FieldRow label="Status" value={detail.status_saat_ini} />
                  <FieldRow label="Pekerjaan" value={detail.pekerjaan_saat_ini} />
                  <FieldRow label="Perusahaan" value={detail.perusahaan} />
                  <FieldRow label="Usaha" value={detail.usaha} />
                </dl>
              </section>

              <section className="sm:col-span-2">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                  Harapan dari IKAPEKSI
                </h3>
                <div className="flex flex-wrap gap-2">
                  {detail.harapan && detail.harapan.length > 0 ? (
                    detail.harapan.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center rounded-full bg-paper-warm px-3 py-1 text-xs font-semibold text-ink-soft"
                      >
                        {h}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm font-semibold text-ink">-</span>
                  )}
                  {detail.harapan_lainnya && (
                    <span className="inline-flex items-center rounded-full bg-paper-warm px-3 py-1 text-xs font-semibold text-ink-soft">
                      {detail.harapan_lainnya}
                    </span>
                  )}
                </div>
              </section>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setDetail(null)}
                className="btn-focus rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
