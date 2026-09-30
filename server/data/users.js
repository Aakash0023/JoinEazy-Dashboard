const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "../database/users.json");

const getUsers = () => {
  try {
    const data = fs.readFileSync(usersFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

module.exports = {
  getUsers,
  saveUsers,
};
