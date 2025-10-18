"use client";

import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/lib/ui-utils";
import {
  Heart,
  Home,
  Plus,
  Search,
  TextAlignStart,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, href: "/", label: "홈" },
    { icon: Search, href: "/search", label: "검색" },
    { icon: Plus, label: "작성", onClick: () => {} },
    { icon: Heart, href: "/activity", label: "활동" },
    { icon: UserRound, href: "/profile", label: "프로필" },
  ];

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-19 flex-col items-center bg-background md:flex">
        <Link href="/" className="py-4 hover:scale-105">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center">
            <span className="font-bold text-4xl text-amber-400 grayscale-25">
              K
            </span>
          </div>
        </Link>

        {/* Web left Navigation */}
        <div className="flex-1 px-3 lg:px-2">
          <nav className="h-full flex flex-col justify-center space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              if (item.onClick)
                return (
                  <Button
                    key={item.label}
                    variant="ghost"
                    size="icon-lg"
                    className="h-12 w-15 bg-accent hover:[&_*]:text-black"
                    onClick={item.onClick}
                  >
                    <item.icon
                      className={cn(
                        "size-6 stroke-[2.5]",
                        `${isActive ? "text-foreground" : "text-gray-400"}`
                      )}
                    />
                  </Button>
                );

              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  size="icon-lg"
                  className={"h-12 w-15"}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon
                      className={cn(
                        "size-6 stroke-[2.5]",
                        `${isActive ? "text-foreground" : "text-gray-400"}`
                      )}
                    />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>

        <div className="p-3 lg:p-3 lg:mb-4">
          <Button
            variant="ghost"
            className="w-full justify-center lg:justify-start gap-4"
            disabled
          >
            <TextAlignStart className="size-6 text-gray-400" />
          </Button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-13 z-50 bg-background">
        <div className="flex items-center justify-around h-full px-2 space-x-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            if (item.onClick)
              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  size="icon-lg"
                  className="h-11 w-full flex-1 bg-accent hover:[&_*]:text-black"
                  onClick={item.onClick}
                >
                  <item.icon
                    className={cn(
                      "size-6 stroke-[2.5]",
                      `${isActive ? "text-foreground" : "text-gray-400"}`
                    )}
                  />
                </Button>
              );

            return (
              <Button
                key={item.label}
                variant="ghost"
                size="icon-lg"
                className={"h-11 w-full flex-1"}
                asChild
              >
                <Link href={item.href}>
                  <item.icon
                    className={cn(
                      "size-6 stroke-[2.5]",
                      `${isActive ? "text-foreground" : "text-gray-400"}`
                    )}
                  />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
