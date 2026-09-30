const express = require("express");
const { getCourses } = require("../data/courses");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticateToken);

router.get("/", (req, res) => {
  try {
    const courses = getCourses();

    if (req.user.role === "admin") {
      return res.json({
        success: true,
        courses,
      });
    }

    const studentIdByEmail = {
      "aakash@example.com": 1,
      "rahul@example.com": 2,
      "priya@example.com": 3,
      "arjun@example.com": 4,
    };

    const studentId = studentIdByEmail[req.user.email];

    if (!studentId) {
      return res.json({
        success: true,
        courses: [],
      });
    }

    const studentCourses = courses.filter((course) =>
      course.studentIds.includes(studentId)
    );

    res.json({
      success: true,
      courses: studentCourses,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
