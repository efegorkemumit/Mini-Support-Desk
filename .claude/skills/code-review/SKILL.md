---
name: code-review
description: Review Mini Support Desk changes for correctness, TypeScript/Next.js quality, Prisma/SQLite consistency, ticket flows, validation, UI states, regressions, and maintainability.
license: Apache-2.0
---

# Code Review — Mini Support Desk

Review Mini Support Desk code changes with a focused lens on correctness, data integrity, regressions, error handling, and maintainability.

Do not require a pull request. Review the relevant diff, changed files, task scope, or repository state available in the current session.

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

Do not report the absence of auth, payments, user roles, microservices, enterprise workflows, connectors, or project trackers as defects. They are intentionally outside this project.

## Review approach

Prioritize real defects over stylistic preferences.

Review the smallest relevant surface:

1. Understand the requested change.
2. Inspect changed files and immediate dependencies.
3. Verify data and UI contracts where the change crosses layers.
4. Run relevant existing checks when safe.
5. Report findings by severity with concrete fixes.

Do not force unrelated refactors during a focused review.

## Review dimensions

### TypeScript

Check:

- Type errors
- Incorrect or unsafe casts
- Unnecessary `any`
- Nullable/optional values handled incorrectly
- Mismatched component or server input/output types
- Duplicated domain types that can drift
- Enum/string mappings that disagree across layers

Do not demand a type abstraction when a local type is clearer.

### Next.js

Check the actual routing/runtime pattern used by the repository.

Look for:

- Incorrect server/client boundaries
- Browser-only APIs used in server code
- Server-only code leaked into client components
- Misused route handlers or server actions
- Broken navigation or params handling
- Data fetching that conflicts with the project's current approach
- Incorrect cache/revalidation behavior only when relevant to the touched feature

Do not require App Router, Server Actions, or a REST API if the project uses another valid existing pattern.

### Prisma and SQLite

When backend/data code changed, check:

- Prisma schema validity
- SQLite remains the datasource
- Relations are correct
- Required/optional fields match real behavior
- Migration matches the intended schema change
- No casual destructive reset or migration behavior
- Queries return the expected shape
- Missing-record cases are handled
- Obvious N+1 patterns are avoided
- Counts/aggregates use appropriate Prisma operations when practical

Do not recommend Redis, replicas, queues, distributed transactions, or a new database.

### Ticket behavior

Review the affected ticket flow.

Check relevant behavior such as:

- Ticket creation
- Ticket list loading
- Ticket detail loading
- Updates explicitly required by the task
- Required field validation
- Correct persistence
- Not-found behavior
- Duplicate submission where applicable
- Stable ordering when the UI depends on it

Do not assume delete functionality is required unless it exists in the task.

### Priority

Only these product values are valid:

- `Low`
- `Medium`
- `High`

Flag:

- Unsupported additional priorities
- Backend accepting invalid priority
- UI offering values backend rejects
- Mapping errors between Prisma identifiers and UI labels

### Status

Only these product values are valid:

- `Open`
- `In Progress`
- `Closed`

Flag:

- Unsupported additional states
- Invalid status accepted by mutations
- Incorrect mapping
- UI/backend disagreement
- Statistics using the wrong status representation

### Comments

Check relevant comment behavior:

- Comment is attached to the correct ticket
- Referenced ticket exists when required
- Empty/invalid content is rejected server-side
- Comment ordering is deterministic where expected
- Submission errors are surfaced
- Persisted comments appear correctly in the UI

Do not require authorship accounts, threads, mentions, reactions, attachments, or real-time updates.

### Input validation

Frontend validation improves UX; backend validation protects correctness.

For changed mutations or handlers, check:

- Required fields
- Status/priority allowed values
- Invalid or missing identifiers
- Empty/whitespace-only content where applicable
- Reasonable string handling
- Errors returned in a form the caller can handle

Do not trust client-side validation alone.

### Error handling

Look for:

- Swallowed errors
- False success states
- Unhandled not-found cases
- Generic errors where the UI needs a specific recoverable state
- Raw internal errors unnecessarily exposed to users
- Loading/submitting state that never resolves after failure

Keep error handling proportional to the MVP.

### Empty states

For touched UI, check whether expected empty conditions are usable:

- No tickets
- No comments
- No statistics data
- Search/filter result empty only if such features actually exist

An empty state should explain the state and provide the next useful action when one exists.

### Dashboard statistics

If statistics changed, verify that displayed values match stored ticket data.

Typical relevant checks:

- Total
- Open
- In Progress
- Closed
- Priority counts when used

Do not require analytics infrastructure.

### Build and lint

Use existing repository scripts when available and appropriate.

Possible checks:

- Typecheck
- Lint
- Relevant tests
- Prisma validation
- Prisma client generation when schema changes require it
- Production build when justified by the scope

Do not install new tooling solely to complete the review.

Do not start a long-running dev server unless explicitly requested.

Do not reset or wipe the SQLite database.

### Maintainability

Flag maintainability issues when they affect the changed code:

- Confusing naming
- Large avoidable duplication
- Dead code introduced by the change
- Unnecessary abstractions
- Cross-layer logic in the wrong place
- Broad unrelated refactors
- Fragile coupling
- Comments that contradict behavior

Do not enforce arbitrary complexity scores, coverage percentages, function-length limits, or enterprise style checklists.

### Focused security

Only flag security issues relevant to the actual code, such as:

- Unsafe raw SQL construction
- Unsanitized dangerous rendering
- Secret leakage
- Unsafe file/system operations
- Missing server-side validation of untrusted input

Authentication and role checks are intentionally outside this MVP; their absence is not a finding.

## Severity

Use:

### Blocker
The change cannot safely be accepted: build/type failure introduced by the change, invalid Prisma schema, destructive data risk, broken core flow, wrong-record mutation, or comparable failure.

### Major
Important correctness/regression issue that should be fixed before accepting the task.

### Minor
Real non-blocking defect or maintainability/accessibility issue.

### Suggestion
Optional improvement only. Never use suggestions to fail the review.

## Output

Use this structure:

### Verdict

One of:

- `PASS`
- `PASS WITH MINOR FINDINGS`
- `CHANGES REQUIRED`

Use `CHANGES REQUIRED` when unresolved Blocker or Major findings exist.

### Summary

One or two sentences describing what was reviewed and overall quality.

### Findings

For each finding include:

- Severity
- File and line/reference when available
- Problem
- Why it matters
- Expected fix

Order by severity. Do not invent findings to fill the section.

### Verification

List only checks actually run and their real result:

- Typecheck
- Lint
- Tests
- Prisma validation
- Build

Use `not run` or `not applicable` when appropriate.

### What looks good

Call out a few concrete strengths only when they are genuinely visible in the reviewed code.

### Scope notes

Mention important unverified behavior, relevant pre-existing failures, or assumptions.

## Reviewer rules

- Do not modify code during the review unless explicitly assigned a separate fix task.
- Do not invent test results or metrics.
- Do not mark unrelated pre-existing failures as introduced by the current change without evidence.
- Do not require PRs, connectors, project trackers, or knowledge-base integrations.
- Do not demand auth, roles, payments, microservices, or enterprise infrastructure.
- Prefer a small correct solution over architecture ceremony.

---

## Source and license

This is a modified Mini Support Desk adaptation of Anthropic's `code-review` Skill:

https://github.com/anthropics/knowledge-work-plugins/blob/main/engineering/skills/code-review/SKILL.md

Original plugin/author: Anthropic, `knowledge-work-plugins` engineering plugin.

The source repository is distributed under the Apache License 2.0:

https://github.com/anthropics/knowledge-work-plugins/blob/main/LICENSE

This file has been modified from the source for the Mini Support Desk project.
