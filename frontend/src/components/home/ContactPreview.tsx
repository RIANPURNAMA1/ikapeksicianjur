import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactInfo from "@/components/contact/ContactInfo";
import SocialLinks from "@/components/contact/SocialLinks";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPreview() {
  return (
    <section className="py-20">
      <Container className="grid gap-12 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Kontak" title="Ada Pertanyaan untuk Kami?" />
          <div className="mt-8">
            <ContactInfo />
          </div>
          <div className="mt-8">
            <SocialLinks />
          </div>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
