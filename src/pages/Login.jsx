import { useState } from "react";
import { useApp } from "../context/AppContext";

function Login() {
  const { login, students, admins } = useApp();
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const directory = role === "student" ? students : admins;

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const user = directory.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!user) {
      setError("No record matches that email for this role — try a card below.");
      return;
    }

    // No real backend, so any non-empty password is accepted for this demo.
    login(user);
  };

  return (
    <div className="min-h-screen bg-ledger px-4 py-12 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        {/* Left: identity */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-sage">Assignment Ledger</p>
          <h1 className="mt-4 font-display text-5xl italic leading-[1.05] text-parchment sm:text-6xl">
            Every submission,
            <br />
            on the record.
          </h1>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-sage">
            Students confirm what they've turned in. Professors see exactly who
            hasn't — no spreadsheets, no guesswork.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <span className="stamp w-14 h-14">Submitted</span>
            <span className="stamp stamp-pending w-14 h-14">Open</span>
            <p className="text-xs text-sage">
              Two stamps.
              <br />
              That's the whole system.
            </p>
          </div>
        </div>

        {/* Right: the sign-in card */}
        <div className="relative rounded-sm border border-ledger-line bg-ledger-surface p-7 shadow-[0_1px_0_rgba(0,0,0,0.4)] sm:p-9">
          <span
            className="absolute left-6 top-6 h-3 w-3 rounded-full bg-ledger"
            style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)" }}
            aria-hidden="true"
          />

          <div className="pl-6">
            <h2 className="font-display text-2xl italic text-parchment">Sign in</h2>

            <div className="mt-6 flex border-b border-ledger-line text-sm">
              {["student", "admin"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRole(r);
                    setEmail("");
                    setError("");
                  }}
                  className={`relative -mb-px px-1 pb-3 pr-6 capitalize transition ${
                    role === r ? "text-parchment" : "text-sage hover:text-parchment"
                  }`}
                >
                  {r === "admin" ? "Faculty" : "Student"}
                  {role === r && (
                    <span className="absolute inset-x-0 bottom-0 h-[2px] bg-brass" />
                  )}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="mt-6 space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wide text-sage">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="field-line mt-1 w-full"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wide text-sage">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Anything works in this demo"
                  className="field-line mt-1 w-full"
                />
              </div>

              {error && <p className="text-sm text-stamp">{error}</p>}

              <button
                type="submit"
                className="w-full bg-brass py-2.5 text-sm font-medium text-ledger transition hover:bg-brass-dim"
              >
                Sign in
              </button>
            </form>

            <div className="mt-8 border-t border-ledger-line pt-6">
              <p className="mb-3 text-xs uppercase tracking-wide text-sage">
                Quick demo — {role === "admin" ? "faculty" : "students"}
              </p>
              <div className="space-y-2">
                {directory.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => login(user)}
                    className="flex w-full items-center justify-between border-b border-dashed border-ledger-line py-2 text-left transition hover:border-brass"
                  >
                    <span className="text-sm text-parchment">{user.name}</span>
                    <span className="font-mono text-xs text-sage">{user.email}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
