import type { Metadata } from "next";
import AlumniDirectory from "@/components/alumni/AlumniDirectory";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: { absolute: "Alumni IKAPEKSI Cianjur" },
  description:
    "Direktori alumni pemagangan kerja Jepang asal Kabupaten Cianjur — profil, bidang, perusahaan, dan kisah sukses para alumni IKAPEKSI Cianjur yang telah kembali ke kampung halaman.",
  path: "/alumni",
});

export default function AlumniPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: "Beranda", path: "/" },
            { name: "Alumni IKAPEKSI Cianjur", path: "/alumni" },
          ],
        })}
      />
      <AlumniDirectory />
    </>
  );
}
