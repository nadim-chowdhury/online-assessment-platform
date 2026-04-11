# Online Assessment Platform

A full-featured **Online Assessment Platform** with two panels — **Employer Panel** and **Candidate Panel** — built as part of the iBOS Frontend Engineer evaluation.

> **Live Demo:** _Coming soon_  
> **Video Walkthrough:** _Coming soon_

---

## 🚀 Tech Stack

| Category          | Technology                              |
| ----------------- | --------------------------------------- |
| Framework         | Next.js 16, React 19                    |
| State Management  | Redux Toolkit + RTK Query               |
| Forms             | React Hook Form                         |
| Validation        | Zod                                     |
| UI / Styling      | Tailwind CSS v4, ShadCN/UI              |
| Authentication    | NextAuth.js (Credentials Provider)      |
| Backend (Bonus)   | NestJS (scaffolded)                     |
| Language          | TypeScript                              |

---

## 📦 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn/pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/nadim-chowdhury/online-assessment-platform.git
cd online-assessment-platform

# ─── Frontend ───────────────────────
cd frontend
npm install
cp .env.example .env.local   # or create a .env.local with NEXTAUTH_SECRET
npm run dev
# Open http://localhost:3000

# ─── Backend (optional) ────────────
cd ../backend
npm install
npm run start:dev
# API runs on http://localhost:3001
```

### Environment Variables

Create a `frontend/.env.local` file:

```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Mock Login Credentials

| Role      | Email                   | Password |
| --------- | ----------------------- | -------- |
| Employer  | employer@test.com       | any      |
| Candidate | candidate@test.com      | any      |

> The system uses role-based mock auth — any email containing `"employer"` logs in as Employer, and any email containing `"candidate"` logs in as Candidate.

---

## 🏗️ Project Structure

```
online-assessment-platform/
├── frontend/
│   ├── app/
│   │   ├── (auth)/             # Login & Register pages
│   │   ├── (protected-routes)/
│   │   │   ├── (employer-panel)/
│   │   │   │   ├── employer-dashboard/   # Exam list with cards
│   │   │   │   └── employer-tests/       # Create/Edit/View tests
│   │   │   └── (candidate-panel)/
│   │   │       ├── candidate-dashboard/  # Available exams list
│   │   │       └── candidate-tests/      # Take exam screen
│   │   └── api/auth/           # NextAuth API route
│   ├── components/
│   │   ├── candidate/          # Candidate-specific components
│   │   ├── employer/           # Employer-specific components
│   │   ├── common/             # Shared components (navbar, footer, etc.)
│   │   └── ui/                 # ShadCN/UI components
│   ├── hooks/                  # Custom React hooks
│   ├── store/                  # Redux Toolkit store & slices
│   ├── services/               # RTK Query API services
│   └── lib/                    # Utilities & mock data
├── backend/                    # NestJS backend (scaffolded)
└── docs/                       # Project requirements
```

---

## ✨ Features Implemented

### Employer Panel
- ✅ Login with mock authentication (NextAuth Credentials)
- ✅ Dashboard with exam cards (Exam Name, Candidates, Question Sets, Exam Slots)
- ✅ "View Candidates" button on each card
- ✅ Create Online Test — Multi-step form (Step 1: Basic Info, Step 2: Question Sets)
- ✅ Form validation with React Hook Form + Zod
- ✅ Auto-computed duration from start/end time
- ✅ Add/Edit/Delete questions via modal dialog
- ✅ Rich text editor for question content
- ✅ Support for Checkbox, Radio, and Text question types
- ✅ Pagination and search with debounced filtering

### Candidate Panel
- ✅ Login with mock authentication
- ✅ Dashboard with exam cards (Duration, Questions, Negative Marking, Start button)
- ✅ Exam screen with dynamic question rendering (Radio, Checkbox, Text)
- ✅ **Real countdown timer** (30-minute exam)
- ✅ **Auto-submit on timeout**
- ✅ Manual submit option
- ✅ **Tab switch detection** — warns candidate with toast notification
- ✅ **Fullscreen exit detection** — warns candidate with toast notification
- ✅ Test Completed success screen
- ✅ Timeout state screen

### Code Quality
- ✅ **Custom Hooks**: `useCountdownTimer`, `useTabSwitchDetection`, `useFullscreenDetection`, `useDebounce`
- ✅ **Reusable Components**: TestListCard, CandidateTestCard, DashboardToolbar, TablePagination, RichEditor
- ✅ **State Management**: Redux Toolkit with exam slice (CRUD operations for questions/tests)
- ✅ **Form Validation**: Zod schemas with React Hook Form
- ✅ **Re-render Optimization**: React.memo on card components, useCallback on handlers

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

| Tool               | Usage                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| **Gemini (Antigravity)** | Primary AI coding assistant — used for architecture planning, debugging, code generation, and refactoring. Extremely effective for complex multi-file changes. |
| **GitHub Copilot** | In-editor autocomplete for boilerplate code, repetitive patterns, and unit tests.              |
| **ChatGPT**        | Research, brainstorming component architecture, and generating documentation.                  |
| **v0.dev**         | Rapid prototyping of UI components with ShadCN/UI and Tailwind CSS.                           |

**Workflow**: I use Gemini/Antigravity as the primary development partner for architectural decisions and complex implementations, GitHub Copilot for inline suggestions, and v0.dev for initial component prototyping.

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

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
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
