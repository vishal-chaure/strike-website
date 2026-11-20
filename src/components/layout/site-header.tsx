import Image from "next/image";
import Link from "next/link";

import { DownloadButton } from "@/components/ui/download-button";
import { headerLinks } from "@/config/navigation";
import { site } from "@/config/site";
import { LampSwitch } from "@/features/lamp";

import { Container } from "./container";

/** The top bar: name, page links, the lamp switch and the download button. */
export function SiteHeader() {
  return (
    <header>
      <Container className="flex h-20 items-center gap-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight"
        >
          <Image
            src="/app-icon.png"
            alt=""
            width={28}
            height={28}
            className="rounded-md"
            priority
          />
          {site.name}
        </Link>

        <nav
          aria-label="Main"
          className="ml-auto hidden gap-6 text-sm text-text-soft md:flex"
        >
          {headerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <LampSwitch />
          <div className="hidden sm:block">
            <DownloadButton size="sm" label="Download" />
          </div>
        </div>
      </Container>
    </header>
  );
}
