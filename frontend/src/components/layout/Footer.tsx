import Link from "next/link";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-ink text-white">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-white">
            IK
          </span>
          <h3 className="mt-4 text-lg font-extrabold uppercase tracking-wide">{SITE.name}</h3>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">{SITE.description}</p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">Navigasi</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="btn-focus hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">Lainnya</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {NAV_LINKS.slice(4).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="btn-focus hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">Kontak</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>{SITE.address}</li>
            <li>{SITE.phone}</li>
            <li>{SITE.email}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="btn-focus flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-xs font-bold uppercase hover:border-primary hover:text-primary-light"
              >
                {social.label.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. Seluruh hak cipta dilindungi.</p>
          <p>Didirikan sejak {SITE.foundedYear} &middot; Kabupaten Cianjur, Jawa Barat</p>
        </Container>
      </div>
    </footer>
  );
}
