import { SITE } from "@/lib/constants";

export default function ContactInfo() {
  const items = [
    { label: "Alamat Sekretariat", value: SITE.address },
    { label: "Telepon / WhatsApp", value: SITE.phone },
    { label: "Email", value: SITE.email },
  ];
  return (
    <dl className="space-y-6">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{item.label}</dt>
          <dd className="mt-1 text-base font-medium text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
