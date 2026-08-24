"use client";

import { useActionState } from "react";
import { PRIORITIES } from "@/lib/types";
import { createTicketAction, type NewTicketFormState } from "./actions";

const initialState: NewTicketFormState = {
  error: null,
  fieldErrors: {},
  values: { title: "", description: "", priority: "Medium" },
};

export default function NewTicketForm() {
  const [state, formAction, isPending] = useActionState(createTicketAction, initialState);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {state.error && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-zinc-900">
          Title <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={state.values.title}
          aria-invalid={state.fieldErrors.title ? true : undefined}
          aria-describedby={state.fieldErrors.title ? "title-error" : undefined}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-900/10 focus:outline-none"
        />
        {state.fieldErrors.title && (
          <p id="title-error" className="text-sm text-red-600">
            {state.fieldErrors.title}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-zinc-900">
          Description <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          defaultValue={state.values.description}
          aria-invalid={state.fieldErrors.description ? true : undefined}
          aria-describedby={state.fieldErrors.description ? "description-error" : undefined}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-900/10 focus:outline-none"
        />
        {state.fieldErrors.description && (
          <p id="description-error" className="text-sm text-red-600">
            {state.fieldErrors.description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="priority" className="text-sm font-medium text-zinc-900">
          Priority <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <select
          id="priority"
          name="priority"
          required
          defaultValue={state.values.priority}
          aria-invalid={state.fieldErrors.priority ? true : undefined}
          aria-describedby={state.fieldErrors.priority ? "priority-error" : undefined}
          className="w-fit rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-900/10 focus:outline-none"
        >
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
        {state.fieldErrors.priority && (
          <p id="priority-error" className="text-sm text-red-600">
            {state.fieldErrors.priority}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-fit items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Creating…" : "Create ticket"}
      </button>
    </form>
  );
}
