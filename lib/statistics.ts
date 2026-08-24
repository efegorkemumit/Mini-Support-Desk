import { prisma } from "@/lib/prisma";
import {
  PRIORITIES,
  isPriority,
  isStatus,
  type Priority,
  type Statistics,
  type Status,
} from "@/lib/types";

/** Dashboard counts, computed with `count`/`groupBy` so the whole tickets
 * table is never loaded into memory just to be counted. */
export async function getStatistics(): Promise<Statistics> {
  const [total, statusGroups, priorityGroups] = await Promise.all([
    prisma.ticket.count(),
    prisma.ticket.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.ticket.groupBy({ by: ["priority"], _count: { _all: true } }),
  ]);

  const countsByStatus: Record<Status, number> = {
    Open: 0,
    "In Progress": 0,
    Closed: 0,
  };
  for (const group of statusGroups) {
    if (!isStatus(group.status)) {
      throw new Error(`Ticket table has an out-of-domain status value ("${group.status}").`);
    }
    countsByStatus[group.status] = group._count._all;
  }

  const byPriority = Object.fromEntries(PRIORITIES.map((priority) => [priority, 0])) as Record<
    Priority,
    number
  >;
  for (const group of priorityGroups) {
    if (!isPriority(group.priority)) {
      throw new Error(`Ticket table has an out-of-domain priority value ("${group.priority}").`);
    }
    byPriority[group.priority] = group._count._all;
  }

  return {
    total,
    open: countsByStatus.Open,
    inProgress: countsByStatus["In Progress"],
    closed: countsByStatus.Closed,
    byPriority,
  };
}
