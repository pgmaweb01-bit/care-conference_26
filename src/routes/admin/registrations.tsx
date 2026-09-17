import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Download, Filter, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/admin/registrations")({
  component: AdminRegistrations,
});

const MOCK_REGISTRATIONS: Array<{
  id: number;
  registrationId: string;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  type: string;
  status: string;
  checkedIn: boolean;
  date: string;
}> = [];

function AdminRegistrations() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = MOCK_REGISTRATIONS.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.organisation.toLowerCase().includes(search.toLowerCase()) ||
      r.registrationId.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || r.type === filterType;
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Registrations</h1>
          <p className="mt-1 text-muted-foreground">Manage conference delegate registrations.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-secondary">
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
            </tr>
          </thead>
          <tbody>
            {filtered.map((reg) => (
              <tr
                key={reg.id}
                className="border-b border-border/50 last:border-0 hover:bg-muted/50"
              >
                <td className="p-4">
                  <span className="font-mono text-xs font-semibold">{reg.registrationId}</span>
                </td>
                <td className="p-4 font-display font-semibold">{reg.name}</td>
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
                  {reg.checkedIn ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                      <CheckCircle className="size-3" />
                      In
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Pending</span>
                  )}
                </td>
                <td className="p-4 text-muted-foreground hidden lg:table-cell">{reg.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">No registrations found.</div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {MOCK_REGISTRATIONS.length} registrations
      </p>
    </div>
  );
}
