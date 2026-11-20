import type { Metadata } from "next";
import { Cutive_Mono, Special_Elite } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/config/site";
import { lampScript } from "@/features/lamp";
import { SoundProvider } from "@/features/sound";

import "./globals.css";

// Headlines and labels: a worn, inky typewriter face.
const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
});

// Everything you read: a quiet, classic typewriter face.
const cutiveMono = Cutive_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cutive-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The lamp script may switch data-lamp before React loads, hence suppressHydrationWarning.
    <html
      lang="en"
      data-lamp="off"
      className={`${specialElite.variable} ${cutiveMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: lampScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SoundProvider>
          <SiteHeader />
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
