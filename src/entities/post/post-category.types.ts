import { z } from "zod";

export const postCategrySchema = z
  .object({
    id: z.number().int().nonnegative(),
    name: z.string(),
  })
  .partial();

export type PostCategry = z.infer<typeof postCategrySchema>;
