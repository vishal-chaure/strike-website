import { cn } from "@/lib/cn";

/** A Mac app window: rounded, with the red, yellow and green buttons. */
export function MacWindow({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-hairline bg-sheet shadow-2xl transition-colors duration-(--duration-lamp)",
        className,
      )}
    >
      <div className="flex gap-2 px-4 py-3.5" aria-hidden>
        <span className="size-3 rounded-full bg-window-close" />
        <span className="size-3 rounded-full bg-window-minimize" />
        <span className="size-3 rounded-full bg-window-zoom" />
      </div>
      {children}
    </div>
  );
}
