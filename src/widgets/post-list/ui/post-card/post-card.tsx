"use client";

import { Post } from "@/entities/post/post.types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from "@/shared/components/ui";
import { formatRelativeTime } from "@/shared/lib/date-utils";
import { NO_DATA } from "@/shared/lib/ui-utils";
import { HighlightedText } from "@/widgets/post-list/ui/post-card/highlighted-text";
import { PostImages } from "@/widgets/post-list/ui/post-card/post-images";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { useState } from "react";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  return (
    <article className="border-b border-border p-4 transition-colors hover:bg-muted/20">
      <div className="flex gap-3">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarImage
            src={post.author?.profileImage || "/placeholder.svg"}
            alt={post.author?.name || NO_DATA}
          />
          <AvatarFallback>{post.author?.name || NO_DATA}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm">
              {post.author?.name || NO_DATA}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatRelativeTime(post.createdAt)}
            </span>
          </div>

          <div className="mt-1 text-[15px] leading-normal">
            <HighlightedText text={post.content || ""} />
          </div>

          {post.images && post.images.length > 0 && (
            <div className="mt-2">
              <PostImages images={post.images} />
            </div>
          )}

          <div className="mt-3 flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 gap-1.5 px-2 ${
                post.isLiked
                  ? "text-red-500 hover:text-red-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => {}}
            >
              <Heart
                className={`h-[18px] w-[18px] ${
                  post.isLiked ? "fill-current" : ""
                }`}
              />
              <span className="text-xs">{post.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-[18px] w-[18px]" />
              <span className="text-xs">{post.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`h-8 gap-1.5 px-2 ${
                post.isRetweeted
                  ? "text-green-500 hover:text-green-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => {}}
            >
              <Repeat2 className="h-[18px] w-[18px]" />
              <span className="text-xs">{post.retweets}</span>
            </Button>
          </div>

          {/*// TODO 댓글 보여주기 */}
          {showComments && <>댓글</>}
        </div>
      </div>
    </article>
  );
}
