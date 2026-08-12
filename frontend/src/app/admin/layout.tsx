"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { apiFetch, clearAuth, getToken, type AdminUser } from "@/lib/api";
import { ToastProvider } from "@/components/ui/Toast";
import Swal from "sweetalert2";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Pendaftaran", href: "/admin/pendaftaran", icon: "pendaftaran" },
  { label: "Alumni", href: "/admin/alumni", icon: "alumni" },
  { label: "Berita", href: "/admin/berita", icon: "berita" },
  { label: "Kegiatan", href: "/admin/kegiatan", icon: "kegiatan" },
  { label: "Galeri", href: "/admin/galeri", icon: "galeri" },
  { label: "UMKM", href: "/admin/umkm", icon: "umkm" },
  { label: "Pengguna", href: "/admin/pengguna", icon: "pengguna" },
  { label: "Pengaturan", href: "/admin/pengaturan", icon: "setting" },
];

const ICONS: Record<string, React.ReactNode> = {
  dashboard: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 13h6V4H4v9zm10 7h6v-9h-6v9zM4 21h6v-4H4v4zm10-14h6V4h-6v3z" />
    </svg>
  ),
  pendaftaran: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M9 8h6m-7 4H4a1 1 0 00-1 1v7a1 1 0 001 1h16a1 1 0 001-1V5a1 1 0 00-1-1H9a1 1 0 00-1 1v3z" />
    </svg>
  ),
  alumni: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  berita: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h10M14 18h6v-8h-6v8z" />
    </svg>
  ),
  kegiatan: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  galeri: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
    </svg>
  ),
  umkm: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
    </svg>
  ),
  pengguna: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4 0-8 2-8 5v2h16v-2c0-3-4-5-8-5z" />
    </svg>
  ),
  setting: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuthed(false);
      setUser(null);
      setChecked(true);
      return;
    }

    let active = true;

    apiFetch<{ user: AdminUser }>("/api/me")
      .then((data) => {
        if (!active) return;
        setUser(data.user);
        setAuthed(true);
      })
      .catch(() => {
        if (!active) return;
        clearAuth();
        setUser(null);
        setAuthed(false);
      })
      .finally(() => {
        if (active) setChecked(true);
      });

    return () => {
      active = false;
    };
  }, [pathname]);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!checked) return;
    if (!authed && !getToken() && !isLoginPage) {
      router.replace("/admin/login");
    }
    if (authed && isLoginPage) {
      router.replace("/admin");
    }
  }, [checked, authed, isLoginPage, router]);

  useEffect(() => {
    document.body.style.backgroundColor = "#FAF7F5";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  if (!checked) {
    return (
      <ToastProvider>
        <div className="flex min-h-screen items-center justify-center bg-paper-warm">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </ToastProvider>
    );
  }

  if (!authed) {
    return (
      <ToastProvider>
        {isLoginPage ? (
          children
        ) : (
          <div className="flex min-h-screen items-center justify-center bg-paper-warm">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
      </ToastProvider>
    );
  }

  function logout() {
    void Swal.fire({
      title: "Yakin ingin keluar?",
      text: "Anda akan kembali ke halaman login.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C62930",
      cancelButtonColor: "#6B6764",
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (!result.isConfirmed) return;
      void apiFetch("/api/logout", { method: "POST" }).catch(() => {});
      clearAuth();
      setUser(null);
      setAuthed(false);
      router.replace("/admin/login");
    });
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-paper-warm">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-ink lg:flex">
        <SidebarContent
          pathname={pathname}
          onLogout={logout}
        />
      </aside>

      {/* Sidebar mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-ink">
            <SidebarContent
              pathname={pathname}
              onClose={() => setOpen(false)}
              onLogout={logout}
            />
          </aside>
        </div>
      )}

      {/* Topbar */}
      <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-paper-line bg-white/90 px-5 backdrop-blur lg:ml-64">
        <button
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink transition hover:bg-ink/5 lg:hidden"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-2 lg:hidden">
          <Image
            src="/images/logo/logo.png"
            alt={`${SITE.name} logo`}
            width={120}
            height={39}
            className="h-6 w-auto object-contain"
          />
        </div>
        <div className="hidden text-sm font-semibold text-ink lg:block">
          Selamat datang, {user?.name ?? "Admin"}
        </div>

        <div className="flex items-center gap-3">
          <button
            aria-label="Notifikasi"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-ink/60 transition hover:bg-ink/5 hover:text-ink"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {user?.name?.charAt(0).toUpperCase() ?? "A"}
            </div>
            <div className="hidden text-sm sm:block">
              <p className="font-semibold leading-tight text-ink">{user?.name ?? "Admin"}</p>
              <p className="text-xs text-ink-muted">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      <main className="px-5 py-8 lg:ml-64">
        <div key={pathname} className="animate-enter mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
    </ToastProvider>
  );
}

function SidebarContent({
  pathname,
  onLogout,
  onClose,
}: {
  pathname: string;
  onLogout: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo/logo.png"
            alt={`${SITE.name} logo`}
            width={180}
            height={58}
            className="h-7 w-auto object-contain brightness-0 invert"
          />
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Tutup menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              {ICONS[item.icon]}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Lihat Situs
        </Link>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition hover:bg-primary/20 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Keluar
        </button>
      </div>
    </div>
  );
}
