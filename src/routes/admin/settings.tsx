import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    eventName: "The Care Conference 2026",
    eventDate: "2026-11-19",
    eventTime: "08:00",
    venue: "IALA Hub, The Chair Centre, Lagos",
    maxCapacity: "500",
    registrationEnabled: "true",
    emailNotifications: "true",
    autoConfirm: "false",
    organiserEmail: "info@careconference.ng",
    supportEmail: "support@careconference.ng",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-3xl font-extrabold">Settings</h1>
        <p className="mt-1 text-muted-foreground">Configure conference settings and preferences.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Event Details */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">Event Details</h2>
          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-sm font-semibold">Event Name</label>
              <input
                type="text"
                value={settings.eventName}
                onChange={(e) => setSettings((p) => ({ ...p, eventName: e.target.value }))}
                className="mt-2 w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold">Date</label>
                <input
                  type="date"
                  value={settings.eventDate}
                  onChange={(e) => setSettings((p) => ({ ...p, eventDate: e.target.value }))}
                  className="mt-2 w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">Start Time</label>
                <input
                  type="time"
                  value={settings.eventTime}
                  onChange={(e) => setSettings((p) => ({ ...p, eventTime: e.target.value }))}
                  className="mt-2 w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold">Venue</label>
              <input
                type="text"
                value={settings.venue}
                onChange={(e) => setSettings((p) => ({ ...p, venue: e.target.value }))}
                className="mt-2 w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Registration Settings */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">Registration</h2>
          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-sm font-semibold">Max Capacity</label>
              <input
                type="number"
                value={settings.maxCapacity}
                onChange={(e) => setSettings((p) => ({ ...p, maxCapacity: e.target.value }))}
                className="mt-2 w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex items-center justify-between rounded-md border border-border p-4">
              <div>
                <p className="text-sm font-semibold">Enable Online Registration</p>
                <p className="text-xs text-muted-foreground">
                  Allow new delegates to register via the website
                </p>
              </div>
              <select
                value={settings.registrationEnabled}
                onChange={(e) =>
                  setSettings((p) => ({ ...p, registrationEnabled: e.target.value }))
                }
                className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
              </select>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border p-4">
              <div>
                <p className="text-sm font-semibold">Auto-Confirm Registrations</p>
                <p className="text-xs text-muted-foreground">
                  Automatically confirm new registrations without manual approval
                </p>
              </div>
              <select
                value={settings.autoConfirm}
                onChange={(e) => setSettings((p) => ({ ...p, autoConfirm: e.target.value }))}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">Notifications</h2>
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between rounded-md border border-border p-4">
              <div>
                <p className="text-sm font-semibold">Email Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Receive email alerts for new registrations and enquiries
                </p>
              </div>
              <select
                value={settings.emailNotifications}
                onChange={(e) => setSettings((p) => ({ ...p, emailNotifications: e.target.value }))}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold">Organiser Email</label>
              <input
                type="email"
                value={settings.organiserEmail}
                onChange={(e) => setSettings((p) => ({ ...p, organiserEmail: e.target.value }))}
                className="mt-2 w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings((p) => ({ ...p, supportEmail: e.target.value }))}
                className="mt-2 w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Save className="size-4" />
            Save Settings
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600">
              <CheckCircle className="size-4" /> Settings saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
