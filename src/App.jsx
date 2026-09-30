import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AssignmentPage from "./pages/AssignmentPage";
import { useApp } from "./context/AppContext";

function App() {
  const { currentUser } = useApp();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/signup"
          element={currentUser ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/assignment/:id"
          element={
            currentUser ? (
              currentUser.role === "student" ? (
                <AssignmentPage />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/"
          element={
            currentUser ? (
              currentUser.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <StudentDashboard />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
