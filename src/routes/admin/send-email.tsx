import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SendHorizontal, FlaskConical, Users } from "lucide-react";
import { ADMIN_EMAIL, getAuthHeader } from "@/lib/auth";
import { broadcastEmailHTML, textToHtml } from "@/lib/email-template";

export const Route = createFileRoute("/admin/send-email")({
  component: AdminSendEmail,
});

interface Registration {
  registration_id: string;
  full_name: string;
  email: string;
  type: string;
  status: string;
}

interface PitchApplication {
  application_id: string;
  full_name: string;
  email: string;
}

interface Recipient {
  email: string;
  fullName: string;
  registrationId?: string;
}

const AUDIENCES = [
  { value: "all", label: "All registrations" },
  { value: "attendees", label: "Attendees only" },
  { value: "speakers", label: "Speakers only" },
  { value: "confirmed", label: "Confirmed registrations" },
  { value: "pitch", label: "Pitch & Demo applicants" },
] as const;

function AdminSendEmail() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [pitchApplications, setPitchApplications] = useState<PitchApplication[]>([]);
  const [audience, setAudience] = useState<string>("all");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState<"bulk" | "test" | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [regsRes, pitchRes] = await Promise.all([
          fetch("/api/registrations"),
          fetch("/api/pitch-applications"),
        ]);
        if (regsRes.ok) setRegistrations(await regsRes.json());
        if (pitchRes.ok) setPitchApplications(await pitchRes.json());
      } catch (err) {
        console.error("Failed to fetch recipients:", err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const recipients = useMemo(() => {
    let list: Recipient[];
    if (audience === "pitch") {
      list = pitchApplications.map((p) => ({
        email: p.email,
        fullName: p.full_name,
        registrationId: p.application_id,
      }));
    } else {
      list = registrations
        .filter((r) => {
          if (audience === "attendees") return r.type === "attendee";
          if (audience === "speakers") return r.type === "speaker";
          if (audience === "confirmed") return r.status === "Confirmed";
          return true;
        })
        .map((r) => ({
          email: r.email,
          fullName: r.full_name,
          registrationId: r.registration_id,
        }));
    }
    const seen = new Set<string>();
    return list.filter((r) => {
      const email = r.email.trim().toLowerCase();
      if (!email || seen.has(email)) return false;
      seen.add(email);
      return true;
    });
  }, [audience, registrations, pitchApplications]);

  const sample = recipients[0];
  const previewHtml = useMemo(
    () =>
      broadcastEmailHTML({
        subject: subject.trim() || "Reminder: The Care Conference 2026",
        fullName: sample?.fullName || "Delegate",
        bodyHtml: textToHtml(
          message.trim() ||
            "Your message will appear here. Start typing on the left to see a live preview of the email your recipients will receive.",
        ),
      }),
    [subject, message, sample],
  );

  const canSend =
    Boolean(subject.trim() && message.trim() && recipients.length > 0) && sending === null;

  async function handleSend(list: Recipient[], mode: "bulk" | "test") {
    if (mode === "bulk" && !canSend) return;
    setSending(mode);
    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-auth": getAuthHeader(),
        },
        body: JSON.stringify({ recipients: list, subject, message }),
      });
      const data = await res.json();
      if (data.success) {
        const count = data.sent as number;
        setToast({
          message:
            mode === "test"
              ? `Test email sent to ${ADMIN_EMAIL}`
              : `${count} email${count === 1 ? "" : "s"} sent successfully`,
          type: "success",
        });
        if (mode === "bulk") {
          setSubject("");
          setMessage("");
        }
      } else {
        setToast({
          message:
            data.error ||
            (data.failed
              ? `Partially sent: ${data.sent} delivered, ${data.failed} failed`
              : "Failed to send email"),
          type: "error",
        });
      }
    } catch {
      setToast({ message: "Failed to send email", type: "error" });
    } finally {
      setSending(null);
    }
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`fixed right-4 top-4 z-50 rounded-lg px-4 py-3 text-sm font-semibold shadow-lg ${
            toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div>
        <h1 className="font-display text-3xl font-extrabold">Send Email</h1>
        <p className="mt-1 text-muted-foreground">
          Compose and send reminders to delegates, speakers and applicants.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Compose */}
        <div className="space-y-5 rounded-lg border border-border bg-card p-6 lg:col-span-7">
          <div>
            <label htmlFor="audience" className="block font-display text-sm font-semibold">
              Recipients
            </label>
            <div className="mt-2 flex items-center gap-3">
              <select
                id="audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="flex-1 rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                {AUDIENCES.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                <Users className="size-3.5" />
                {recipients.length}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block font-display text-sm font-semibold">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              maxLength={200}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Reminder: Care Conference 2026 is 2 weeks away"
              className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-display text-sm font-semibold">
              Message
            </label>
            <textarea
              id="message"
              rows={10}
              maxLength={10000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                "Hi {{firstName}},\n\nThis is a friendly reminder that The Care Conference 2026 takes place on 19 November 2026 at IALA Hub, Lagos.\n\nWe look forward to seeing you there."
              }
              className="mt-2 w-full resize-y rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Personalise with {"{{firstName}}"}, {"{{fullName}}"} or {"{{registrationId}}"}. Leave
              a blank line between paragraphs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
            <button
              type="button"
              disabled={!canSend}
              onClick={() => handleSend(recipients, "bulk")}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <SendHorizontal className="size-3.5" />
              {sending === "bulk"
                ? "Sending…"
                : `Send to ${recipients.length} recipient${recipients.length === 1 ? "" : "s"}`}
            </button>
            <button
              type="button"
              disabled={sending !== null || !subject.trim() || !message.trim()}
              onClick={() => handleSend([{ email: ADMIN_EMAIL, fullName: "Admin" }], "test")}
              className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FlaskConical className="size-3.5" />
              {sending === "test" ? "Sending…" : "Send test to me"}
            </button>
          </div>
        </div>

        {/* Recipients + Preview */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-display text-base font-bold">Recipients</h2>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {recipients.length} total
              </span>
            </div>
            <div className="max-h-64 divide-y divide-border overflow-y-auto">
              {recipients.length === 0 && (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  No recipients in this audience yet.
                </div>
              )}
              {recipients.map((r) => (
                <div key={r.email} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{r.fullName}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.email}</p>
                  </div>
                  {r.registrationId && (
                    <span className="shrink-0 font-mono text-[10px] tracking-wider text-muted-foreground">
                      {r.registrationId}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-display text-base font-bold">Preview</h2>
            </div>
            <div className="p-4">
              <iframe
                title="Email preview"
                srcDoc={previewHtml}
                className="h-96 w-full rounded-md border border-border bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
