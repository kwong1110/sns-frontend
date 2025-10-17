import { commentSchema } from "@/entities/post/comment.types";
import { userSchema } from "@/entities/user/user.types";
import { z } from "zod";

export const postSchema = z
  .object({
    id: z.number().int().nonnegative(),
    author: userSchema,
    content: z.string(),
    images: z.array(z.url()),
    category: z.number().int().nonnegative(),
    categoryName: z.string(),
    createdAt: z.string(),
    likes: z.number().int().nonnegative(),
    retweets: z.number().int().nonnegative(),
    comments: z.number().int().nonnegative(),
    isLiked: z.boolean(),
    isRetweeted: z.boolean(),
    hasMoreComments: z.boolean(),
    commentList: z.array(commentSchema),
  })
  .partial();

export type Post = z.infer<typeof postSchema>;
