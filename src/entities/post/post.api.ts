import { MOCK_POSTS } from "@/entities/post/mock/post.mock";
import { Post } from "@/entities/post/post.types";

export const getPosts = async (request: {
  page: number;
  limit: number;
}): Promise<Post[]> => {
  const { page, limit } = request;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return MOCK_POSTS.slice((page - 1) * limit, page * limit);
};

export const toggleLike = async (postId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
};
