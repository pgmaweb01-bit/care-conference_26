import { useEffect, useSyncExternalStore } from "react";
import { REGISTRATION_OPEN } from "@/data/conference";
import { getAuthHeader } from "@/lib/auth";

/**
 * Runtime registration status store. The REGISTRATION_OPEN constant in
 * data/conference.ts is only the pre-load fallback (SSR/SEO default); the
 * live value lives in the site_settings table and is read from GET /api/settings.
 * Admins flip it via PATCH /api/settings (see the dashboard toggle).
 */

export type RegistrationStatus = {
  open: boolean;
  loaded: boolean;
};

const INITIAL: RegistrationStatus = { open: REGISTRATION_OPEN, loaded: false };

const MAX_AUTO_RETRIES = 3;

let state: RegistrationStatus = INITIAL;
let attempts = 0;
let inflight: Promise<RegistrationStatus> | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): RegistrationStatus {
  return state;
}

function getServerSnapshot(): RegistrationStatus {
  return INITIAL;
}

export function loadRegistrationStatus(): Promise<RegistrationStatus> {
  if (state.loaded) return Promise.resolve(state);
  if (inflight) return inflight;
  attempts += 1;
  inflight = fetch("/api/settings")
    .then(async (res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { registrationOpen?: unknown };
      if (typeof data.registrationOpen !== "boolean") {
        throw new Error("Invalid settings payload");
      }
      state = { open: data.registrationOpen, loaded: true };
      attempts = 0;
      emit();
      return state;
    })
    .catch((err) => {
      console.error("Failed to load registration status:", err);
      // Transient failures (e.g. a database blip) retry with backoff so the
      // UI doesn't sit on the fallback / "checking" state forever.
      if (attempts < MAX_AUTO_RETRIES) {
        setTimeout(() => {
          void loadRegistrationStatus();
        }, 1500 * attempts);
      }
      return state;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

export async function saveRegistrationStatus(open: boolean): Promise<void> {
  const res = await fetch("/api/settings", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "x-admin-auth": getAuthHeader() },
    body: JSON.stringify({ registrationOpen: open }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  state = { open, loaded: true };
  emit();
}

export function useRegistrationStatus(): RegistrationStatus {
  useEffect(() => {
    void loadRegistrationStatus();
  }, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useRegistrationOpen(): boolean {
  return useRegistrationStatus().open;
}
