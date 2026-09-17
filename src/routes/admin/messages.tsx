import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MailOpen, Reply, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

const MOCK_MESSAGES: Array<{
  id: number;
  from: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  category: string;
}> = [];

const CATEGORY_COLORS: Record<string, string> = {
  partnership: "bg-purple-100 text-purple-700",
  speaking: "bg-blue-100 text-blue-700",
  registration: "bg-green-100 text-green-700",
  exhibition: "bg-orange-100 text-orange-700",
  media: "bg-pink-100 text-pink-700",
  general: "bg-gray-100 text-gray-700",
};

function AdminMessages() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered = messages.filter((m) => {
    if (filter === "unread") return !m.read;
    if (filter === "read") return m.read;
    return true;
  });

  const markRead = (id: number) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
    setSelected(id);
  };

  const selectedMessage = messages.find((m) => m.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-extrabold">Messages</h1>
        <p className="mt-1 text-muted-foreground">
          View and respond to enquiries from delegates, speakers and partners.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {["all", "unread", "read"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "border border-input text-muted-foreground hover:bg-secondary"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Message List */}
        <div className="lg:col-span-5 rounded-lg border border-border bg-card divide-y divide-border">
          {filtered.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">No messages found.</div>
          )}
          {filtered.map((msg) => (
            <button
              key={msg.id}
              type="button"
              onClick={() => markRead(msg.id)}
              className={`w-full p-4 text-left transition-colors hover:bg-muted/50 ${
                selected === msg.id ? "bg-muted" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {msg.read ? (
                    <MailOpen className="size-4 text-muted-foreground" />
                  ) : (
                    <Mail className="size-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`text-sm font-semibold ${!msg.read ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {msg.from}
                    </p>
                    <span className="text-xs text-muted-foreground shrink-0">{msg.date}</span>
                  </div>
                  <p className="mt-0.5 text-sm font-medium truncate">{msg.subject}</p>
                  <p className="mt-1 text-xs text-muted-foreground truncate">{msg.message}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    From
                  </p>
                  <p className="mt-1 font-display text-lg font-bold">{selectedMessage.from}</p>
                  <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    className="grid size-8 place-items-center rounded-md border border-input text-muted-foreground transition-colors hover:bg-secondary"
                    title="Reply"
                  >
                    <Reply className="size-3.5" />
                  </button>
                  <button
                    className="grid size-8 place-items-center rounded-md border border-input text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <h3 className="font-display text-base font-bold">{selectedMessage.subject}</h3>
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${CATEGORY_COLORS[selectedMessage.category]}`}
                >
                  {selectedMessage.category}
                </span>
              </div>

              <div className="mt-4 rounded-md bg-muted/50 p-4">
                <p className="leading-relaxed text-muted-foreground">{selectedMessage.message}</p>
              </div>

              <div className="mt-6">
                <label className="block font-display text-sm font-semibold">Reply</label>
                <textarea
                  rows={4}
                  placeholder="Type your reply..."
                  className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
                <div className="mt-3 flex justify-end">
                  <button className="rounded-md bg-primary px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border border-border border-dashed bg-card">
              <p className="text-muted-foreground">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
