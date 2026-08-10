"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Navigasi halaman" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="btn-focus rounded-md border border-paper-line px-3 py-2 text-sm font-semibold text-ink disabled:opacity-40"
        aria-label="Halaman sebelumnya"
      >
        &larr;
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn(
            "btn-focus h-9 w-9 rounded-md text-sm font-bold transition-colors",
            p === page ? "bg-primary text-white" : "border border-paper-line text-ink hover:bg-primary-tint"
          )}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="btn-focus rounded-md border border-paper-line px-3 py-2 text-sm font-semibold text-ink disabled:opacity-40"
        aria-label="Halaman berikutnya"
      >
        &rarr;
      </button>
    </nav>
  );
}
