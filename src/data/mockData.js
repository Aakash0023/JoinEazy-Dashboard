// Mock "database" for the JoinEazy dashboard.
// In a real app this would live behind an API — here it just seeds
// localStorage on first run (see AppContext.jsx).

export const users = [
  { id: 1, name: "Aakash Kumar", email: "aakash@student.com", role: "student" },
  { id: 2, name: "Priya Sharma", email: "priya@student.com", role: "student" },
  { id: 3, name: "Rohan Verma", email: "rohan@student.com", role: "student" },
  { id: 4, name: "Meera Iyer", email: "meera@student.com", role: "student" },
  { id: 5, name: "Prof. Sarah Chen", email: "sarah@joineazy.com", role: "admin" },
  { id: 6, name: "Prof. Arjun Nair", email: "arjun@joineazy.com", role: "admin" },
];

export const assignments = [
  {
    id: 101,
    title: "React Fundamentals",
    description:
      "Build a responsive React application using reusable, well-structured components.",
    dueDate: "2026-09-28",
    driveLink: "https://drive.google.com/",
    createdBy: 5,
    submissions: { 1: true, 2: true, 3: false, 4: false },
  },
  {
    id: 102,
    title: "Database Design",
    description:
      "Design a relational database schema for a student management system, including ER diagrams.",
    dueDate: "2026-09-30",
    driveLink: "https://drive.google.com/",
    createdBy: 5,
    submissions: { 1: false, 2: true, 3: false, 4: true },
  },
  {
    id: 103,
    title: "JavaScript Assessment",
    description: "Complete the timed JavaScript programming assessment covering ES6+ features.",
    dueDate: "2026-10-02",
    driveLink: "https://drive.google.com/",
    createdBy: 6,
    submissions: { 1: true, 2: false, 3: false, 4: false },
  },
  {
    id: 104,
    title: "UI/UX Case Study",
    description:
      "Submit a short case study redesigning an existing product screen, with before/after notes.",
    dueDate: "2026-10-08",
    driveLink: "https://drive.google.com/",
    createdBy: 6,
    submissions: { 1: false, 2: false, 3: false, 4: false },
  },
];
