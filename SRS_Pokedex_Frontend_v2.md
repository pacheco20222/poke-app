# 🧩 SRS_Pokedex_Frontend_v2.md
**Project:** Pokédex – Sunwise Frontend Technical Challenge  
**Version:** 2.1  
**Author:** José Pacheco  
**Date:** 2025-10-23  

---

## 1) Objective 🎯
Build a modern, interactive **Pokédex web application** that fulfills the Sunwise **Frontend** challenge requirements **exclusively** (this is a **separate** exercise from the Backend challenge).  
This project is also intended **for learning programming step-by-step**: every piece of code, command, and configuration must be explained with **what** it does and **why** it is needed.

---

## 2) Scope 📘
**Frontend-only** application consuming public **PokéAPI**. No backend service, no Flask/Node, no database.

### In Scope
- React + Vite + **TypeScript** project
- Functional Components + hooks
- **Material UI (MUI)** for UI and theming
- State management with **Redux Toolkit**
- API integration with **RTK Query**
- Forms & validation with **React Hook Form + Yup**
- Routing (login → main → details)
- Shiny modal, list/grid modes (with correct pagination patterns), search
- Optional **Docker** (containerized build/run)
- Documentation and explanations (what/why) oriented to learning

### Out of Scope
- Any backend (Flask/Node/Django/etc.)
- Real authentication/JWT
- Server-side persistence or databases

> **Note:** The Backend technical exercise is unrelated and will be handled separately. Do **not** mix scopes.

---

## 3) Technologies 🧠

| Category | Technology | Reason (Why) |
|---|---|---|
| Framework | **React (TypeScript)** | Type safety, better DX, clearer contracts |
| Bundler | **Vite** | Fast dev server, optimized builds |
| UI | **Material UI (MUI)** | Production-ready components, theming |
| State | **Redux Toolkit** | Predictable, modern state patterns |
| Data Fetching | **RTK Query** | Built-in caching, de-dupe, loading/error states |
| Forms | **React Hook Form** | Performant forms with minimal re-renders |
| Validation | **Yup** | Declarative schema validation |
| API | **PokéAPI** | Public Pokémon data source |
| Container | **Docker** (optional) | Reproducible environment for serving build |

---

## 4) Architecture & Structure 🏗️

### 4.1 Proposed Folder Layout
```
src/
├── app/
│   ├── store.ts             # Configures Redux store
│   └── api.ts               # RTK Query base API
├── features/
│   ├── auth/
│   │   ├── AuthSlice.ts
│   │   ├── LoginForm.tsx
│   │   └── LoginPage.tsx
│   ├── pokedex/
│   │   ├── PokedexSlice.ts
│   │   ├── components/
│   │   │   ├── PokemonCard.tsx
│   │   │   ├── PokemonList.tsx
│   │   │   ├── PokemonGrid.tsx
│   │   │   └── ShinyModal.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   └── DetailPage.tsx
│   │   └── services/
│   │       └── PokeAPI.ts   # RTK Query endpoints (list, detail, species, etc.)
├── components/
│   └── ui/                  # Reusable UI wrappers (inputs, modals, loaders)
├── hooks/
├── utils/
├── routes/
│   └── AppRouter.tsx
├── styles/
│   └── theme.ts             # MUI theme + optional dark/light toggle
└── main.tsx
```

### 4.2 Key Design Choices (What/Why)
- **Feature-first structure** keeps domain concerns together (actions, views, services).
- **RTK Query** centralizes API access, caching, and loading/error handling.
- **MUI** accelerates consistent UI with themeable components.
- **TypeScript** interfaces improve reliability and onboarding.

---

## 5) Functional Requirements ⚙️

### 5.1 Login (Simulated)
- Username + password fields (both required) with **Yup** validation.
- On submit, store a “session” flag in `localStorage` and redirect to main view.
- If session exists, login page is inaccessible until logout.

### 5.2 Main – List & Grid
- **Search by name** text field.
- **View toggle** buttons: **List** (default) / **Grid**.
- **List mode**: table with columns **Number, Name, Image, Types, Abilities**; **pagination via buttons**.
- **Grid mode**: card layout with same data; **infinite scroll**.
- Each row/card has **“Shiny”** button → opens modal with shiny images.
- Clicking a row/card → **Detail** page.

### 5.3 Detail Page
- Gallery of images (normal + shiny).
- Upper-left card: **Name, Types, Description** (prefer Spanish from species endpoint).
- Lower-left card: **Abilities** (name + description).
- Right card: **10 moves** with **Name, Power, Accuracy, Type** (fallback “N/D” if null).

---

## 6) Non-Functional Requirements 🧩

| Area | Requirement | Why |
|---|---|---|
| Performance | RTK Query caching, lazy queries where appropriate | Reduce requests and improve UX |
| Responsiveness | MUI Grid + breakpoints | Works on mobile and desktop |
| Accessibility | Keyboard focus, aria roles for modal/gallery | Inclusive, professional app |
| Maintainability | Feature-based modules, typed APIs | Easier to scale and refactor |
| Reliability | Graceful error states, retry where safe | Better perceived quality |
| Portability | Optional Docker image | Consistent run environment |

---

## 7) Optional Enhancements (Bonus) 💡
- **Theme toggle:** Light/Dark via MUI theme provider.
- **Prefetching:** RTK Query prefetch of likely-next Pokémon.
- **Testing:** Jest + React Testing Library on a few key components.
- **Persisted UI State:** Save last view mode and search text in `localStorage`.

---

## 8) Dockerization 🐳 (Optional)
> **Important:** The AI agent must **not** run commands automatically. It should **show commands in chat**, explain **what** they do and **why**, and wait for explicit permission before executing or writing files.

### 8.1 Local (No Docker)
- **Dev server:** `npm install` then `npm run dev`  
  - *What/Why:* Installs deps and runs Vite’s fast dev server with HMR for rapid iteration.
- **Prod preview:** `npm run build` then `npm run preview`  
  - *What/Why:* Builds optimized assets and previews locally to validate production behavior.

### 8.2 With Docker (Two common patterns)
- **Node-based serve**: Build and serve via a Node image (simple, single stage).  
- **Nginx static serve**: Build in Node, copy `dist/` into an Nginx image (faster, smaller runtime).  
- The agent must place `Dockerfile` and (if used) `docker-compose.yml` **only after explicit instruction**, and explain each directive (FROM, COPY, RUN, CMD) with the **why**.

---

## 9) AI Agent Collaboration Rules 🤖 (Critical)
1. **Do not create or modify files** unless I explicitly say so.  
2. **Do not run shell commands** unless I explicitly say so.  
3. Always **show code and commands in the chat first**, with explanations of **what** they do and **why** we need them.  
4. Follow the folder structure and naming in this document.  
5. Use **TypeScript** with clear types/interfaces; explain important types.  
6. When proposing changes, provide a minimal diff or snippet in chat (not written to disk) and justify the design trade-offs.  
7. For API usage, explain **endpoints, caching behavior, and error states** (e.g., PokéAPI rate-limits).  
8. All steps should be **incremental** and **reversible** (commit-by-commit plan).

---

## 10) Evaluation Mapping 🧭
| Sunwise Criterion | How This Project Demonstrates It |
|---|---|
| **Compromiso** | Completes required flows (login, list/grid, detail, shiny modal) within time; documents trade-offs. |
| **Creatividad** | Theme toggle, polished UI states, responsive and accessible patterns. |
| **Buenas prácticas** | TS strictness, RTK Query patterns, modular structure, clear error handling. |
| **Experiencia** | MUI components, Redux Toolkit, React Hook Form + Yup, RTK Query usage. |
| **Propuestas de mejora** | Optional Docker packaging, caching strategies, testing suggestions. |

---

## 11) Deliverables 📦
- Public repository with:
  - `README.md` (setup, run, optional Docker usage, assumptions)
  - Source organized per **Section 4**
  - Optional `Dockerfile` / `.dockerignore` (only after approval)
- Optional live demo (Vercel/Netlify) linked in README
- Clear commit history with meaningful messages

---

**End of Document**
