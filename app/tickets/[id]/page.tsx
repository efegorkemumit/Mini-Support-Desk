import Link from "next/link";
import { notFound } from "next/navigation";
import { getTicketById } from "@/lib/tickets";
import { NotFoundError } from "@/lib/errors";
import { formatDateTime } from "@/app/utils/format";
import TicketControls from "./TicketControls";
import CommentForm from "./CommentForm";

export default async function TicketDetailPage({ params }: PageProps<"/tickets/[id]">) {
  const { id } = await params;

  let ticket;
  try {
    ticket = await getTicketById(id);
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6">
        <Link href="/tickets" className="w-fit text-sm text-zinc-500 hover:text-zinc-700 hover:underline">
          ← Back to tickets
        </Link>
        <div>
          <h1 className="text-2xl font-semibold break-words text-zinc-900">{ticket.title}</h1>
          <p className="mt-1 text-xs text-zinc-500">Created {formatDateTime(ticket.createdAt)}</p>
        </div>
        <TicketControls ticketId={ticket.id} status={ticket.status} priority={ticket.priority} />
      </div>

      <section>
        <h2 className="text-sm font-semibold tracking-wide text-zinc-500 uppercase">Description</h2>
        <p className="mt-2 text-sm leading-6 whitespace-pre-wrap text-zinc-800">{ticket.description}</p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-500 uppercase">
          Comments{ticket.comments.length > 0 ? ` (${ticket.comments.length})` : ""}
        </h2>

        {ticket.comments.length === 0 ? (
          <p className="text-sm text-zinc-500">No comments yet. Be the first to add one.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {ticket.comments.map((comment) => (
              <li key={comment.id} className="rounded-lg border border-zinc-200 bg-white p-4">
                <p className="text-sm leading-6 whitespace-pre-wrap text-zinc-800">{comment.content}</p>
                <p className="mt-2 text-xs text-zinc-500">{formatDateTime(comment.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}

        <CommentForm ticketId={ticket.id} />
      </section>
    </div>
  );
}
