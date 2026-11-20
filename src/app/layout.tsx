import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/config/site";
import { lampScript } from "@/features/lamp";
import { SoundProvider } from "@/features/sound";

import "./globals.css";

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-courier-prime",
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
      className={courierPrime.variable}
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
