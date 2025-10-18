"use client";

import { getPosts } from "@/entities/post/post.api";
import { PostFilter } from "@/widgets/post-list/model/post-list.types";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePosts(filters: PostFilter) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["posts", filters.categoryId, filters.sortBy],
    queryFn: ({ pageParam }) =>
      getPosts({
        pageParam,
        category: filters.categoryId,
        sortBy: filters.sortBy,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return {
    posts,
    loading: isLoading,
    hasMore: hasNextPage ?? false,
    loadMore: fetchNextPage,
    isLoadingMore: isFetchingNextPage,
    refetch,
  };
}
