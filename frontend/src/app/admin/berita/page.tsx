"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { apiFetch, resolveAssetUrl } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUploadInput from "@/components/admin/ImageUploadInput";
import Swal from "sweetalert2";

interface Berita {
  id: number;
  judul: string;
  kategori: string | null;
  isi: string;
  gambar: string | null;
  status: "draft" | "terbit";
  tanggal: string;
  tanggal_iso: string;
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
  terbit: number;
  draft: number;
}

interface FormState {
  judul: string;
  kategori: string;
  isi: string;
  gambar: string;
  status: "draft" | "terbit";
  tanggal: string;
}

const EMPTY_FORM: FormState = {
  judul: "",
  kategori: "Berita",
  isi: "",
  gambar: "",
  status: "terbit",
  tanggal: new Date().toISOString().slice(0, 10),
};

const STATUS_STYLE: Record<string, string> = {
  terbit: "bg-emerald-100 text-emerald-700",
  draft: "bg-gray-100 text-gray-600",
};

const KATEGORI_OPTIONS = ["Berita", "Pengumuman", "Kegiatan", "Tips & Info"];

function StatCard({ label, value, accent }: { label: string; value: number | null; accent: string }) {
  return (
    <div className="rounded-xl border border-paper-line bg-white p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <p className={`mt-2 text-3xl font-extrabold ${accent}`}>{value ?? "..."}</p>
    </div>
  );
}

const inputClass =
  "btn-focus w-full rounded-lg border border-paper-line px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-primary";
const labelClass = "text-sm font-semibold text-ink";

export default function AdminBeritaPage() {
  const toast = useToast();
  const [items, setItems] = useState<Berita[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Berita | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (appliedSearch) params.set("search", appliedSearch);
      if (status) params.set("status", status);
      const data = await apiFetch<{ berita: Berita[]; meta: Meta; stats: Stats }>(
        `/api/berita?${params.toString()}`
      );
      setItems(data.berita);
      setMeta(data.meta);
      setStats(data.stats);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal memuat data berita.");
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

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  }

  function openEdit(item: Berita) {
    setEditing(item);
    setForm({
      judul: item.judul,
      kategori: item.kategori ?? "",
      isi: item.isi,
      gambar: item.gambar ?? "",
      status: item.status,
      tanggal: item.tanggal_iso,
    });
    setFormError("");
    setModalOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");

    const isiPlain = form.isi.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

    if (!form.judul.trim() || !isiPlain || !form.tanggal) {
      setFormError("Judul, isi berita, dan tanggal wajib diisi.");
      return;
    }

    setSubmitting(true);
    try {
      const path = editing ? `/api/berita/${editing.id}` : "/api/berita";
      const method = editing ? "PUT" : "POST";
      const body = {
        judul: form.judul.trim(),
        kategori: form.kategori || null,
        isi: form.isi.trim(),
        gambar: form.gambar.trim() || null,
        status: form.status,
        tanggal: form.tanggal,
      };

      const data = await apiFetch<{ message: string }>(path, {
        method,
        body: JSON.stringify(body),
      });

      toast.success(data.message);
      setModalOpen(false);
      await loadData();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(item: Berita) {
    const result = await Swal.fire({
      title: `Hapus berita "${item.judul}"?`,
      text: "Berita akan dihapus permanen.",
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
      const data = await apiFetch<{ message: string }>(`/api/berita/${item.id}`, {
        method: "DELETE",
      });
      toast.success(data.message);
      if (items.length === 1 && meta && page > 1) {
        setPage(page - 1);
      } else {
        await loadData();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus berita.");
    }
  }

  const from = meta && meta.total > 0 ? (meta.current_page - 1) * meta.per_page + 1 : 0;
  const to = meta ? Math.min(meta.current_page * meta.per_page, meta.total) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Kelola Berita</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Tulis, ubah, dan terbitkan berita serta pengumuman untuk situs IKAPEKSI Cianjur.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="btn-focus inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tulis Berita
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label="Total Berita" value={stats?.total ?? null} accent="text-ink" />
        <StatCard label="Terbit" value={stats?.terbit ?? null} accent="text-emerald-600" />
        <StatCard label="Draft" value={stats?.draft ?? null} accent="text-gray-600" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearchSubmit} className="flex w-full max-w-sm gap-2">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul, kategori, isi..."
            className={inputClass}
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
          className="btn-focus w-full rounded-lg border border-paper-line bg-white px-4 py-2.5 text-sm text-ink focus:border-primary sm:w-48"
        >
          <option value="">Semua Status</option>
          <option value="terbit">Terbit</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="overflow-hidden ">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-paper-line bg-paper-warm text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-5 py-3.5 font-semibold">No</th>
                <th className="px-5 py-3.5 font-semibold">Tanggal</th>
                <th className="px-5 py-3.5 font-semibold">Judul</th>
                <th className="px-5 py-3.5 font-semibold">Kategori</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-ink-muted">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-ink-muted">
                    Belum ada berita.
                  </td>
                </tr>
              ) : (
                items.map((item, idx) => (
                  <tr key={item.id} className="border-b border-paper-line last:border-0 hover:bg-paper-warm/60">
                    <td className="px-5 py-4 text-ink-muted">
                      {(meta?.current_page ?? 1) > 1
                        ? (meta!.current_page - 1) * meta!.per_page + idx + 1
                        : idx + 1}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-ink-muted">{item.tanggal}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {item.gambar ? (
                          <img
                            src={resolveAssetUrl(item.gambar)}
                            alt={item.judul}
                            className="h-10 w-14 shrink-0 rounded-md object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-primary-tint text-primary">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h10M14 18h6v-8h-6v8z" />
                            </svg>
                          </div>
                        )}
                        <p className="max-w-[320px] truncate font-semibold text-ink">{item.judul}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center rounded-full bg-paper-warm px-2.5 py-1 text-xs font-semibold text-ink-soft">
                        {item.kategori || "-"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
                          STATUS_STYLE[item.status]
                        }`}
                      >
                        {item.status === "terbit" ? "Terbit" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          aria-label="Edit"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition hover:bg-ink/5 hover:text-ink"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.4-9a2 2 0 112.8 2.8L11.4 17.2a2 2 0 01-1.1.6l-2.9.6.6-2.9a2 2 0 01.6-1.1L16.6 4.4z" />
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 " onClick={() => setModalOpen(false)} />
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-ink">
                {editing ? "Edit Berita" : "Tulis Berita"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Tutup"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition hover:bg-ink/5 hover:text-ink"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="judul" className={labelClass}>Judul Berita *</label>
                <input
                  id="judul"
                  type="text"
                  value={form.judul}
                  onChange={(e) => setForm((f) => ({ ...f, judul: e.target.value }))}
                  placeholder="Judul berita"
                  className={inputClass}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="kategori" className={labelClass}>Kategori</label>
                  <select
                    id="kategori"
                    value={form.kategori}
                    onChange={(e) => setForm((f) => ({ ...f, kategori: e.target.value }))}
                    className={inputClass}
                  >
                    {KATEGORI_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="tanggal" className={labelClass}>Tanggal *</label>
                  <input
                    id="tanggal"
                    type="date"
                    value={form.tanggal}
                    onChange={(e) => setForm((f) => ({ ...f, tanggal: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="status" className={labelClass}>Status</label>
                  <select
                    id="status"
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as FormState["status"] }))}
                    className={inputClass}
                  >
                    <option value="terbit">Terbit</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <ImageUploadInput
                  label="Gambar Sampul (opsional)"
                  value={form.gambar}
                  onChange={(url) => setForm((f) => ({ ...f, gambar: url }))}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="isi" className={labelClass}>Isi Berita *</label>
                <RichTextEditor value={form.isi} onChange={(html) => setForm((f) => ({ ...f, isi: html }))} />
                <p className="text-xs text-ink-muted">
                  Gunakan toolbar untuk memformat teks; gambar dapat disisipkan langsung di dalam isi berita.
                </p>
              </div>

              {formError && (
                <p className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
                  {formError}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 rounded-lg border border-paper-line px-4 py-2.5 text-sm font-semibold text-ink-soft transition hover:bg-ink/5"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-shine flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-wait disabled:opacity-70"
                >
                  {submitting
                    ? "Menyimpan..."
                    : editing
                      ? "Simpan Perubahan"
                      : form.status === "terbit"
                        ? "Terbitkan"
                        : "Simpan Draft"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
