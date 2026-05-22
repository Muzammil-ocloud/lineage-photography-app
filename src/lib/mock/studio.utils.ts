export function uid(): string {
  return Math.random().toString(36).slice(2, 8);
}

export function slug(s: string): string {
  return (s || "gallery")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
