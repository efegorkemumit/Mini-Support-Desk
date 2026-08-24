"use server";

import { revalidatePath } from "next/cache";
import { updateTicket } from "@/lib/tickets";
import { createComment } from "@/lib/comments";
import { NotFoundError, ValidationError } from "@/lib/errors";
import type { Priority, Status } from "@/lib/types";

export type UpdateFieldState = {
  error: string | null;
  status: Status;
  priority: Priority;
  attempt: number;
};

async function performUpdate(
  prevState: UpdateFieldState,
  ticketId: string,
  input: { status?: string } | { priority?: string },
): Promise<UpdateFieldState> {
  try {
    const ticket = await updateTicket(ticketId, input);
    revalidatePath(`/tickets/${ticketId}`);
    revalidatePath("/tickets");
    revalidatePath("/");
    return { error: null, status: ticket.status, priority: ticket.priority, attempt: prevState.attempt + 1 };
  } catch (error) {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      return { ...prevState, error: error.message, attempt: prevState.attempt + 1 };
    }
    throw error;
  }
}

export async function updateStatusAction(
  prevState: UpdateFieldState,
  formData: FormData,
): Promise<UpdateFieldState> {
  const ticketId = String(formData.get("ticketId") ?? "");
  const status = String(formData.get("status") ?? "");
  return performUpdate(prevState, ticketId, { status });
}

export async function updatePriorityAction(
  prevState: UpdateFieldState,
  formData: FormData,
): Promise<UpdateFieldState> {
  const ticketId = String(formData.get("ticketId") ?? "");
  const priority = String(formData.get("priority") ?? "");
  return performUpdate(prevState, ticketId, { priority });
}

export type CommentFormState = {
  status: "idle" | "error" | "success";
  error: string | null;
};

export async function createCommentAction(
  _prevState: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const ticketId = String(formData.get("ticketId") ?? "");
  const content = String(formData.get("content") ?? "");

  try {
    await createComment({ ticketId, content });
  } catch (error) {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      return { status: "error", error: error.message };
    }
    throw error;
  }

  revalidatePath(`/tickets/${ticketId}`);
  return { status: "success", error: null };
}
