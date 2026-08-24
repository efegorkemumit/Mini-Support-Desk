import type { Priority } from "@/lib/types";

/** Priority is encoded as a signal-strength bar chart (1/2/3 bars filled)
 * alongside color and the priority word — an ordinal cue that reinforces
 * "how much" rather than just "which color", and stays legible without
 * color vision. */
const PRIORITY_STYLES: Record<Priority, { className: string; level: 1 | 2 | 3 }> = {
  Low: { className: "border-zinc-300 bg-zinc-50 text-zinc-600", level: 1 },
  Medium: { className: "border-amber-200 bg-amber-50 text-amber-800", level: 2 },
  High: { className: "border-red-200 bg-red-50 text-red-800", level: 3 },
};

export default function PriorityBadge({ priority }: { priority: Priority }) {
  const { className, level } = PRIORITY_STYLES[priority];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap ${className}`}
    >
      <span aria-hidden="true" className="flex items-end gap-0.5">
        {([1, 2, 3] as const).map((bar) => (
          <span
            key={bar}
            className="w-1 rounded-sm bg-current"
            style={{ height: `${bar * 3 + 2}px`, opacity: bar <= level ? 1 : 0.25 }}
          />
        ))}
      </span>
      {priority}
    </span>
  );
}
