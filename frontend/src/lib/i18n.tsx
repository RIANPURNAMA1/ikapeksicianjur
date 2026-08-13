"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "id" | "ja";

interface TranslationMessages {
  [key: string]: string;
}

const STORAGE_KEY = "ikapeksi_lang";

const id: TranslationMessages = {
  // ===== NAVBAR =====
  "nav.beranda": "Beranda",
  "nav.tentang": "Tentang",
  "nav.program": "Program",
  "nav.alumni": "Alumni",
  "nav.kegiatan": "Kegiatan",
  "nav.berita": "Berita",
  "nav.galeri": "Galeri",
  "nav.kontak": "Kontak",
  "nav.gabungAlumni": "Gabung Alumni",
  "nav.bukaMenu": "Buka menu",
  "nav.tutupMenu": "Tutup menu",

  // ===== HERO =====
  "hero.eyebrow": "KOMUNITAS ALUMNI JEPANG KABUPATEN CIANJUR",
  "hero.line1": "KOMUNITAS PEJUANG",
  "hero.line2": "INDONESIA - JEPANG",
  "hero.line3": "KABUPATEN CIANJUR",
  "hero.supportedBy": "Didukung oleh",
  "hero.description":
    "Ikatan Pengusaha Kenshusei Indonesia - Cianjur menghimpun Alumni, praktisi dan yg mau jadi pejuang indonesia jepang untuk terus tumbuh, berbagi ilmu dan membangun kampung halaman bersama.",
  "hero.daftar": "Daftar Sekarang",
  "hero.konsultasi": "Konsultasi Gratis",
  "hero.slidePrev": "Slide sebelumnya",
  "hero.slideNext": "Slide selanjutnya",
  "hero.gotoSlide": "Ke slide {n}",

  // ===== ABOUT PREVIEW =====
  "about.eyebrow": "Tentang Kami",
 "about.title": "Merajut Potensi, Membangun Cianjur",
  "about.description":
    "Sejak {year}, {name} menjadi rumah bersama alumni pemagangan kerja luar negeri asal Kabupaten Cianjur. Bukan sekadar silaturahmi — kami merajut pengalaman lintas kecamatan menjadi satu kekuatan untuk memajukan kampung halaman.",
  "about.forYou": "Tepat untuk Anda yang:",
  "about.item1.title": "Alumni yang Kembali",
  "about.item1.desc": "pulang membawa pengalaman baru dan ingin terus terhubung dengan jaringan lintas kecamatan.",
  "about.item2.title": "Pencari Peluang Magang",
  "about.item2.desc": "ingin berangkat lewat jalur resmi dan aman, terbebas dari praktik calo yang merugikan.",
  "about.item3.title": "Calon Wirausaha",
  "about.item3.desc": "berani memulai usaha dengan dukungan pendampingan dan job matching sesama alumni.",
  "about.kenali": "Kenali IKAPEKSI",

  // ===== WHY IKAPEKSI =====
  "why.eyebrow": "Mengapa IKAPEKSI",
  "why.title": "Alasan Memilih Bergabung",
  "why.subtitle":
    "4 pilar utama yang menjadi landasan kami — dirancang khusus untuk membangun ekosistem alumni yang solid dan berdampak nyata bagi masyarakat Cianjur.",
  "why.reasonLabel": "Alasan",
  "why.r1.title": "Jejaring Terverifikasi",
  "why.r1.desc": "Direktori alumni resmi lintas kecamatan, memudahkan koordinasi dan kolaborasi.",
  "why.r2.title": "Jalur Aman & Resmi",
  "why.r2.desc": "Edukasi dan pendampingan agar calon peserta magang terhindar dari praktik calo.",
  "why.r3.title": "Pemberdayaan Berkelanjutan",
  "why.r3.desc": "Pendampingan wirausaha dan job matching bagi alumni yang telah kembali.",
  "why.r4.title": "Kepedulian Sosial",
  "why.r4.desc": "Kegiatan bakti sosial rutin untuk masyarakat Cianjur dari alumni untuk alumni.",

  // ===== VISION & MISSION =====
  "vision.label": "Visi",
  "vision.title": "Masyarakat Cianjur yang Mandiri dan Berdaya Saing.",
  "vision.desc":
    "Membangun ekosistem yang kuat untuk mengoptimalkan potensi setiap alumni dalam menghadapi tantangan ekonomi global.",
  "mission.label": "Misi Kami",
  "mission.m1": "Menghimpun dan mendata seluruh alumni pemagangan kerja se-Kabupaten Cianjur.",
  "mission.m2": "Menyediakan pelatihan dan pendampingan bagi calon dan mantan peserta magang.",
  "mission.m3": "Membuka akses kerja sama ekonomi dan lapangan kerja bagi alumni.",
  "mission.m4": "Berkontribusi aktif dalam kegiatan sosial kemasyarakatan di Cianjur.",

  // ===== JOIN SECTION =====
  "join.eyebrow": "MARI BERGABUNG",
  "join.heading": "Alumni Pemagangan Kerja Asal Cianjur?",
  "join.subtitle": "Daftarkan Diri Anda.",
  "join.desc":
    "Perluas jejaring, ikuti kegiatan eksklusif, dan berkontribusi untuk kampung halaman bersama ratusan alumni lainnya dalam satu platform.",
  "join.cta": "Hubungi Kami Sekarang",

  // ===== FOOTER =====
  "footer.description":
    "Wadah silaturahmi dan pemberdayaan alumni pemagangan kerja luar negeri asal Kabupaten Cianjur.",
  "footer.navigasi": "Navigasi",
  "footer.lainnya": "Lainnya",
  "footer.kontak": "Kontak",
  "footer.copyright": "Seluruh hak cipta dilindungi.",
  "footer.founded": "Didirikan sejak {year}",
};

const ja: TranslationMessages = {
  // ===== NAVBAR =====
  "nav.beranda": "ホーム",
  "nav.tentang": "概要",
  "nav.program": "プログラム",
  "nav.alumni": "同窓生",
  "nav.kegiatan": "活動",
  "nav.berita": "ニュース",
  "nav.galeri": "ギャラリー",
  "nav.kontak": "お問い合わせ",
  "nav.gabungAlumni": "同窓会に参加",
  "nav.bukaMenu": "メニューを開く",
  "nav.tutupMenu": "メニューを閉じる",

  // ===== HERO =====
  "hero.eyebrow": "チアンジュール県 日本研修同窓会コミュニティ",
  "hero.line1": "インドネシア-日本",
  "hero.line2": "コミュニティ",
  "hero.line3": "チアンジュール県",
  "hero.supportedBy": "支援元",
  "hero.description":
    "{name}は、故郷チアンジュール出身の海外研修同窓生を結集し、共に成長し、知識を共有し、故郷を発展させることを目指しています。",
  "hero.daftar": "今すぐ登録",
  "hero.konsultasi": "無料相談",
  "hero.slidePrev": "前のスライド",
  "hero.slideNext": "次のスライド",
  "hero.gotoSlide": "スライド {n} へ",

  // ===== ABOUT PREVIEW =====
  "about.eyebrow": "私たちについて",
  "about.title": "同窓生をつなぎ、チアンジュールを築く",
  "about.description":
    "{year}年以来、{name}はチアンジュール県出身の海外研修同窓生にとっての共通の居場所となっています。単なる親睦だけでなく、各地域の経験を一つに紡ぎ、故郷を前進させる力としています。",
  "about.forYou": "こんな方に最適です：",
  "about.item1.title": "帰国した同窓生",
  "about.item1.desc": "新たな経験を持ち帰り、地域を超えたネットワークとつながり続けたい方。",
  "about.item2.title": "研修の機会を探す方",
  "about.item2.desc": "不正なブローカーに惑わされず、安全で正規のルートで渡航したい方。",
  "about.item3.title": "起業を目指す方",
  "about.item3.desc": "同窓生同士の指導と仕事マッチングの支援を受けて起業に挑戦したい方。",
  "about.kenali": "IKAPEKSIを知る",

  // ===== WHY IKAPEKSI =====
  "why.eyebrow": "なぜIKAPEKSIなのか",
  "why.title": "同窓生が参加を選ぶ理由",
  "why.subtitle":
    "私たちの基盤となる4つの柱。チアンジュールの人々に実質的な影響を与える、強固な同窓生エコシステムを築くために設計されています。",
  "why.reasonLabel": "理由",
  "why.r1.title": "検証済みのネットワーク",
  "why.r1.desc": "地域を超えた公式の同窓生ディレクトリで、調整と協力を容易にします。",
  "why.r2.title": "安全で正規のルート",
  "why.r2.desc": "研修参加希望者が不正なブローカーに騙されないよう教育と指導を行います。",
  "why.r3.title": "持続的なエンパワーメント",
  "why.r3.desc": "帰国した同窓生への起業支援と仕事マッチングを提供します。",
  "why.r4.title": "社会への貢献",
  "why.r4.desc": "同窓生から同窓生へ、チアンジュールの人々のための定期的な社会奉仕活動。",

  // ===== VISION & MISSION =====
  "vision.label": "ビジョン",
  "vision.title": "自立し競争力のあるチアンジュールの同窓生。",
  "vision.desc":
    "グローバルな経済的課題に立ち向かう各同窓生の可能性を最大限に引き出す、強固なエコシステムを構築します。",
  "mission.label": "ミッション",
  "mission.m1": "チアンジュール県全域の研修同窓生を結集し、情報を管理します。",
  "mission.m2": "研修参加希望者と元参加者への研修と指導を提供します。",
  "mission.m3": "同窓生への経済協力と雇用機会へのアクセスを開拓します。",
  "mission.m4": "チアンジュールの社会・地域活動に積極的に貢献します。",

  // ===== JOIN SECTION =====
  "join.eyebrow": "一緒に参加しませんか",
  "join.heading": "チアンジュール出身の研修同窓生ですか？",
  "join.subtitle": "お申し込みください。",
  "join.desc":
    "ネットワークを広げ、特別な活動に参加し、数百人の同窓生と一つのプラットフォームで故郷に貢献しましょう。",
  "join.cta": "今すぐお問い合わせ",

  // ===== FOOTER =====
  "footer.description":
    "チアンジュール県出身の海外研修同窣生の交流の場であり、その能力を活かします。",
  "footer.navigasi": "ナビゲーション",
  "footer.lainnya": "その他",
  "footer.kontak": "お問い合わせ",
  "footer.copyright": "全著作権所有。",
  "footer.founded": "{year}年設立",
};


const messages: Record<Lang, TranslationMessages> = { id, ja };

export const LANGS: { code: Lang; label: string }[] = [
  { code: "id", label: "Indonesia" },
  { code: "ja", label: "日本語" },
];

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "id" || stored === "ja") {
        setLangState(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let str = messages[lang][key] ?? messages.id[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replaceAll(`{${k}}`, String(v));
        }
      }
      return str;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

