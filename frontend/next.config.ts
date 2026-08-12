import type { NextConfig } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
const API_HOST = parseHost(API_BASE);

function parseHost(url: string): { protocol: "http" | "https"; hostname: string; port?: string } | null {
  try {
    const parsed = new URL(url);
    return {
      protocol: parsed.protocol === "https:" ? "https" : "http",
      hostname: parsed.hostname,
      port: parsed.port || undefined,
    };
  } catch {
    return null;
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "i.pinimg.com" },
      ...(API_HOST ? [API_HOST] : []),
    ],
  },
};

export default nextConfig;
