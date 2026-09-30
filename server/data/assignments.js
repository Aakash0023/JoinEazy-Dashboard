const fs = require("fs");
const path = require("path");

const assignmentsFile = path.join(__dirname, "../database/assignments.json");

const getAssignments = () => {
  try {
    const data = fs.readFileSync(assignmentsFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveAssignments = (assignments) => {
  fs.writeFileSync(assignmentsFile, JSON.stringify(assignments, null, 2));
};

module.exports = {
  getAssignments,
  saveAssignments,
};
