# Phase 1 — Manual Test Checklist

## Prerequisites

- [ ] Convex dev server running (`npx convex dev`)
- [ ] Next.js dev server running (`pnpm dev`)
- [ ] Clerk environment variables set (`.env.local`)
- [ ] Convex environment variables set (`NEXT_PUBLIC_CONVEX_URL`)

---

## 1. Landing Page (Unauthenticated)

- [ ] Visit `/` — landing page renders with "DEFINE YOUR DATA. VISUALIZE IT." heading
- [ ] "Get Started" button is visible (SignInButton)
- [ ] "Start Free" button in header is visible
- [ ] Clicking "Get Started" opens Clerk sign-in modal
- [ ] Clicking "Start Free" in header opens Clerk sign-in modal

## 2. Authentication

- [ ] Sign up with a new account via Clerk modal
- [ ] After sign-in, redirected to `/projects` (not `/`)
- [ ] Header on landing page shows `UserButton` (avatar) when signed in
- [ ] "Get Started" / "Start Free" buttons are hidden when signed in
- [ ] Sign out via `UserButton` → redirected to `/`

## 3. Auth Protection

- [ ] Visit `/projects` while signed out → redirected to `/`
- [ ] Visit `/projects/new` while signed out → redirected to `/`
- [ ] Sign in → can access `/projects` normally

## 4. App Layout (Sidebar + Header)

- [ ] Sidebar shows "AnyBoard" logo with amber icon
- [ ] Sidebar shows "Projects" section
- [ ] Sidebar shows "No projects yet" empty state (if no projects)
- [ ] "New Project" button at bottom of sidebar
- [ ] Sidebar trigger (collapse button) is in the sidebar header row
- [ ] Click sidebar trigger → sidebar closes
- [ ] When sidebar is closed, trigger appears in the app header
- [ ] Click header trigger → sidebar reopens
- [ ] Keyboard shortcut `B` toggles sidebar
- [ ] Header shows Clerk `UserButton` (avatar) on the right
- [ ] Clicking `UserButton` shows Clerk dropdown (manage account, sign out)

## 5. Projects List (`/projects`)

- [ ] Shows "Projects" heading with "New Project" button
- [ ] Empty state shows folder icon + "No projects yet" message + "Create Project" button
- [ ] Loading state shows skeleton cards while data loads

## 6. Create Project (`/projects/new`)

- [ ] "Back to Projects" link navigates back
- [ ] Form has Name (required), Description (optional), Color picker fields
- [ ] Color picker shows 8 color circles, one is selected by default (amber)
- [ ] Clicking a color circle selects it (ring highlight + scale)
- [ ] Submit with empty name → button stays disabled
- [ ] Submit with valid name → "Creating..." state → redirected to new project page
- [ ] Cancel button navigates back to `/projects`
- [ ] New project appears in sidebar immediately (Convex reactive)
- [ ] New project appears in projects grid

## 7. Project Detail (`/projects/[projectId]`)

- [ ] Shows project name as heading
- [ ] Shows project description (if set)
- [ ] Settings gear icon links to `/projects/[projectId]/settings`
- [ ] "New Dashboard" button opens a dialog
- [ ] Empty state shows "No dashboards yet" message
- [ ] **Create Dashboard dialog:**
  - [ ] Title field (required)
  - [ ] Description field (optional)
  - [ ] Submit with empty title → button stays disabled
  - [ ] Submit with valid title → dashboard created, dialog closes
  - [ ] New dashboard appears in the grid immediately
  - [ ] Dashboard card shows title, description, "0 widgets"
- [ ] Sidebar highlights the active project

## 8. Project Settings (`/projects/[projectId]/settings`)

- [ ] "Back to Project" link navigates back
- [ ] Form pre-fills with current project name, description, color
- [ ] Edit name → click "Save Changes" → name updates in sidebar + project detail
- [ ] Edit description → save → description updates
- [ ] Change color → save → color dot updates in sidebar
- [ ] **Danger Zone:**
  - [ ] "Delete Project" button shows red card
  - [ ] Clicking "Delete Project" opens confirmation dialog
  - [ ] Must type exact project name to enable delete button
  - [ ] Typing wrong name → delete button stays disabled
  - [ ] Typing correct name → click "Delete Project" → project deleted → redirected to `/projects`
  - [ ] Deleted project disappears from sidebar immediately

## 9. Sidebar Navigation

- [ ] Create 2+ projects → all appear in sidebar with correct color dots
- [ ] Click a project in sidebar → navigates to that project
- [ ] Active project is highlighted in sidebar
- [ ] "AnyBoard" logo link navigates to `/projects`
- [ ] "New Project" footer button navigates to `/projects/new`

## 10. Edge Cases

- [ ] Visit `/projects/invalid-id` → redirected to `/projects`
- [ ] Visit `/projects/[projectId]/settings` for a deleted project → redirected
- [ ] Create project, sign out, sign in with different account → project not visible
- [ ] Rapidly click "Create Project" → only one project created (no double submit)
- [ ] Delete project with dashboards → all dashboards cascade deleted

---

## Summary

| Area | Tests |
|------|-------|
| Landing Page | 5 |
| Authentication | 5 |
| Auth Protection | 3 |
| App Layout | 10 |
| Projects List | 3 |
| Create Project | 8 |
| Project Detail | 10 |
| Project Settings | 10 |
| Sidebar Navigation | 5 |
| Edge Cases | 5 |
| **Total** | **64** |
