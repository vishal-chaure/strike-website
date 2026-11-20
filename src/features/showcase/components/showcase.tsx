import { Container } from "@/components/layout/container";

import { showcaseContent } from "../content";
import { AppScreenshot } from "./app-screenshot";

/**
 * What Strike does. The app's window peeks up under the hero; scrolling lifts
 * it into view, then it glides right and turns in 3D (its left edge swinging
 * back) and stays there while the features slide in from the left, one at a
 * time. Without scroll animations (or on small screens) it's simply the
 * app, then the features in a list.
 */
export function Showcase() {
  return (
    <section
      id="features"
      aria-label="Features"
      className="scroll-mt-(--header-height) pb-24 showcase-timeline"
    >
      {/* The stage: holds the app in view while the features scroll past. */}
      <div className="pointer-events-none scroll-fx-lg:sticky scroll-fx-lg:top-0 scroll-fx-lg:flex scroll-fx-lg:h-dvh scroll-fx-lg:items-center">
        <Container>
          <div className="scroll-fx-lg:turn-aside">
            <AppScreenshot />
          </div>
        </Container>
      </div>

      <Container className="mt-16 scroll-fx-lg:-mt-[100dvh] scroll-fx-lg:grid scroll-fx-lg:grid-cols-[2fr_3fr] scroll-fx-lg:gap-16">
        <ol className="flex flex-col gap-16 scroll-fx-lg:gap-0 scroll-fx-lg:pt-(--features-lead)">
          {showcaseContent.features.map((feature, index) => (
            <li
              key={feature.label}
              className="flex flex-col justify-center scroll-fx:feature-pass scroll-fx-lg:min-h-[70dvh]"
            >
              <p className="text-xs tracking-[0.2em] text-text-faint uppercase">
                {String(index + 1).padStart(2, "0")} · {feature.label}
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
                {feature.title}
              </h2>
              <p className="mt-4 max-w-md leading-7 text-text-soft">
                {feature.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
