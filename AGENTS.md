# AGENTS.md

## Stack

- **Framework**: Next.js (App Router) with `"use client"` components
- **Auth**: Clerk (modal mode, no dedicated auth routes)
- **Backend**: Convex (queries, mutations, schema)
- **UI**: shadcn/ui + Tailwind CSS
- **Icons**: lucide-react
- **Fonts**: JetBrains Mono (default), Archivo Black (display headings)

## Project Structure

```
app/
  (app)/              # Protected routes (auth checked in layout)
    projects/         # Project pages
      [projectId]/    # Dynamic project routes
        settings/
      new/
  showcase/           # Design showcase pages
components/
  ui/                 # shadcn/ui base components (do not add domain logic here)
  shared/             # Reusable components (EmptyState, CardSkeleton, ColorPicker)
  project/            # Project-domain components
  dashboard/          # Dashboard-domain components
  layout/             # AppSidebar, AppHeader
  home/               # Landing page components
  providers/          # React context providers
convex/
  schema.ts           # Database schema
  projects.ts         # Project queries/mutations
  dashboards.ts       # Dashboard queries/mutations
lib/
  constants.ts        # Shared constants (colors, options, helpers)
  utils.ts            # Utility functions (cn)
```

## Naming

- **Files**: kebab-case (`project-form-fields.tsx`, `card-skeleton.tsx`)
- **Exports**: PascalCase (`ProjectFormFields`, `CardSkeleton`)
- **Constants**: UPPER_SNAKE_CASE (`PROJECT_COLORS`, `COLOR_OPTIONS`)

## Styling

- **Theme accent**: `amber-400` — used for labels, icons, highlights
- **Form labels**: Use `<Label>` from `@/components/shared/label` (bakes in amber style; `required` prop adds red asterisk)
- **Input bg**: `bg-white/3` with `border-amber-400/15`
- **Display headings**: `style={{ fontFamily: "var(--font-display), sans-serif" }}`
- **Dark mode**: Always on (`<html className="dark">`), use semantic tokens (`text-foreground`, `bg-background`)
- **Page containers**: `max-w-5xl mx-auto` for lists, `max-w-lg mx-auto` for forms
- **Card grids**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`
- **Card hover**: `hover:border-primary/50 transition-colors cursor-pointer h-full`
- **Form spacing**: `space-y-6` between fields, `space-y-2` between label and input

## Component Patterns

### Page Structure

Pages are thin orchestrators — data fetching + composition of shared components.

```tsx
"use client";

export default function PageName() {
  const data = useQuery(api.module.query);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">...</div>

      {/* Content: loading → empty → data */}
      {data === undefined ? (
        <CardSkeleton count={6} />
      ) : data.length === 0 ? (
        <EmptyState icon={Icon} title="..." description="..." action={...} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => <ItemCard key={item._id} item={item} />)}
        </div>
      )}
    </div>
  );
}
```

### Shared Components

- `Label` — amber-styled form label; `required` prop auto-appends red asterisk
- `EmptyState` — icon + title + description + optional action button
- `CardSkeleton` — renders a grid of skeleton cards (uses shadcn `Skeleton`)
- `ColorPicker` — color circle selector, consumes `COLOR_OPTIONS` from constants
- `ProjectFormFields` — complete Card with form fields (name, description, color), accepts `cardTitle`, `cardDescription`, `submitLabel`, `cancelHref`, etc.

### Dialog Components

Dialogs own their internal form state. Parent only passes `open` / `onOpenChange` and identifiers.

```tsx
<CreateDashboardDialog
  projectId={projectId}
  projectName={project.name}
  open={showNewDialog}
  onOpenChange={setShowNewDialog}
/>
```

## Convex Patterns

### Queries

- Check auth: `const identity = await ctx.auth.getUserIdentity()`
- Return `[]` if unauthenticated, `null` if not found
- Use indexes: `.withIndex("by_userId", (q) => q.eq("userId", identity.subject))`

### Mutations

- Validate auth: throw `"Not authenticated"` if no identity
- Validate ownership before update/delete
- Use `Date.now()` for `createdAt` / `updatedAt`
- Cascade deletes: parallel fetch with `Promise.all`, then parallel delete

### Schema

- User ID stored as `userId: v.string()` (Clerk subject)
- Relations via `v.id("tableName")`
- Denormalized `projectId` on `dataSources` and `widgets` for flat cascade deletes
- Every table has `createdAt` and `updatedAt` timestamps

## Auth

- **Protected layout**: `app/(app)/layout.tsx` checks `auth()` server-side, redirects to `/` if unauthenticated
- **Clerk modal**: `SignInButton mode="modal"` with `fallbackRedirectUrl="/projects"`
- **Convex identity**: `ctx.auth.getUserIdentity()` → `identity.subject` is the Clerk user ID

## Rules

- Do not add domain logic to `components/ui/` — those are shadcn/ui primitives
- Extract repeated JSX into shared or domain components
- Keep constants in `lib/constants.ts`, not duplicated across files
- Use `Doc<"tableName">` and `Id<"tableName">` for Convex types
- Button and Switch components are excluded from the amber "Subtle" style overrides
- `cursor: pointer` is applied globally to `button` elements via `globals.css`
