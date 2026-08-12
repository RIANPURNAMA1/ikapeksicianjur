"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import Swal from "sweetalert2";

interface Pengguna {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface FormState {
  name: string;
  email: string;
  password: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", password: "" };

export default function AdminPenggunaPage() {
  const toast = useToast();
  const [users, setUsers] = useState<Pengguna[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Pengguna | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadUsers() {
    setLoading(true);
    try {
      const data = await apiFetch<{ users: Pengguna[] }>("/api/users");
      setUsers(data.users);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal memuat data pengguna.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  }

  function openEdit(user: Pengguna) {
    setEditing(user);
    setForm({ name: user.name, email: user.email, password: "" });
    setFormError("");
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!form.name.trim() || !form.email.trim()) {
      setFormError("Nama dan email wajib diisi.");
      return;
    }

    if (!editing && !form.password) {
      setFormError("Kata sandi wajib diisi untuk pengguna baru.");
      return;
    }

    setSubmitting(true);
    try {
      const path = editing ? `/api/users/${editing.id}` : "/api/users";
      const method = editing ? "PUT" : "POST";
      const body: Record<string, string> = {
        name: form.name.trim(),
        email: form.email.trim(),
      };
      if (form.password) body.password = form.password;

      const data = await apiFetch<{ message: string }>(path, {
        method,
        body: JSON.stringify(body),
      });

      toast.success(data.message);
      setModalOpen(false);
      await loadUsers();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(user: Pengguna) {
    const result = await Swal.fire({
      title: `Hapus ${user.name}?`,
      text: "Data pengguna akan dihapus permanen.",
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
      const data = await apiFetch<{ message: string }>(`/api/users/${user.id}`, {
        method: "DELETE",
      });
      toast.success(data.message);
      await loadUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus pengguna.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Kelola Pengguna</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Kelola akun admin dan pengguna sistem yang terdaftar.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="btn-focus inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Pengguna
        </button>
      </div>

      <div className="overflow-hidden  ">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-paper-line bg-paper-warm text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-5 py-3.5 font-semibold">No</th>
                <th className="px-5 py-3.5 font-semibold">Nama</th>
                <th className="px-5 py-3.5 font-semibold">Email</th>
                <th className="px-5 py-3.5 font-semibold">Dibuat</th>
                <th className="px-5 py-3.5 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-ink-muted">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-ink-muted">
                    Belum ada pengguna.
                  </td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={user.id} className="border-b border-paper-line last:border-0 hover:bg-paper-warm/60">
                    <td className="px-5 py-4 text-ink-muted">{idx + 1}</td>
                    <td className="px-5 py-4 font-semibold text-ink">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-tint text-sm font-bold text-primary">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <p>{user.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-ink-soft">
                      <p>{user.email}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-ink-muted">{user.created_at}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(user)}
                          aria-label="Edit"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition hover:bg-ink/5 hover:text-ink"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.4-9a2 2 0 112.8 2.8L11.4 17.2a2 2 0 01-1.1.6l-2.9.6.6-2.9a2 2 0 01.6-1.1L16.6 4.4z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
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
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute bg-black/50 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-ink">
                {editing ? "Edit Pengguna" : "Tambah Pengguna"}
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
                <label htmlFor="name" className="text-sm font-semibold text-ink">Nama</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Nama lengkap"
                  className="btn-focus w-full rounded-lg border border-paper-line px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-ink">Email</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="nama@contoh.com"
                  className="btn-focus w-full rounded-lg border border-paper-line px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-semibold text-ink">
                  {editing ? "Kata Sandi Baru (opsional)" : "Kata Sandi"}
                </label>
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder={editing ? "Kosongkan jika tidak diganti" : "Minimal 6 karakter"}
                  className="btn-focus w-full rounded-lg border border-paper-line px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-primary"
                />
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
                  {submitting ? "Menyimpan..." : editing ? "Simpan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
