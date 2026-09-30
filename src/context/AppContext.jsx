import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  users as seedUsers,
  courses as seedCourses,
  groups as seedGroups,
  assignments as seedAssignments,
} from "../data/mockData";

const AppContext = createContext();

const STORAGE_KEYS = {
  currentUser: "je_current_user",
  assignments: "je_assignments",
  courses: "je_courses",
  groups: "je_groups",
};

const loadJSON = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

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
    if (currentUser) {
      localStorage.setItem(
        STORAGE_KEYS.currentUser,
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem(STORAGE_KEYS.currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.assignments, JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.courses, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.groups, JSON.stringify(groups));
  }, [groups]);

  const allUsers = useMemo(() => seedUsers, []);

  const students = useMemo(
    () => seedUsers.filter((user) => user.role === "student"),
    []
  );

  const admins = useMemo(
    () => seedUsers.filter((user) => user.role === "admin"),
    []
  );

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addAssignment = (assignmentData) => {
    const newAssignment = {
      ...assignmentData,
      id: Date.now(),
      acknowledgments: {},
    };

    if (assignmentData.submissionType === "individual") {
      const course = courses.find(
        (item) => item.id === assignmentData.courseId
      );

      if (course) {
        newAssignment.acknowledgments = course.studentIds.reduce(
          (result, studentId) => {
            result[studentId] = null;
            return result;
          },
          {}
        );
      }
    }

    setAssignments((prev) => [...prev, newAssignment]);
  };

  const updateAssignment = (assignmentId, updatedData) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === assignmentId
          ? { ...assignment, ...updatedData }
          : assignment
      )
    );
  };

  const deleteAssignment = (assignmentId) => {
    setAssignments((prev) =>
      prev.filter((assignment) => assignment.id !== assignmentId)
    );
  };

  const acknowledgeAssignment = (assignmentId, studentId = currentUser?.id) => {
    if (!studentId) return;

    setAssignments((prev) =>
      prev.map((assignment) => {
        if (assignment.id !== assignmentId) {
          return assignment;
        }

        const submittedAt = new Date().toISOString();

        if (assignment.submissionType === "group") {
          const group = groups.find(
            (item) =>
              item.courseId === assignment.courseId &&
              item.memberIds.includes(studentId)
          );

          if (!group || group.leaderId !== studentId) {
            return assignment;
          }

          const updatedAcknowledgments = {
            ...assignment.acknowledgments,
          };

          group.memberIds.forEach((memberId) => {
            updatedAcknowledgments[memberId] = submittedAt;
          });

          return {
            ...assignment,
            acknowledgments: updatedAcknowledgments,
          };
        }

        return {
          ...assignment,
          acknowledgments: {
            ...assignment.acknowledgments,
            [studentId]: submittedAt,
          },
        };
      })
    );
  };

  const getCourseAssignments = (courseId) => {
    return assignments.filter((assignment) => assignment.courseId === courseId);
  };

  const getStudentCourses = (studentId = currentUser?.id) => {
    return courses.filter((course) => course.studentIds.includes(studentId));
  };

  const getProfessorCourses = (professorId = currentUser?.id) => {
    return courses.filter((course) => course.professorId === professorId);
  };

  const getStudentGroup = (courseId, studentId = currentUser?.id) => {
    return groups.find(
      (group) =>
        group.courseId === courseId && group.memberIds.includes(studentId)
    );
  };

  const getAssignmentStatus = (assignment, studentId = currentUser?.id) => {
    if (!studentId) {
      return {
        acknowledged: false,
        overdue: false,
        status: "pending",
      };
    }

    let acknowledged = Boolean(assignment.acknowledgments?.[studentId]);

    if (assignment.submissionType === "group") {
      const group = groups.find(
        (item) =>
          item.courseId === assignment.courseId &&
          item.memberIds.includes(studentId)
      );

      if (group) {
        acknowledged = group.memberIds.some((memberId) =>
          Boolean(assignment.acknowledgments?.[memberId])
        );
      }
    }

    const dueDateTime = new Date(
      `${assignment.dueDate}T${assignment.dueTime || "23:59"}`
    );

    const overdue =
      !acknowledged &&
      !Number.isNaN(dueDateTime.getTime()) &&
      dueDateTime < new Date();

    return {
      acknowledged,
      overdue,
      status: acknowledged ? "submitted" : overdue ? "overdue" : "pending",
    };
  };

  const getAssignmentAnalytics = (assignment) => {
    const course = courses.find((item) => item.id === assignment.courseId);

    if (!course) {
      return {
        total: 0,
        submitted: 0,
        pending: 0,
        overdue: 0,
        percentage: 0,
        students: [],
        groups: [],
      };
    }

    const courseStudents = students.filter((student) =>
      course.studentIds.includes(student.id)
    );

    const studentStatuses = courseStudents.map((student) => {
      const status = getAssignmentStatus(assignment, student.id);

      return {
        student,
        ...status,
      };
    });

    const submitted = studentStatuses.filter(
      (item) => item.acknowledged
    ).length;

    const overdue = studentStatuses.filter((item) => item.overdue).length;

    const pending = studentStatuses.filter(
      (item) => !item.acknowledged && !item.overdue
    ).length;

    const total = courseStudents.length;

    const courseGroups = groups.filter(
      (group) => group.courseId === assignment.courseId
    );

    const groupStatuses = courseGroups.map((group) => {
      const groupMembers = courseStudents.filter((student) =>
        group.memberIds.includes(student.id)
      );

      const submittedByMember = groupMembers.some((student) =>
        Boolean(assignment.acknowledgments?.[student.id])
      );

      const dueDateTime = new Date(
        `${assignment.dueDate}T${assignment.dueTime || "23:59"}`
      );

      const groupOverdue =
        !submittedByMember &&
        !Number.isNaN(dueDateTime.getTime()) &&
        dueDateTime < new Date();

      return {
        group,
        members: groupMembers,
        submitted: submittedByMember,
        overdue: groupOverdue,
        status: submittedByMember
          ? "submitted"
          : groupOverdue
          ? "overdue"
          : "pending",
      };
    });

    return {
      total,
      submitted,
      pending,
      overdue,
      percentage: total ? Math.round((submitted / total) * 100) : 0,
      students: studentStatuses,
      groups: groupStatuses,
    };
  };

  const resetDemoData = () => {
    setAssignments(seedAssignments);
    setCourses(seedCourses);
    setGroups(seedGroups);
    setCurrentUser(null);

    localStorage.removeItem(STORAGE_KEYS.assignments);
    localStorage.removeItem(STORAGE_KEYS.courses);
    localStorage.removeItem(STORAGE_KEYS.groups);
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  };

  const value = {
    currentUser,
    allUsers,
    assignments,
    courses,
    groups,
    students,
    admins,
    login,
    logout,
    addAssignment,
    updateAssignment,
    deleteAssignment,
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
  return useContext(AppContext);
}
