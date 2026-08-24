import Link from "next/link";
import { listTickets } from "@/lib/tickets";
import StatusBadge from "@/app/components/StatusBadge";
import PriorityBadge from "@/app/components/PriorityBadge";
import { formatDate } from "@/app/utils/format";

export default async function TicketsPage() {
  const tickets = await listTickets();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Tickets</h1>
          <p className="mt-1 text-sm text-zinc-600">Browse and manage all support tickets.</p>
        </div>
        <Link
          href="/tickets/new"
          className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          New Ticket
        </Link>
      </div>

      {tickets.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-10 text-center">
          <p className="text-sm text-zinc-600">No tickets yet.</p>
          <Link
            href="/tickets/new"
            className="mt-3 inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Create a ticket
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <Link
                href={`/tickets/${ticket.id}`}
                className="group flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-zinc-900 group-hover:underline">{ticket.title}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">Created {formatDate(ticket.createdAt)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={ticket.status} />
                  <PriorityBadge priority={ticket.priority} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
