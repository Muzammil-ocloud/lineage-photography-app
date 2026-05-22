import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ApiError } from "@/types/api";
import { errorResponse } from "@/lib/api/response";

type RouteHandler = (
  request: Request,
  context?: { params: Promise<Record<string, string>> },
) => Promise<NextResponse>;

export function withErrorHandler(handler: RouteHandler): RouteHandler {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (error) {
      if (error instanceof ApiError) {
        return errorResponse(error.message, error.statusCode, error.details);
      }

      if (error instanceof ZodError) {
        const details = error.flatten().fieldErrors as Record<string, string[]>;
        return errorResponse("Validation failed", 400, details);
      }

      console.error("[API Error]", error);
      return errorResponse("Internal server error", 500);
    }
  };
}
