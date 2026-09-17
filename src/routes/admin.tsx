import { Outlet, Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Mic2,
  Handshake,
  Mail,
  Settings,
  ChevronLeft,
  Menu,
  LogOut,
  QrCode,
} from "lucide-react";
import { isAuthenticated, logout } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const SIDEBAR_NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/check-in", label: "Check-In", icon: QrCode },
  { to: "/admin/registrations", label: "Registrations", icon: Users },
  { to: "/admin/speakers", label: "Speakers", icon: Mic2 },
  { to: "/admin/partners", label: "Partners", icon: Handshake },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const authChecked = useRef(false);
  const [authOk, setAuthOk] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: "/admin/login" });
      return;
    }
    setAuthOk(true);
    authChecked.current = true;
    try {
      const data = JSON.parse(localStorage.getItem("care-conf-admin-auth") || "{}");
      setAdminEmail(data.email || "");
    } catch {
      setAdminEmail("");
    }
  }, [navigate]);

  if (!authOk && !authChecked.current) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-ink text-ink-foreground transition-all duration-200 ${
          collapsed ? "w-16" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div
          className={`flex h-16 items-center border-b border-white/10 ${collapsed ? "justify-center px-2" : "px-5"}`}
        >
          {!collapsed ? (
            <Link to="/" className="flex items-center gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-sm bg-primary">
                <span className="eyebrow text-primary-foreground">CC</span>
              </span>
              <div>
                <p className="font-display text-sm font-bold leading-tight">Care Conference</p>
                <p className="eyebrow mt-0.5 text-ink-foreground/50">Admin Panel</p>
              </div>
            </Link>
          ) : (
            <span className="grid size-8 place-items-center rounded-sm bg-primary">
              <span className="eyebrow text-primary-foreground">CC</span>
            </span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {SIDEBAR_NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={item.end ? { exact: true } : undefined}
                  activeProps={{ className: "bg-primary/15 text-accent" }}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 ${
                    collapsed ? "justify-center" : ""
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="size-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-2">
          <button
            type="button"
            onClick={handleLogout}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-ink-foreground/60 transition-colors hover:bg-white/10 hover:text-ink-foreground ${
              collapsed ? "justify-center" : ""
            }`}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="size-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-200 ${collapsed ? "lg:ml-16" : "lg:ml-64"}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/85 backdrop-blur-md px-5">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-md border border-input lg:hidden"
          >
            <Menu className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="hidden size-9 grid place-items-center rounded-md border border-input lg:grid"
          >
            <ChevronLeft
              className={`size-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-display text-sm font-semibold">Admin User</p>
              <p className="text-xs text-muted-foreground">{adminEmail}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              AU
            </div>
          </div>
        </header>

        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
