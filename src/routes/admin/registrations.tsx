import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Download, Filter, CheckCircle, Mail } from "lucide-react";

interface Registration {
  id: number;
  registration_id: string;
  full_name: string;
  email: string;
  phone: string;
  organisation: string;
  type: string;
  status: string;
  checked_in: boolean;
  created_at: string;
}

export const Route = createFileRoute("/admin/registrations")({
  component: AdminRegistrations,
});

function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [resending, setResending] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/registrations");
        if (res.ok) setRegistrations(await res.json());
      } catch (err) {
        console.error("Failed to fetch registrations:", err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const filtered = registrations.filter((r) => {
    const matchSearch =
      r.full_name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.organisation.toLowerCase().includes(search.toLowerCase()) ||
      r.registration_id.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || r.type === filterType;
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  function handleExport() {
    const headers = ["Reg ID", "Name", "Email", "Phone", "Organisation", "Type", "Status", "Checked In", "Date"];
    const rows = filtered.map((r) => [r.registration_id, r.full_name, r.email, r.phone, r.organisation, r.type, r.status, r.checked_in ? "Yes" : "No", new Date(r.created_at).toLocaleDateString("en-GB")]);
    const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  async function handleResendEmail(registrationId: string) {
    setResending(registrationId);
    try {
      const res = await fetch("/api/registrations/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId }),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ message: `Email sent successfully to ${registrationId}`, type: "success" });
      } else {
        setToast({ message: data.error || "Failed to send email", type: "error" });
      }
    } catch {
      setToast({ message: "Failed to send email", type: "error" });
    } finally {
      setResending(null);
    }
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed right-4 top-4 z-50 rounded-lg px-4 py-3 text-sm font-semibold shadow-lg ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {toast.message}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Registrations</h1>
          <p className="mt-1 text-muted-foreground">Manage conference delegate registrations.</p>
        </div>
        <button onClick={handleExport} className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-secondary">
          <Download className="size-3.5" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search registrations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-input bg-background pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Types</option>
            <option value="Standard">Standard</option>
            <option value="Professional">Professional</option>
            <option value="Institutional">Institutional</option>
            <option value="Student">Student</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="p-4">Reg. ID</th>
              <th className="p-4">Name</th>
              <th className="p-4 hidden md:table-cell">Organisation</th>
              <th className="p-4">Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">Check-In</th>
              <th className="p-4 hidden lg:table-cell">Date</th>
              <th className="p-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((reg) => (
              <tr
                key={reg.id}
                className="border-b border-border/50 last:border-0 hover:bg-muted/50"
              >
                <td className="p-4">
                  <span className="font-mono text-xs font-semibold">{reg.registration_id}</span>
                </td>
                <td className="p-4 font-display font-semibold">{reg.full_name}</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">
                  {reg.organisation}
                </td>
                <td className="p-4">
                  <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {reg.type}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      reg.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : reg.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {reg.status}
                  </span>
                </td>
                <td className="p-4">
                  {reg.checked_in ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                      <CheckCircle className="size-3" />
                      In
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Pending</span>
                  )}
                </td>
                <td className="p-4 text-muted-foreground hidden lg:table-cell">{new Date(reg.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleResendEmail(reg.registration_id)}
                    disabled={resending === reg.registration_id}
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
                    title="Resend confirmation email"
                  >
                    <Mail className={`size-3 ${resending === reg.registration_id ? "animate-pulse" : ""}`} />
                    {resending === reg.registration_id ? "Sending..." : "Resend"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">No registrations found.</div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {registrations.length} registrations
      </p>
    </div>
  );
}
