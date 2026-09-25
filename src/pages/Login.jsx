import { useState } from "react";
import { users } from "../data/mockData";
import { setCurrentUser } from "../utils/storage";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.email === email && user.role === role
    );

    if (!user) {
      alert("Invalid email or role");
      return;
    }

    setCurrentUser(user);
    window.location.href = user.role === "admin" ? "/admin" : "/student";
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Joineazy</h1>
          <p className="mt-2 text-slate-400">Assignment Management Dashboard</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-white">Welcome back</h2>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to continue to your dashboard
          </p>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Login as
            </label>

            <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-800 p-1">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                  role === "student"
                    ? "bg-white text-slate-900"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Student
              </button>

              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                  role === "admin"
                    ? "bg-white text-slate-900"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-500"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-500"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-white py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Sign In
          </button>

          <p className="mt-5 text-center text-xs text-slate-500">
            Demo login · {role === "student" ? "Student" : "Admin"} account
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
