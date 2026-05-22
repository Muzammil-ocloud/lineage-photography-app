import { withErrorHandler } from "@/lib/api/handler";
import { requireAuth } from "@/lib/api/auth-guard";
import { successResponse } from "@/lib/api/response";
import { profileService } from "@/services/profile.service";
import { profileUpdateSchema } from "@/validations/profile";

export const GET = withErrorHandler(async () => {
  const user = await requireAuth();
  const profile = await profileService.getProfile(user.id);
  return successResponse(profile);
});

export const PATCH = withErrorHandler(async (request) => {
  const user = await requireAuth();
  const body: unknown = await request.json();
  const input = profileUpdateSchema.parse(body);
  const profile = await profileService.updateProfile(user.id, input);
  return successResponse(profile, { message: "Profile updated" });
});
