"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Calendar,
  Camera,
  CheckCircle2,
  Image,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import { LogoutButton } from "@/components/shared/logout-button";

const navItems = [
  { href: ROUTES.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.schedule, label: "Schedule", icon: Calendar },
  { href: ROUTES.clients, label: "Clients", icon: Users },
  { href: ROUTES.jobs, label: "Jobs", icon: Briefcase },
  { href: ROUTES.galleries, label: "Galleries", icon: Image },
  { href: ROUTES.photos, label: "Photos", icon: Camera },
  { href: ROUTES.settings, label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === ROUTES.jobs) {
      return pathname.startsWith("/jobs");
    }
    return pathname === href;
  };

  return (
    <aside
      className="hidden w-[248px] shrink-0 flex-col border-r bg-white md:flex"
      style={{
        borderColor: "var(--lineage-line)",
        minHeight: "calc(100vh - 76px)",
      }}
    >
      <nav className="space-y-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm",
              isActive(href)
                ? "bg-[var(--lineage-sidebar-active)] text-white"
                : "text-slate-600 hover:bg-slate-50",
            )}
          >
            <Icon size={17} />
            {label}
          </Link>
        ))}
      </nav>
      <div
        className="m-4 mt-10 rounded-2xl border p-4 text-xs"
        style={{ borderColor: "var(--lineage-line)" }}
      >
        <div className="flex items-center gap-2 text-sm font-semibold">
          <CheckCircle2 size={16} />
          Private galleries
        </div>
        <p className="mt-2 leading-5" style={{ color: "var(--lineage-muted)" }}>
          Watermarks, expiry dates, download controls, and shared link activity
          live in Settings.
        </p>
      </div>
      <div
        className="mt-auto border-t p-4"
        style={{ borderColor: "var(--lineage-line)" }}
      >
        <LogoutButton />
      </div>
    </aside>
  );
}
