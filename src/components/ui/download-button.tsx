import { site } from "@/config/site";

import { buttonClassName, type ButtonSize } from "./button";
import { AppleIcon } from "./icons";

/** The download link, wherever it appears. */
export function DownloadButton({
  size = "lg",
  label = "Download for Mac",
}: {
  size?: ButtonSize;
  label?: string;
}) {
  return (
    <a href={site.download.url} className={buttonClassName({ size })}>
      <AppleIcon className={size === "sm" ? "size-3.5" : "size-4.5"} />
      {label}
    </a>
  );
}
