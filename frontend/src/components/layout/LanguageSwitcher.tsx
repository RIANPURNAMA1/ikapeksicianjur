"use client";

import Image from "next/image";
import { useLanguage, LANGS } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const FLAG_ICON: Record<string, string> = {
  id: "/icons/indo1.png",
  ja: "/icons/japan1.png",
};

export default function LanguageSwitcher({
  onDark = false,
}: {
  onDark?: boolean;
}) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Ganti bahasa / 言語切替"
      className={cn(
        "flex items-center gap-1 rounded-full p-1",
        onDark
          ? "bg-white/10"
          : "bg-black/5"
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
            aria-label={option.label}
            title={option.label}
            className={cn(
              "flex h-7 w-9 items-center justify-center rounded-full",
              "transition-opacity duration-200",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-[#C62930]/40",
              active
                ? "opacity-100"
                : "opacity-40 hover:opacity-80"
            )}
          >
            <span className="relative block h-[18px] w-[27px] overflow-hidden rounded-[3px]">
              <Image
                src={FLAG_ICON[option.code]}
                alt={option.label}
                fill
                sizes="27px"
                className="object-cover"
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}