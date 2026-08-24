import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { NotFoundError, ValidationError } from "@/lib/errors";
import {
  PRIORITIES,
  STATUSES,
  isPriority,
  isStatus,
  type Comment,
  type Priority,
  type Status,
  type Ticket,
  type TicketWithComments,
} from "@/lib/types";

export type CreateTicketInput = {
  title: string;
  description: string;
  priority: string;
};

export type UpdateTicketInput = {
  status?: string;
  priority?: string;
};

/** Prisma returns `priority`/`status` as plain `string` (SQLite has no enum
 * type); this narrows them to the product-level unions, guarding against
 * data that didn't come through this module's validation. */
function mapTicket(row: {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}): Ticket {
  if (!isPriority(row.priority) || !isStatus(row.status)) {
    throw new Error(
      `Ticket ${row.id} has an out-of-domain priority/status value ("${row.priority}"/"${row.status}") in the database.`,
    );
  }

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    priority: row.priority,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/** Exported so lib/comments.ts can map rows the same way instead of
 * duplicating this shape. */
export function mapComment(row: {
  id: string;
  ticketId: string;
  content: string;
  createdAt: Date;
}): Comment {
  return {
    id: row.id,
    ticketId: row.ticketId,
    content: row.content,
    createdAt: row.createdAt,
  };
}

/** Creates a ticket. New tickets always start in "Open" status — the MVP
 * gives users a priority choice at creation time, not a status choice. */
export async function createTicket(input: CreateTicketInput): Promise<Ticket> {
  const title = input.title?.trim();
  const description = input.description?.trim();

  if (!title) {
    throw new ValidationError("Title is required.");
  }
  if (!description) {
    throw new ValidationError("Description is required.");
  }
  if (!isPriority(input.priority)) {
    throw new ValidationError(`Priority must be one of: ${PRIORITIES.join(", ")}.`);
  }

  const ticket = await prisma.ticket.create({
    data: {
      title,
      description,
      priority: input.priority,
      status: "Open" satisfies Status,
    },
  });

  return mapTicket(ticket);
}

/** Lists all tickets, newest first, with a stable tiebreaker so the order
 * stays deterministic even when two tickets share a `createdAt`. Comments
 * are intentionally omitted — the list view doesn't need them. */
export async function listTickets(): Promise<Ticket[]> {
  const tickets = await prisma.ticket.findMany({
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
  });

  return tickets.map(mapTicket);
}

/** Fetches one ticket with its comments in chronological order (oldest
 * first). Throws `NotFoundError` if no ticket has this id. */
export async function getTicketById(id: string): Promise<TicketWithComments> {
  if (!id) {
    throw new ValidationError("Ticket id is required.");
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      comments: {
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      },
    },
  });

  if (!ticket) {
    throw new NotFoundError(`Ticket "${id}" was not found.`);
  }

  return {
    ...mapTicket(ticket),
    comments: ticket.comments.map(mapComment),
  };
}

/** Updates a ticket's status and/or priority. At least one field must be
 * given. Throws `ValidationError` for missing/invalid input and
 * `NotFoundError` if the ticket doesn't exist. */
export async function updateTicket(id: string, input: UpdateTicketInput): Promise<Ticket> {
  if (!id) {
    throw new ValidationError("Ticket id is required.");
  }

  const data: { status?: Status; priority?: Priority } = {};

  if (input.status !== undefined) {
    if (!isStatus(input.status)) {
      throw new ValidationError(`Status must be one of: ${STATUSES.join(", ")}.`);
    }
    data.status = input.status;
  }

  if (input.priority !== undefined) {
    if (!isPriority(input.priority)) {
      throw new ValidationError(`Priority must be one of: ${PRIORITIES.join(", ")}.`);
    }
    data.priority = input.priority;
  }

  if (Object.keys(data).length === 0) {
    throw new ValidationError("At least one of status or priority must be provided.");
  }

  try {
    const ticket = await prisma.ticket.update({ where: { id }, data });
    return mapTicket(ticket);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      throw new NotFoundError(`Ticket "${id}" was not found.`);
    }
    throw error;
  }
}
