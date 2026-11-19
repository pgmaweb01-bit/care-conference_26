import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  QrCode,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  Keyboard,
  Camera,
  RefreshCw,
  Download,
} from "lucide-react";
import { getAuthHeader } from "@/lib/auth";

export const Route = createFileRoute("/admin/check-in")({
  component: AdminCheckIn,
});

type CheckInRegistration = {
  registrationId: string;
  name: string;
  email: string;
  organisation: string;
  type: string;
  checkedIn: boolean;
  registeredOn: string;
};

type ApiRegistrationRow = {
  registration_id: string;
  full_name: string;
  email: string;
  organisation: string;
  type: string;
  checked_in: boolean;
  created_at: string;
};

type CheckResult = {
  success: boolean;
  message: string;
  name?: string;
  type?: string;
  registrationId?: string;
};

function AdminCheckIn() {
  const [mode, setMode] = useState<"camera" | "manual">("manual");
  const [manualId, setManualId] = useState("");
  const [registrations, setRegistrations] = useState<CheckInRegistration[]>([]);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [scanHistory, setScanHistory] = useState<
    Array<{ id: string; time: string; success: boolean; name: string }>
  >([]);
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrRef = useRef<unknown>(null);

  const totalCheckedIn = registrations.filter((r) => r.checkedIn).length;
  const totalRegistered = registrations.length;
  const checkInPercent =
    totalRegistered > 0 ? Math.round((totalCheckedIn / totalRegistered) * 100) : 0;

  const summaryByType = useMemo(() => {
    const groups = new Map<string, { registered: number; checked: number }>();
    for (const r of registrations) {
      const key = r.type?.trim() || "Unspecified";
      const g = groups.get(key) ?? { registered: 0, checked: 0 };
      g.registered += 1;
      if (r.checkedIn) g.checked += 1;
      groups.set(key, g);
    }
    return Array.from(groups, ([type, g]) => ({ type, ...g })).sort(
      (a, b) => b.registered - a.registered,
    );
  }, [registrations]);

  const loadRegistrations = useCallback(async () => {
    setLoadState("loading");
    try {
      const res = await fetch("/api/registrations");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const rows = (await res.json()) as ApiRegistrationRow[];
      setRegistrations(
        rows.map((r) => ({
          registrationId: r.registration_id,
          name: r.full_name,
          email: r.email ?? "",
          organisation: r.organisation ?? "",
          type: r.type ?? "",
          checkedIn: r.checked_in,
          registeredOn: r.created_at ? new Date(r.created_at).toLocaleDateString("en-GB") : "",
        })),
      );
      setLoadState("ready");
    } catch (err) {
      console.error("Failed to load registrations:", err);
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    loadRegistrations();
  }, [loadRegistrations]);

  useEffect(() => {
    return () => {
      if (
        html5QrRef.current &&
        typeof html5QrRef.current === "object" &&
        "stop" in html5QrRef.current
      ) {
        (html5QrRef.current as { stop: () => Promise<void> }).stop().catch(() => {});
      }
    };
  }, []);

  const startScanner = async () => {
    setMode("camera");
    setResult(null);

    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      if (
        html5QrRef.current &&
        typeof html5QrRef.current === "object" &&
        "stop" in html5QrRef.current
      ) {
        await (html5QrRef.current as { stop: () => Promise<void> }).stop().catch(() => {});
      }
      const scanner = new Html5Qrcode("qr-reader");
      html5QrRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          processScan(decodedText);
          scanner.stop().catch(() => {});
        },
        () => {},
      );
    } catch {
      setResult({
        success: false,
        message: "Camera access denied or unavailable. Please use manual entry.",
      });
      setMode("manual");
    }
  };

  const stopScanner = async () => {
    if (
      html5QrRef.current &&
      typeof html5QrRef.current === "object" &&
      "stop" in html5QrRef.current
    ) {
      await (html5QrRef.current as { stop: () => Promise<void> }).stop().catch(() => {});
      html5QrRef.current = null;
    }
  };

  const processScan = (rawValue: string) => {
    let scannedId = "";
    try {
      const parsed = JSON.parse(rawValue);
      scannedId = parsed.id || rawValue;
    } catch {
      scannedId = rawValue.trim();
    }
    processCheckIn(scannedId);
  };

  const processCheckIn = async (id: string) => {
    const normalizedInput = id.toUpperCase().replace(/\s/g, "");
    const reg = registrations.find(
      (r) => r.registrationId.toUpperCase().replace(/\s/g, "") === normalizedInput,
    );

    if (!reg) {
      const res: CheckResult = {
        success: false,
        message: `No registration found for ID: ${id}`,
      };
      setResult(res);
      setScanHistory((prev) => [
        { id, time: new Date().toLocaleTimeString(), success: false, name: "Unknown" },
        ...prev,
      ]);
      return;
    }

    if (reg.checkedIn) {
      const res: CheckResult = {
        success: false,
        message: `${reg.name} has already been checked in.`,
        name: reg.name,
        type: reg.type,
        registrationId: reg.registrationId,
      };
      setResult(res);
      setScanHistory((prev) => [
        { id, time: new Date().toLocaleTimeString(), success: false, name: reg.name },
        ...prev,
      ]);
      return;
    }

    // Persist the check-in before reporting success, so a refresh keeps it.
    try {
      const res = await fetch(`/api/registrations/${encodeURIComponent(reg.registrationId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-auth": getAuthHeader() },
        body: JSON.stringify({ checkedIn: true }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      console.error("Failed to save check-in:", err);
      const res: CheckResult = {
        success: false,
        message: `Couldn't save the check-in for ${reg.name}. Check the connection and try again.`,
        name: reg.name,
        type: reg.type,
        registrationId: reg.registrationId,
      };
      setResult(res);
      setScanHistory((prev) => [
        { id, time: new Date().toLocaleTimeString(), success: false, name: reg.name },
        ...prev,
      ]);
      return;
    }

    setRegistrations((prev) =>
      prev.map((r) => (r.registrationId === reg.registrationId ? { ...r, checkedIn: true } : r)),
    );
    const res: CheckResult = {
      success: true,
      message: `${reg.name} checked in successfully!`,
      name: reg.name,
      type: reg.type,
      registrationId: reg.registrationId,
    };
    setResult(res);
    setScanHistory((prev) => [
      { id, time: new Date().toLocaleTimeString(), success: true, name: reg.name },
      ...prev,
    ]);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualId.trim()) return;
    processCheckIn(manualId.trim());
    setManualId("");
  };

  function handleExportCsv() {
    const headers = [
      "Reg ID",
      "Name",
      "Email",
      "Organisation",
      "Type",
      "Checked In",
      "Registered On",
    ];
    const rows = registrations.map((r) => [
      r.registrationId,
      r.name,
      r.email,
      r.organisation,
      r.type,
      r.checkedIn ? "Yes" : "No",
      r.registeredOn,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `check-in-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Check-In</h1>
          <p className="mt-1 text-muted-foreground">
            Scan a QR code or enter a registration ID to check in delegates.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportCsv}
          disabled={loadState !== "ready" || totalRegistered === 0}
          className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="size-3.5" />
          Export CSV
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <UserCheck className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-extrabold font-display">{totalCheckedIn}</p>
              <p className="text-xs text-muted-foreground">Checked In</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
              <QrCode className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-extrabold font-display">{totalRegistered}</p>
              <p className="text-xs text-muted-foreground">Total Registered</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
              <Clock className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-extrabold font-display">
                {totalRegistered - totalCheckedIn}
              </p>
              <p className="text-xs text-muted-foreground">Pending Arrival</p>
            </div>
          </div>
        </div>
      </div>

      {/* Check-in Summary */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold">Check-in Summary</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {loadState === "ready"
                ? "Live progress across all registrations"
                : "Registration check-in progress"}
            </p>
          </div>
          {loadState === "ready" && totalRegistered > 0 && (
            <p className="rounded-md bg-primary/10 px-3 py-1.5 font-display text-sm font-bold text-primary">
              {totalCheckedIn} / {totalRegistered} checked in
            </p>
          )}
        </div>

        {loadState !== "ready" ? (
          <p className="mt-4 text-sm text-muted-foreground">
            {loadState === "loading"
              ? "Loading summary…"
              : "Summary unavailable — check the connection and retry below."}
          </p>
        ) : totalRegistered === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No registrations yet.</p>
        ) : (
          <>
            {/* Progress bar */}
            <div className="mt-5">
              <div className="flex items-end justify-between gap-4">
                <p className="font-display text-3xl font-extrabold text-green-600">
                  {checkInPercent}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {totalCheckedIn} arrived · {totalRegistered - totalCheckedIn} still expected
                </p>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-green-600 transition-all duration-500"
                  style={{ width: `${checkInPercent}%` }}
                />
              </div>
            </div>

            {/* Breakdown by ticket type */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="py-2 pr-4 font-semibold">Ticket Type</th>
                    <th className="py-2 pr-4 text-right font-semibold">Registered</th>
                    <th className="py-2 pr-4 text-right font-semibold">Checked In</th>
                    <th className="py-2 text-right font-semibold">Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryByType.map((t) => (
                    <tr key={t.type} className="border-b border-border/50 last:border-0">
                      <td className="py-2.5 pr-4 font-semibold capitalize">{t.type}</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">{t.registered}</td>
                      <td className="py-2.5 pr-4 text-right font-semibold tabular-nums text-green-600">
                        {t.checked}
                      </td>
                      <td className="py-2.5 text-right tabular-nums text-muted-foreground">
                        {t.registered - t.checked}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-border font-display font-bold">
                    <td className="py-2.5 pr-4">Total</td>
                    <td className="py-2.5 pr-4 text-right tabular-nums">{totalRegistered}</td>
                    <td className="py-2.5 pr-4 text-right tabular-nums text-green-600">
                      {totalCheckedIn}
                    </td>
                    <td className="py-2.5 text-right tabular-nums">
                      {totalRegistered - totalCheckedIn}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Scanner / Manual Entry */}
        <div className="lg:col-span-7">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  stopScanner();
                  setMode("manual");
                  setResult(null);
                }}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  mode === "manual"
                    ? "bg-primary text-primary-foreground"
                    : "border border-input text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Keyboard className="size-3.5" />
                Manual Entry
              </button>
              <button
                type="button"
                onClick={startScanner}
                disabled={loadState !== "ready"}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  mode === "camera"
                    ? "bg-primary text-primary-foreground"
                    : "border border-input text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Camera className="size-3.5" />
                Camera Scan
              </button>
            </div>

            {loadState === "loading" ? (
              <p className="mt-6 rounded-md border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
                Loading registrations…
              </p>
            ) : loadState === "error" ? (
              <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-700">
                  Couldn't load registrations. Check the connection.
                </p>
                <button
                  type="button"
                  onClick={loadRegistrations}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 underline-offset-2 hover:underline"
                >
                  <RefreshCw className="size-3.5" />
                  Retry
                </button>
              </div>
            ) : null}

            {mode === "manual" ? (
              <form onSubmit={handleManualSubmit} className="mt-6">
                <label className="block font-display text-sm font-semibold">
                  Enter Registration ID
                </label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Type or paste the delegate's registration ID (e.g. CC26-AX7K-P2MN)
                </p>
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    placeholder="CC26-XXXX-XXXX"
                    disabled={loadState !== "ready"}
                    className="flex-1 rounded-md border border-input bg-background px-4 py-3 font-mono text-sm uppercase tracking-wider outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!manualId.trim() || loadState !== "ready"}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Search className="size-3.5" />
                    Check In
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-6">
                <div
                  id="qr-reader"
                  ref={scannerRef}
                  className="w-full overflow-hidden rounded-lg"
                />
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Point your camera at a delegate's QR code
                </p>
                <button
                  type="button"
                  onClick={() => {
                    stopScanner();
                    setMode("manual");
                  }}
                  className="mx-auto mt-3 block text-xs font-semibold text-primary hover:underline"
                >
                  Switch to manual entry
                </button>
              </div>
            )}

            {/* Result */}
            {result ? (
              <div
                className={`mt-6 rounded-lg border p-5 ${
                  result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.success ? (
                    <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-600" />
                  ) : (
                    <XCircle className="mt-0.5 size-5 shrink-0 text-red-600" />
                  )}
                  <div>
                    <p
                      className={`font-display text-sm font-bold ${
                        result.success ? "text-green-800" : "text-red-800"
                      }`}
                    >
                      {result.message}
                    </p>
                    {result.name && (
                      <div className="mt-2 text-sm">
                        <p className="font-semibold">{result.name}</p>
                        {result.type && (
                          <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                            {result.type}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Scan History */}
        <div className="lg:col-span-5">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold">Scan History</h2>
            <p className="mt-1 text-xs text-muted-foreground">Today's check-in activity</p>
            <div className="mt-5 space-y-2">
              {scanHistory.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No scans yet. Start scanning to see activity here.
                </div>
              ) : (
                scanHistory.map((entry, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-md border border-border/50 p-3"
                  >
                    {entry.success ? (
                      <CheckCircle className="size-4 shrink-0 text-green-600" />
                    ) : (
                      <XCircle className="size-4 shrink-0 text-red-500" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{entry.name}</p>
                      <p className="truncate font-mono text-xs text-muted-foreground">{entry.id}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{entry.time}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Reference: All Registration IDs */}
          <div className="mt-6 rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold">Registration IDs</h2>
            <p className="mt-1 text-xs text-muted-foreground">Quick reference for manual lookups</p>
            <div className="mt-4 max-h-64 space-y-1.5 overflow-y-auto">
              {loadState === "loading" ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  Loading registrations…
                </p>
              ) : loadState === "error" ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  Couldn't load. Use Retry above.
                </p>
              ) : registrations.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  No registrations yet.
                </p>
              ) : (
                registrations.map((reg) => (
                  <div
                    key={reg.registrationId}
                    className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${
                      reg.checkedIn ? "bg-green-50" : "bg-muted/50"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{reg.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {reg.registrationId}
                      </p>
                    </div>
                    {reg.checkedIn ? (
                      <CheckCircle className="size-4 shrink-0 text-green-600" />
                    ) : (
                      <button
                        type="button"
                        onClick={() => processCheckIn(reg.registrationId)}
                        className="shrink-0 rounded border border-primary/30 px-2 py-0.5 text-xs font-semibold text-primary hover:bg-primary/5"
                      >
                        Check In
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
