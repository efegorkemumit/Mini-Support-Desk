"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createTicket } from "@/lib/tickets";
import { ValidationError } from "@/lib/errors";
import { PRIORITIES, isPriority } from "@/lib/types";

export type NewTicketFormState = {
  error: string | null;
  fieldErrors: {
    title?: string;
    description?: string;
    priority?: string;
  };
  values: {
    title: string;
    description: string;
    priority: string;
  };
};

export async function createTicketAction(
  _prevState: NewTicketFormState,
  formData: FormData,
): Promise<NewTicketFormState> {
  const title = String(formData.get("title") ?? "");
  const description = String(formData.get("description") ?? "");
  const priority = String(formData.get("priority") ?? "");
  const values = { title, description, priority };

  const fieldErrors: NewTicketFormState["fieldErrors"] = {};
  if (!title.trim()) fieldErrors.title = "Title is required.";
  if (!description.trim()) fieldErrors.description = "Description is required.";
  if (!isPriority(priority)) {
    fieldErrors.priority = `Priority must be one of: ${PRIORITIES.join(", ")}.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { error: null, fieldErrors, values };
  }

  let ticketId: string;
  try {
    const ticket = await createTicket({ title, description, priority });
    ticketId = ticket.id;
  } catch (error) {
    if (error instanceof ValidationError) {
      return { error: error.message, fieldErrors: {}, values };
    }
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/tickets");
  redirect(`/tickets/${ticketId}`);
}
