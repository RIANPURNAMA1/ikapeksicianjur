import type { Metadata } from "next";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

export const KEYWORDS = [
  "IKAPEKSI",
  "IKAPEKSI Cianjur",
  "Ikatan Alumni Pemagangan Kerja Sistem Indonesia",
  "alumni pemagangan Jepang",
  "pemagangan kerja Jepang",
  "kenshusei Cianjur",
  "alumni Jepang Cianjur",
  "UMKM Cianjur",
  "organisasi alumni Cianjur",
  "lowongan magang Jepang",
];

export function siteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  return (env ?? "https://ikapeksicianjur.com").replace(/\/+$/, "");
}

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export const DEFAULT_OG_IMAGE = absoluteUrl("/opengraph-image");

type PageTitle = string | { absolute: string };

interface PageSeoArgs {
  title: PageTitle;
  description?: string;
  path?: string;
  image?: string | null;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: PageSeoArgs): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : DEFAULT_OG_IMAGE;

  return {
    title:
      typeof title === "string"
        ? title
        : { absolute: title.absolute },
    description,
    alternates: { canonical },
    keywords: keywords ?? KEYWORDS,
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: typeof title === "string" ? title : title.absolute,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: "id_ID",
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: typeof title === "string" ? title : title.absolute }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors && authors.length ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: typeof title === "string" ? title : title.absolute,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl()}/#organization`,
    name: SITE.fullName,
    alternateName: SITE.name,
    description: SITE.description,
    url: siteUrl(),
    logo: absoluteUrl("/images/logo/logo.png"),
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Siliwangi No. 12",
      addressLocality: "Cianjur",
      addressRegion: "Jawa Barat",
      postalCode: "43211",
      addressCountry: "ID",
    },
    foundingDate: String(SITE.foundedYear),
    sameAs: SOCIAL_LINKS.map((s) => s.href),
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl()}/#website`,
    name: SITE.name,
    url: siteUrl(),
    description: SITE.description,
    inLanguage: "id-ID",
    publisher: { "@id": `${siteUrl()}/#organization` },
  };
}

interface ArticleJsonLdArgs {
  headline: string;
  description?: string;
  url: string;
  image?: string | null;
  datePublished: string;
  dateModified?: string;
  author?: string;
}

export function articleJsonLd({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
}: ArticleJsonLdArgs): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    description,
    image: image ? [absoluteUrl(image)] : undefined,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@type": "Organization", name: author ?? SITE.name },
    publisher: { "@id": `${siteUrl()}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(url),
    },
  };
}

interface BreadcrumbArgs {
  items: { name: string; path: string }[];
}

export function breadcrumbJsonLd({ items }: BreadcrumbArgs): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

interface ProfileJsonLdArgs {
  name: string;
  image?: string | null;
  description?: string;
  url: string;
  jobTitle?: string;
  worksFor?: string;
  alumniOf?: string;
  addressLocality?: string;
}

export function profileJsonLd({
  name,
  image,
  description,
  url,
  jobTitle,
  worksFor,
  alumniOf,
  addressLocality,
}: ProfileJsonLdArgs): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    image: image ? absoluteUrl(image) : undefined,
    description,
    url: absoluteUrl(url),
    jobTitle,
    worksFor: worksFor ? { "@type": "Organization", name: worksFor } : undefined,
    alumniOf: alumniOf ? { "@type": "EducationalOrganization", name: alumniOf } : undefined,
    address: addressLocality
      ? { "@type": "PostalAddress", addressLocality, addressCountry: "ID" }
      : undefined,
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
