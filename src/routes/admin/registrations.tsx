import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Download, Filter, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/admin/registrations")({
  component: AdminRegistrations,
});

const MOCK_REGISTRATIONS = [
  {
    id: 1,
    registrationId: "CC26-AX7K-P2MN",
    name: "Chioma Adekunle",
    email: "chioma@healthng.org",
    phone: "+234 801 234 5678",
    organisation: "Health Nigeria",
    type: "Professional",
    status: "Confirmed",
    checkedIn: false,
    date: "15 Sep 2026",
  },
  {
    id: 2,
    registrationId: "CC26-BT3F-Q9WZ",
    name: "Dr. Yusuf Bello",
    email: "yusuf.bello@lagos.gov",
    phone: "+234 802 345 6789",
    organisation: "Lagos State Ministry of Health",
    type: "Institutional",
    status: "Confirmed",
    checkedIn: true,
    date: "14 Sep 2026",
  },
  {
    id: 3,
    registrationId: "CC26-CR5H-L4DV",
    name: "Fatima Hassan",
    email: "fatima.h@unilag.edu.ng",
    phone: "+234 803 456 7890",
    organisation: "University of Lagos",
    type: "Student",
    status: "Confirmed",
    checkedIn: false,
    date: "14 Sep 2026",
  },
  {
    id: 4,
    registrationId: "CC26-DN8J-S6YT",
    name: "Emeka Obi",
    email: "emeka@careconnect.ng",
    phone: "+234 804 567 8901",
    organisation: "CareConnect Nigeria",
    type: "Standard",
    status: "Pending",
    checkedIn: false,
    date: "13 Sep 2026",
  },
  {
    id: 5,
    registrationId: "CC26-EW2M-K7BX",
    name: "Amina Yusuf",
    email: "amina@bridgehealth.org",
    phone: "+234 805 678 9012",
    organisation: "Bridge Health",
    type: "Professional",
    status: "Confirmed",
    checkedIn: true,
    date: "13 Sep 2026",
  },
  {
    id: 6,
    registrationId: "CC26-FP4R-T3HQ",
    name: "Oluwaseun Coker",
    email: "seun@techcare.io",
    phone: "+234 806 789 0123",
    organisation: "TechCare",
    type: "Standard",
    status: "Confirmed",
    checkedIn: false,
    date: "12 Sep 2026",
  },
  {
    id: 7,
    registrationId: "CC26-GK9V-N5FL",
    name: "Dr. Ngozi Eze",
    email: "ngozi@careinstitute.org",
    phone: "+234 807 890 1234",
    organisation: "Nigeria Care Institute",
    type: "Institutional",
    status: "Confirmed",
    checkedIn: false,
    date: "12 Sep 2026",
  },
  {
    id: 8,
    registrationId: "CC26-HJ6X-W8CP",
    name: "Ibrahim Musa",
    email: "ibrahim@commcare.ng",
    phone: "+234 808 901 2345",
    organisation: "Community Care Initiative",
    type: "Standard",
    status: "Pending",
    checkedIn: false,
    date: "11 Sep 2026",
  },
  {
    id: 9,
    registrationId: "CC26-IM1Y-D4RS",
    name: "Blessing Okonkwo",
    email: "blessing@mothercare.org",
    phone: "+234 809 012 3456",
    organisation: "MotherCare Foundation",
    type: "Professional",
    status: "Confirmed",
    checkedIn: true,
    date: "11 Sep 2026",
  },
  {
    id: 10,
    registrationId: "CC26-JL5Z-A9GT",
    name: "Tunde Bakare",
    email: "tunde@nhis.gov.ng",
    phone: "+234 810 123 4567",
    organisation: "NHIS",
    type: "Institutional",
    status: "Confirmed",
    checkedIn: false,
    date: "10 Sep 2026",
  },
  {
    id: 11,
    registrationId: "CC26-KN3B-F2VH",
    name: "Aisha Abdullahi",
    email: "aisha@digitalhealth.ng",
    phone: "+234 811 234 5678",
    organisation: "Digital Health Nigeria",
    type: "Standard",
    status: "Cancelled",
    checkedIn: false,
    date: "10 Sep 2026",
  },
  {
    id: 12,
    registrationId: "CC26-LP7C-E6WK",
    name: "Prof. Chidi Nwosu",
    email: "chidi@uniben.edu.ng",
    phone: "+234 812 345 6789",
    organisation: "University of Benin",
    type: "Student",
    status: "Confirmed",
    checkedIn: false,
    date: "09 Sep 2026",
  },
];

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
