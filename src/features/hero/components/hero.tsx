import { Container } from "@/components/layout/container";

import { heroContent } from "../content";
import { TypewriterDemo } from "../typewriter/typewriter-demo";
import { AppScreenshot } from "./app-screenshot";
import { HeroActions } from "./hero-actions";

/**
 * The first screen: the headline and the download, centred, with a live
 * typewriter below them typing what Strike is, then the app itself.
 */
export function Hero() {
  const { headline, subtitle, description, yourTurn } = heroContent;

  return (
    <section className="relative isolate overflow-x-clip">
      <Container className="flex min-h-[calc(100dvh-var(--header-height)-var(--hero-typewriter-room))] flex-col items-center justify-center text-center">
        <h1 className="font-display text-4xl tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {headline.lead}{" "}
          <em className="text-accent transition-colors duration-(--duration-lamp)">
            {headline.accent}
          </em>
        </h1>
        <p className="mt-4 text-base text-text-soft sm:text-lg">{subtitle}</p>
        <div className="mt-8">
          <HeroActions />
        </div>
        {/* The typewriter types this for the eye; screen readers get it whole. */}
        <p className="sr-only">{description}</p>
      </Container>

      <div>
        <TypewriterDemo text={description} yourTurnHint={yourTurn} />
      </div>

      {/* The app itself, by day or by lamplight to match the page. */}
      <Container className="mt-12 pb-16">
        <AppScreenshot />
      </Container>
    </section>
  );
}
