import Link from "next/link";

export default function TicketNotFound() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-10 text-center">
      <h1 className="text-lg font-semibold text-zinc-900">Ticket not found</h1>
      <p className="text-sm text-zinc-600">
        This ticket doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/tickets"
        className="mt-1 inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Back to tickets
      </Link>
    </div>
  );
}
