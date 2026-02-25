# AGENTS.md

## Stack

- **Framework**: Next.js (App Router) with `"use client"` components
- **Auth**: Clerk (modal mode, no dedicated auth routes)
- **Backend**: Convex (queries, mutations, schema)
- **UI**: shadcn/ui + Tailwind CSS
- **Forms**: react-hook-form + zod (schema validation)
- **Icons**: lucide-react
- **Package Manager**: pnpm
- **Fonts**: JetBrains Mono

## Naming

- **Files**: kebab-case (`project-form-fields.tsx`, `card-skeleton.tsx`)
- **Exports**: PascalCase (`ProjectFormFields`, `CardSkeleton`)
- **Constants**: UPPER_SNAKE_CASE (`PROJECT_COLORS`, `COLOR_OPTIONS`)

## Component Patterns

### Page Structure

Pages are thin orchestrators — data fetching + composition of shared components.

### Shared Components

- `EmptyState` — icon + title + description + optional action button
- `CardSkeleton` — renders a grid of skeleton cards (uses shadcn `Skeleton`)
- `ColorPicker` — color circle selector, consumes `COLOR_OPTIONS` from constants
- `ProjectFormFields` — complete Card with form fields (name, description, color), accepts `form: UseFormReturn<ProjectFormValues>`, `onSubmit`, `cardTitle`, `submitLabel`, `cancelHref`, etc.

### Dialog Components

Dialogs own their internal `useForm` + submit handler. Parent only passes `open` / `onOpenChange` and identifiers.

```tsx
<CreateDashboardDialog
  projectId={projectId}
  projectName={project.name}
  open={showNewDialog}
  onOpenChange={setShowNewDialog}
/>
```

### Form Patterns

- All forms use `react-hook-form` with `zodResolver` for validation
- Schemas live in `lib/schemas.ts` — co-export `z.infer<>` types
- Use `Controller` for all fields (provides per-field `fieldState` for `Field` integration)
- Use `Field`, `FieldGroup`, `FieldLabel`, `FieldError` from `@/components/ui/field` for layout and error display
- Async submit status (`isSubmitting`) managed via standalone `useState`, not `formState.isSubmitting`

```tsx
<Controller
  name="fieldName"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor="unique-id">
        Label <span className="text-destructive">*</span>
      </FieldLabel>
      <Input {...field} id="unique-id" placeholder="..." />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
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
- If a matching primitive exists in `components/ui/`, use it instead of custom one-off markup/styles
- Extract repeated JSX into shared or domain components
- Keep constants in `lib/constants.ts`, not duplicated across files
- Use `Doc<"tableName">` and `Id<"tableName">` for Convex types
- Button and Switch components are excluded from the amber "Subtle" style overrides
- `cursor: pointer` is applied globally to `button` elements via `globals.css`
- Use react-hook-form + zod for all forms — no manual `useState` for form fields
- Do not run "pnpm dev" or "npx convex dev" (assume already running)