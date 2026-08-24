import type { Status } from "@/lib/types";

/** Status is encoded three ways at once — border/background/text color, a
 * ring icon whose fill amount tracks progress (empty → half → solid), and
 * the status word itself — so meaning never depends on color alone. */
const STATUS_STYLES: Record<Status, { className: string; fill: string }> = {
  Open: {
    className: "border-blue-200 bg-blue-50 text-blue-800",
    fill: "0",
  },
  "In Progress": {
    className: "border-amber-200 bg-amber-50 text-amber-800",
    fill: "0.4",
  },
  Closed: {
    className: "border-zinc-300 bg-zinc-100 text-zinc-700",
    fill: "1",
  },
};

export default function StatusBadge({ status }: { status: Status }) {
  const { className, fill } = STATUS_STYLES[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap ${className}`}
    >
      <svg viewBox="0 0 8 8" aria-hidden="true" className="h-2 w-2 flex-none">
        <circle cx="4" cy="4" r="3" fill="currentColor" fillOpacity={fill} stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {status}
    </span>
  );
}
