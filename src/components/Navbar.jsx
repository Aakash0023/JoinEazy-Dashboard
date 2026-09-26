import { useApp } from "../context/AppContext";

function Navbar({ onMenuClick }) {
  const { currentUser, logout } = useApp();

  const initial = currentUser?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <header className="sticky top-0 z-40 h-[72px] border-b border-white/[0.08] bg-[#0b0b0c]/75 backdrop-blur-2xl">
      <div className="flex h-full items-center justify-between px-5 sm:px-7 lg:px-10">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-9 w-9 items-center justify-center text-white/35 transition-all duration-300 hover:text-white lg:hidden"
            aria-label="Open navigation"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center bg-[#f4b942] text-sm font-bold text-black">
              J
            </div>

            <div className="hidden sm:block">
              <p className="text-[15px] font-semibold tracking-[-0.02em] text-white">
                JoinEazy
              </p>

              <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/20">
                Assignment workspace
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-medium text-white/70">
              {currentUser?.name}
            </p>

            <p className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-white/20">
              {currentUser?.role}
            </p>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-semibold text-[#f4b942] transition-all duration-300 hover:border-[#f4b942]/30 hover:bg-[#f4b942]/[0.05]">
            {initial}
          </div>

          <div className="hidden h-5 w-px bg-white/10 sm:block" />

          <button
            type="button"
            onClick={logout}
            className="group relative flex items-center gap-2 text-xs font-medium text-white/30 transition-colors duration-300 hover:text-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path
                d="M10 17l5-5-5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M15 12H4" strokeLinecap="round" />
            </svg>

            <span>Sign out</span>

            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#f4b942] transition-all duration-300 group-hover:w-full" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
