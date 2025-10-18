import { MOCK_POSTS } from "@/entities/post/mock/post.mock";

export async function getPosts({
  pageParam = 0,
  category,
  sortBy = "latest",
}: {
  pageParam?: number;
  category?: number;
  sortBy: "latest" | "popular";
}) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const pageSize = 10;
  const start = pageParam * pageSize;

  let filteredPosts = !category
    ? MOCK_POSTS
    : MOCK_POSTS.filter((post) => post.category === category);

  filteredPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "latest") {
      if (!b.createdAt || !a.createdAt) {
        return 0;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "popular") {
      const aEngagement =
        (a.likes || 0) + (a.retweets || 0) + (a.comments || 0);
      const bEngagement =
        (b.likes || 0) + (b.retweets || 0) + (b.comments || 0);
      return bEngagement - aEngagement;
    }

    return 0;
  });

  const posts = filteredPosts.slice(start, start + pageSize);
  const hasMore = start + pageSize < filteredPosts.length;

  return {
    posts,
    nextPage: hasMore ? pageParam + 1 : undefined,
  };
}

export const toggleLike = async (postId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
};
