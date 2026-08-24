"use client";

import { useActionState, useEffect, useRef } from "react";
import { createCommentAction, type CommentFormState } from "./actions";

const initialState: CommentFormState = { status: "idle", error: null };

export default function CommentForm({ ticketId }: { ticketId: string }) {
  const [state, formAction, isPending] = useActionState(createCommentAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="ticketId" value={ticketId} />
      <label htmlFor="content" className="text-sm font-medium text-zinc-900">
        Add a comment
      </label>
      <textarea
        id="content"
        name="content"
        rows={3}
        required
        aria-invalid={state.status === "error" ? true : undefined}
        aria-describedby={state.status === "error" ? "comment-error" : undefined}
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-900/10 focus:outline-none"
      />
      {state.status === "error" && (
        <p id="comment-error" role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-fit items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Adding…" : "Add comment"}
      </button>
    </form>
  );
}
