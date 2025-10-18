"use client";

import { CreatePostForm } from "@/features/create-post/ui/create-post-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>새로운 게시물</DialogTitle>
          <DialogDescription className="sr-only">
            새로운 게시물
          </DialogDescription>
        </DialogHeader>
        <CreatePostForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
