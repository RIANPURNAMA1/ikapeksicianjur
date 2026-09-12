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
  "nav.alumni": "Keanggotaan",
  "nav.kegiatan": "Kegiatan",
  "nav.berita": "Berita",
  "nav.galeri": "Galeri",
  "nav.kontak": "Kontak",
  "nav.gabungAlumni": "Gabung Anggota",
  "nav.bukaMenu": "Buka menu",
  "nav.tutupMenu": "Tutup menu",

  // ===== HERO =====
  "hero.eyebrow": "KOMUNITAS PEJUANG INDONESIA - JEPANG KABUPATEN CIANJUR",
  "hero.line1": "SATU PASPOR",
  "hero.line2": "PENGALAMAN,",
  "hero.line3": "SERIBU LANGKAH",
  "hero.supportedBy": "Didukung oleh",
  "hero.description":
    "Ikatan Alumni Pemagangan Kerja Sistem Indonesia (IKAPEKSI) Kabupaten Cianjur menghimpun Alumni, praktisi, dan calon pejuang Indonesia - Jepang untuk terus tumbuh, berbagi ilmu, dan membangun kampung halaman bersama.",
  "hero.daftar": "Daftar Sekarang",
  "hero.konsultasi": "Konsultasi Gratis",
  "hero.slidePrev": "Slide sebelumnya",
  "hero.slideNext": "Slide selanjutnya",
  "hero.gotoSlide": "Ke slide {n}",

  // ===== ABOUT PREVIEW =====
  "about.eyebrow": "Tentang Kami",
  "about.title": "Rumah bagi para pejuang kerja Jepang asal Cianjur",
  "about.description":
    "IKAPEKSI menghimpun alumni program magang kerja (kenshusei) Jepang yang pulang membangun usaha sendiri. DPC Cianjur adalah cabang yang baru dibentuk — merangkul alumni dan calon alumni di Kabupaten Cianjur untuk saling menguatkan, berbagi peluang usaha, dan membuka jalan bagi generasi berikutnya yang ingin berangkat. Kami bergerak dalam tiga jalur sekaligus: penguatan jaringan sesama alumni, pendampingan bagi calon peserta magang, dan kemitraan dengan pemerintah daerah di isu ketenagakerjaan.",
  "about.forYou": "Tepat untuk Anda yang:",
  "about.item1.title": "Alumni yang Kembali",
  "about.item1.desc": "pulang membawa pengalaman baru dan ingin terus terhubung dengan jaringan lintas kecamatan.",
  "about.item2.title": "Pencari Peluang Magang",
  "about.item2.desc": "ingin berangkat lewat jalur resmi dan aman, terbebas dari praktik calo yang merugikan.",
  "about.item3.title": "Calon Wirausaha",
  "about.item3.desc": "berani memulai usaha dengan dukungan pendampingan dan job matching sesama alumni.",
  "about.kenali": "Kenali IKAPEKSI",

  // ===== ABOUT: STRUKTUR ORGANISASI =====
  "about.structure.label": "Struktur Organisasi",
  "about.structure.dpp.name": "DPP IKAPEKSI",
  "about.structure.dpp.desc": "Dewan Pimpinan Pusat — tingkat nasional",
  "about.structure.dpd.name": "DPD Jawa Barat",
  "about.structure.dpd.desc": "Dewan Pimpinan Daerah — tingkat provinsi",
  "about.structure.dpc.name": "DPC Kabupaten Cianjur",
  "about.structure.dpc.desc":
    "Cabang IKAPEKSI — rumah bersama alumni dan para pejuang kerja Jepang di Kabupaten Cianjur",
  "about.structure.dpc.badge": "IKAPEKSI Kabupaten Cianjur",

  // ===== WHY IKAPEKSI =====
  "why.eyebrow": "MENGAPA IKAPEKSI",
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

  // ===== PROGRAM SECTION =====
  "program.eyebrow": "Program",
  "program.homeTitle": "Apa yang sedang dan akan kami jalankan",
  "program.homeDesc":
    "Tiga program utama yang menjadi fokus IKAPEKSI Cianjur — dari menyiapkan calon peserta magang hingga membangun kemitraan strategis untuk alumni.",
  "program.p1.title": "Pelatda",
  "program.p1.desc":
    "Pelatihan daerah bagi calon peserta magang Jepang — persiapan bahasa, keterampilan, dan mental sebelum mengikuti seleksi program resmi.",
  "program.p2.title": "Silaturahmi & solidaritas alumni",
  "program.p2.desc":
    "Pertemuan rutin sesama alumni kenshusei Cianjur — tempat berbagi peluang usaha, saling membantu, dan menjaga kekompakan antaranggota.",
  "program.p3.title": "Audiensi & kemitraan strategis",
  "program.p3.desc":
    "Membangun komunikasi dengan Disnaker, HIPMI, dan Pemerintah Kabupaten Cianjur sebagai mitra resmi dalam isu tenaga kerja migran.",

  // ===== JOIN SECTION =====
  "join.eyebrow": "MARI BERGABUNG",
  "join.heading": "Alumni Pemagangan Kerja Asal Cianjur?",
  "join.subtitle": "Daftarkan Diri Anda.",
  "join.desc":
    "Perluas jejaring, ikuti kegiatan eksklusif, dan berkontribusi untuk kampung halaman bersama ratusan alumni lainnya dalam satu platform.",
  "join.cta": "Gabung Anggota Sekarang",

  // ===== PENDATAAN =====
  "pendataan.sectionLabel": "Registrasi IKAPEKSI",
  "pendataan.title": "Registrasi Data Alumni, Calon Alumni & Binaan UMKM",
  "pendataan.subtitle":
    "Lengkapi data sesuai kategori Anda. Formulir akan menyesuaikan kebutuhan data secara otomatis setelah memilih kategori di bawah.",
  "pendataan.uniteLabel": "Mari Bersatu",
  "pendataan.uniteTagline": "dalam Satu Data, Satu Jaringan, dan Satu Semangat Membangun Negeri",
  "pendataan.introLead": "DPC IKAPEKSI Kabupaten Cianjur menginisiasi",
  "pendataan.introHighlight": "Pendataan Alumni Jepang/Kerja Jepang",
  "pendataan.introTail":
    "sebagai langkah strategis untuk membangun database alumni yang akurat, terintegrasi, dan bermanfaat bagi seluruh alumni di Cianjur. Pendataan ini terbuka untuk seluruh alumni Jepang, baik yang sudah menjadi anggota IKAPEKSI maupun yang belum bergabung.",
  "pendataan.benefit1": "Direktori Nasional Alumni Kenshusei",
  "pendataan.benefit2": "Business Matching antar alumni",
  "pendataan.benefit3": "Peluang kerja sama bisnis & investasi",
  "pendataan.benefit4": "Informasi buyer dan peluang ekspor ke Jepang",
  "pendataan.benefit5": "Pelatihan, sertifikasi, dan pengembangan SDM",
  "pendataan.benefit6": "Informasi lowongan kerja & rekrutmen",
  "pendataan.benefit7": "Program pemberdayaan UMKM alumni",
  "pendataan.benefit8": "Dasar penyusunan program nasional IKAPEKSI",
  "pendataan.estTime": "Waktu pengisian hanya sekitar 2 menit.",
  "pendataan.minuteLead": "Luangkan 2 menit Anda sekarang, dan jadilah bagian dari:",
  "pendataan.minuteDoc": "Direktori Nasional Alumni",
  "pendataan.minuteAcc": "akses pelatihan & lowongan kerja",
  "pendataan.minuteBiz": "peluang usaha & kemitraan",
  "pendataan.minuteTail": "bersama IKAPEKSI — semuanya gratis untuk seluruh alumni Cianjur.",
  "pendataan.closing":
    "Mari bersama membangun kekuatan jaringan alumni Kenshusei Indonesia melalui satu data yang akurat dan bermanfaat.",
  "pendataan.kategoriLabel": "Kategori *",
  "pendataan.kategoriPlaceholder": "-- Pilih Kategori --",
  "pendataan.step1.title": "Saya Adalah",
  "pendataan.step1.subtitle": "Pilih kategori Anda untuk menampilkan form yang sesuai.",
  "pendataan.kategori.alumni": "Alumni",
  "pendataan.kategori.alumni.desc": "Sudah pernah magang/kerja di Jepang",
  "pendataan.kategori.calon-alumni": "Calon Alumni",
  "pendataan.kategori.calon-alumni.desc": "Sedang proses magang/kerja ke Jepang",
  "pendataan.kategori.umkm-binaan": "Binaan UMKM",
  "pendataan.kategori.umkm-binaan.desc": "Pelaku usaha binaan IKAPEKSI",
  "pendataan.successTitle": "Registrasi Berhasil Terkirim!",
  "pendataan.successDesc":
    "Terima kasih telah mengisi Registrasi IKAPEKSI. Data Anda akan segera diproses oleh tim DPC IKAPEKSI Kabupaten Cianjur.",

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
  "hero.eyebrow": "チアンジュール県 インドネシア・日本ファイターズコミュニティ",
  "hero.line1": "ひとつのパスポート",
  "hero.line2": "体験、",
  "hero.line3": "千の歩み",
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

  // ===== ABOUT: STRUKTUR ORGANISASI =====
  "about.structure.label": "組織図",
  "about.structure.dpp.name": "DPP IKAPEKSI",
  "about.structure.dpp.desc": "中央執行委員会（全国レベル）",
  "about.structure.dpd.name": "DPD Jawa Barat",
  "about.structure.dpd.desc": "地方執行委員会（州レベル）",
  "about.structure.dpc.name": "DPC Kabupaten Cianjur",
  "about.structure.dpc.desc":
    "IKAPEKSIの支部 — チアンジュール県の研修同窓生と日本での就労を目指す人々の共通の居場所",
  "about.structure.dpc.badge": "IKAPEKSI チアンジュール県",

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

  // ===== PROGRAM SECTION =====
  "program.eyebrow": "プログラム",
  "program.homeTitle": "現在および今後実施する取り組み",
  "program.homeDesc":
    "研修参加希望者の準備から同窓生のための戦略的パートナーシップ構築まで、IKAPEKSIチアンジュールが注力する3つの主要プログラム。",
  "program.p1.title": "ペラッタ（地域研修）",
  "program.p1.desc":
    "日本への研修参加予定者向けの地域研修 — 公式プログラムの選考に参加する前の語学・技能・心構えの準備を行います。",
  "program.p2.title": "同窓生の交流と連帯",
  "program.p2.desc":
    "チアンジュールの研修同窓生による定期的な集まり — ビジネス機会の共有、相互支援、結束の維持を行う場です。",
  "program.p3.title": "協議と戦略的パートナーシップ",
  "program.p3.desc":
    "移民労働問題について、労働局（Disnaker）、HIPMI、チアンジェール県政府との公式な連携を構築します。",

  // ===== JOIN SECTION =====
  "join.eyebrow": "一緒に参加しませんか",
  "join.heading": "チアンジュール出身の研修同窓生ですか？",
  "join.subtitle": "お申し込みください。",
  "join.desc":
    "ネットワークを広げ、特別な活動に参加し、数百人の同窓生と一つのプラットフォームで故郷に貢献しましょう。",
  "join.cta": "今すぐ同窓会に登録",

  // ===== PENDATAAN =====
  "pendataan.sectionLabel": "IKAPEKSI登録",
  "pendataan.title": "研修同窓生・研修希望者・UMKM育成の登録",
  "pendataan.subtitle":
    "カテゴリーに応じて入力を進めてください。下のカテゴリーを選択すると、フォームが必要な項目に自動的に切り替わります。",
  "pendataan.uniteLabel": "ひとつになろう",
  "pendataan.uniteTagline": "一つのデータ、一つのネットワーク、国を築く一つの想いで",
  "pendataan.introLead": "DPC IKAPEKSIチアンジュール県は、",
  "pendataan.introHighlight": "日本研修同窓生のデータ登録",
  "pendataan.introTail":
    "を、チアンジュールの全同窓生にとって正確で統合され、有益な同窓生データベースを構築するための戦略的ステップとして開始しました。IKAPEKSI会員の有無にかかわらず、すべての日本研修同窓生がこの登録に参加できます。",
  "pendataan.benefit1": "全国研修同窓生ディレクトリ",
  "pendataan.benefit2": "同窓生間のビジネスマッチング",
  "pendataan.benefit3": "ビジネス・投資協力の機会",
  "pendataan.benefit4": "バイヤー情報と日本への輸出機会",
  "pendataan.benefit5": "研修・資格取得・人材育成",
  "pendataan.benefit6": "求人・採用情報",
  "pendataan.benefit7": "同窓生のUMKM（中小企業）育成プログラム",
  "pendataan.benefit8": "IKAPEKSI全国プログラム策定の基礎",
  "pendataan.estTime": "入力時間は約2分程度です。",
  "pendataan.minuteLead": "今、2分間を使って、",
  "pendataan.minuteDoc": "全国同窓生ディレクトリ",
  "pendataan.minuteAcc": "研修・求人情報へのアクセス",
  "pendataan.minuteBiz": "ビジネス・提携の機会",
  "pendataan.minuteTail": "の一員になりましょう — すべて、チアンジュールの全同窓生に無料です。",
  "pendataan.closing":
    "正確で有益な一つのデータを通じて、インドネシアの研修同窓生ネットワークの強化をともに築きましょう。",
  "pendataan.kategoriLabel": "カテゴリー *",
  "pendataan.kategoriPlaceholder": "-- カテゴリーを選択 --",
  "pendataan.step1.title": "あなたはどなたですか",
  "pendataan.step1.subtitle": "対応するフォームを表示するには、カテゴリーを選択してください。",
  "pendataan.kategori.alumni": "研修同窓生",
  "pendataan.kategori.alumni.desc": "日本での研修・就労経験をお持ちの方",
  "pendataan.kategori.calon-alumni": "研修希望者",
  "pendataan.kategori.calon-alumni.desc": "日本への研修・就労を目指している方",
  "pendataan.kategori.umkm-binaan": "UMKM育成",
  "pendataan.kategori.umkm-binaan.desc": "IKAPEKSI支援の事業者",
  "pendataan.successTitle": "登録が正常に送信されました！",
  "pendataan.successDesc":
    "IKAPEKSI登録にお時間をいただきありがとうございます。お客様のデータは、DPC IKAPEKSIチアンジュール県チームがすぐに処理いたします。",

  // ===== FOOTER =====
  "footer.description":
    "チアンジュール県出身の海外研修同窓生の交流の場であり、その能力を活かします。",
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

