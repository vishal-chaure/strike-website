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
      <Container className="flex flex-col items-center pt-10 text-center sm:pt-16">
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

      <div className="mt-4">
        <TypewriterDemo text={description} yourTurnHint={yourTurn} />
      </div>

      {/* The app itself, peeking up from below. A screenshot goes here. */}
      <Container className="mt-12">
        <div className="h-64 overflow-hidden sm:h-80">
          <MacWindow className="h-144" />
        </div>
      </Container>
    </section>
  );
}
