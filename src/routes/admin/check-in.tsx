import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  QrCode,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  Keyboard,
  Camera,
} from "lucide-react";

export const Route = createFileRoute("/admin/check-in")({
  component: AdminCheckIn,
});

const MOCK_REGISTRATIONS: Array<{
  registrationId: string;
  name: string;
  type: string;
  checkedIn: boolean;
}> = [];

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
  const [registrations, setRegistrations] = useState(MOCK_REGISTRATIONS);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [scanHistory, setScanHistory] = useState<
    Array<{ id: string; time: string; success: boolean; name: string }>
  >([]);
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrRef = useRef<unknown>(null);

  const totalCheckedIn = registrations.filter((r) => r.checkedIn).length;
  const totalRegistered = registrations.length;

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

  const processCheckIn = (id: string) => {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-extrabold">Check-In</h1>
        <p className="mt-1 text-muted-foreground">
          Scan a QR code or enter a registration ID to check in delegates.
        </p>
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
                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  mode === "camera"
                    ? "bg-primary text-primary-foreground"
                    : "border border-input text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Camera className="size-3.5" />
                Camera Scan
              </button>
            </div>

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
                    className="flex-1 rounded-md border border-input bg-background px-4 py-3 font-mono text-sm uppercase tracking-wider outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!manualId.trim()}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
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
              {registrations.map((reg) => (
                <div
                  key={reg.registrationId}
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${
                    reg.checkedIn ? "bg-green-50" : "bg-muted/50"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{reg.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">{reg.registrationId}</p>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
