import { withErrorHandler } from "@/lib/api/handler";
import { requireAuth } from "@/lib/api/auth-guard";
import { successResponse } from "@/lib/api/response";
import { profileService } from "@/services/profile.service";

export const GET = withErrorHandler(async () => {
  const user = await requireAuth();
  const profile = await profileService.getProfile(user.id);
  return successResponse({ user, profile });
});
