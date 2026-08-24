"use client";

import { useActionState, useRef } from "react";
import { PRIORITIES, STATUSES, type Priority, type Status } from "@/lib/types";
import StatusBadge from "@/app/components/StatusBadge";
import PriorityBadge from "@/app/components/PriorityBadge";
import { updatePriorityAction, updateStatusAction, type UpdateFieldState } from "./actions";

type TicketControlsProps = {
  ticketId: string;
  status: Status;
  priority: Priority;
};

export default function TicketControls({ ticketId, status, priority }: TicketControlsProps) {
  const statusInitial: UpdateFieldState = { error: null, status, priority };
  const priorityInitial: UpdateFieldState = { error: null, status, priority };

  const [statusState, statusFormAction, statusPending] = useActionState(updateStatusAction, statusInitial);
  const [priorityState, priorityFormAction, priorityPending] = useActionState(
    updatePriorityAction,
    priorityInitial,
  );

  const statusFormRef = useRef<HTMLFormElement>(null);
  const priorityFormRef = useRef<HTMLFormElement>(null);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-6">
        <form ref={statusFormRef} action={statusFormAction} className="flex items-center gap-2">
          <input type="hidden" name="ticketId" value={ticketId} />
          <StatusBadge status={statusState.status} />
          <label htmlFor="status" className="sr-only">
            Change status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={status}
            disabled={statusPending}
            onChange={() => statusFormRef.current?.requestSubmit()}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-900/10 focus:outline-none disabled:opacity-60"
          >
            {STATUSES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {statusPending && (
            <span className="text-xs text-zinc-500" aria-live="polite">
              Saving…
            </span>
          )}
        </form>

        <form ref={priorityFormRef} action={priorityFormAction} className="flex items-center gap-2">
          <input type="hidden" name="ticketId" value={ticketId} />
          <PriorityBadge priority={priorityState.priority} />
          <label htmlFor="priority" className="sr-only">
            Change priority
          </label>
          <select
            id="priority"
            name="priority"
            defaultValue={priority}
            disabled={priorityPending}
            onChange={() => priorityFormRef.current?.requestSubmit()}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-900/10 focus:outline-none disabled:opacity-60"
          >
            {PRIORITIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {priorityPending && (
            <span className="text-xs text-zinc-500" aria-live="polite">
              Saving…
            </span>
          )}
        </form>
      </div>

      {(statusState.error || priorityState.error) && (
        <p role="alert" className="text-sm text-red-600">
          {statusState.error ?? priorityState.error}
        </p>
      )}
    </div>
  );
}
