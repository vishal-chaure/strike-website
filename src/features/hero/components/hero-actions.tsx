import { DownloadButton } from "@/components/ui/download-button";
import { site } from "@/config/site";
import { SoundToggle } from "@/features/sound";

/** Download, and "Hear it" to switch the typewriter's sounds on. */
export function HeroActions() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-3">
        <DownloadButton />
        <SoundToggle />
      </div>
      <p className="text-xs text-text-faint">{site.download.requirement}</p>
    </div>
  );
}
