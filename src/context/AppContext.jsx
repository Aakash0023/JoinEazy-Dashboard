import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  users as seedUsers,
  courses as seedCourses,
  groups as seedGroups,
  assignments as seedAssignments,
} from "../data/mockData";

const AppContext = createContext();

const API_URL = "http://localhost:5000/api";

const STORAGE_KEYS = {
  currentUser: "je_current_user",
  token: "je_auth_token",
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

  const [token, setToken] = useState(
    () => localStorage.getItem(STORAGE_KEYS.token) || null
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

  const [authLoading, setAuthLoading] = useState(Boolean(token));

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
    if (token) {
      localStorage.setItem(STORAGE_KEYS.token, token);
    } else {
      localStorage.removeItem(STORAGE_KEYS.token);
    }
  }, [token]);

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
    const restoreSession = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Session expired");
        }

        const data = await response.json();

        const matchingSeedUser = seedUsers.find(
          (user) => user.email === data.user.email
        );

        setCurrentUser(
          matchingSeedUser
            ? {
                ...data.user,
                ...matchingSeedUser,
              }
            : data.user
        );
      } catch {
        setCurrentUser(null);
        setToken(null);
      } finally {
        setAuthLoading(false);
      }
    };

    restoreSession();
  }, [token]);

  useEffect(() => {
    const loadAssignments = async () => {
      if (!token) {
        return;
      }

      try {
        const response = await fetch(`${API_URL}/assignments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (data.success) {
          setAssignments(data.assignments);
        }
      } catch {
        return;
      }
    };

    loadAssignments();
  }, [token]);

  const allUsers = useMemo(() => seedUsers, []);

  const students = useMemo(
    () => seedUsers.filter((user) => user.role === "student"),
    []
  );

  const admins = useMemo(
    () => seedUsers.filter((user) => user.role === "admin"),
    []
  );

  const login = async (email, password, role) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    if (data.user.role !== role) {
      throw new Error("Invalid account type");
    }

    const matchingSeedUser = seedUsers.find(
      (user) => user.email === data.user.email
    );

    const authenticatedUser = matchingSeedUser
      ? {
          ...data.user,
          ...matchingSeedUser,
        }
      : data.user;

    setToken(data.token);
    setCurrentUser(authenticatedUser);

    return authenticatedUser;
  };

  const register = async (name, email, password, role) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    const matchingSeedUser = seedUsers.find(
      (user) => user.email === data.user.email
    );

    const authenticatedUser = matchingSeedUser
      ? {
          ...data.user,
          ...matchingSeedUser,
        }
      : data.user;

    setToken(data.token);
    setCurrentUser(authenticatedUser);

    return authenticatedUser;
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    localStorage.removeItem(STORAGE_KEYS.token);
  };

  const addAssignment = async (assignmentData) => {
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/assignments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(assignmentData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create assignment");
    }

    const newAssignment = {
      ...data.assignment,
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

    return newAssignment;
  };

  const updateAssignment = async (assignmentId, updatedData) => {
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/assignments/${assignmentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update assignment");
    }

    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              ...data.assignment,
            }
          : assignment
      )
    );

    return data.assignment;
  };

  const deleteAssignment = async (assignmentId) => {
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/assignments/${assignmentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete assignment");
    }

    setAssignments((prev) =>
      prev.filter((assignment) => assignment.id !== assignmentId)
    );
  };

  const acknowledgeAssignment = async (
    assignmentId,
    studentId = currentUser?.id
  ) => {
    if (!token || !studentId) {
      return;
    }

    const response = await fetch(
      `${API_URL}/assignments/${assignmentId}/acknowledge`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentId,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to acknowledge assignment");
    }

    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === assignmentId ? data.assignment : assignment
      )
    );

    return data.assignment;
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
    setToken(null);

    localStorage.removeItem(STORAGE_KEYS.assignments);
    localStorage.removeItem(STORAGE_KEYS.courses);
    localStorage.removeItem(STORAGE_KEYS.groups);
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    localStorage.removeItem(STORAGE_KEYS.token);
  };

  const value = {
    currentUser,
    token,
    authLoading,
    allUsers,
    assignments,
    courses,
    groups,
    students,
    admins,
    login,
    register,
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
