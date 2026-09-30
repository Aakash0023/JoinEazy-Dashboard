const fs = require("fs");
const path = require("path");

const groupsFile = path.join(__dirname, "../database/groups.json");

const getGroups = () => {
  try {
    const data = fs.readFileSync(groupsFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveGroups = (groups) => {
  fs.writeFileSync(groupsFile, JSON.stringify(groups, null, 2));
};

module.exports = {
  getGroups,
  saveGroups,
};
