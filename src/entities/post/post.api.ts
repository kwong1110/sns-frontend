import { MOCK_POSTS } from "@/entities/post/mock/post.mock";
import { Post } from "@/entities/post/post.types";
import { MOCK_CURRENT_USER } from "@/entities/user/current-user.mock";
import { pick } from "lodash-es";

let mockPosts: Post[] = MOCK_POSTS;

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
    ? mockPosts
    : mockPosts.filter((post) => post.category === category);

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

export async function createPost(data: {
  content: string;
  category: number;
  images?: string[];
}): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const nextId = (mockPosts[0]?.id || 0) + 1;

  const newPost: Post = {
    id: nextId,
    author: pick(MOCK_CURRENT_USER, [
      "name",
      "nickname",
      "profileImage",
      "verified",
    ]),
    content: data.content,
    images: data.images,
    category: data.category,
    createdAt: new Date().toISOString(),
    likes: 0,
    retweets: 0,
    comments: 0,
    isLiked: false,
    isRetweeted: false,
    hasMoreComments: false,
    commentList: [],
  };

  mockPosts = [newPost, ...mockPosts];
  return newPost;
}
