import { Container } from "@/components/layout/container";

import { showcaseContent } from "../content";
import { AppScreenshot } from "./app-screenshot";

/**
 * What Strike does: the app stays in view on the right while its features
 * pass by on the left, each brightening as it reaches the middle of the
 * screen. On small screens the app comes first, then the features in a list.
 */
export function Showcase() {
  return (
    <section
      id="features"
      aria-label="Features"
      className="scroll-mt-(--header-height)"
    >
      <Container className="grid gap-12 pb-24 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="lg:order-2">
          <div className="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-center">
            <AppScreenshot />
          </div>
        </div>

        <ol className="flex flex-col gap-16 lg:order-1 lg:gap-0">
          {showcaseContent.features.map((feature, index) => (
            <li
              key={feature.label}
              className="flex scroll-spotlight flex-col justify-center lg:min-h-[70dvh]"
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
