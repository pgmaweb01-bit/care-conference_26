import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Mic2, Handshake, Mail, TrendingUp, Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const STATS = [
  {
    label: "Total Registrations",
    value: "347",
    change: "+12 today",
    icon: Users,
    color: "text-primary",
  },
  {
    label: "Speakers Confirmed",
    value: "8",
    change: "All confirmed",
    icon: Mic2,
    color: "text-green-600",
  },
  { label: "Partners", value: "14", change: "3 pending", icon: Handshake, color: "text-accent" },
  { label: "Messages", value: "23", change: "5 unread", icon: Mail, color: "text-blue-600" },
];

const RECENT_REGISTRATIONS = [
  {
    name: "Chioma Adekunle",
    email: "chioma@healthng.org",
    type: "Professional",
    date: "15 Sep 2026",
  },
  {
    name: "Dr. Yusuf Bello",
    email: "yusuf.bello@lagos.gov",
    type: "Institutional",
    date: "14 Sep 2026",
  },
  { name: "Fatima Hassan", email: "fatima.h@unilag.edu.ng", type: "Student", date: "14 Sep 2026" },
  { name: "Emeka Obi", email: "emeka@careconnect.ng", type: "Standard", date: "13 Sep 2026" },
  {
    name: "Amina Yusuf",
    email: "amina@bridgehealth.org",
    type: "Professional",
    date: "13 Sep 2026",
  },
  { name: "Oluwaseun Coker", email: "seun@techcare.io", type: "Standard", date: "12 Sep 2026" },
];

const REGISTRATIONS_BY_TYPE = [
  { type: "Standard", count: 198, percentage: 57 },
  { type: "Professional", count: 89, percentage: 26 },
  { type: "Institutional", count: 35, percentage: 10 },
  { type: "Student", count: 25, percentage: 7 },
];

const UPCOMING_TASKS = [
  { task: "Confirm final speaker lineup", due: "20 Sep 2026", priority: "high" },
  { task: "Send partner confirmations", due: "18 Sep 2026", priority: "high" },
  { task: "Finalize CareSouk floor plan", due: "25 Sep 2026", priority: "medium" },
  { task: "Review conference programme", due: "22 Sep 2026", priority: "medium" },
  { task: "Send delegate welcome emails", due: "1 Nov 2026", priority: "low" },
];

function AdminDashboard() {
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
          <div className="mt-6 space-y-4">
            {REGISTRATIONS_BY_TYPE.map((item) => (
              <div key={item.type}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.type}</span>
                  <span className="text-muted-foreground">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
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
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Email</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_REGISTRATIONS.map((reg, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="py-3 pr-4 font-display font-semibold">{reg.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{reg.email}</td>
                    <td className="py-3 pr-4">
                      <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {reg.type}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{reg.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Upcoming Tasks */}
        <div className="lg:col-span-6 rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">Upcoming Tasks</h2>
          <div className="mt-5 space-y-3">
            {UPCOMING_TASKS.map((task, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-md border border-border/50 p-3"
              >
                <span
                  className={`mt-0.5 size-2 rounded-full shrink-0 ${
                    task.priority === "high"
                      ? "bg-red-500"
                      : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{task.task}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Due: {task.due}</p>
                </div>
                <span className="text-xs font-semibold text-muted-foreground capitalize">
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-6 rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">Conference Countdown</h2>
          <div className="mt-5 flex items-center gap-6">
            <div className="rounded-lg bg-primary/10 p-6 text-center">
              <p className="font-display text-5xl font-extrabold text-primary">65</p>
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
                <span>347 / 500 delegates</span>
              </div>
              <div className="mt-2 h-2 w-40 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: "69.4%" }} />
              </div>
              <p className="text-xs text-muted-foreground">69.4% capacity reached</p>
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
