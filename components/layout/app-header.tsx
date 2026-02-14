"use client";

import { UserButton } from "@clerk/nextjs";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export function AppHeader() {
  const { open } = useSidebar();

  return (
    <header className="flex h-14 items-center border-b border-border px-4">
      {!open && <SidebarTrigger className="-ml-1 mr-2" />}
      <div className="flex-1" />
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: "h-8 w-8",
          },
        }}
      />
    </header>
  );
}
