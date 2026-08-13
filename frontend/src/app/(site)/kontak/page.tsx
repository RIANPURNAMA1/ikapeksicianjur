import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactInfo from "@/components/contact/ContactInfo";
import SocialLinks from "@/components/contact/SocialLinks";
import ContactForm from "@/components/contact/ContactForm";
import { SITE } from "@/lib/constants";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: { absolute: "Kontak IKAPEKSI Cianjur" },
  description: `Hubungi DPC IKAPEKSI Cianjur — alamat ${SITE.address}, telepon, WhatsApp, dan email. Kami siap membantu alumni dan calon peserta pemagangan kerja.`,
  path: "/kontak",
});

export default function KontakPage() {
  return (
    <section className="py-20">
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: "Beranda", path: "/" },
            { name: "Kontak IKAPEKSI Cianjur", path: "/kontak" },
          ],
        })}
      />
      <Container>
        <SectionHeading as="h1" eyebrow="Kontak" title="Hubungi IKAPEKSI Cianjur" />
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <div>
            <ContactInfo />
            <div className="mt-8">
              <SocialLinks />
            </div>
            <div className="doc-card mt-8 flex aspect-video w-full items-center justify-center bg-paper-warm">
              <p className="text-sm font-semibold text-ink-muted">Peta lokasi: {SITE.mapEmbedQuery}</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
