# Anyboard — Product Plan

## 1. Overview
Anyboard is a no-code, API-first dashboard builder that lets users create interactive dashboards (tables, cards, charts) from any GET-based API. Users only need to provide where the data comes from—Anyboard handles fetching, caching, and visualization.

## 2. Problem Statement
- APIs expose valuable data but lack visualization.
- Building dashboards requires frontend + backend effort.
- Existing tools are either too complex, too expensive, or too rigid.
- Anyboard enables fast, flexible dashboards without writing code.

## 3. Goals & Non-Goals

### Goals
- Create dashboards from any GET-based API without writing code.
- Make configuration safe and predictable through strong typing.
- Ensure fast and reliable data access with caching and schema validation.
- Provide a clean, responsive UI for building and viewing dashboards.

### Non-Goals (MVP)
- Write (POST/PUT/DELETE) API support.
- Native mobile apps.
- Complex ETL pipelines or data warehousing.
- Advanced role-based permissions beyond basic access control.

## 4. Target Users
- Developers & backend engineers
- Startup teams
- Product managers
- QA / ops teams
- Students & researchers

## 5. Core Features (MVP)

### 5.1 Dashboard Builder
- Create dashboards with configurable layouts
- Add and configure widgets dynamically
- Persist dashboard state and layout

### 5.2 Data Sources
- REST APIs (GET only)
- Custom headers (API keys, bearer tokens)
- Query parameters
- Pagination support
- Server-side caching

### 5.3 Widgets
- Table
  - Column selection
  - Pagination
  - Search
  - Sorting
- Cards
  - Single-value metrics
  - Label and formatting
- Charts
  - Bar
  - Line
  - Pie

## 6. Data Handling & Type Safety
- Server-side API fetching via Convex
- Request hashing for cache keys
- Configurable cache TTL
- Runtime schema validation
- Type-safe data flow from backend to UI

TypeScript is used to:
- Enforce widget configuration correctness
- Prevent invalid data source definitions
- Ensure safe API response handling
- Enable predictable widget rendering

## 7. Tech Stack
- Frontend: Next.js (App Router)
- Language: TypeScript (end-to-end)
- Styling: Tailwind CSS + shadcn/ui
- Backend & DB: Convex
- State & URL sync: nuqs

## 8. Architecture Overview
- User defines a data source
- Convex fetches API data securely
- Response is cached and validated
- Data is exposed via typed queries
- Widgets render data using strict TypeScript contracts

## 9. Type System Design
- Strongly typed widget definitions
- Discriminated unions for widget types
- Typed pagination & filter models
- Shared types between frontend and backend

This ensures:
- Compile-time safety
- Easier refactors
- Predictable extensibility

## 10. Core Domain Model (MVP)
- **Dashboard**
  - `id`, `name`, `description`, `layout`, `widgets[]`, `createdAt`, `updatedAt`
- **DataSource**
  - `id`, `name`, `baseUrl`, `headers`, `queryParams`, `pagination`
- **Widget**
  - `id`, `type`, `title`, `dataSourceId`, `config`, `layout`
- **CacheEntry**
  - `hash`, `expiresAt`, `payload`, `statusCode`, `schemaVersion`

## 11. Widget Configuration (Type Safety)
- **TableWidgetConfig**
  - `columns`, `sortableColumns`, `pageSize`, `searchable`
- **CardWidgetConfig**
  - `valueField`, `label`, `format`
- **ChartWidgetConfig**
  - `chartType` (bar | line | pie), `xField`, `yField`, `series`

## 12. API Fetching & Caching Strategy
- Hash request details (URL + headers + query params) for cache keys.
- Enforce TTL with configurable defaults per data source.
- Validate responses against schemas before caching.
- Support pagination helpers for cursor and page/limit patterns.

## 13. Observability & Error Handling
- Structured logs with request IDs and cache hit/miss status.
- Metrics for latency, cache hit rate, error counts, and schema failures.
- Graceful UI fallbacks with clear error states and retry actions.

## 14. Non-Functional Requirements
- Fast load times using caching
- Secure secret handling
- Responsive UI
- Graceful error states
- Type-safe configuration and rendering

## 15. Security & Compliance
- Never expose API keys in client-side code.
- Encrypt secrets at rest and restrict access via server-side controls.
- Record audit logs for data source creation and updates.
- Support configurable data retention policies.

## 16. Testing & Quality
- Unit tests for schema validation and widget configuration typing.
- Integration tests for API fetch + cache behavior.
- UI tests for dashboard builder flows and widget rendering.
- Type-checking enforced in CI to prevent config drift.

## 17. Delivery Plan (Start Building)
### Phase 1: Foundations
- Project scaffolding (Next.js App Router + Convex + Tailwind + shadcn/ui).
- Shared type definitions for dashboard, data sources, and widgets.
- Basic data source creation and validation flow.

### Phase 2: Data Fetching & Caching
- Convex endpoints for API proxying and caching.
- Request hashing and TTL enforcement.
- Pagination helpers and schema validation.

### Phase 3: Widgets MVP
- Table widget with pagination, search, and sorting.
- Card widget for single-value metrics.
- Chart widget with bar/line/pie.

### Phase 4: Dashboard Builder UX
- Drag-and-drop layout with persisted state.
- Widget configuration panels and preview.
- URL/state synchronization with nuqs.

### Phase 5: Hardening
- Observability dashboards and alerting.
- Edge-case handling and data source error UX.
- Performance tuning and caching improvements.

## 18. Development Kickoff Checklist
- Initialize repo structure: `apps/web`, `packages/types`, `packages/ui`, `convex/`.
- Add baseline configs: ESLint, Prettier, TypeScript, Tailwind, and shadcn/ui tokens.
- Create CI pipeline: lint, typecheck, and unit tests on pull requests.
- Establish environment conventions: `.env.local` template and secret handling docs.
- Define contribution workflow: branching strategy, PR template, and review checklist.

## 19. Industry-Standard Execution Notes
- **Security**: store secrets in server-side encrypted storage; never expose API keys to the client.
- **Reliability**: retry policies for transient API errors; circuit breakers for noisy APIs.
- **Observability**: structured logging, tracing, and dashboards for fetch latencies and cache hit rate.
- **Compliance**: audit logs for data source changes and access; configurable retention policies.
- **Performance**: incremental loading, pagination-first UX, and aggressive cache reuse.
