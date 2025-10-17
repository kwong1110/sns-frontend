import { userSchema } from "@/entities/user/user.types";
import { z } from "zod";

export const commentSchema = z
  .object({
    author: userSchema,
    content: z.string(),
    createdAt: z.string(),
    likes: z.number().int().nonnegative(),
    isLiked: z.boolean(),
  })
  .partial();

export type Comment = z.infer<typeof commentSchema>;
