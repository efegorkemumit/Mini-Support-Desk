import Link from "next/link";
import { getStatistics } from "@/lib/statistics";
import { PRIORITIES } from "@/lib/types";
import PriorityBadge from "@/app/components/PriorityBadge";

const STAT_DOT_CLASS = {
  Total: "bg-zinc-400",
  Open: "bg-blue-400",
  "In Progress": "bg-amber-400",
  Closed: "bg-zinc-500",
} as const;

export default async function DashboardPage() {
  const stats = await getStatistics();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-600">Overview of support ticket activity.</p>
        </div>
        <Link
          href="/tickets"
          className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          View all tickets
        </Link>
      </div>

      {stats.total === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-10 text-center">
          <p className="text-sm text-zinc-600">No tickets yet.</p>
          <Link
            href="/tickets/new"
            className="mt-3 inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Create your first ticket
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(
              [
                { label: "Total tickets", value: stats.total, dot: STAT_DOT_CLASS.Total },
                { label: "Open", value: stats.open, dot: STAT_DOT_CLASS.Open },
                { label: "In Progress", value: stats.inProgress, dot: STAT_DOT_CLASS["In Progress"] },
                { label: "Closed", value: stats.closed, dot: STAT_DOT_CLASS.Closed },
              ] as const
            ).map((card) => (
              <div key={card.label} className="rounded-lg border border-zinc-200 bg-white p-4">
                <div className="flex items-center gap-1.5">
                  <span aria-hidden="true" className={`h-2 w-2 flex-none rounded-full ${card.dot}`} />
                  <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">{card.label}</p>
                </div>
                <p className="mt-2 text-3xl font-semibold text-zinc-900">{card.value}</p>
              </div>
            ))}
          </div>

          <section className="rounded-lg border border-zinc-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-zinc-900">By priority</h2>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
              {PRIORITIES.map((priority) => (
                <div key={priority} className="flex items-center gap-2">
                  <PriorityBadge priority={priority} />
                  <span className="text-sm font-medium text-zinc-900">{stats.byPriority[priority]}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
