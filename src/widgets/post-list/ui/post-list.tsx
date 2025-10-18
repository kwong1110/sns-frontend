"use client";

import { PostFilter } from "@/widgets/post-list/model/post-list.types";
import { usePosts } from "@/widgets/post-list/model/use-post-list";
import { PostCard } from "@/widgets/post-list/ui/post-card/post-card";
import { PostFilters } from "@/widgets/post-list/ui/post-filters";
import { PostSkeleton } from "@/widgets/post-list/ui/post-skeleton";
import { useCallback, useEffect, useState } from "react";

export function PostList() {
  const [filters, setFilters] = useState<PostFilter>({
    sortBy: "latest",
  });

  const { posts, loading, hasMore, loadMore, isLoadingMore, refetch } =
    usePosts(filters);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 무한 스크롤
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 500 &&
        !isLoadingMore &&
        hasMore
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadingMore, hasMore, loadMore]);

  // 풀 투 리프레시 (모바일)
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      const touch = e.touches[0];
      (window as any).touchStartY = touch.clientY;
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (window.scrollY === 0 && (window as any).touchStartY) {
        const touch = e.touches[0];
        const diff = touch.clientY - (window as any).touchStartY;
        if (diff > 100 && !isRefreshing) {
          setIsRefreshing(true);
          refetch().finally(() => {
            setIsRefreshing(false);
          });
        }
      }
    },
    [isRefreshing, refetch]
  );

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleTouchStart, handleTouchMove]);

  return (
    <div>
      <PostFilters filters={filters} onFiltersChange={setFilters} />

      {isRefreshing && (
        <div className="flex justify-center py-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
        </div>
      )}

      <div>
        {loading && posts.length === 0 ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            {isLoadingMore && (
              <>
                <PostSkeleton />
                <PostSkeleton />
              </>
            )}
          </>
        )}
      </div>

      {!hasMore && posts.length > 0 && (
        <p className="border-t border-border py-8 text-center text-xs text-muted-foreground">
          모든 게시물을 확인했습니다
        </p>
      )}
    </div>
  );
}
