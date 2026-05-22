import type { ReactNode } from "react";
import Link from "next/link";
import { LineageLogo } from "@/components/brand/lineage-logo";
import { ROUTES } from "@/lib/constants/routes";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: "var(--lineage-bg)" }}
    >
      <header className="flex h-[76px] items-center justify-between bg-black px-6 text-white">
        <Link href={ROUTES.login}>
          <LineageLogo variant="light" />
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {description ? (
              <p
                className="mt-2 text-sm"
                style={{ color: "var(--lineage-muted)" }}
              >
                {description}
              </p>
            ) : null}
          </div>
          <div
            className="rounded-2xl border bg-white p-6 shadow-sm"
            style={{ borderColor: "var(--lineage-line)" }}
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
