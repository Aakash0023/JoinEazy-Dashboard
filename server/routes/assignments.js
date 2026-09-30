const express = require("express");
const { getAssignments, saveAssignments } = require("../data/assignments");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticateToken);

const studentIdsByEmail = {
  "aakash@example.com": 1,
  "rahul@example.com": 2,
  "priya@example.com": 3,
  "arjun@example.com": 4,
};

const groups = [
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

router.get("/", (req, res) => {
  const assignments = getAssignments();

  res.json({
    success: true,
    assignments,
  });
});

router.post("/", (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only faculty can create assignments",
      });
    }

    const {
      courseId,
      title,
      description,
      dueDate,
      dueTime,
      driveLink,
      submissionType,
    } = req.body;

    if (
      !courseId ||
      !title ||
      !description ||
      !dueDate ||
      !driveLink ||
      !submissionType
    ) {
      return res.status(400).json({
        success: false,
        message: "All assignment fields are required",
      });
    }

    if (!["individual", "group"].includes(submissionType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission type",
      });
    }

    const assignments = getAssignments();

    const newAssignment = {
      id: Date.now(),
      courseId: Number(courseId),
      title: title.trim(),
      description: description.trim(),
      dueDate,
      dueTime: dueTime || "23:59",
      driveLink: driveLink.trim(),
      submissionType,
      acknowledgments: {},
      createdBy: req.user.id,
      createdAt: new Date().toISOString(),
    };

    assignments.push(newAssignment);
    saveAssignments(assignments);

    res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      assignment: newAssignment,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.put("/:id", (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only faculty can update assignments",
      });
    }

    const assignmentId = Number(req.params.id);
    const assignments = getAssignments();

    const assignmentIndex = assignments.findIndex(
      (assignment) => assignment.id === assignmentId
    );

    if (assignmentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    const {
      courseId,
      title,
      description,
      dueDate,
      dueTime,
      driveLink,
      submissionType,
    } = req.body;

    if (
      submissionType !== undefined &&
      !["individual", "group"].includes(submissionType)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission type",
      });
    }

    const updatedAssignment = {
      ...assignments[assignmentIndex],
      ...(courseId !== undefined && {
        courseId: Number(courseId),
      }),
      ...(title !== undefined && {
        title: title.trim(),
      }),
      ...(description !== undefined && {
        description: description.trim(),
      }),
      ...(dueDate !== undefined && {
        dueDate,
      }),
      ...(dueTime !== undefined && {
        dueTime,
      }),
      ...(driveLink !== undefined && {
        driveLink: driveLink.trim(),
      }),
      ...(submissionType !== undefined && {
        submissionType,
      }),
      updatedAt: new Date().toISOString(),
    };

    assignments[assignmentIndex] = updatedAssignment;
    saveAssignments(assignments);

    res.json({
      success: true,
      message: "Assignment updated successfully",
      assignment: updatedAssignment,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.delete("/:id", (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only faculty can delete assignments",
      });
    }

    const assignmentId = Number(req.params.id);
    const assignments = getAssignments();

    const assignmentExists = assignments.some(
      (assignment) => assignment.id === assignmentId
    );

    if (!assignmentExists) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    const updatedAssignments = assignments.filter(
      (assignment) => assignment.id !== assignmentId
    );

    saveAssignments(updatedAssignments);

    res.json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.post("/:id/acknowledge", (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can acknowledge assignments",
      });
    }

    const assignmentId = Number(req.params.id);
    const studentId = studentIdsByEmail[req.user.email];

    if (!studentId) {
      return res.status(403).json({
        success: false,
        message: "Student is not part of the demo course data",
      });
    }

    const assignments = getAssignments();

    const assignmentIndex = assignments.findIndex(
      (assignment) => assignment.id === assignmentId
    );

    if (assignmentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    const assignment = assignments[assignmentIndex];
    const submittedAt = new Date().toISOString();

    if (assignment.submissionType === "individual") {
      assignment.acknowledgments = {
        ...(assignment.acknowledgments || {}),
        [studentId]: submittedAt,
      };
    }

    if (assignment.submissionType === "group") {
      const studentGroup = groups.find(
        (group) =>
          group.courseId === Number(assignment.courseId) &&
          group.memberIds.includes(studentId)
      );

      if (!studentGroup) {
        return res.status(403).json({
          success: false,
          message:
            "You are not part of any group. Form or join one to submit this assignment.",
        });
      }

      if (studentGroup.leaderId !== studentId) {
        return res.status(403).json({
          success: false,
          message: "Only the group leader can acknowledge this assignment",
        });
      }

      assignment.acknowledgments = {
        ...(assignment.acknowledgments || {}),
      };

      studentGroup.memberIds.forEach((memberId) => {
        assignment.acknowledgments[memberId] = submittedAt;
      });
    }

    assignments[assignmentIndex] = assignment;
    saveAssignments(assignments);

    res.json({
      success: true,
      message: "Assignment acknowledged successfully",
      assignment,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
