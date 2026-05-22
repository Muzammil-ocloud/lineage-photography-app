import { createClient } from "@/lib/supabase/server";
import { profileService } from "@/services/profile.service";
import { ProfileForm } from "@/components/forms/profile-form";
import { PageHeader } from "@/components/studio/page-header";
import { StudioCard, StudioCardHead } from "@/components/studio/studio-card";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await profileService.getProfile(user.id);

  return (
    <>
      <PageHeader title="Profile" showSearch={false} showActions={false} />
      <div className="mx-auto max-w-2xl">
        <StudioCard>
          <StudioCardHead title="Your account" />
          <div className="space-y-4 p-6 pt-2">
            <p className="text-sm" style={{ color: "var(--lineage-muted)" }}>
              Signed in as{" "}
              <span className="font-medium text-lineage-ink">{user.email}</span>
            </p>
            <ProfileForm profile={profile} />
          </div>
        </StudioCard>
      </div>
    </>
  );
}
