import { PostCategry } from "@/entities/post/post-category.types";
import { getPosts } from "@/entities/post/post.api";

export const MOCK_POST_CATEGORIES: PostCategry[] = [
  { id: 1, name: "요리" },
  { id: 2, name: "그림" },
  { id: 3, name: "음악" },
  { id: 4, name: "영화" },
  { id: 5, name: "독서" },
] as const;

export const MOCK_POST_SORT_OPTIONS: {
  value: Parameters<typeof getPosts>[number]["sortBy"];
  label: string;
}[] = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "인기순" },
];
