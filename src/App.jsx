import { useEffect, useState } from "react";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { getCurrentUser } from "./utils/storage";

function App() {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const handleStorage = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  if (!user) {
    return <Login />;
  }

  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  return <StudentDashboard />;
}

export default App;
