/** Presentation-only date formatting shared by server-rendered pages. Always
 * called from Server Components so the formatted string is computed once on
 * the server — client components receive plain strings, never a `Date`. */

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: Date): string {
  return new Date(date).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
