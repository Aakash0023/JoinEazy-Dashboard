import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  users as seedUsers,
  assignments as seedAssignments,
} from "../data/mockData";

const STORAGE_KEYS = {
  currentUser: "je_current_user",
  assignments: "je_assignments",
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() =>
    loadJSON(STORAGE_KEYS.currentUser, null)
  );

  const [assignments, setAssignments] = useState(() =>
    loadJSON(STORAGE_KEYS.assignments, seedAssignments)
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.assignments, JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        STORAGE_KEYS.currentUser,
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem(STORAGE_KEYS.currentUser);
    }
  }, [currentUser]);

  const login = (user) => setCurrentUser(user);
  const logout = () => setCurrentUser(null);

  const addAssignment = ({ title, description, dueDate, driveLink }) => {
    setAssignments((prev) => [
      {
        id: Date.now(),
        title,
        description,
        dueDate,
        driveLink,
        createdBy: currentUser.id,
        submissions: {},
      },
      ...prev,
    ]);
  };

  const setSubmissionStatus = (assignmentId, studentId, submitted) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              submissions: {
                ...assignment.submissions,
                [studentId]: submitted,
              },
            }
          : assignment
      )
    );
  };

  const resetDemoData = () => {
    setAssignments(seedAssignments);
    localStorage.removeItem(STORAGE_KEYS.assignments);
  };

  const students = useMemo(
    () => seedUsers.filter((u) => u.role === "student"),
    []
  );

  const admins = useMemo(() => seedUsers.filter((u) => u.role === "admin"), []);

  const value = {
    currentUser,
    login,
    logout,
    assignments,
    addAssignment,
    setSubmissionStatus,
    resetDemoData,
    students,
    admins,
    allUsers: seedUsers,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useApp must be used inside an <AppProvider>");
  }

  return ctx;
}
