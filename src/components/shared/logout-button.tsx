"use client";

import { logoutAction } from "@/app/actions/auth";
import { StudioButton } from "@/components/studio/studio-button";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <StudioButton type="submit" className="w-full">
        Sign out
      </StudioButton>
    </form>
  );
}
