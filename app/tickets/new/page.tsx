import NewTicketForm from "./NewTicketForm";

export default function NewTicketPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">New Ticket</h1>
        <p className="mt-1 text-sm text-zinc-600">Submit a new support request.</p>
      </div>
      <div className="max-w-xl rounded-lg border border-zinc-200 bg-white p-6">
        <NewTicketForm />
      </div>
    </div>
  );
}
