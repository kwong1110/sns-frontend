"use client";

import { queryClient } from "@/app/_providers/react-query";
import { MOCK_POST_CATEGORIES } from "@/entities/post/mock/post-filters.mock";
import { createPost } from "@/entities/post/post.api";
import { MAX_CHARS, MAX_IMAGES, postSchema } from "@/entities/post/post.types";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from "@/shared/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Image as ImageIcon, Loader2, X } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const postFormSchema = postSchema
  .pick({
    content: true,
    images: true,
    category: true,
  })
  .required();

type PostFormValues = z.infer<typeof postFormSchema>;

interface CreatePostModalProps {
  onClose: () => void;
}

export function CreatePostForm({ onClose }: CreatePostModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: "",
      category: MOCK_POST_CATEGORIES[0].id,
      images: [],
    },
  });

  const content = form.watch("content");
  const images = form.watch("images");
  const charsLeft = MAX_CHARS - content.length;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentImages = form.getValues("images");

    if (currentImages.length + files.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}장까지만 첨부할 수 있습니다.`);
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const currentImages = form.getValues("images");
        form.setValue("images", [...currentImages, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images");
    form.setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: PostFormValues) => {
    mutate({
      content: data.content,
      category: data.category,
      images: images.length > 0 ? data.images : undefined,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {MOCK_POST_CATEGORIES.map((category) => (
                    <Button
                      key={category.id}
                      type="button"
                      variant={
                        field.value === category.id ? "default" : "outline"
                      }
                      onClick={() => field.onChange(category.id)}
                      disabled={isPending}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="새로운 소식이 있나요?"
                  className="min-h-[200px] text-lg resize-none"
                  {...field}
                />
              </FormControl>
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm ${
                    charsLeft < 0
                      ? "text-destructive"
                      : charsLeft < 20
                      ? "text-yellow-600"
                      : "text-muted-foreground"
                  }`}
                >
                  {charsLeft}자 남음
                </span>
                <span className="text-sm text-muted-foreground">
                  {content.length} / {MAX_CHARS}
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          disabled={isPending}
          render={() => (
            <FormItem>
              <FormLabel>
                이미지 ({images.length}/{MAX_IMAGES})
              </FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={images.length >= MAX_IMAGES || isPending}
                    className="w-full"
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    이미지 추가
                  </Button>

                  {images.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="relative flex-shrink-0 w-32 h-32"
                        >
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition-colors cursor-pointer"
                          >
                            <X className="h-3.5 w-3.5 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                게시 중...
              </>
            ) : (
              "게시"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
