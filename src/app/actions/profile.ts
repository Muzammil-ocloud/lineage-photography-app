"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { profileService } from "@/services/profile.service";
import { profileUpdateSchema } from "@/validations/profile";
import { ROUTES } from "@/lib/constants/routes";

export type ProfileActionState = {
  error?: string;
  success?: string;
};

export async function updateProfileAction(
  _prevState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const parsed = profileUpdateSchema.safeParse({
    full_name: formData.get("full_name") || null,
    bio: formData.get("bio") || null,
    avatar_url: formData.get("avatar_url") || null,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await profileService.updateProfile(user.id, parsed.data);
    revalidatePath(ROUTES.settings);
    revalidatePath(ROUTES.dashboard);
    return { success: "Profile updated successfully" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Update failed",
    };
  }
}
