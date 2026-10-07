import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Search,
  Download,
  Filter,
  CheckCircle,
  Mail,
  LayoutList,
  Contact,
  Trash2,
} from "lucide-react";
import { getAuthHeader } from "@/lib/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Registration {
  id: number;
  registration_id: string;
  full_name: string;
  email: string;
  phone: string;
  organisation: string;
  type: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  profession: string;
  position: string;
  side_room1: string;
  side_room2: string;
  category: string;
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
  const [view, setView] = useState<"table" | "details">("table");
  const [resending, setResending] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Registration | null>(null);
  const [deleting, setDeleting] = useState(false);
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
    const headers = [
      "Reg ID",
      "Name",
      "Email",
      "Phone",
      "Organisation",
      "Type",
      "Gender",
      "Country",
      "State",
      "City",
      "Profession",
      "Position",
      "Side Room 1",
      "Side Room 2",
      "Sector",
      "Status",
      "Checked In",
      "Date",
    ];
    const rows = filtered.map((r) => [
      r.registration_id,
      r.full_name,
      r.email,
      r.phone,
      r.organisation,
      r.type,
      r.gender,
      r.country,
      r.state,
      r.city,
      r.profession,
      r.position,
      r.side_room1,
      r.side_room2,
      r.category,
      r.status,
      r.checked_in ? "Yes" : "No",
      new Date(r.created_at).toLocaleDateString("en-GB"),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
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

  async function handleDelete() {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/registrations/${confirmDelete.registration_id}`, {
        method: "DELETE",
        headers: { "x-admin-auth": getAuthHeader() },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const deleted = confirmDelete;
        setRegistrations((prev) =>
          prev.filter((r) => r.registration_id !== deleted.registration_id),
        );
        setConfirmDelete(null);
        setToast({
          message: `Deleted ${deleted.full_name} (${deleted.registration_id})`,
          type: "success",
        });
      } else {
        setToast({ message: data.error || "Failed to delete registration", type: "error" });
      }
    } catch {
      setToast({ message: "Failed to delete registration", type: "error" });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`fixed right-4 top-4 z-50 rounded-lg px-4 py-3 text-sm font-semibold shadow-lg ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
        >
          {toast.message}
        </div>
      )}

      <AlertDialog
        open={confirmDelete !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) setConfirmDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this registration?</AlertDialogTitle>
            <AlertDialogDescription>
              You're about to permanently delete <strong>{confirmDelete?.full_name}</strong>{" "}
              <span className="font-mono">({confirmDelete?.registration_id})</span>. This will
              remove their record and QR check-in from the system. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Yes, delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Registrations</h1>
          <p className="mt-1 text-muted-foreground">Manage conference delegate registrations.</p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-secondary"
        >
          <Download className="size-3.5" />
          Export CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="inline-flex rounded-lg border border-input bg-card p-1">
        <button
          onClick={() => setView("table")}
          className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
            view === "table"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <LayoutList className="size-4" />
          Table
        </button>
        <button
          onClick={() => setView("details")}
          className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
            view === "details"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Contact className="size-4" />
          Full Details
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

      {view === "table" ? (
        /* Table view */
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
                <th className="p-4">Actions</th>
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
                  <td className="p-4 text-muted-foreground hidden lg:table-cell">
                    {new Date(reg.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleResendEmail(reg.registration_id)}
                        disabled={resending === reg.registration_id}
                        className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
                        title="Resend confirmation email"
                      >
                        <Mail
                          className={`size-3 ${resending === reg.registration_id ? "animate-pulse" : ""}`}
                        />
                        {resending === reg.registration_id ? "Sending..." : "Resend"}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(reg)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-input px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                        title="Delete registration"
                      >
                        <Trash2 className="size-3" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">No registrations found.</div>
          )}
        </div>
      ) : (
        /* Full details view */
        <div className="grid gap-5 xl:grid-cols-2">
          {filtered.map((reg) => (
            <DetailCard
              key={reg.id}
              reg={reg}
              resending={resending === reg.registration_id}
              onResend={() => handleResendEmail(reg.registration_id)}
              onDelete={() => setConfirmDelete(reg)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground xl:col-span-2">
              No registrations found.
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {registrations.length} registrations
      </p>
    </div>
  );
}

function DetailCard({
  reg,
  resending,
  onResend,
  onDelete,
}: {
  reg: Registration;
  resending: boolean;
  onResend: () => void;
  onDelete: () => void;
}) {
  const fields: Array<[string, string | undefined]> = [
    ["Registration ID", reg.registration_id],
    ["Full name", reg.full_name],
    ["Email", reg.email],
    ["Phone", reg.phone],
    ["Organisation", reg.organisation],
    ["Type", reg.type],
    ["Gender", reg.gender],
    ["Country", reg.country],
    ["State", reg.state],
    ["City", reg.city],
    ["Profession", reg.profession],
    ["Position / Role", reg.position],
    ["Side room, first choice", reg.side_room1],
    ["Side room, second choice", reg.side_room2],
    ["Sector", reg.category],
    ["Status", reg.status],
    ["Checked in", reg.checked_in ? "Yes" : "No"],
    [
      "Registered on",
      new Date(reg.created_at).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    ],
  ];

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base font-bold">{reg.full_name}</h3>
            <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
              {reg.type}
            </span>
          </div>
          <p className="mt-0.5 font-mono text-xs text-muted-foreground">{reg.registration_id}</p>
        </div>
        <div className="flex items-center gap-2">
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
          <button
            onClick={onResend}
            disabled={resending}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
            title="Resend confirmation email"
          >
            <Mail className={`size-3 ${resending ? "animate-pulse" : ""}`} />
            {resending ? "Sending..." : "Resend"}
          </button>
          <button
            onClick={onDelete}
            className="grid size-8 place-items-center rounded-md border border-input text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
            title="Delete registration"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
      <div className="grid gap-x-6 gap-y-4 px-5 py-5 sm:grid-cols-2 xl:grid-cols-3">
        {fields.map(([label, value]) => (
          <div key={label}>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <p
              className={`mt-0.5 text-sm break-words ${value ? "text-foreground" : "text-muted-foreground/60"}`}
            >
              {value || "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
