export function getAuthErrorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback;

  const message = error.message.toLowerCase();
  const cause = error.cause;
  const causeMessage =
    cause instanceof Error ? cause.message.toLowerCase() : "";

  if (
    message.includes("fetch failed") ||
    causeMessage.includes("enotfound") ||
    causeMessage.includes("placeholder.supabase.co")
  ) {
    return "Cannot reach Supabase. Check NEXT_PUBLIC_SUPABASE_URL in .env.local and restart the dev server.";
  }

  return error.message || fallback;
}
