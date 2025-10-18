import { commentSchema } from "@/entities/post/comment.types";
import { userSchema } from "@/entities/user/user.types";
import { z } from "zod";

export const MAX_CHARS = 280;
export const MAX_IMAGES = 4;

export const postSchema = z
  .object({
    id: z.number().int().nonnegative(),
    author: userSchema,
    content: z
      .string()
      .min(1, "내용을 입력해주세요.")
      .max(MAX_CHARS, `최대 ${MAX_CHARS}자까지 입력할 수 있습니다.`),
    images: z
      .array(z.string())
      .max(MAX_IMAGES, `최대 ${MAX_IMAGES}장까지만 첨부할 수 있습니다.`),
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
