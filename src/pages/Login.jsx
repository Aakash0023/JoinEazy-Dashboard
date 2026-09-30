import { useState } from "react";
import { useApp } from "../context/AppContext";

function Login() {
  const { login, register } = useApp();

  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password, role);
      } else {
        await register(name, email, password, role);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0b0c] text-white">
      <div className="relative grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#f4b942]/[0.025] blur-3xl" />

        <section className="relative hidden overflow-hidden border-r border-white/[0.08] lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4b942] text-sm font-bold text-black shadow-[0_0_24px_rgba(244,185,66,0.12)]">
                J
              </div>

              <span className="text-lg font-semibold tracking-tight">
                JoinEazy
              </span>
            </div>
          </div>

          <div className="relative z-10 max-w-xl">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f4b942]">
              Assignment management
            </p>

            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.055em] xl:text-6xl">
              Keep your work
              <br />
              <span className="text-white/35">moving forward.</span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-7 text-white/40">
              Manage assignments, track submissions and stay on top of your
              academic progress from one place.
            </p>

            <div className="mt-10 flex items-center gap-2">
              <div className="h-1.5 w-16 rounded-full bg-[#f4b942] shadow-[0_0_12px_rgba(244,185,66,0.3)]" />
              <div className="h-1.5 w-8 rounded-full bg-white/10" />
              <div className="h-1.5 w-4 rounded-full bg-white/[0.06]" />
            </div>
          </div>

          <p className="relative z-10 text-xs text-white/20">
            Student & faculty workspace
          </p>
        </section>

        <section className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="pointer-events-none absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#f4b942]/[0.025] blur-3xl" />

          <div className="relative z-10 w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4b942] text-sm font-bold text-black shadow-[0_0_24px_rgba(244,185,66,0.12)]">
                  J
                </div>

                <span className="text-lg font-semibold tracking-tight">
                  JoinEazy
                </span>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f4b942]">
                {mode === "login" ? "Welcome back" : "Get started"}
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
                {mode === "login"
                  ? "Sign in to your workspace"
                  : "Create your workspace account"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/35">
                {mode === "login"
                  ? "Access your assignments and submission progress."
                  : "Create an account to manage your academic workspace."}
              </p>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl border border-white/[0.08] bg-black/20 p-1">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`h-10 rounded-lg text-sm font-medium transition-all duration-300 ${
                  mode === "login"
                    ? "bg-white/[0.08] text-white"
                    : "text-white/30 hover:text-white"
                }`}
              >
                Sign in
              </button>

              <button
                type="button"
                onClick={() => switchMode("register")}
                className={`h-10 rounded-lg text-sm font-medium transition-all duration-300 ${
                  mode === "register"
                    ? "bg-white/[0.08] text-white"
                    : "text-white/30 hover:text-white"
                }`}
              >
                Register
              </button>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.018] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.2)] sm:p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    {mode === "login" ? "Continue as" : "Account type"}
                  </label>

                  <div className="grid grid-cols-2 gap-1 rounded-xl border border-white/[0.08] bg-black/20 p-1">
                    <button
                      type="button"
                      onClick={() => setRole("student")}
                      className={`h-11 rounded-lg text-sm font-medium transition-all duration-300 ${
                        role === "student"
                          ? "bg-[#f4b942] text-black shadow-[0_0_20px_rgba(244,185,66,0.08)]"
                          : "text-white/35 hover:bg-white/[0.03] hover:text-white"
                      }`}
                    >
                      Student
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole("admin")}
                      className={`h-11 rounded-lg text-sm font-medium transition-all duration-300 ${
                        role === "admin"
                          ? "bg-[#f4b942] text-black shadow-[0_0_20px_rgba(244,185,66,0.08)]"
                          : "text-white/35 hover:bg-white/[0.03] hover:text-white"
                      }`}
                    >
                      Faculty
                    </button>
                  </div>
                </div>

                {mode === "register" && (
                  <div className="mb-5">
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                      Full name
                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="h-12 w-full rounded-lg border border-white/[0.09] bg-black/20 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/15 focus:border-[#f4b942]/50 focus:bg-[#f4b942]/[0.015] focus:shadow-[0_0_22px_rgba(244,185,66,0.05)]"
                      required
                    />
                  </div>
                )}

                <div className="mb-5">
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    Email address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-lg border border-white/[0.09] bg-black/20 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/15 focus:border-[#f4b942]/50 focus:bg-[#f4b942]/[0.015] focus:shadow-[0_0_22px_rgba(244,185,66,0.05)]"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    minLength={6}
                    className="h-12 w-full rounded-lg border border-white/[0.09] bg-black/20 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/15 focus:border-[#f4b942]/50 focus:bg-[#f4b942]/[0.015] focus:shadow-[0_0_22px_rgba(244,185,66,0.05)]"
                    required
                  />
                </div>

                {error && (
                  <div className="mb-5 rounded-lg border border-red-400/10 bg-red-400/[0.04] px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-lg bg-[#f4b942] text-sm font-semibold text-black shadow-[0_0_25px_rgba(244,185,66,0.08)] transition-all duration-300 hover:bg-[#ffd166] hover:shadow-[0_0_32px_rgba(244,185,66,0.14)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {loading
                      ? "Please wait..."
                      : mode === "login"
                      ? "Sign in"
                      : "Create account"}
                  </span>

                  <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
                </button>
              </form>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/15">
              <span className="h-1 w-1 rounded-full bg-[#f4b942]" />
              JWT secured
              <span className="text-white/10">·</span>
              {role === "student" ? "Student" : "Faculty"} access
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
