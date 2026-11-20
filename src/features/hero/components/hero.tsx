import { Container } from "@/components/layout/container";
import { MacWindow } from "@/components/ui/mac-window";

import { heroContent } from "../content";
import { TypewriterDemo } from "../typewriter/typewriter-demo";
import { HeroActions } from "./hero-actions";

/**
 * The first screen: the headline, the download, then a live typewriter typing
 * what Strike is, and the app's window rising from below.
 */
export function Hero() {
  const { headline, subtitle, description, yourTurn } = heroContent;

  return (
    <section className="overflow-hidden">
      <Container className="flex flex-col items-center pt-16 text-center sm:pt-24">
        <h1 className="text-5xl font-bold tracking-tight text-balance sm:text-7xl lg:text-8xl">
          {headline.lead}{" "}
          <em className="text-accent transition-colors duration-(--duration-lamp)">
            {headline.accent}
          </em>
        </h1>
        <p className="mt-6 text-lg text-text-soft sm:text-xl">{subtitle}</p>
        <div className="mt-10">
          <HeroActions />
        </div>
        {/* The typewriter types this for the eye; screen readers get it whole. */}
        <p className="sr-only">{description}</p>
      </Container>

      <div className="mt-4">
        <TypewriterDemo text={description} yourTurnHint={yourTurn} />
      </div>

      {/* The app itself, peeking up from below. A screenshot goes here. */}
      <Container className="mt-16">
        <div className="h-64 overflow-hidden sm:h-80">
          <MacWindow className="h-144" />
        </div>
      </Container>
    </section>
  );
}
