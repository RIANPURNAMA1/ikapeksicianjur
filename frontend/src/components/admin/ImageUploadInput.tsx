"use client";

import { useRef, useState } from "react";
import { apiUpload, resolveAssetUrl } from "@/lib/api";

interface ImageUploadInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploadInput({ value, onChange, label }: ImageUploadInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const data = await apiUpload<{ url: string }>("/api/upload", file);
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengunggah gambar.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      {label && <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>}

      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-paper-line">
          <img src={resolveAssetUrl(value)} alt="" className="h-40 w-full object-cover" />
          <div className="absolute right-2 top-2 flex gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="btn-focus rounded-md bg-white/95 px-3 py-1.5 text-xs font-bold text-ink shadow transition hover:text-primary"
            >
              Ganti
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="btn-focus rounded-md bg-white/95 px-3 py-1.5 text-xs font-bold text-primary shadow transition hover:bg-primary hover:text-white"
            >
              Hapus
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="btn-focus flex h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-paper-line bg-paper-warm/40 text-ink-muted transition hover:border-primary hover:bg-primary-tint/40 hover:text-primary disabled:cursor-wait"
        >
          {uploading ? (
            <>
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm font-semibold">Mengunggah...</span>
            </>
          ) : (
            <>
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-semibold">Pilih gambar sampul</span>
              <span className="text-xs text-ink-muted">JPG, PNG, GIF, WEBP &middot; maks 4 MB</span>
            </>
          )}
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && <p className="mt-1.5 text-xs font-semibold text-primary">{error}</p>}
    </div>
  );
}
