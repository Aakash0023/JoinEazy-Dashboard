# JoinEazy — Student Assignment Dashboard

A role-based dashboard for managing student assignments, styled as an
**assignment ledger**: submissions get stamped, not just checked off.
Built with **React + Vite + Tailwind CSS**, with no backend — all data is
mocked and persisted in `localStorage`.

**Live demo:** _add your Netlify/Vercel URL here after deploying_

---

## ✨ Features

### Student role
- View a personal list of assignments (title, description, due date, Drive link).
- **Double-verification submission flow**: "I have submitted" → confirmation
  modal → "Yes, Confirm Submission", so a status can't be flipped by accident.
- Personal stats (total / submitted / pending) and an overall completion
  progress bar.
- Only ever sees their **own** submission status — never another student's.

### Admin (professor) role
- **Create assignments** with a title, description, due date, and an
  external Drive link, via a modal form.
- Only sees the assignments **they personally created** (filtered by
  `createdBy`), never another admin's.
- Per-assignment breakdown: an aggregate progress bar (e.g. "3 of 4 students
  submitted") plus a per-student list, each with a status badge and an
  individual progress indicator.
- Top-level stats: assignments created, total students, submissions
  received, and overall submission rate.

### Shared
- Role-based login (with one-click demo accounts — see below).
- Fully responsive: a collapsible drawer sidebar on mobile, fixed sidebar on
  desktop, and a stacked layout on small screens.
- Data survives page refresh via `localStorage` (acts as a mock database).

---

## 🧰 Tech stack

- **React 19** (function components + hooks only: `useState`, `useEffect`,
  `useMemo`, `useContext`)
- **Context API** for global auth + assignment state (`AppContext`)
- **Vite** for tooling/dev server
- **Tailwind CSS v4** for styling
- No routing library — the app is a single view that swaps between
  Login / Student Dashboard / Admin Dashboard based on the logged-in user,
  which keeps the mock-data model simple.

---

## 🚀 Getting started

```bash
# 1. Clone the repo
git clone https://github.com/Aakash0023/JoinEazy-Dashboard.git
cd JoinEazy-Dashboard

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

### Other scripts

```bash
npm run build     # production build into /dist
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

### Demo accounts

No backend means no real authentication — pick a role on the login screen
and either click one of the **quick demo login** cards, or type one of these
emails with any password:

| Role    | Name             | Email                  |
| ------- | ---------------- | ----------------------- |
| Student | Aakash Kumar     | aakash@student.com     |
| Student | Priya Sharma     | priya@student.com      |
| Student | Rohan Verma      | rohan@student.com      |
| Student | Meera Iyer       | meera@student.com      |
| Admin   | Prof. Sarah Chen | sarah@joineazy.com     |
| Admin   | Prof. Arjun Nair | arjun@joineazy.com     |

There are two admin accounts on purpose — logging in as each shows a
different, correctly-filtered set of assignments, which demonstrates the
"see only your own data" requirement for admins too.

To reset the demo data back to its seeded state, clear your browser's
localStorage for the site (DevTools → Application → Local Storage) and
refresh.

---

## 📁 Folder structure

```
src/
├── components/
│   ├── admin/
│   │   ├── AssignmentAdminCard.jsx   # per-assignment student breakdown
│   │   └── CreateAssignmentModal.jsx # "New Assignment" form
│   ├── layout/
│   │   └── DashboardLayout.jsx       # navbar + sidebar shell, shared by both roles
│   ├── AssignmentCard.jsx            # student-facing assignment card + confirm flow
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── ProgressBar.jsx               # reusable progress bar (used by both roles)
│   └── StatusBadge.jsx               # reusable Submitted/Pending badge
├── context/
│   └── AppContext.jsx                # auth + assignment state, localStorage persistence
├── data/
│   └── mockData.js                   # seed users + assignments ("mock API")
├── pages/
│   ├── Login.jsx
│   ├── StudentDashboard.jsx
│   └── AdminDashboard.jsx
├── App.jsx                           # top-level role router (Login/Student/Admin)
└── main.jsx                          # app entry, wraps App in <AppProvider>
```

---

## 🎨 Visual identity

The UI leans into the subject matter — assignments, deadlines, submissions —
instead of a generic dark SaaS dashboard:

- **Ledger, not cards.** Assignments and student rows are laid out as ruled
  ledger entries (hairline dividers, no boxed cards), like lines in a
  gradebook rather than a stack of identical rounded tiles.
- **Stamps, not pills.** Submission status is an ink stamp: a solid,
  slightly-rotated ring reading "Submitted" for done, a dashed "Open" ring
  for pending — instead of a generic colored badge. Confirming a submission
  animates the stamp dropping into place, the one deliberate motion moment
  in the app.
- **Folder-tab navigation.** The sidebar reads as tabs on a folder rather
  than a generic nav list.
- **Index-card sign-in.** The login screen is framed as a physical record
  card (punch-hole detail, underlined "ruled paper" fields) rather than a
  boxed form.
- **Type:** Fraunces (an editorial serif) for headings, IBM Plex Sans for
  UI text, and IBM Plex Mono strictly for real tabular data — dates and
  percentages — where fixed-width digits genuinely help.
- **Palette:** deep pine green (`#16231C`) base, parchment (`#F2EDE1`) text,
  brass (`#D8A94E`) as the single accent, with moss green / stamp red
  reserved only for submitted/pending status.

All of this lives in `src/index.css` as Tailwind v4 `@theme` tokens
(`bg-ledger`, `text-parchment`, `font-display`, etc.) plus two small custom
utility classes (`.stamp`, `.field-line`), so new components stay consistent
by using the same tokens rather than one-off colors.

## 🧠 Architecture & design decisions

**State management — Context API over prop drilling.**
`AppContext` is the single source of truth for the logged-in user and the
assignment list. Both dashboards, the login screen, and every shared
component read from `useApp()` instead of passing the same props down
several levels. This keeps components focused on rendering rather than
plumbing.

**Mock backend — localStorage as the persistence layer.**
There's no server, so `AppContext` seeds itself from `mockData.js` on first
load, then reads/writes two localStorage keys (`je_current_user`,
`je_assignments`) on every change. This is a thin stand-in for what would
otherwise be REST/GraphQL calls — swapping it for a real API later would
mean changing `AppContext` only, not any page or component.

**Per-user data isolation is enforced in the data layer, not the UI.**
- Students only ever read `assignment.submissions[currentUser.id]` — they
  have no code path that can read another student's status.
- Admins filter `assignments` by `createdBy === currentUser.id` before
  rendering anything, so one admin never sees another admin's assignments.

This means the isolation isn't just "hidden in the UI" — the component
never receives the other user's data in the first place.

**Reusable primitives.**
`ProgressBar` and `StatusBadge` are deliberately generic (no assignment- or
role-specific logic inside them) so they're reused as-is in three different
contexts: a student's overall completion bar, an admin's aggregate
per-assignment bar, and the binary (0%/100%) per-student bar in the admin
breakdown.

**Double-verification submission flow.**
`AssignmentCard` holds a local `showConfirmation` boolean. Clicking
"I have submitted" only opens a confirmation modal; the actual state change
(`setSubmissionStatus`) fires only after the second, explicit
"Yes, Confirm Submission" click. This avoids accidental taps changing a
real submission record.

**Responsiveness.**
Tailwind's responsive prefixes (`sm:`, `lg:`) drive the layout: the sidebar
is a fixed column on `lg` screens and an off-canvas drawer (triggered from
the navbar hamburger button) below that; stat cards and grids collapse from
3–4 columns down to 1 column on narrow viewports.

---

## 📦 Deployment

The project builds to a static `dist/` folder, so it deploys to any static
host.

**Vercel**
1. Import the GitHub repo at vercel.com/new.
2. Framework preset: Vite. Build command: `npm run build`. Output dir: `dist`.
3. Deploy — no environment variables are needed.

**Netlify**
1. app.netlify.com → "Add new site" → "Import an existing project" → pick
   this repo.
2. Build command: `npm run build`. Publish directory: `dist`.
3. Deploy.

(Or drag-and-drop the local `dist/` folder onto Netlify's dashboard for a
one-off deploy without connecting Git.)

---

## 🔭 Possible next steps

- Replace the mock data layer with a real API (Express/Firebase/Supabase),
  changing only `AppContext.jsx`.
- Real authentication (passwords are currently unchecked, by design, since
  there's no backend).
- Assignment editing/deletion for admins, and file-upload submissions
  instead of external Drive links.
