"use client";

import { PostList } from "@/widgets/post-list/ui/post-list";
import { Sidebar } from "@/widgets/sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 justify-center md:ml-19">
        <main className="w-full lg:max-w-[640px] border-x border-border pb-16 md:pb-0 bg-primary-foreground">
          <PostList />
        </main>
      </div>
    </div>
  );
}
