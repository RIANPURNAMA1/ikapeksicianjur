"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DUMMY_ADMIN } from "@/lib/dummy";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan kata sandi wajib diisi.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (
        email.toLowerCase().trim() === DUMMY_ADMIN.email &&
        password === DUMMY_ADMIN.password
      ) {
        window.sessionStorage.setItem("ikapeksi_admin", "true");
        router.replace("/admin");
        router.refresh();
      } else {
        setLoading(false);
        setError("Email atau kata sandi salah. Gunakan akun demo: admin@ikapeksicianjur.or.id / admin123");
      }
    }, 600);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image
            src="/images/logo/logo.png"
            alt={`${SITE.name} logo`}
            width={280}
            height={91}
            className="mx-auto h-12 w-auto object-contain brightness-0 invert"
          />
          <h1 className="mt-6 text-2xl font-extrabold text-white">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-white/60">
            Masuk untuk mengelola konten {SITE.name}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-card backdrop-blur"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ikapeksicianjur.or.id"
              autoComplete="username"
              className="btn-focus w-full rounded-md border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary"
            />
          </div>

          <div className="mt-4 flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-semibold text-white">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                id="password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="btn-focus w-full rounded-md border border-white/15 bg-white/10 px-4 py-2.5 pr-12 text-sm text-white placeholder:text-white/40 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  {show ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  )}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary-light">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "btn-shine btn-focus mt-6 w-full rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark",
              loading && "cursor-wait opacity-70"
            )}
          >
            {loading ? "Memeriksa..." : "Masuk"}
          </button>

          <div className="mt-6 rounded-lg border border-dashed border-white/15 bg-ink/40 px-4 py-3 text-center text-xs text-white/60">
            Akun demo — email: <span className="text-white/90">admin@ikapeksicianjur.or.id</span>
            <br />
            kata sandi: <span className="text-white/90">admin123</span>
          </div>
        </form>
      </div>
    </div>
  );
}
