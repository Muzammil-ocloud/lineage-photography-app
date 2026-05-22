"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

export type HeaderUser = {
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
};

function getInitials(fullName: string | null, email: string) {
  if (fullName?.trim()) {
    return fullName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
  }
  return email.slice(0, 2).toUpperCase();
}

export function UserMenu({ user }: { user: HeaderUser }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const initials = getInitials(user.fullName, user.email);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 transition hover:opacity-90"
        style={{ borderColor: "var(--lineage-gold)" }}
        aria-label="Account menu"
        aria-expanded={open}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--lineage-gold)" }}
          >
            {initials}
          </span>
        )}
      </button>

      {open ? (
        <div
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 overflow-hidden rounded-xl border bg-white shadow-xl"
          style={{ borderColor: "var(--lineage-line)" }}
        >
          <div
            className="border-b px-4 py-3"
            style={{ borderColor: "var(--lineage-line)" }}
          >
            <p className="truncate text-sm font-semibold text-lineage-ink">
              {user.fullName || "Account"}
            </p>
            <p
              className="truncate text-xs"
              style={{ color: "var(--lineage-muted)" }}
            >
              {user.email}
            </p>
          </div>
          <div className="p-1">
            <Link
              href={ROUTES.profile}
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              <User size={16} />
              View profile
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50",
                )}
              >
                <LogOut size={16} />
                Sign out
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
