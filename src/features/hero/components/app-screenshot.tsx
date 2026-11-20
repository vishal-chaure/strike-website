import Image from "next/image";

import { heroContent } from "../content";

/**
 * Strike itself: a book page in the app, by day or at night to match the
 * page's lamp. Both are in the page; CSS shows the one that matches, so it's
 * right from the first frame.
 */
export function AppScreenshot() {
  const { day, night, width, height } = heroContent.screenshot;

  return (
    <div>
      <Image
        src={day.src}
        alt={day.alt}
        width={width}
        height={height}
        sizes="(min-width: 72rem) 72rem, 100vw"
        className="h-auto w-full lamp-on:hidden"
      />
      <Image
        src={night.src}
        alt={night.alt}
        width={width}
        height={height}
        sizes="(min-width: 72rem) 72rem, 100vw"
        className="hidden h-auto w-full lamp-on:block"
      />
    </div>
  );
}
