export const users = [
  {
    id: 1,
    name: "Aakash",
    email: "aakash@example.com",
    role: "student",
  },
  {
    id: 2,
    name: "Professor Sarah",
    email: "sarah@example.com",
    role: "admin",
  },
];

export const assignments = [
  {
    id: 1,
    title: "React Fundamentals",
    description:
      "Build a responsive React application using reusable components.",
    dueDate: "2026-09-28",
    driveLink: "https://drive.google.com/",
    createdBy: 2,
    submissions: {
      1: false,
    },
  },
  {
    id: 2,
    title: "Database Design",
    description:
      "Design a relational database schema for a student management system.",
    dueDate: "2026-09-30",
    driveLink: "https://drive.google.com/",
    createdBy: 2,
    submissions: {
      1: false,
    },
  },
  {
    id: 3,
    title: "JavaScript Assessment",
    description: "Complete the JavaScript programming assessment.",
    dueDate: "2026-10-02",
    driveLink: "https://drive.google.com/",
    createdBy: 2,
    submissions: {
      1: true,
    },
  },
];
