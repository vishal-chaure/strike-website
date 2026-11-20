import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strike — a typewriter for your Mac",
  description: "Write books, notes, and todos on a typewriter that lives on your Mac.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
