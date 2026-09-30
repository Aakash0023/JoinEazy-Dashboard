import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  users as seedUsers,
  courses as seedCourses,
  groups as seedGroups,
  assignments as seedAssignments,
} from "../data/mockData";

const STORAGE_KEYS = {
  currentUser: "je_current_user",
  assignments: "je_assignments",
  courses: "je_courses",
  groups: "je_groups",
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

  const [courses, setCourses] = useState(() =>
    loadJSON(STORAGE_KEYS.courses, seedCourses)
  );

  const [groups, setGroups] = useState(() =>
    loadJSON(STORAGE_KEYS.groups, seedGroups)
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.assignments, JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.courses, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.groups, JSON.stringify(groups));
  }, [groups]);

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

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addAssignment = ({
    courseId,
    title,
    description,
    dueDate,
    driveLink,
    submissionType,
  }) => {
    const course = courses.find((item) => item.id === Number(courseId));

    if (!course) return;

    setAssignments((prev) => [
      {
        id: Date.now(),
        courseId: course.id,
        title,
        description,
        dueDate,
        driveLink,
        submissionType,
        acknowledgments: {},
      },
      ...prev,
    ]);
  };

  const updateAssignment = (assignmentId, updates) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              ...updates,
            }
          : assignment
      )
    );
  };

  const acknowledgeAssignment = (assignmentId, studentId) => {
    setAssignments((prev) =>
      prev.map((assignment) => {
        if (assignment.id !== assignmentId) return assignment;

        if (assignment.submissionType === "individual") {
          return {
            ...assignment,
            acknowledgments: {
              ...assignment.acknowledgments,
              [studentId]: new Date().toISOString(),
            },
          };
        }

        const group = groups.find(
          (item) =>
            item.memberIds.includes(studentId) &&
            item.courseId === assignment.courseId
        );

        if (!group || group.leaderId !== studentId) {
          return assignment;
        }

        const updatedAcknowledgments = {
          ...assignment.acknowledgments,
        };

        group.memberIds.forEach((memberId) => {
          updatedAcknowledgments[memberId] = new Date().toISOString();
        });

        return {
          ...assignment,
          acknowledgments: updatedAcknowledgments,
        };
      })
    );
  };

  const getCourseAssignments = (courseId) =>
    assignments.filter(
      (assignment) => assignment.courseId === Number(courseId)
    );

  const getStudentCourses = (studentId) =>
    courses.filter((course) => course.studentIds.includes(studentId));

  const getProfessorCourses = (professorId) =>
    courses.filter((course) => course.professorId === professorId);

  const getStudentGroup = (studentId, courseId) =>
    groups.find(
      (group) =>
        group.courseId === Number(courseId) &&
        group.memberIds.includes(studentId)
    );

  const getAssignmentStatus = (assignment, studentId) => {
    if (assignment.acknowledgments?.[studentId]) {
      return {
        acknowledged: true,
        canAcknowledge: false,
        timestamp: assignment.acknowledgments[studentId],
      };
    }

    if (assignment.submissionType === "individual") {
      return {
        acknowledged: false,
        canAcknowledge: true,
        timestamp: null,
      };
    }

    const group = getStudentGroup(studentId, assignment.courseId);

    if (!group) {
      return {
        acknowledged: false,
        canAcknowledge: false,
        noGroup: true,
        timestamp: null,
      };
    }

    return {
      acknowledged: false,
      canAcknowledge: group.leaderId === studentId,
      isLeader: group.leaderId === studentId,
      timestamp: null,
    };
  };

  const getAssignmentAnalytics = (assignment) => {
    const course = courses.find((item) => item.id === assignment.courseId);

    if (!course) {
      return {
        total: 0,
        submitted: 0,
        pending: 0,
        progress: 0,
      };
    }

    const total =
      assignment.submissionType === "group"
        ? groups.filter((group) => group.courseId === course.id).length
        : course.studentIds.length;

    const submitted =
      assignment.submissionType === "group"
        ? groups.filter(
            (group) =>
              group.courseId === course.id &&
              group.memberIds.some(
                (memberId) => assignment.acknowledgments?.[memberId]
              )
          ).length
        : course.studentIds.filter(
            (studentId) => assignment.acknowledgments?.[studentId]
          ).length;

    const pending = Math.max(total - submitted, 0);
    const progress = total ? Math.round((submitted / total) * 100) : 0;

    return {
      total,
      submitted,
      pending,
      progress,
    };
  };

  const resetDemoData = () => {
    setAssignments(seedAssignments);
    setCourses(seedCourses);
    setGroups(seedGroups);

    localStorage.removeItem(STORAGE_KEYS.assignments);
    localStorage.removeItem(STORAGE_KEYS.courses);
    localStorage.removeItem(STORAGE_KEYS.groups);
  };

  const students = useMemo(
    () => seedUsers.filter((user) => user.role === "student"),
    []
  );

  const admins = useMemo(
    () => seedUsers.filter((user) => user.role === "admin"),
    []
  );

  const value = {
    currentUser,
    login,
    logout,
    assignments,
    courses,
    groups,
    students,
    admins,
    allUsers: seedUsers,
    addAssignment,
    updateAssignment,
    acknowledgeAssignment,
    getCourseAssignments,
    getStudentCourses,
    getProfessorCourses,
    getStudentGroup,
    getAssignmentStatus,
    getAssignmentAnalytics,
    resetDemoData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside an <AppProvider>");
  }

  return context;
}
