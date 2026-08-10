import { SOCIAL_LINKS } from "@/lib/constants";

export default function SocialLinks() {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Ikuti Kami</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-focus rounded-md border border-paper-line px-4 py-2 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
          >
            {social.label}
          </a>
        ))}
      </div>
    </div>
  );
}
