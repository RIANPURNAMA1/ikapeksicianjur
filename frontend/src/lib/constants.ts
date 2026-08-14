export const SITE = {
  name: "IKAPEKSI CIANJUR",
  fullName: "Ikatan Alumni Pemagangan Kerja Sistem Indonesia - Cianjur",
  tagline: "Merajut Alumni, Membangun Cianjur",
  description:
    "Wadah silaturahmi dan pemberdayaan alumni pemagangan kerja luar negeri asal Kabupaten Cianjur.",
  email: "info@ikapeksicianjur.or.id",
  phone: "+62 895-3916-85825",
  whatsapp: "62895391685825",
  address: "Sindangasih, Kec. Karangtengah, Kabupaten Cianjur, Jawa Barat 43281",
  mapEmbedQuery: "Sindangasih, Kec. Karangtengah, Kabupaten Cianjur, Jawa Barat 43281",
  foundedYear: 2016,
};

export const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Program", href: "/program" },
  { label: "Alumni", href: "/alumni" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/ikapeksicianjur", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/ikapeksicianjur", icon: "facebook" },
  { label: "YouTube", href: "https://youtube.com/@ikapeksicianjur", icon: "youtube" },
  { label: "WhatsApp", href: "https://wa.me/62895391685825", icon: "whatsapp" },
] as const;

export const DISTRICTS = [
  "Cianjur Kota",
  "Cilaku",
  "Warungkondang",
  "Cugenang",
  "Pacet",
  "Sukaresmi",
  "Cikalongkulon",
  "Karangtengah",
  "Ciranjang",
  "Sukanagara",
] as const;
