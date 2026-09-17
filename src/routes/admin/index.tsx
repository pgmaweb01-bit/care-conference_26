import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Mic2, Handshake, Mail, TrendingUp, Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const STATS = [
  {
    label: "Total Registrations",
    value: "0",
    change: "No registrations yet",
    icon: Users,
    color: "text-primary",
  },
  {
    label: "Speakers Confirmed",
    value: "0",
    change: "No speakers added",
    icon: Mic2,
    color: "text-green-600",
  },
  { label: "Partners", value: "0", change: "No partners yet", icon: Handshake, color: "text-accent" },
  { label: "Messages", value: "0", change: "No messages", icon: Mail, color: "text-blue-600" },
];

function AdminDashboard() {
  const daysLeft = Math.max(0, Math.ceil((new Date("2026-11-19").getTime() - Date.now()) / 86400000));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back. Here's an overview of the Care Conference 2026.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <stat.icon className={`size-4 ${stat.color}`} />
            </div>
            <p className="mt-2 font-display text-3xl font-extrabold">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Registrations by Type */}
        <div className="lg:col-span-4 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Registrations by Type</h2>
            <Link
              to="/admin/registrations"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center py-8 text-sm text-muted-foreground">
            No registrations yet
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="lg:col-span-8 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Recent Registrations</h2>
            <Link
              to="/admin/registrations"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              View all <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center py-8 text-sm text-muted-foreground">
            No registrations yet
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Upcoming Tasks */}
        <div className="lg:col-span-6 rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">Upcoming Tasks</h2>
          <div className="mt-5 flex items-center justify-center py-8 text-sm text-muted-foreground">
            No tasks yet
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-6 rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">Conference Countdown</h2>
          <div className="mt-5 flex items-center gap-6">
            <div className="rounded-lg bg-primary/10 p-6 text-center">
              <p className="font-display text-5xl font-extrabold text-primary">{daysLeft}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary/70">
                Days Left
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span>19 November 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-muted-foreground" />
                <span>0 / 500 delegates</span>
              </div>
              <div className="mt-2 h-2 w-40 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: "0%" }} />
              </div>
              <p className="text-xs text-muted-foreground">0% capacity reached</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Quick Actions
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                to="/admin/registrations"
                className="rounded-md border border-border px-3 py-2 text-center text-xs font-semibold transition-colors hover:bg-secondary"
              >
                View Registrations
              </Link>
              <Link
                to="/admin/speakers"
                className="rounded-md border border-border px-3 py-2 text-center text-xs font-semibold transition-colors hover:bg-secondary"
              >
                Manage Speakers
              </Link>
              <Link
                to="/admin/partners"
                className="rounded-md border border-border px-3 py-2 text-center text-xs font-semibold transition-colors hover:bg-secondary"
              >
                View Partners
              </Link>
              <Link
                to="/admin/messages"
                className="rounded-md border border-border px-3 py-2 text-center text-xs font-semibold transition-colors hover:bg-secondary"
              >
                Check Messages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
