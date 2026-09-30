const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "../database/users.json");

let usersCache = null;

const getUsers = () => {
  if (usersCache) {
    return usersCache;
  }

  try {
    const data = fs.readFileSync(usersFile, "utf-8");
    usersCache = JSON.parse(data);
    return usersCache;
  } catch {
    usersCache = [];
    return usersCache;
  }
};

const saveUsers = (users) => {
  usersCache = users;
};

module.exports = {
  getUsers,
  saveUsers,
};
