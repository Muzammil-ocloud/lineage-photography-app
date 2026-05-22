import { NextResponse } from "next/server";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api";

export function successResponse<T>(
  data: T,
  options?: { message?: string; status?: number },
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true as const,
      data,
      ...(options?.message && { message: options.message }),
    },
    { status: options?.status ?? 200 },
  );
}

export function errorResponse(
  error: string,
  status = 500,
  details?: Record<string, string[]>,
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false as const,
      error,
      ...(details && { details }),
    },
    { status },
  );
}
