# TECHNICAL ARCHITECTURE – O247
Framework: Next.js (App Router)
Language: TypeScript
Styling: Tailwind CSS
Hosting: Vercel
Database: None (Phase 1)
Authentication: None (Phase 1)

---

## 1. Architectural Model

O247 uses Next.js App Router under `/src/app`.

This implies:

- Server Components by default
- Nested layouts
- Route segment-based architecture
- Future-ready API routes under `/app/api`

---

## 2. Component Rules

### Default Rule:
Use Server Components unless client-side interactivity is required.

### Use "use client" ONLY when:
- Handling local state
- Handling event listeners
- Using browser-only APIs
- Implementing interactive UI elements

Avoid unnecessary client components.

---

## 3. Layout Structure

Use nested layouts strategically:

/app
  layout.tsx (global structure)
  /planning
  /parks
  /transportation

Avoid rigid monolithic page files.

Layout hierarchy must support:

- Future dashboard injection
- AI interaction panels
- Context-based navigation

---

## 4. Data Strategy (Phase 1)

All content is static or server-rendered.

No:
- Database queries
- External data calls
- Authentication checks

Prepare structure for future dynamic injection.

---

## 5. API Readiness (Phase 2)

Future AI endpoints should live under:

/app/api/

Example:
- /api/itinerary
- /api/recommendation

These must remain isolated from frontend rendering logic.

---

## 6. State Management

Phase 1:
No global state libraries.

Avoid:
- Redux
- Zustand
- Context overuse

Local state only in necessary client components.

---

## 7. Anti-Patterns

Do NOT:

- Convert everything into client components.
- Mix business logic inside UI components.
- Hardcode Orlando as permanent destination.
- Introduce authentication prematurely.
- Over-abstract early.

---

## 8. Scalability Protection

Future requirements:

Phase 2:
- User session context
- Editable itinerary data model
- API integration

Phase 3:
- Product grid layout compatibility
- Transaction UI compatibility

Phase 4:
- Dynamic routing for multiple destinations

Current structure must not block these expansions.
