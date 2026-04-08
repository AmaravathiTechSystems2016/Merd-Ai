import { cn } from "@/lib/utils/cn";

export type DividerProps = {
  className?: string;
  decorative?: boolean;
  orientation?: "horizontal" | "vertical";
};

export function Divider({
  className,
  decorative = true,
  orientation = "horizontal",
}: DividerProps) {
  const sharedProps = decorative
    ? { "aria-hidden": true }
    : { "aria-orientation": orientation, role: "separator" as const };

  return (
    <div
      className={cn(
        "ui-divider",
        orientation === "horizontal"
          ? "h-[var(--border-width-thin)] w-full"
          : "h-full min-h-[var(--space-6)] w-[var(--border-width-thin)]",
        className,
      )}
      {...sharedProps}
    />
  );
}
