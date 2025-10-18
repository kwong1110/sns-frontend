"use client";

import {
  MOCK_POST_CATEGORIES,
  MOCK_POST_SORT_OPTIONS,
} from "@/entities/post/mock/post-filters.mock";
import { PostCategry } from "@/entities/post/post-category.types";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { PostFilter } from "@/widgets/post-list/model/post-list.types";

import { ArrowUpDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const CATEGORIES: PostCategry[] = [{ name: "전체" }, ...MOCK_POST_CATEGORIES];
const SORT_OPTIONS = MOCK_POST_SORT_OPTIONS;

interface PostFiltersProps {
  filters: PostFilter;
  onFiltersChange: Dispatch<SetStateAction<PostFilter>>;
}

export function PostFilters({ filters, onFiltersChange }: PostFiltersProps) {
  return (
    <div className="border-b border-border bg-background">
      <div className="flex items-center gap-2 px-4 py-2">
        <div className="flex flex-1 gap-1 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(({ id, name }) => (
            <Button
              key={name}
              color=""
              variant={filters.categoryId === id ? "secondary" : "ghost"}
              size="sm"
              className="h-8 shrink-0 rounded-full px-3 text-xs font-medium"
              onClick={() =>
                onFiltersChange((prev) => ({ ...prev, categoryId: id }))
              }
            >
              {name}
            </Button>
          ))}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 shrink-0 gap-1 px-2"
            >
              <ArrowUpDown className="h-4 w-4" />
              <span className="hidden sm:inline">
                {
                  SORT_OPTIONS.find((opt) => opt.value === filters.sortBy)
                    ?.label
                }
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {SORT_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() =>
                  onFiltersChange({ ...filters, sortBy: option.value })
                }
                className={filters.sortBy === option.value ? "bg-accent" : ""}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
