# Online Assessment Platform

A full-featured **Online Assessment Platform** with two panels — **Employer Panel** and **Candidate Panel** — built as part of the iBOS Frontend Engineer evaluation.

> **Live Demo:** https://ibos-task-client.vercel.app
> **Video Walkthrough:** _Coming soon_

---

## 🚀 Tech Stack

| Category         | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | Next.js 16, React 19                |
| State Management | Redux Toolkit + RTK Query           |
| Forms            | React Hook Form                     |
| Validation       | Zod v4                              |
| UI / Styling     | Tailwind CSS v4, ShadCN/UI          |
| Authentication   | NextAuth.js (Credentials Provider)  |
| Backend (Bonus)  | NestJS + TypeORM + PostgreSQL + JWT |
| Language         | TypeScript (full-stack)             |

---

## 📦 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn/pnpm)
- **PostgreSQL** (optional — only needed if running the backend)

### Installation

```bash
# Clone the repository
git clone https://github.com/nadim-chowdhury/online-assessment-platform.git
cd online-assessment-platform

# Frontend
cd frontend
npm install
npm run dev
# Open http://localhost:3000

#  Backend (optional)
cd ../backend
npm install
npm run start:dev
# API runs on http://localhost:5000
```

### Environment Variables

**Frontend** — `frontend/.env`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend** — `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-password
DB_NAME=assessment_platform
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Mock Login Credentials

| Role      | Email              | Password |
| --------- | ------------------ | -------- |
| Employer  | employer@test.com  | any      |
| Candidate | candidate@test.com | any      |

> The system uses role-based mock auth — any email containing `"employer"` logs in as Employer, and any email containing `"candidate"` logs in as Candidate.

---

## 🏗️ Project Structure

```
online-assessment-platform/
├── frontend/
│   ├── app/
│   │   ├── (auth)/                        # Login & Register pages
│   │   ├── (protected-routes)/
│   │   │   ├── layout.tsx                 # Shared Navbar + Footer
│   │   │   ├── (employer-panel)/
│   │   │   │   ├── employer-dashboard/    # Exam list with cards
│   │   │   │   └── employer-tests/
│   │   │   │       ├── create/            # Multi-step test creation
│   │   │   │       └── [testId]/          # View test details
│   │   │   └── (candidate-panel)/
│   │   │       ├── candidate-dashboard/   # Available exams list
│   │   │       └── candidate-tests/
│   │   │           └── [testId]/          # Take exam screen
│   │   └── api/auth/                      # NextAuth API route
│   ├── components/
│   │   ├── candidate/                     # CandidateTestCard
│   │   ├── employer/                      # TestListCard, QuestionSetsForm, DashboardToolbar
│   │   ├── common/                        # Navbar, Footer, TablePagination, ModeToggle
│   │   ├── providers/                     # AuthProvider, StoreProvider, ThemeProvider
│   │   └── ui/                            # ShadCN/UI primitives
│   ├── hooks/                             # Custom React hooks
│   │   ├── use-countdown-timer.ts
│   │   ├── use-tab-switch-detection.ts
│   │   ├── use-fullscreen-detection.ts
│   │   ├── use-debounce.ts
│   │   └── use-mobile.ts
│   ├── store/
│   │   ├── index.ts                       # Redux store config
│   │   └── slices/
│   │       └── examSlice.ts               # Full CRUD for tests & questions
│   ├── services/                          # RTK Query API services
│   ├── lib/                               # Utilities & mock data
│   └── types/                             # TypeScript declarations
├── backend/                               # NestJS backend (bonus)
│   └── src/
│       ├── auth/                          # JWT auth module
│       └── ...
└── docs/                                  # Project requirements
```

---

## ✨ Features Implemented

### Employer Panel

| Feature                     | Status | Details                                                                                  |
| --------------------------- | ------ | ---------------------------------------------------------------------------------------- |
| Login Page                  | ✅     | NextAuth Credentials with role-based redirect                                            |
| Dashboard — Test List       | ✅     | Cards with Exam Name, Candidates, Question Sets, Exam Slots                              |
| Search & Pagination         | ✅     | Debounced search by title + paginated grid                                               |
| View Candidates Button      | ✅     | On each test card                                                                        |
| Create Online Test — Step 1 | ✅     | Basic Info form (Title, Candidates, Slots, Question Sets, Question Type, Start/End Time) |
| Auto-computed Duration      | ✅     | Duration calculated from start/end time                                                  |
| Form Validation             | ✅     | Zod v4 schema + React Hook Form                                                          |
| Create Online Test — Step 2 | ✅     | Question Sets with Add/Edit/Delete via modal                                             |
| Question Types              | ✅     | Checkbox, Radio (MCQ), and Text                                                          |
| Rich Text Editor            | ✅     | contentEditable toolbar with B/I/lists/undo/redo                                         |
| Full CRUD — Tests           | ✅     | Create, Read (detail page), Update, Delete via Redux                                     |
| Full CRUD — Questions       | ✅     | Add, Edit (pre-populated modal), Remove from exam                                        |
| Test Detail View            | ✅     | Dynamic data from Redux store by test ID                                                 |
| New tests appear first      | ✅     | Latest created test at top of dashboard                                                  |
| Tests visible to candidates | ✅     | Shared Redux state — employer-created tests show in candidate dashboard                  |

### Candidate Panel

| Feature                   | Status | Details                                                        |
| ------------------------- | ------ | -------------------------------------------------------------- |
| Login Page                | ✅     | NextAuth Credentials with role-based redirect                  |
| Dashboard                 | ✅     | Cards with Duration, Questions, Negative Marking, Start button |
| Search & Pagination       | ✅     | Same toolbar as employer (Create button hidden)                |
| Exam Screen               | ✅     | Dynamic question rendering (Radio, Checkbox, Text)             |
| Countdown Timer           | ✅     | 30-minute real-time countdown                                  |
| Auto-submit on Timeout    | ✅     | Triggers timeout screen when timer expires                     |
| Manual Submit             | ✅     | Submit & Finish button on last question                        |
| Tab Switch Detection      | ✅     | Toast warning with switch count                                |
| Fullscreen Exit Detection | ✅     | Toast warning with exit count                                  |
| Test Completed Screen     | ✅     | Success screen with back to dashboard                          |
| Timeout Screen            | ✅     | Timeout notification with back to dashboard                    |

### Code Quality & Best Practices

| Practice                   | Implementation                                                                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Custom Hooks**           | `useCountdownTimer`, `useTabSwitchDetection`, `useFullscreenDetection`, `useDebounce`, `useMobile`                                        |
| **Reusable Components**    | TestListCard, CandidateTestCard, DashboardToolbar, TablePagination, RichEditor, ModeToggle                                                |
| **State Management**       | Redux Toolkit with `examSlice` — full CRUD (addTest, updateTest, removeTest, addQuestion, updateQuestion, removeQuestion, resetQuestions) |
| **Form Validation**        | Zod v4 schemas with React Hook Form + `@hookform/resolvers`                                                                               |
| **Re-render Optimization** | `React.memo` on card components, `useCallback` on handlers, `useMemo` for computed values                                                 |
| **Theme Support**          | Light/Dark mode via `next-themes` with system preference detection                                                                        |
| **Type Safety**            | Full TypeScript — typed Redux state, typed components, typed hooks                                                                        |

---

## 🏆 Bonus — Backend Implementation

A **NestJS** backend is included with:

- **JWT Authentication** — Passport.js with JWT strategy
- **TypeORM + PostgreSQL** — Database-ready user management
- **Bcrypt** password hashing
- **CORS** enabled for frontend integration
- **RESTful API** architecture

---

## 📝 Additional Questions

### 1. MCP (Model Context Protocol) Integration

**Yes**, I have experience working with MCP. During this project's development, I utilized:

- **Figma MCP**: Used to extract design tokens, spacing values, and color systems directly from the Figma design file into code, ensuring pixel-perfect implementation of the UI components.
- **Browser DevTools MCP**: Leveraged for real-time debugging and DOM inspection during development, particularly useful for verifying responsive layouts and CSS specificity issues.

**How MCP could be further used in this project:**

- **Supabase MCP**: Could replace the mock authentication and data layer with a real PostgreSQL database, enabling persistent exam storage, candidate tracking, and real-time score analytics.
- **Chrome DevTools MCP**: Could be integrated for automated UI testing and accessibility audits during CI/CD pipeline execution.

---

### 2. AI Tools for Development

I actively use and recommend the following AI tools to accelerate frontend development:

| Tool               | Usage                                                                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Gemini**         | Primary AI coding assistant — used for architecture planning, debugging, code generation, and refactoring. Extremely effective for complex multi-file changes. |
| **GitHub Copilot** | In-editor autocomplete for boilerplate code, repetitive patterns, and unit tests.                                                                              |
| **ChatGPT**        | Research, brainstorming component architecture, and generating documentation.                                                                                  |
| **Claude**         | Rapid prototyping of UI components with ShadCN/UI and Tailwind CSS.                                                                                            |

**Workflow**: I use Gemini as the primary development partner for architectural decisions and complex implementations, GitHub Copilot for inline suggestions, and Claude for initial component prototyping.

---

### 3. Offline Mode — Handling Internet Loss During Exam

To handle offline mode when a candidate loses internet during an exam, I would implement the following strategy:

#### A. Local State Persistence

- Use `localStorage` or `IndexedDB` to save exam progress (answered questions, selected options) on every interaction.
- On page load, check for saved state and restore if present.

#### B. Network Detection

```typescript
// Custom hook for detecting online/offline status
function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
```

#### C. Service Worker

- Register a service worker to cache the exam page and its assets.
- The exam continues to function even without a network connection.

#### D. Sync on Reconnect

- When the user comes back online, automatically sync the locally stored answers with the server using a background sync mechanism.
- Display a toast notification: "Your answers have been synced successfully."

#### E. Timer Integrity

- The countdown timer runs client-side and is validated server-side.
- Store the exam start timestamp in the server — even if the client timer is manipulated, the server enforces the deadline.

---

## 📄 License

This project is created for evaluation purposes as part of the iBOS Frontend Engineer assessment.
