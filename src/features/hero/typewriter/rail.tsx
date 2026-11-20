import { cn } from "@/lib/cn";

/** The rail the carriage rides on: a dark tube across the page, held by a clamp at each end. */
export function Rail({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-(--rail-height)" aria-hidden>
      <div className="absolute inset-x-0 bottom-[calc((var(--carriage-body-height)-var(--tube-height))/2)] h-(--tube-height) rounded-xs shadow-md rail-tube" />
      <Clamp className="left-0" />
      <Clamp className="right-0" />
      {children}
    </div>
  );
}

function Clamp({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "absolute bottom-[calc((var(--carriage-body-height)-var(--clamp-height))/2)] h-(--clamp-height) w-(--clamp-width) rounded-sm bg-linear-to-b from-rail-highlight to-rail-clamp",
        className,
      )}
    />
  );
}
