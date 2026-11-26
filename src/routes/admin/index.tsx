import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Users,
  Mic2,
  Handshake,
  Mail,
  TrendingUp,
  Calendar,
  ArrowRight,
  Images,
  Download,
  Award,
} from "lucide-react";
import { saveRegistrationStatus, useRegistrationStatus } from "@/lib/registration";
import { getAuthHeader } from "@/lib/auth";

type PhotoAccessRow = {
  email: string;
  access_count: number;
  first_accessed_at: string;
  last_accessed_at: string;
};

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date("2026-11-19").getTime() - Date.now()) / 86400000),
  );
  const [stats, setStats] = useState({ total: 0, confirmed: 0, checkedIn: 0, speakers: 0 });
  const [recentRegs, setRecentRegs] = useState<
    Array<{
      registration_id: string;
      full_name: string;
      organisation: string;
      created_at: string;
      type: string;
    }>
  >([]);
  const registrationStatus = useRegistrationStatus();
  const [toggling, setToggling] = useState(false);
  const [toggleError, setToggleError] = useState("");
  const [photoAccess, setPhotoAccess] = useState<PhotoAccessRow[]>([]);
  const [certStats, setCertStats] = useState({ total: 0, sent: 0, remaining: 0 });
  const [certBusy, setCertBusy] = useState(false);
  const [certMessage, setCertMessage] = useState("");

  async function handleToggleRegistration() {
    if (!registrationStatus.loaded || toggling) return;
    setToggling(true);
    setToggleError("");
    try {
      await saveRegistrationStatus(!registrationStatus.open);
    } catch {
      setToggleError("Couldn't update registration status. Check the connection and try again.");
    } finally {
      setToggling(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, regsRes] = await Promise.all([
          fetch("/api/registrations/stats"),
          fetch("/api/registrations"),
        ]);
        if (statsRes.ok) setStats(await statsRes.json());
        if (regsRes.ok) {
          const regs = await regsRes.json();
          setRecentRegs(regs.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
      try {
        const accessRes = await fetch("/api/photo-access", {
          headers: { "x-admin-auth": getAuthHeader() },
        });
        if (accessRes.ok) setPhotoAccess(await accessRes.json());
      } catch (err) {
        console.error("Failed to fetch photo access:", err);
      }
      try {
        const certRes = await fetch("/api/certificates", {
          headers: { "x-admin-auth": getAuthHeader() },
        });
        if (certRes.ok) {
          const cert = await certRes.json();
          setCertStats(cert.stats);
        }
      } catch (err) {
        console.error("Failed to fetch certificate status:", err);
      }
    }
    fetchData();
  }, []);

  async function runCertificates(confirm: boolean, limit: number) {
    if (certBusy) return;
    setCertBusy(true);
    setCertMessage("");
    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-auth": getAuthHeader(),
        },
        body: JSON.stringify({ confirm, limit }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setCertStats(data.stats);
      setCertMessage(
        confirm
          ? `${data.sent} of ${data.attempted} certificates sent successfully.`
          : `Previewed ${data.attempted} certificates — no emails were sent.`,
      );
    } catch (err) {
      setCertMessage(err instanceof Error ? err.message : "Request failed");
    } finally {
      setCertBusy(false);
    }
  }

  function exportPhotoAccessCsv() {
    const escape = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const header = ["Email", "Opens", "First Access", "Last Access"].join(",");
    const lines = photoAccess.map((row) =>
      [
        escape(row.email),
        escape(row.access_count),
        escape(new Date(row.first_accessed_at).toLocaleString("en-GB")),
        escape(new Date(row.last_accessed_at).toLocaleString("en-GB")),
      ].join(","),
    );
    const csv = [header, ...lines].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `photo-access-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const STATS = [
    {
      label: "Total Registrations",
      value: String(stats.total),
      change: stats.total === 0 ? "No registrations yet" : `${stats.confirmed} confirmed`,
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Speakers Confirmed",
      value: String(stats.speakers),
      change: stats.speakers === 0 ? "No speakers added" : `${stats.speakers} speakers`,
      icon: Mic2,
      color: "text-green-600",
    },
    {
      label: "Partners",
      value: "0",
      change: "No partners yet",
      icon: Handshake,
      color: "text-accent",
    },
    {
      label: "Checked In",
      value: String(stats.checkedIn),
      change: stats.checkedIn === 0 ? "None yet" : `${stats.checkedIn} checked in`,
      icon: Mail,
      color: "text-blue-600",
    },
  ];

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

      {/* Registration open/close toggle */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-display text-lg font-bold">Registration</h2>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  registrationStatus.loaded && registrationStatus.open
                    ? "bg-green-100 text-green-700"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    registrationStatus.loaded && registrationStatus.open
                      ? "bg-green-600"
                      : "bg-muted-foreground/50"
                  }`}
                />
                {!registrationStatus.loaded ? "…" : registrationStatus.open ? "Open" : "Closed"}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {!registrationStatus.loaded
                ? "Checking current status…"
                : registrationStatus.open
                  ? "The registration form is live — new sign-ups are accepted."
                  : "The registration form is closed — new sign-ups are blocked."}
            </p>
            {toggleError && <p className="mt-1 text-xs font-medium text-red-600">{toggleError}</p>}
          </div>
          <button
            type="button"
            onClick={handleToggleRegistration}
            disabled={!registrationStatus.loaded || toggling}
            className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {toggling
              ? "Saving…"
              : registrationStatus.open
                ? "Close Registration"
                : "Open Registration"}
          </button>
        </div>
      </div>

      {/* Photo gallery access log */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Images className="size-5 text-primary" />
            <div>
              <h2 className="font-display text-lg font-bold">Photo Gallery Access</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Emails that unlocked the <code className="text-xs">/photos</code> gallery —{" "}
                {photoAccess.length} {photoAccess.length === 1 ? "email" : "emails"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={exportPhotoAccessCsv}
            disabled={photoAccess.length === 0}
            className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="size-3.5" />
            Export CSV
          </button>
        </div>
        {photoAccess.length === 0 ? (
          <div className="mt-4 flex items-center justify-center rounded-lg border border-dashed border-border py-6 text-sm text-muted-foreground">
            No gallery accesses yet
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {photoAccess.map((row) => (
              <div
                key={row.email}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/50 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-semibold">{row.email}</p>
                  <p className="text-xs text-muted-foreground">
                    First:{" "}
                    {new Date(row.first_accessed_at).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {row.access_count} {row.access_count === 1 ? "open" : "opens"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Last:{" "}
                    {new Date(row.last_accessed_at).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate delivery */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Award className="size-5 text-primary" />
            <div>
              <h2 className="font-display text-lg font-bold">Certificates</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Personalized PDFs for the confirmed participant list
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full bg-secondary px-3 py-1 font-semibold">
              {certStats.total} recipients
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
              {certStats.sent} sent
            </span>
            <span className="text-muted-foreground">{certStats.remaining} pending</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void runCertificates(false, 2)}
            disabled={certBusy}
            className="rounded-md border border-input px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            Preview 2 (no email)
          </button>
          <button
            type="button"
            onClick={() => void runCertificates(true, 25)}
            disabled={certBusy || certStats.remaining === 0}
            className="rounded-md bg-primary px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {certBusy ? "Sending…" : "Send next 25"}
          </button>
          {certMessage && (
            <span className="text-xs text-muted-foreground" role="status">
              {certMessage}
            </span>
          )}
        </div>
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
          <div className="mt-4 space-y-3">
            {["attendee", "speaker"].map((t) => {
              const count = recentRegs.filter((r) => r.type === t).length;
              return (
                <div key={t} className="flex items-center justify-between text-sm">
                  <span className="capitalize text-muted-foreground">{t}s</span>
                  <span className="font-semibold">{count}</span>
                </div>
              );
            })}
            {recentRegs.length === 0 && (
              <div className="flex items-center justify-center py-4 text-sm text-muted-foreground">
                No registrations yet
              </div>
            )}
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
          {recentRegs.length === 0 ? (
            <div className="mt-6 flex items-center justify-center py-8 text-sm text-muted-foreground">
              No registrations yet
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {recentRegs.map((reg) => (
                <div
                  key={reg.registration_id}
                  className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3"
                >
                  <div>
                    <p className="font-display text-sm font-semibold">{reg.full_name}</p>
                    <p className="text-xs text-muted-foreground">{reg.organisation || "—"}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary capitalize">
                      {reg.type}
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(reg.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
                <span>{stats.total} / 500 delegates</span>
              </div>
              <div className="mt-2 h-2 w-40 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.min(100, (stats.total / 500) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.total / 500) * 100)}% capacity reached
              </p>
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
