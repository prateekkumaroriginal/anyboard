# Phase 2 + Extra Changes — Test Plan

This document covers manual test cases for **Phase 2: Data Sources** and **post-implementation extras** (project-level data sources, dashboard card edit, dropdown modal default, wizard UX, and body validation).

---

## Prerequisites

- Signed in via Clerk.
- At least one project with at least one dashboard.
- Optional: a public GET API (e.g. `https://jsonplaceholder.typicode.com/posts`) and a POST API for connection tests.

---

## 1. Data Sources List Page & Navigation (Project-level)


| #   | Scenario                                   | Steps                                                                                              | Expected                                                                   |
| --- | ------------------------------------------ | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 1.1 | Open Data Sources from project card menu   | On Projects list, open project card kebab menu → **Data Sources**.                                | Navigate to `/projects/{projectId}/data-sources`.                           |
| 1.2 | Open Data Sources from project page header | On project detail page, click **Data Sources** action.                                             | Navigate to `/projects/{projectId}/data-sources`.                           |
| 1.3 | Project card click goes to project         | Click project card body (title/description), not the kebab menu.                                   | Navigate to project detail (e.g. `/projects/{id}`).                        |
| 1.4 | Empty state                                | Go to Data Sources for a project with no data sources.                                             | Empty state with "No data sources yet" and "Add Data Source" button.       |
| 1.5 | Back to project                            | On Data Sources page, click "Back to {project name}".                                              | Navigate to project detail.                                                |


---

## 2. Dashboard Card (Extra: Menu, Edit & Hover)


| #   | Scenario                     | Steps                                                                                    | Expected                                                   |
| --- | ---------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| 2.1 | Vertical three-dots          | View dashboard cards on project page.                                                    | Icon is **vertical** three dots (MoreVertical), top-right. |
| 2.2 | Edit from card menu          | Open the three-dots menu on a dashboard card and click **Edit**.                          | Create/edit dialog opens prefilled with dashboard data.    |
| 2.3 | Whole card hover border      | Hover anywhere on the card (including title/description).                                | Card shows primary/amber hover border.                     |
| 2.4 | Dropdown does not block page | Open the three-dots menu. Click elsewhere on the page (e.g. another card or empty area). | Menu closes; page remains clickable (non-modal dropdown).  |


---

## 3. Add Data Source — Wizard Flow (Page)


| #   | Scenario                            | Steps                                                                                      | Expected                                                                                                                    |
| --- | ----------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| 3.1 | Open Add wizard                     | On Data Sources page, click **Add Data Source**.                                           | Navigate to add page; header shows "Add Data Source", "Step 1 of 5: Basic Configuration".                                   |
| 3.2 | Step titles                         | Advance through steps 1 → 5 (with valid data).                                             | Titles: Basic Configuration → Authentication and Headers → Test Connection and Data Path → Define Schema → Review and Save. |
| 3.3 | Back only after step 1              | On step 1, check footer. On step 2, check footer.                                          | Step 1: No Back button (or placeholder). Step 2+: Back button visible.                                                      |
| 3.4 | Next disabled when invalid (step 1) | Step 1: leave Name or URL empty, or set invalid URL, or POST with empty/invalid JSON body. | Next button disabled. Fix fields → Next enables.                                                                            |
| 3.5 | Next disabled when invalid (step 2) | Step 2: set Auth to API Key and leave key name or value empty.                             | Next disabled. Fill both → Next enables. Same idea for Bearer (token) and Basic (username + password).                      |
| 3.6 | Next disabled when invalid (step 4) | Step 4: remove all schema rows or leave field name empty.                                  | Next disabled. Add at least one row with non-empty name and type → Next enables.                                            |
| 3.7 | Cancel                              | Open add page, change some fields, click Cancel.                                           | Navigate back to list; no new data source created.                                                                          |
| 3.8 | Create success                      | Complete all 5 steps with valid data; click Create Data Source.                            | Navigate back to list; new data source appears in list.                                                                     |


---

## 4. Step 1 — Basic Configuration


| #   | Scenario             | Steps                                                | Expected                                                                          |
| --- | -------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------- |
| 4.1 | Name required        | Leave name empty; try to go Next.                    | Next disabled or validation error on submit.                                      |
| 4.2 | URL validation       | Enter `not-a-url` or empty URL.                      | Invalid URL handling; Next disabled or error.                                     |
| 4.3 | Method GET/POST      | Toggle method.                                       | POST shows Request body textarea; GET hides it or it’s irrelevant for validation. |
| 4.4 | POST body required   | Set method to POST; leave body empty or whitespace.  | Next disabled or validation error (body required).                                |
| 4.5 | POST body valid JSON | Set method to POST; enter `{ invalid json`.          | Next disabled or "Request body must be valid JSON" (or similar).                  |
| 4.6 | POST body valid      | Set method to POST; enter `{"key": "value"}`.        | No body error; Next can proceed.                                                  |
| 4.7 | Response type        | Select "Array of records" and "Single object/value". | Both options work and affect step logic / later usage.                            |


---

## 5. Step 2 — Authentication and Headers


| #   | Scenario     | Steps                                                                              | Expected                                                        |
| --- | ------------ | ---------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 5.1 | Auth None    | Leave default.                                                                     | No extra fields; can proceed.                                   |
| 5.2 | API Key      | Set Auth to API Key. Enter key name and value; optionally location (header/query). | Next enabled when both name and value present.                  |
| 5.3 | Bearer       | Set Auth to Bearer; enter token.                                                   | Next enabled when token non-empty.                              |
| 5.4 | Basic        | Set Auth to Basic; enter username and password.                                    | Next enabled when both non-empty.                               |
| 5.5 | Headers      | Add one or more header rows (key + value). Remove row.                             | Rows add/remove correctly; values persist when going Back/Next. |
| 5.6 | Query params | Add/remove query parameter rows.                                                   | Same as headers.                                                |


---

## 6. Step 3 — Test Connection & Data Path


| #   | Scenario                | Steps                                                                    | Expected                                                                  |
| --- | ----------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| 6.1 | Test Connection success | Use a valid GET URL (e.g. JSON placeholder). Click Test Connection.      | Success message; raw JSON in scrollable area; optional data path preview. |
| 6.2 | Test Connection failure | Use invalid URL or unreachable host. Click Test Connection.              | Error message; no crash.                                                  |
| 6.3 | Response data path      | After success, enter a path (e.g. empty, or `data`).                     | Preview updates to show value at that path (or root).                     |
| 6.4 | Response type           | Ensure "Array of records" vs "Single object/value" is set (from step 1). | Selection is reflected (for schema step / future widgets).                |


---

## 7. Step 4 — Define Schema


| #   | Scenario          | Steps                                                                      | Expected                                                         |
| --- | ----------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 7.1 | Add/remove fields | Add field; set name, type, optional path. Remove a row.                    | Rows add/remove; at least one field with name required for Next. |
| 7.2 | Field types       | For each type (string, number, boolean, date).                             | All selectable and saved.                                        |
| 7.3 | Path optional     | Leave path empty for a flat field; set path e.g. `stats.score` for nested. | Saves correctly.                                                 |


---

## 8. Step 5 — Review and Save


| #   | Scenario           | Steps                          | Expected                                                             |
| --- | ------------------ | ------------------------------ | -------------------------------------------------------------------- |
| 8.1 | Summary            | Check summary section.         | Name, URL, method, response type, auth type, field count shown.      |
| 8.2 | Create Data Source | Click Create Data Source.      | Submits; navigates back to list; list refreshes with new source.     |
| 8.3 | Submitting state   | Click Create and watch button. | Button shows "Creating..." and is disabled during submit.            |


---

## 9. Data Source List & Card


| #   | Scenario         | Steps                                         | Expected                                                                                      |
| --- | ---------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 9.1 | Card content     | After creating a source, check its card.      | Name, URL (truncated), method badge, response type, field count, "Last fetched" (or similar). |
| 9.2 | Options placement| Check the card options button.                | Options button stays inside the card bounds.                                                   |
| 9.3 | Edit             | Open menu on card → Edit.                     | Edit page opens with existing values; steps pre-filled.                                        |
| 9.4 | Edit and save    | Change name or config; complete wizard; Save. | Changes persist; card updates.                                                                |
| 9.5 | Delete           | Open menu → Delete; confirm.                  | Confirmation dialog; on confirm, source removed from list.                                    |
| 9.6 | Delete cancel    | Open menu → Delete; cancel confirmation.      | Source not deleted.                                                                           |


---

## 10. Convex / Backend (if testable via UI or Convex dashboard)


| #    | Scenario        | Steps                                                                                  | Expected                                                               |
| ---- | --------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 10.1 | List by project | Open Data Sources for project A; create source. Open Data Sources for project B.       | Only project A’s sources shown on A’s page; B’s list independent.      |
| 10.2 | Unauthorized    | (If possible) Call list/get with wrong user or no auth.                                | No data or appropriate error.                                          |
| 10.3 | testConnection  | Trigger Test Connection with GET and POST (with body).                                 | Action returns success + data or failure + error; no CORS from client. |


---

## 11. Edge Cases & Regression


| #    | Scenario                           | Steps                                                  | Expected                                                                 |
| ---- | ---------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------ |
| 11.1 | Open wizard, switch project        | Open Add Data Source; navigate away or switch project. | No crash; on return, wizard state reset or safe.                         |
| 11.2 | Multiple runs                      | Open Add Data Source; cancel; open again.              | Fresh step 1; no stale data from previous run.                           |
| 11.3 | Schema with only empty rows        | Step 4: add rows but leave all names empty.            | Next disabled; validation "Add at least one schema field" or equivalent. |
| 11.4 | Very long name/URL                 | Enter 200-char name; 500-char URL.                     | Validation or truncation per schema (e.g. name max 120).                 |


---

## 12. Extra: Dropdown default `modal={false}`


| #    | Scenario                                | Steps                                                         | Expected                                                                                |
| ---- | --------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 12.1 | Any dropdown (e.g. dashboard card menu) | Open dropdown. Click outside (another card, header, sidebar). | Dropdown closes; clicked target receives the click (e.g. card navigates or menu opens). |
| 12.2 | Data source card menu                   | Open Edit/Delete menu on a data source card. Click elsewhere. | Menu closes without blocking page.                                                      |


---

## Sign-off

- 1.x – Navigation & list page (project-level)  
- 2.x – Dashboard card (vertical dots, edit, hover, non-modal)  
- 3.x – Wizard flow (page-based steps, Back, Next validity, Cancel, Create)  
- 4.x – Step 1 (name, URL, method, body required + JSON)  
- 5.x – Step 2 (auth types, headers, query params)  
- 6.x – Step 3 (test connection, data path)  
- 7.x – Step 4 (schema fields)  
- 8.x – Step 5 (review, save)  
- 9.x – List cards (options placement, edit, delete)  
- 10.x – Backend (project-level)  
- 11.x – Edge cases  
- 12.x – Dropdown non-modal

---

*Phase 2 scope: data source CRUD, testConnection action, user-defined schema, responseType array/object, wizard, data-sources page, scroll-area. Extras: project-level data sources, project card menu + project page entry point, dashboard card edit, whole-card link with 3-dots excluded, vertical dots, hover border, DropdownMenu modal=false default, wizard step titles map, Back only when step !== 1, Next disabled by step validity, POST body required + valid JSON.*  