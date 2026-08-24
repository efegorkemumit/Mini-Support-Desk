/**
 * Shared domain types for tickets, comments, and dashboard statistics.
 *
 * SQLite has no native enum type, so `Ticket.priority` and `Ticket.status`
 * are stored as plain TEXT columns in prisma/schema.prisma. These unions are
 * the single source of truth for the allowed product-level values on the
 * server/UI boundary — keep them in sync with the schema's `@default(...)`
 * values and with any validation in the data-access layer.
 */

export const PRIORITIES = ["Low", "Medium", "High"] as const;
export type Priority = (typeof PRIORITIES)[number];

export const STATUSES = ["Open", "In Progress", "Closed"] as const;
export type Status = (typeof STATUSES)[number];

export function isPriority(value: unknown): value is Priority {
  return typeof value === "string" && (PRIORITIES as readonly string[]).includes(value);
}

export function isStatus(value: unknown): value is Status {
  return typeof value === "string" && (STATUSES as readonly string[]).includes(value);
}

export type Comment = {
  id: string;
  ticketId: string;
  content: string;
  createdAt: Date;
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};

/** Ticket detail shape, including comments in chronological order. */
export type TicketWithComments = Ticket & {
  comments: Comment[];
};

export type Statistics = {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
  byPriority: Record<Priority, number>;
};
