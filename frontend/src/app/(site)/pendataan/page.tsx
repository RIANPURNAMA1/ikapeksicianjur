import type { Metadata } from "next";
import PendataanForm from "@/components/pendataan/PendataanForm";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: { absolute: "Pendataan Alumni IKAPEKSI Cianjur" },
  description:
    "Registrasi dan pendataan data alumni, calon alumni, dan binaan UMKM IKAPEKSI Cianjur. Lengkapi data Anda untuk bergabung dalam program pemberdayaan alumni pemagangan kerja.",
  path: "/pendataan",
});

export default function PendataanPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: "Beranda", path: "/" },
            { name: "Pendataan Alumni IKAPEKSI Cianjur", path: "/pendataan" },
          ],
        })}
      />
      <PendataanForm />
    </>
  );
}
