const AUTH_KEY = "care-conf-admin-auth";
const CREDENTIALS = {
  email: "admin@careconference.org",
  password: "CAREadmin2026",
};

export const ADMIN_EMAIL = CREDENTIALS.email;

export function login(email: string, password: string): boolean {
  if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email, authenticated: true }));
    return true;
  }
  return false;
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  return email === CREDENTIALS.email && password === CREDENTIALS.password;
}

export function getAuthHeader(): string {
  return btoa(`${CREDENTIALS.email}:${CREDENTIALS.password}`);
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const data = localStorage.getItem(AUTH_KEY);
    if (!data) return false;
    const parsed = JSON.parse(data);
    return parsed.authenticated === true;
  } catch {
    return false;
  }
}
