import { z } from "zod";

const optionalUrl = z
  .union([z.url("Invalid URL"), z.literal(""), z.null()])
  .transform((val) => (val === "" ? null : val));

export const profileUpdateSchema = z.object({
  full_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100)
    .optional()
    .nullable(),
  bio: z.string().max(500).optional().nullable(),
  avatar_url: optionalUrl.optional(),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
