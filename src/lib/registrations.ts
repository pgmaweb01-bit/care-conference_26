const STORAGE_KEY = "care-conf-registrations";

export interface Registration {
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
  fullName: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  profession: string;
  position: string;
  sideRoom1: string;
  sideRoom2: string;
  category: string;
}

export function getRegistrations(): Registration[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addRegistration(data: Omit<Registration, "id" | "date" | "status" | "checkedIn">): Registration {
  const existing = getRegistrations();
  const reg: Registration = {
    ...data,
    id: existing.length + 1,
    date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    status: "Confirmed",
    checkedIn: false,
  };
  existing.push(reg);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  return reg;
}

export function getRegistrationStats() {
  const regs = getRegistrations();
  return {
    total: regs.length,
    confirmed: regs.filter((r) => r.status === "Confirmed").length,
    checkedIn: regs.filter((r) => r.checkedIn).length,
    speakers: regs.filter((r) => r.type === "speaker").length,
  };
}
