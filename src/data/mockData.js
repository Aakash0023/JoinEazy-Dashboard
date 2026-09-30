export const users = [
  {
    id: 1,
    name: "Aakash",
    email: "aakash@example.com",
    role: "student",
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@example.com",
    role: "student",
  },
  {
    id: 3,
    name: "Priya",
    email: "priya@example.com",
    role: "student",
  },
  {
    id: 4,
    name: "Arjun",
    email: "arjun@example.com",
    role: "student",
  },
  {
    id: 5,
    name: "Professor Sarah",
    email: "sarah@example.com",
    role: "admin",
  },
];

export const courses = [
  {
    id: 1,
    name: "Web Development",
    code: "CS301",
    description: "Modern web development using React and JavaScript.",
    professorId: 5,
    studentIds: [1, 2, 3],
  },
  {
    id: 2,
    name: "Database Systems",
    code: "CS305",
    description: "Database design, SQL, normalization, and data modeling.",
    professorId: 5,
    studentIds: [1, 2, 4],
  },
  {
    id: 3,
    name: "Artificial Intelligence",
    code: "AI401",
    description: "Foundations of machine learning and artificial intelligence.",
    professorId: 5,
    studentIds: [1, 3, 4],
  },
];

export const groups = [
  {
    id: 1,
    courseId: 1,
    name: "Team Alpha",
    leaderId: 1,
    memberIds: [1, 2],
  },
  {
    id: 2,
    courseId: 2,
    name: "Database Ninjas",
    leaderId: 2,
    memberIds: [2, 4],
  },
  {
    id: 3,
    courseId: 3,
    name: "AI Innovators",
    leaderId: 1,
    memberIds: [1, 3, 4],
  },
];

export const assignments = [
  {
    id: 1,
    courseId: 1,
    title: "React Dashboard",
    description:
      "Build a responsive dashboard using React and reusable components.",
    dueDate: "2026-10-05",
    dueTime: "23:59",
    driveLink: "https://onedrive.live.com/",
    submissionType: "individual",
    acknowledgments: {
      1: null,
      2: null,
      3: null,
    },
  },
  {
    id: 2,
    courseId: 1,
    title: "Team Web Application",
    description: "Build and submit a complete web application as a group.",
    dueDate: "2026-10-10",
    dueTime: "23:59",
    driveLink: "https://onedrive.live.com/",
    submissionType: "group",
    acknowledgments: {},
  },
  {
    id: 3,
    courseId: 2,
    title: "Database Design",
    description:
      "Design a relational database schema for a student management system.",
    dueDate: "2026-10-08",
    dueTime: "23:59",
    driveLink: "https://onedrive.live.com/",
    submissionType: "individual",
    acknowledgments: {
      1: null,
      2: null,
      4: null,
    },
  },
  {
    id: 4,
    courseId: 3,
    title: "ML Classification Model",
    description: "Build and evaluate a machine learning classification model.",
    dueDate: "2026-10-15",
    dueTime: "23:59",
    driveLink: "https://onedrive.live.com/",
    submissionType: "group",
    acknowledgments: {},
  },
];
