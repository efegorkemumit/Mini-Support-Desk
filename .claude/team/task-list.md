# Mini Support Desk — Agent Team Shared Task List

Status: **Approved plan converted to task list. No implementation started yet.**
Owned by: Team Lead (this session). Source: planner's approved plan.
Owners map to teammates: `planner`, `ui` (ui-designer), `backend` (backend-developer), `qa` (qa-reviewer).

## Legend
- **Depends on**: task IDs that must be `Done` before this task may start.
- **Status**: `Not Started` | `In Progress` | `Blocked` | `Done` (all start `Not Started`).
- **Parallel group**: tasks in the same group have no dependency on each other and may run concurrently if owned by different teammates.

## Foundation

| ID | Task | Owner | Depends on | Parallel group | Status |
|----|------|-------|------------|-----------------|--------|
| F1 | Scaffold Next.js + TypeScript + Tailwind project (App Router, ESLint, base `dev`/`build`/`lint` scripts) | ui | — | P0 (solo, first) | Done |
| F2 | Initialize Prisma + SQLite, define `Ticket`/`Comment` schema with MVP priority/status values, generate client, first migration | backend | F1 | P1 | Done |
| F3 | App shell: root layout, nav (Dashboard / Tickets / New Ticket), empty route stubs for `/`, `/tickets`, `/tickets/new`, `/tickets/[id]` | ui | F1 | P1 | Done |

F2 and F3 touch disjoint files (`prisma/**` vs `app/layout` + nav/route stubs) and have different owners — safe to run in parallel once F1 is done.

## Backend

| ID | Task | Owner | Depends on | Status |
|----|------|-------|------------|--------|
| B1 | Ticket data functions: create, list (deterministic order), get-by-id (with comments), update status/priority, with validation + not-found handling | backend | F2 | Done |
| B2 | Comment data functions: create comment for a ticket (content required, ticket must exist), list comments for a ticket chronologically | backend | F2, B1 | Done |
| B3 | Dashboard statistics query: total tickets, counts by status (Open/In Progress/Closed), counts by priority — via Prisma count/aggregate | backend | F2 | Done |

B1 and B3 both only need F2 and don't block each other, but both are owned by `backend`, so they're worked sequentially by that teammate; B2 always follows B1.

**Backend contract (must be published before any UI/API integration starts):**
- `Ticket`: `id`, `title`, `description`, `priority: 'Low'|'Medium'|'High'`, `status: 'Open'|'In Progress'|'Closed'`, `createdAt`, `updatedAt`, `comments: Comment[]` (detail fetch only).
- `Comment`: `id`, `ticketId`, `content`, `createdAt`.
- `Statistics`: `total`, `open`, `inProgress`, `closed` (+ optional by-priority counts).
- UI-facing validation cases to support: missing required field, invalid priority/status, ticket-not-found, empty comment content.
- File ownership: `backend` owns `prisma/schema.prisma`, migrations, Prisma client, server-side data functions, and the shared types file. `ui` reads shared types but does not edit them — changes are handed back to `backend`.

## UI

| ID | Task | Owner | Depends on | Status |
|----|------|-------|------------|--------|
| U1 | Dashboard page: stat cards per B3 contract, empty state | ui | F3, B3 | Done |
| U2 | Ticket list page: title/priority/status (not color-only), link to detail, empty state | ui | F3, B1 | Done |
| U3 | New ticket page: form (title, description, priority select), client validation, loading/error/success states | ui | F3, B1 | Done |
| U4 | Ticket detail page: ticket info, priority/status display + change controls, comment list | ui | F3, B1, B2 | Done |
| U5 | Comment form on detail page: add comment with loading/empty/error states | ui | F3, B2 | Done |

U1–U5 are separate route files with no overlap, so their internal order is flexible — but as a phase, UI integration work does not start until the full backend contract (F2, B1, B2, B3) is published, to avoid building against an unstable/assumed contract.

## QA

| ID | Task | Owner | Depends on | Status |
|----|------|-------|------------|--------|
| Q1 | Full MVP flow review: create → list → detail → status/priority change → add comment → dashboard stats update; TypeScript correctness; Prisma/SQLite consistency; UI/backend contract match | qa | F1, F2, F3, B1, B2, B3, U1, U2, U3, U4, U5 | Done (PASS — full re-run after accidental reset/restore, no blocker/major/minor findings) |

Q1 starts only after every other task is `Done` (final integration complete). No coverage/load/security certification in scope — MVP flow correctness only.

## Explicit non-goals (kept out of MVP)
No new features beyond what's listed above — anything else surfaced later goes back to `planner` for scoping before becoming a task.
