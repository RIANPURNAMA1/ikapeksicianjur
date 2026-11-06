import type { Metadata } from "next";
import AboutPreview from "@/components/home/AboutPreview";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: { absolute: "Tentang IKAPEKSI Cianjur" },
  description:
    "Profil Ikatan Alumni & Praktisi Kenshusei Seluruh Indonesia (IKAPEKSI) DPC Kabupaten Cianjur — sejarah, visi \"Rumah Alumni Jepang yang Berdaya dan Memberdayakan\", empat misi, dan peran organisasi bagi alumni serta calon pejuang Indonesia–Jepang di Cianjur.",
  path: "/tentang",
});

export default function TentangPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: "Beranda", path: "/" },
            { name: "Tentang IKAPEKSI Cianjur", path: "/tentang" },
          ],
        })}
      />
      <AboutPreview />
    </>
  );
}
