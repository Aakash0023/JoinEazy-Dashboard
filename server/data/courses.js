const fs = require("fs");
const path = require("path");

const coursesFile = path.join(__dirname, "../database/courses.json");

const getCourses = () => {
  try {
    const data = fs.readFileSync(coursesFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveCourses = (courses) => {
  fs.writeFileSync(coursesFile, JSON.stringify(courses, null, 2));
};

module.exports = {
  getCourses,
  saveCourses,
};
