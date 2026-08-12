import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Mona_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  JsonLd,
  KEYWORDS,
  organizationJsonLd,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const mona = Mona_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-mona",
  display: "swap",
});

const SITE_TITLE = `${SITE.name} | ${SITE.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: siteUrl() }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Organisasi Nonprofit",
  keywords: KEYWORDS,
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE.name,
    url: siteUrl(),
    title: SITE_TITLE,
    description: SITE.description,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE.description,
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${jakarta.variable} ${mona.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
