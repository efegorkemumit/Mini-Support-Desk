---
name: ticket-feature
description: Analyze the full implementation impact of a Mini Support Desk ticket feature or change before coding, then produce a short agent-owned dependency-aware implementation plan.
---

# Ticket Feature Impact Planning

Use this skill before implementing a new ticket-system feature or changing existing ticket behavior.

The purpose is to understand the real impact first, then produce a short implementation impact plan. Do not start coding while performing this skill.

## Project scope

Stack:

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- SQLite

MVP:

- Dashboard
- Ticket list
- New ticket
- Ticket detail
- Priority: `Low`, `Medium`, `High`
- Status: `Open`, `In Progress`, `Closed`
- Ticket comments
- Simple statistics

Hard boundaries:

- No auth
- No payments
- No user roles or permissions
- No microservices
- No unnecessary enterprise architecture

Do not propose these as "future-proofing."

## Core rule

Analyze only layers that the requested change actually affects.

A UI-only change should not automatically create database work.

A label or layout change should not automatically create backend work.

A data-model change should include migration/data impact only when the schema really changes.

Keep small changes small.

## Workflow

### 1. Clarify the requirement

Define:

- What the user wants to change
- Expected visible behavior
- What must remain unchanged
- Whether the request affects existing tickets
- Clear acceptance criteria

If the request is materially ambiguous, identify the ambiguity. Use a minimal safe assumption when possible; ask a concise clarification only when the missing detail would change the implementation materially.

Do not expand the requested feature.

### 2. Inspect current behavior

Before planning, inspect the relevant repository areas.

Determine:

- Where the current feature lives
- Current Next.js routing/server pattern
- Existing components
- Existing ticket types/data shapes
- Existing Prisma model and relations when relevant
- Existing mutation/query path
- Existing validation
- Existing error/empty/loading states
- Existing tests/scripts when relevant

Do not assume App Router, Server Actions, route handlers, shadcn/ui, Zod, or a test framework before finding them.

Summarize only repository facts that affect the change.

### 3. Determine Prisma / data-model impact

Ask:

- Does the change require a new stored field?
- Does an existing field change meaning?
- Does a relation change?
- Do status or priority representations change?
- Is a migration actually required?
- Are existing rows compatible?

If no schema change is required, say:

`Prisma/data model: no change`

Do not create schema work merely because the feature touches ticket data.

Preserve product values unless the user explicitly changes them:

Priority:
- `Low`
- `Medium`
- `High`

Status:
- `Open`
- `In Progress`
- `Closed`

### 4. Determine backend / server impact

Inspect the existing Next.js server-side pattern.

Identify only required changes to:

- Queries
- Mutations
- Server Actions
- Route Handlers
- Server components
- Domain helpers
- Validation
- Statistics

Do not invent a REST API, service layer, repository layer, queue, cache, or separate backend service when the current architecture does not need one.

If no backend change is required, say:

`Backend: no change`

### 5. Determine UI / component impact

Identify the exact screens/components affected.

Possible areas include:

- Dashboard
- Ticket list
- New ticket
- Ticket detail
- Status control
- Priority control
- Comment list/form
- Shared ticket components

Consider:

- Information hierarchy
- Responsive behavior
- Accessibility
- Loading state
- Empty state
- Error state
- Submitting/disabled state

Do not turn a focused feature into a global redesign.

If no UI change is required, say:

`UI: no change`

### 6. Determine validation and error-state impact

For each affected input or operation, check:

- Required values
- Allowed status/priority values
- Missing ticket handling
- Invalid identifier handling
- Empty content
- Duplicate submission
- Recoverable failure feedback

Distinguish frontend validation from server-side validation.

Do not add a validation framework if existing code or simple local validation is sufficient.

### 7. Consider existing data

If stored data changes, determine:

- Whether old rows remain valid
- Whether a default is needed
- Whether backfill is needed
- Whether migration could lose data
- Whether statistics or filters change meaning

Do not reset or wipe the database as a planning shortcut.

If existing data is unaffected, say so explicitly.

### 8. Create QA scenarios

Write only scenarios relevant to the change.

Include applicable cases such as:

- Happy path
- Invalid input
- Empty state
- Not found
- Existing records
- New records
- Status/priority boundaries
- Comment persistence
- Dashboard statistic update
- Mobile/responsive behavior
- Build/type/lint regression

Avoid generic enterprise test matrices.

### 9. Assign agent ownership

Use the actual available agent definitions when possible.

Expected Mini Support Desk ownership:

#### `planner`

Owns:

- Requirement decomposition
- Dependencies
- Execution order
- Cross-agent handoffs

Does not implement project code.

#### `ui-designer`

Owns:

- Pages
- Components
- Tailwind styling
- Forms
- Responsive behavior
- Accessibility
- Frontend states and interactions

Does not own Prisma/database/backend business logic.

#### `backend-developer`

Owns:

- Prisma schema/migrations
- SQLite persistence
- Queries/mutations
- Server-side validation
- Ticket/comment domain logic
- Statistics data

Does not own visual design.

#### `qa-reviewer`

Owns:

- Final review
- Regression checks
- Type/lint/build/test verification when appropriate
- Prisma/SQLite consistency review
- UI/backend contract verification

Does not implement the feature during the review pass.

If an expected agent file is missing or its definition differs, report that instead of inventing an agent.

### 10. Determine dependencies and safe parallel work

For each affected task, identify:

- Must happen first
- Depends on another task
- Can run in parallel
- File ownership risk
- Required handoff

Good parallel work:

- Backend defines a stable data contract while UI builds against an agreed shape.
- Independent UI components with separate file ownership.
- QA planning while implementation proceeds.

Bad parallel work:

- Two agents editing the same file.
- UI inventing a backend contract while backend independently chooses another.
- Migration-dependent code before the schema/data decision is settled.

Do not force parallelism when sequential work is simpler.

## Required output

Before any implementation, return this short plan:

### Requirement

One or two sentences.

### Current behavior

Only relevant repository facts.

### Impact

- Prisma/data model:
- Backend:
- UI:
- Validation/errors:
- Existing data:
- Statistics:
- Tests/QA:

Use `no change` for unaffected layers.

### Agent tasks

For each real task:

- Owner
- Objective
- Dependencies
- Done when

### Execution order

State:

- First
- Parallel
- Then
- Final QA

Omit stages that are not needed.

### Risks / assumptions

Only material uncertainties.

## Planning rules

- Do not code while this skill is producing the impact plan.
- Do not recommend auth.
- Do not recommend payments.
- Do not add users, roles, or permissions.
- Do not recommend microservices.
- Do not introduce Redis, queues, event buses, or enterprise layers.
- Do not add fields or workflows that the user did not request.
- Do not include unaffected layers just to make the plan look complete.
- Do not invent agents or project files.
- Respect existing project architecture.
- Prefer the smallest correct change.

The plan is complete when the implementation owner can start work without guessing which layers change, who owns each change, or what must be verified.
