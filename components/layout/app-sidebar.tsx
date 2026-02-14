"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plus, LayoutDashboard, FolderOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { getColorClass } from "@/lib/constants";

export function AppSidebar() {
  const pathname = usePathname();
  const projects = useQuery(api.projects.list);

  return (
    <Sidebar>
      <SidebarHeader className="h-14 flex-row items-center justify-between border-b border-sidebar-border px-3">
        <Link
          href="/projects"
          className="flex items-center gap-2"
        >
          <LayoutDashboard className="h-5 w-5 text-amber-400" />
          <span
            className="text-sm tracking-[0.2em] uppercase font-medium"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            AnyBoard
          </span>
        </Link>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects === undefined ? (
                // Loading state
                Array.from({ length: 3 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton disabled>
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                      <span className="text-muted-foreground/30">
                        Loading...
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : projects.length === 0 ? (
                <SidebarMenuItem>
                  <div className="px-2 py-4 text-center">
                    <FolderOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                    <p className="text-xs text-muted-foreground">
                      No projects yet
                    </p>
                  </div>
                </SidebarMenuItem>
              ) : (
                projects.map((project, index) => {
                  const isActive = pathname.startsWith(
                    `/projects/${project._id}`
                  );
                  return (
                    <SidebarMenuItem key={project._id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={project.name}
                      >
                        <Link href={`/projects/${project._id}`}>
                          <div
                            className={`h-2 w-2 rounded-full shrink-0 ${getColorClass(project.color, index)}`}
                          />
                          <span className="truncate">{project.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/projects/new">
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
