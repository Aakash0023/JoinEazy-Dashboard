import { useState } from "react";
import { useApp } from "../context/AppContext";

function Login() {
  const { login } = useApp();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const demoUsers = {
      student: {
        id: 1,
        name: "Aakash",
        email: "aakash@example.com",
        role: "student",
      },
      admin: {
        id: 2,
        name: "Professor Sarah",
        email: "sarah@example.com",
        role: "admin",
      },
    };

    const user = demoUsers[role];

    if (user.email !== email) {
      alert("Invalid email");
      return;
    }

    login(user);
  };

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden overflow-hidden border-r border-white/10 lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4b942] text-sm font-bold text-black">
                J
              </div>

              <span className="text-lg font-semibold tracking-tight">
                JoinEazy
              </span>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#f4b942]">
              Assignment management
            </p>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] xl:text-6xl">
              Keep your work
              <br />
              <span className="text-white/45">moving forward.</span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-7 text-white/45">
              Manage assignments, track submissions and stay on top of your
              academic progress from one place.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <div className="h-1.5 w-16 rounded-full bg-[#f4b942]" />
              <div className="h-1.5 w-8 rounded-full bg-white/15" />
              <div className="h-1.5 w-4 rounded-full bg-white/10" />
            </div>
          </div>

          <p className="text-xs text-white/25">Student & faculty workspace</p>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4b942] text-sm font-bold text-black">
                  J
                </div>

                <span className="text-lg font-semibold tracking-tight">
                  JoinEazy
                </span>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium text-[#f4b942]">Welcome back</p>

              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em]">
                Sign in to your workspace
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/40">
                Access your assignments and submission progress.
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-white/70">
                  Continue as
                </label>

                <div className="grid grid-cols-2 border border-white/10 bg-white/[0.025] p-1">
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={`py-2.5 text-sm font-medium transition ${
                      role === "student"
                        ? "bg-white text-black"
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    Student
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("admin")}
                    className={`py-2.5 text-sm font-medium transition ${
                      role === "admin"
                        ? "bg-white text-black"
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    Faculty
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Email address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 w-full border border-white/10 bg-white/[0.025] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#f4b942]"
                />
              </div>

              <div className="mb-7">
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 w-full border border-white/10 bg-white/[0.025] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#f4b942]"
                />
              </div>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center bg-[#f4b942] text-sm font-semibold text-black transition hover:bg-[#ffd166]"
              >
                Sign in
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-white/25">
              Demo environment · {role === "student" ? "Student" : "Faculty"}{" "}
              access
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
