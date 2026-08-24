import { prisma } from "@/lib/prisma";
import { NotFoundError, ValidationError } from "@/lib/errors";
import { mapComment } from "@/lib/tickets";
import type { Comment } from "@/lib/types";

export type CreateCommentInput = {
  ticketId: string;
  content: string;
};

async function ensureTicketExists(ticketId: string): Promise<void> {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    select: { id: true },
  });

  if (!ticket) {
    throw new NotFoundError(`Ticket "${ticketId}" was not found.`);
  }
}

/** Adds a comment to a ticket. Throws `ValidationError` for empty content
 * and `NotFoundError` if the ticket doesn't exist. */
export async function createComment(input: CreateCommentInput): Promise<Comment> {
  if (!input.ticketId) {
    throw new ValidationError("Ticket id is required.");
  }

  const content = input.content?.trim();
  if (!content) {
    throw new ValidationError("Comment content is required.");
  }

  await ensureTicketExists(input.ticketId);

  const comment = await prisma.comment.create({
    data: {
      content,
      ticketId: input.ticketId,
    },
  });

  return mapComment(comment);
}

/** Lists a ticket's comments oldest-first (matches the order
 * `getTicketById` embeds them in). Throws `NotFoundError` if the ticket
 * doesn't exist. */
export async function listComments(ticketId: string): Promise<Comment[]> {
  if (!ticketId) {
    throw new ValidationError("Ticket id is required.");
  }

  await ensureTicketExists(ticketId);

  const comments = await prisma.comment.findMany({
    where: { ticketId },
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
  });

  return comments.map(mapComment);
}
