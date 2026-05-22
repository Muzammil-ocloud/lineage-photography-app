import { withErrorHandler } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import { authService } from "@/services/auth.service";

export const GET = withErrorHandler(async () => {
  const user = await authService.getSession();
  return successResponse({ user });
});
