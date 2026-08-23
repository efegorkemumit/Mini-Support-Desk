---
name: frontend-design
description: Design and implement clear, distinctive Mini Support Desk UI in Next.js, TypeScript, and Tailwind CSS with strong hierarchy, usability, responsiveness, and accessibility.
license: 'Apache-2.0 (source skill declares: Complete terms in LICENSE.txt)'
---

# Frontend Design — Mini Support Desk

Use this skill when creating or reshaping the Mini Support Desk interface.

The product is a focused support desk, not a landing page or generic SaaS showcase. Design for people who need to scan tickets, understand status quickly, make changes confidently, and move through routine support work with minimal friction.

## Project boundary

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

This skill owns frontend design and UI implementation guidance only.

Do not:

- Modify Prisma schema or migrations.
- Design database models.
- Implement database queries or backend business logic.
- Introduce auth, payments, user roles, microservices, or enterprise infrastructure.
- Invent API layers solely for the UI.
- Add product concepts that are outside the MVP.

If required data or server behavior is missing, describe the UI-facing requirement and hand it to the backend owner.

## Start from the real product

Before designing:

1. Inspect the existing Next.js structure and current UI patterns.
2. Identify the screen's primary user job.
3. Identify the real ticket data available to the screen.
4. Reuse useful existing components and visual conventions.
5. Preserve an established design direction unless the task explicitly asks for a redesign.

Do not assume App Router, shadcn/ui, a specific icon set, a form library, or a state-management library before finding them in the repository.

## Design principles

### Information hierarchy comes first

The interface must make the most important support information easy to find.

Use size, spacing, grouping, typography, alignment, and contrast to distinguish:

- Page identity
- Primary action
- Ticket title or identifier
- Status
- Priority
- Main ticket content
- Comments
- Secondary metadata
- Dashboard statistics

Structure should encode real meaning. Dividers, labels, badges, sections, and grouping should help users understand the information, not decorate empty space.

### Make support work easy to scan

This is a working application.

Prefer:

- Clear page titles
- Compact but comfortable spacing
- Obvious primary actions
- Consistent status and priority treatments
- Short, useful labels
- Predictable form placement
- Readable ticket content
- Simple navigation
- Useful empty states
- Stable layouts that do not jump unnecessarily

Avoid oversized marketing patterns that push actual work below the fold.

### Be distinctive without becoming theatrical

Avoid a generic AI/SaaS look.

Do not default to:

- Purple or blue gradients everywhere
- Glowing cards
- Glassmorphism
- Huge rounded cards with large empty padding
- Repetitive dashboard tiles that all look equally important
- Generic abstract blobs
- "AI product" visual clichés
- Decorative numbered sections without real sequence
- A giant hero section inside the application

Make deliberate choices that fit a support desk: practical, calm, clear, and recognizable.

One restrained signature detail is enough. It might be a specific ticket-row treatment, a strong typographic hierarchy, a distinctive status language, or a memorable layout decision. Keep the rest disciplined.

### Typography should help navigation

Typography is part of the interface architecture.

Use a clear type scale for:

- Page titles
- Section headings
- Ticket titles
- Body content
- Labels
- Metadata
- Statistics

Prefer readable, practical typography over display treatment that slows scanning. If the project already defines fonts, respect them unless redesign is explicitly requested.

### Color carries meaning, but never alone

Status and priority need clear visual distinction.

Use only:

Priority:
- `Low`
- `Medium`
- `High`

Status:
- `Open`
- `In Progress`
- `Closed`

Pair color with text, iconography, shape, or another visible cue. Do not rely on color alone.

Do not invent `Urgent`, `Critical`, `Pending`, `Resolved`, or other workflow states.

### Motion is optional

Use animation only when it improves comprehension or feedback.

Appropriate examples:

- Small state transitions
- Menu or disclosure transitions
- Clear loading feedback
- Subtle hover/focus response

Avoid:

- Page-load choreography
- Ambient decorative motion
- Large scroll reveals
- Animation on every card
- Motion that delays access to ticket information

Respect reduced-motion preferences when motion is present.

## Screen guidance

### Dashboard

The dashboard should answer "what is happening?" quickly.

Use a small number of meaningful statistics based on real available data, such as:

- Total tickets
- Open tickets
- In-progress tickets
- Closed tickets
- Priority counts when actually required

Keep statistics visually scannable without turning every number into an oversized marketing card.

Provide a clear path into the ticket list or relevant ticket views.

### Ticket list

Optimize for repeated scanning.

When available, make these easy to compare:

- Ticket title or identifier
- Status
- Priority
- Relevant existing timestamp or metadata
- Clear action or link to open the ticket

Use tables, rows, or responsive cards according to the existing project style and content density. Do not force a table if the mobile experience becomes unusable.

### New ticket

Keep the form short.

- Use only fields supported by the product/data model.
- Label required fields clearly.
- Place validation messages near the relevant input.
- Use the exact supported priority values.
- Make the submit action explicit.
- Show disabled/submitting state when needed.
- Prevent accidental duplicate submission when practical.

Do not add assignee, department, SLA, tags, attachments, requester accounts, or similar support-suite features unless explicitly requested.

### Ticket detail

Prioritize:

1. Ticket identity/title
2. Current status and priority
3. Main ticket content
4. Supported actions
5. Comments
6. Secondary metadata

Keep status and priority changes understandable and predictable when the backend supports them.

### Comments

Comments should read naturally as a timeline or discussion area.

Handle:

- No comments yet
- Long text
- Submission state
- Validation errors
- Loading or failure state when applicable

Do not add threads, mentions, reactions, attachments, or live collaboration unless explicitly requested.

## Responsive behavior

Design for common desktop and mobile widths.

Ensure:

- Layouts reflow instead of simply shrinking.
- Forms do not overflow.
- Important actions remain reachable.
- Ticket data remains understandable on narrow screens.
- Long text wraps safely.
- Navigation remains usable.
- Dense content does not require unnecessary horizontal scrolling.

Do not create a second mobile-only application structure.

## Accessibility floor

For touched UI:

- Use semantic HTML.
- Use real buttons for actions and links for navigation.
- Associate labels with inputs.
- Preserve visible keyboard focus.
- Give icon-only controls accessible names.
- Keep heading levels sensible.
- Make controls keyboard usable.
- Do not communicate status or priority by color alone.
- Keep error text specific and actionable.
- Respect reduced motion where animation exists.

Do not claim formal accessibility certification unless an actual audit was performed.

## UI writing

Words exist to help the user act.

Prefer:

- Plain language
- Active voice
- Sentence case
- Stable terminology
- Specific actions such as `Create ticket`, `Save changes`, or `Add comment`

Keep the same action name through the flow.

Errors should explain what failed and what the user can do next. Empty states should point to the next useful action instead of filling space with marketing copy.

## Design workflow

Before writing UI code, make a short design plan:

### Screen job
State the user's primary task on this screen.

### Hierarchy
List the information/actions in visual priority order.

### Visual direction
Describe the intended spacing, typography, surface treatment, and one restrained signature element.

### States
List only relevant loading, empty, error, disabled, and success states.

### Responsive behavior
State how the layout changes on smaller screens.

Then critique the plan:

- Does it look like a generic SaaS template?
- Is anything decorative competing with ticket information?
- Is a hero or large card consuming space without helping the task?
- Are status and priority immediately understandable?
- Can a keyboard user operate the changed controls?
- Does the design fit the existing application?

Revise weak choices before implementation.

## Implementation guidance

When implementing:

- Follow existing Next.js and TypeScript conventions.
- Use Tailwind consistently with the repository.
- Reuse existing components when the reuse is real.
- Keep client components limited to places that need client behavior.
- Keep local state local.
- Avoid adding global state or new UI libraries for a small isolated need.
- Preserve existing backend contracts.
- Do not fabricate backend behavior to finish a screen.

After implementation, review the rendered structure or screenshots when available and remove one unnecessary decorative or structural choice if it does not improve usability.

## Completion check

A frontend design task is ready when:

- The screen's primary job is obvious.
- Real ticket information has clear hierarchy.
- Status and priority are consistent.
- Common empty/error/loading states are handled where relevant.
- Desktop and mobile layouts are usable.
- Keyboard/focus basics are preserved.
- The UI does not depend on invented backend behavior.
- No auth, payments, roles, microservices, or enterprise scope was added.
- The result feels specific to a support desk rather than a generic AI/SaaS template.

---

## Source and license

This is a modified Mini Support Desk adaptation of Anthropic's `frontend-design` Skill:

https://github.com/anthropics/claude-plugins-official/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md

Original author/plugin: Anthropic.

The original Skill declares `license: Complete terms in LICENSE.txt`. The source plugin repository distributes the plugin under the Apache License 2.0:

https://github.com/anthropics/claude-plugins-official/blob/main/plugins/frontend-design/LICENSE

This file has been modified from the source for the Mini Support Desk project.
