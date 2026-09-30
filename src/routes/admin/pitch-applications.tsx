import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Search, Download, Filter, ChevronDown, ChevronUp } from "lucide-react";

interface PitchApplication {
  [key: string]: string | string[];
  id: number;
  application_id: string;
  full_name: string;
  role_at_company: string;
  phone: string;
  email: string;
  linkedin: string;
  company_name: string;
  started_when: string;
  cac_registration: string;
  cac_number: string;
  based_in: string;
  states_working: string;
  team_size: string;
  website_social: string;
  what_company_does: string;
  problem_solving: string;
  care_at_home_impact: string;
  areas_touched: string | string[];
  current_stage: string;
  clients_served: string;
  proud_of: string;
  raised_money: string;
  raising_now: string;
  who_pitches: string;
  show_method: string;
  pitch_deck_url: string;
  day_needs: string;
  confirmations: string | string[];
  status: string;
  created_at: string;
}

function parseJson<T>(value: string | T, fallback: T): T {
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return value;
}

export const Route = createFileRoute("/admin/pitch-applications")({
  component: AdminPitchApplications,
});

function AdminPitchApplications() {
  const [applications, setApplications] = useState<PitchApplication[]>([]);
  const [search, setSearch] = useState("");
  const [filterStage, setFilterStage] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/pitch-applications");
        if (res.ok) setApplications(await res.json());
      } catch (err) {
        console.error("Failed to fetch pitch applications:", err);
      }
    }
    fetchData();
  }, []);

  const stages = [...new Set(applications.map((a) => a.current_stage).filter(Boolean))].sort();

  const filtered = applications.filter((a) => {
    const matchSearch =
      a.full_name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.company_name.toLowerCase().includes(search.toLowerCase()) ||
      a.application_id.toLowerCase().includes(search.toLowerCase());
    const matchStage = filterStage === "all" || a.current_stage === filterStage;
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchStage && matchStatus;
  });

  function handleExport() {
    const headers = [
      "App ID",
      "Name",
      "Role",
      "Email",
      "Phone",
      "Company",
      "Started",
      "CAC Registration",
      "CAC Number",
      "Based In",
      "States",
      "Team Size",
      "Website/Social",
      "What It Does",
      "Problem Solving",
      "Care At Home Impact",
      "Areas Touched",
      "Stage",
      "Clients Served",
      "Proud Of",
      "Raised Money",
      "Raising Now",
      "Who Pitches",
      "Show Method",
      "Deck URL",
      "Day Needs",
      "Status",
      "Date",
    ];
    const rows = filtered.map((a) => [
      a.application_id,
      a.full_name,
      a.role_at_company,
      a.email,
      a.phone,
      a.company_name,
      a.started_when,
      a.cac_registration,
      a.cac_number,
      a.based_in,
      a.states_working,
      a.team_size,
      a.website_social,
      a.what_company_does,
      a.problem_solving,
      a.care_at_home_impact,
      parseJson<string[]>(a.areas_touched, []).join(" | "),
      a.current_stage,
      a.clients_served,
      a.proud_of,
      a.raised_money,
      a.raising_now,
      a.who_pitches,
      a.show_method,
      a.pitch_deck_url,
      a.day_needs,
      a.status,
      new Date(a.created_at).toLocaleDateString("en-GB"),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `pitch-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Pitch Applications</h1>
          <p className="mt-1 text-muted-foreground">
            Review founders applying to pitch in the Pitch &amp; Demo Room.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-secondary"
        >
          <Download className="size-3.5" />
          Export CSV
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search applications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-input bg-background pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Stages</option>
            {stages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option>New</option>
            <option>Selected</option>
            <option>Declined</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="p-4"></th>
              <th className="p-4">App. ID</th>
              <th className="p-4">Founder</th>
              <th className="p-4 hidden md:table-cell">Company</th>
              <th className="p-4">Stage</th>
              <th className="p-4 hidden lg:table-cell">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => {
              const areas = parseJson<string[]>(app.areas_touched, []);
              const confirmations = parseJson<string[]>(app.confirmations, []);
              const isExpanded = expandedId === app.id;
              return (
                <Fragment key={app.id}>
                  <tr
                    key={app.id}
                    className="border-b border-border/50 hover:bg-muted/50"
                  >
                    <td className="p-4">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : app.id)}
                        className="grid size-7 place-items-center rounded-md border border-input text-muted-foreground transition-colors hover:bg-secondary"
                        title={isExpanded ? "Collapse" : "Expand details"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                      </button>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-xs font-semibold">{app.application_id}</span>
                    </td>
                    <td className="p-4 font-display font-semibold">{app.full_name}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">
                      {app.company_name}
                    </td>
                    <td className="p-4">
                      <span className="inline-block max-w-[160px] truncate rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {app.current_stage}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell">
                      {new Date(app.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4">
                      <span className="inline-block rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-700">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${app.id}-detail`}>
                      <td colSpan={7} className="bg-muted/30 p-6">
                        <div className="grid gap-6 lg:grid-cols-2">
                          <DetailBlock
                            title="Contact & Company"
                            items={[
                              ["Email", app.email],
                              ["Phone (WhatsApp)", app.phone],
                              ["Role at company", app.role_at_company],
                              ["LinkedIn", app.linkedin],
                              ["Started", app.started_when],
                              ["CAC registration", app.cac_registration],
                              ["CAC number", app.cac_number],
                              ["Based in", app.based_in],
                              ["States working", app.states_working],
                              ["Team size", app.team_size],
                              ["Website / social", app.website_social],
                            ]}
                          />
                          <DetailBlock
                            title="The Company"
                            items={[
                              ["What it does", app.what_company_does],
                              ["Problem solving", app.problem_solving],
                              ["Care-at-home impact", app.care_at_home_impact],
                              ["Areas touched", areas.join(", ")],
                              ["Stage", app.current_stage],
                              ["Clients served", app.clients_served],
                              ["Proud of", app.proud_of],
                              ["Raised money", app.raised_money],
                              ["Raising now", app.raising_now],
                            ]}
                          />
                          <DetailBlock
                            title="Pitch on the Day"
                            items={[
                              ["Who pitches", app.who_pitches],
                              ["Show method", app.show_method],
                              ["Deck URL", app.pitch_deck_url],
                              ["Day needs", app.day_needs],
                            ]}
                          />
                          <DetailBlock
                            title="Confirmations"
                            items={[
                              [
                                "Confirmed",
                                confirmations.length === 6
                                  ? "All 6 confirmed"
                                  : `Only ${confirmations.length} of 6`,
                              ],
                              ...confirmations.map((c) => [c, "Confirmed"] as string[]),
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No pitch applications found.
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {applications.length} pitch applications
      </p>
    </div>
  );
}

function DetailBlock({ title, items }: { title: string; items: (string[] | [string, string])[] }) {
  return (
    <div>
      <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <div className="space-y-2">
        {items.map(([k, v]) =>
          v ? (
            <div key={String(k)}>
              <p className="text-xs font-semibold text-muted-foreground">{k}</p>
              <p className="text-sm break-words">{v}</p>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}