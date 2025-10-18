import { PostCategry } from "@/entities/post/post-category.types";

export const MOCK_POST_CATEGORIES: PostCategry[] = [
  { id: 1, name: "요리" },
  { id: 2, name: "그림" },
  { id: 3, name: "음악" },
  { id: 4, name: "영화" },
  { id: 5, name: "독서" },
] as const;
