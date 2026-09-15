import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, Eye } from "lucide-react";
import { PARTNER_TIERS } from "@/data/conference";

export const Route = createFileRoute("/admin/partners")({
  component: AdminPartners,
});

const MOCK_PARTNERS = [
  {
    id: 1,
    name: "Lagos State Government",
    tier: "Platinum",
    contact: "Dr. Ade Kalejaiye",
    email: "ade@lagos.gov",
    status: "Confirmed",
    date: "1 Sep 2026",
  },
  {
    id: 2,
    name: "MTN Nigeria",
    tier: "Gold",
    contact: "Nkechi Ogbonna",
    email: "nkechi@mtn.com",
    status: "Confirmed",
    date: "3 Sep 2026",
  },
  {
    id: 3,
    name: "WellHome Technologies",
    tier: "Silver",
    contact: "Tunde Akinyemi",
    email: "tunde@wellhome.ng",
    status: "Pending",
    date: "5 Sep 2026",
  },
  {
    id: 4,
    name: "Sterling Bank",
    tier: "Gold",
    contact: "Funke Adeyemi",
    email: "funke@sterling.ng",
    status: "Confirmed",
    date: "4 Sep 2026",
  },
  {
    id: 5,
    name: "Nigeria Health Watch",
    tier: "Silver",
    contact: "Vivian Ihezu",
    email: "vivian@nhw.org",
    status: "Confirmed",
    date: "6 Sep 2026",
  },
  {
    id: 6,
    name: "Philips Africa",
    tier: "Platinum",
    contact: "Olu Fadugba",
    email: "olu@philips.com",
    status: "Pending",
    date: "7 Sep 2026",
  },
  {
    id: 7,
    name: "Access Bank",
    tier: "Bronze",
    contact: "Emeka Nwankwo",
    email: "emeka@accessbank.com",
    status: "Confirmed",
    date: "8 Sep 2026",
  },
  {
    id: 8,
    name: "NurseGrid Africa",
    tier: "Silver",
    contact: "Amina Bello",
    email: "amina@nursegrid.ng",
    status: "Confirmed",
    date: "9 Sep 2026",
  },
];

const TIER_COLORS: Record<string, string> = {
  Platinum: "bg-purple-100 text-purple-700",
  Gold: "bg-yellow-100 text-yellow-700",
  Silver: "bg-gray-100 text-gray-700",
  Bronze: "bg-orange-100 text-orange-700",
};

function AdminPartners() {
  const [partners] = useState(MOCK_PARTNERS);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-extrabold">Partners</h1>
        <p className="mt-1 text-muted-foreground">
          View and manage conference partners and sponsors.
        </p>
      </div>

      {/* Tier Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PARTNER_TIERS.map((tier) => {
          const count = partners.filter((p) => p.tier === tier.tier).length;
          return (
            <div key={tier.tier} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${TIER_COLORS[tier.tier]}`}
                >
                  {tier.tier}
                </span>
                <span className="font-display text-2xl font-extrabold">{count}</span>
              </div>
              <p className="mt-3 text-sm font-semibold">{tier.price}</p>
            </div>
          );
        })}
      </div>

      {/* Partners Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="p-4">Organisation</th>
              <th className="p-4">Tier</th>
              <th className="p-4 hidden md:table-cell">Contact</th>
              <th className="p-4 hidden lg:table-cell">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr
                key={partner.id}
                className="border-b border-border/50 last:border-0 hover:bg-muted/50"
              >
                <td className="p-4 font-display font-semibold">{partner.name}</td>
                <td className="p-4">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${TIER_COLORS[partner.tier]}`}
                  >
                    {partner.tier}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">
                  {partner.contact}
                </td>
                <td className="p-4 text-muted-foreground hidden lg:table-cell">{partner.email}</td>
                <td className="p-4">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      partner.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {partner.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-1">
                    {partner.status === "Pending" ? (
                      <>
                        <button
                          className="grid size-8 place-items-center rounded-md border border-input text-green-600 transition-colors hover:bg-green-50"
                          title="Confirm"
                        >
                          <Check className="size-3.5" />
                        </button>
                        <button
                          className="grid size-8 place-items-center rounded-md border border-input text-red-600 transition-colors hover:bg-red-50"
                          title="Decline"
                        >
                          <X className="size-3.5" />
                        </button>
                      </>
                    ) : null}
                    <button
                      className="grid size-8 place-items-center rounded-md border border-input text-muted-foreground transition-colors hover:bg-secondary"
                      title="View"
                    >
                      <Eye className="size-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
