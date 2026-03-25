"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { UserButton } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Crumb {
  label: string;
  href?: string;
}

const STATIC_LABELS: Record<string, string> = {
  projects: "Projects",
  "data-sources": "Data Sources",
  dashboards: "Dashboards",
  settings: "Settings",
  new: "New",
  edit: "Edit",
};

function useBreadcrumbs(): Crumb[] {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Extract projectId if present (e.g. /projects/[id]/...)
  const projectIdIndex = segments[0] === "projects" ? 1 : -1;
  const projectId =
    projectIdIndex > 0 && projectIdIndex < segments.length
      ? segments[projectIdIndex]
      : undefined;

  const isValidProjectId = projectId && projectId !== "new";

  const project = useQuery(
    api.projects.get,
    isValidProjectId ? { id: projectId as Id<"projects"> } : "skip"
  );

  // Extract dashboardId if present
  const dashboardIdIndex = segments.indexOf("dashboards") !== -1 ? segments.indexOf("dashboards") + 1 : -1;
  const dashboardId =
    dashboardIdIndex > 0 && dashboardIdIndex < segments.length && segments[dashboardIdIndex] !== "new"
      ? segments[dashboardIdIndex]
      : undefined;

  const dashboard = useQuery(
    api.dashboards.get,
    dashboardId ? { id: dashboardId as Id<"dashboards"> } : "skip"
  );

  const crumbs: Crumb[] = [];
  let path = "";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    path += `/${segment}`;

    // If we are at the "dashboards" segment and we have a specific dashboard, skip the word "dashboards" entirely
    if (segment === "dashboards" && dashboardId) {
      continue;
    }

    const isProjectId = i === projectIdIndex;
    const isDashboardId = i === dashboardIdIndex && !!dashboardId;
    
    // Skip IDs that aren't the project ID or dashboard ID (e.g. dataSourceId)
    const isOtherId =
      !isProjectId &&
      !isDashboardId &&
      !STATIC_LABELS[segment] &&
      segment.length > 10;

    if (isProjectId) {
      crumbs.push({
        label: project?.name ?? "…",
        href: path,
      });
    } else if (isDashboardId) {
      crumbs.push({
        label: dashboard?.title ?? "…",
        href: path,
      });
    } else if (isOtherId) {
      // Skip non-project/dashboard IDs (dataSourceId)
      continue;
    } else {
      const label = STATIC_LABELS[segment] ?? segment;
      crumbs.push({ label, href: path });
    }
  }

  // Last crumb has no href (it's the current page)
  if (crumbs.length > 0) {
    delete crumbs[crumbs.length - 1].href;
  }

  return crumbs;
}

export function AppHeader() {
  const { open } = useSidebar();
  const crumbs = useBreadcrumbs();

  return (
    <header className="flex h-14 items-center border-b border-border px-4">
      {!open && <SidebarTrigger className="-ml-1 mr-2" />}

      {crumbs.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink asChild>
                      <Link prefetch href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}

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
