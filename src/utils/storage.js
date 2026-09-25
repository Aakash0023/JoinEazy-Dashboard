export const setCurrentUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const removeCurrentUser = () => {
  localStorage.removeItem("currentUser");
};

export const getSubmissions = () => {
  const submissions = localStorage.getItem("submissions");
  return submissions ? JSON.parse(submissions) : {};
};

export const setSubmissions = (submissions) => {
  localStorage.setItem("submissions", JSON.stringify(submissions));
};
