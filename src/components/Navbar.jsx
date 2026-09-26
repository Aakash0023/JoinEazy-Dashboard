import { useApp } from "../context/AppContext";

function Navbar({ onMenuClick }) {
  const { currentUser, logout } = useApp();

  const initial = currentUser?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <header className="sticky top-0 z-40 h-[72px] border-b border-white/10 bg-[#0b0b0c]/95 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-5 sm:px-7 lg:px-10">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="group flex h-9 w-9 items-center justify-center text-white/50 transition-colors duration-300 hover:text-white lg:hidden"
            aria-label="Open navigation"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
          </button>

          <div className="group flex cursor-default items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden bg-[#f4b942] text-sm font-bold text-black transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-[0_0_20px_rgba(244,185,66,0.25)]">
              <span className="relative z-10">J</span>

              <div className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-500 group-hover:translate-x-full" />
            </div>

            <div>
              <p className="text-[15px] font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#f4b942]">
                JoinEazy
              </p>

              <p className="hidden text-[10px] uppercase tracking-[0.16em] text-white/25 transition-colors duration-300 group-hover:text-white/40 sm:block">
                Assignment workspace
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-white transition-colors duration-300">
              {currentUser?.name}
            </p>

            <p className="mt-0.5 text-xs capitalize text-white/35">
              {currentUser?.role}
            </p>
          </div>

          <div className="group relative flex h-9 w-9 items-center justify-center border border-white/15 bg-white/[0.04] text-sm font-semibold text-[#f4b942] transition-all duration-300 hover:border-[#f4b942]/50 hover:bg-[#f4b942]/10 hover:shadow-[0_0_18px_rgba(244,185,66,0.12)]">
            <span className="transition-transform duration-300 group-hover:scale-110">
              {initial}
            </span>

            <span className="absolute inset-0 border border-[#f4b942]/0 transition-all duration-300 group-hover:inset-[-3px] group-hover:border-[#f4b942]/20" />
          </div>

          <div className="hidden h-6 w-px bg-white/10 sm:block" />

          <button
            type="button"
            onClick={logout}
            className="group relative text-xs font-medium text-white/40 transition-colors duration-300 hover:text-white"
          >
            <span>Sign out</span>

            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#f4b942] transition-all duration-300 group-hover:w-full" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-[#f4b942] transition-all duration-700 hover:w-full" />
    </header>
  );
}

export default Navbar;
