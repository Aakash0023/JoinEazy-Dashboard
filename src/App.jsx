import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useApp } from "./context/AppContext";

function App() {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <Login />;
  }

  return currentUser.role === "admin" ? <AdminDashboard /> : <StudentDashboard />;
}

export default App;
