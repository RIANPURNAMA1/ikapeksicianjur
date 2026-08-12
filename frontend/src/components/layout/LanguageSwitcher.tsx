"use client";

import { useLanguage, LANGS } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ onDark = false }: { onDark?: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Ganti bahasa / 言語切替"
      className={cn(
        "flex items-center gap-1 rounded-full border p-1",
        onDark ? "border-white/30 bg-white/10" : "border-paper-line bg-white/70 shadow-sm"
      )}
    >
      {LANGS.map((option) => {
        const active = lang === option.code;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            aria-pressed={active}
            className={cn(
              "btn-focus rounded-full px-2.5 py-1 text-xs font-bold transition-colors duration-200",
              active
                ? "bg-primary text-white shadow-sm"
                : onDark
                  ? "text-white/80 hover:bg-white/15 hover:text-white"
                  : "text-ink/70 hover:bg-primary-tint hover:text-primary"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
