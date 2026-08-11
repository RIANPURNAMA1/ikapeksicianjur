"use client";

export default function AdminPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed border-paper-line bg-white p-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-tint text-primary">
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.4-9a2 2 0 112.8 2.8L11.4 17.2a2 2 0 01-1.1.6l-2.9.6.6-2.9a2 2 0 01.6-1.1L16.6 4.4z" />
        </svg>
      </div>
      <h1 className="mt-5 text-2xl font-extrabold text-ink">{title}</h1>
      <p className="mt-2 max-w-md text-sm text-ink-muted">{description}</p>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
        Modul ini sedang dalam pengembangan
      </p>
    </div>
  );
}
