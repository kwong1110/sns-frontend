import { getPosts } from "@/entities/post/post.api";

export interface PostFilter {
  categoryId?: number;
  sortBy: Parameters<typeof getPosts>[number]["sortBy"];
}
