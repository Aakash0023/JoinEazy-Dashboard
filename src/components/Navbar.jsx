import { useApp } from "../context/AppContext";

function Navbar({ onMenuClick }) {
  const { currentUser, logout } = useApp();
  const initial = currentUser?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <header className="sticky top-0 z-30 border-b border-ledger-line/80 bg-ledger/90 backdrop-blur-xl">
      <div className="flex h-[76px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-lg text-sage transition hover:bg-ledger-surface hover:text-parchment lg:hidden"
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden h-8 w-px bg-ledger-line sm:block" />

            <div>
              <p className="font-display text-[1.7rem] italic leading-none tracking-tight text-parchment">
                JoinEazy
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="h-px w-5 bg-brass" />
                <p className="text-[0.58rem] font-medium uppercase tracking-[0.22em] text-sage">
                  Assignment Ledger
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium leading-tight text-parchment">
              {currentUser?.name}
            </p>

            <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wide text-sage">
              {currentUser?.role === "admin" ? "Faculty" : "Student"}
            </p>
          </div>

          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-brass/50 bg-ledger-surface font-display text-lg italic text-brass">
            {initial}

            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ledger bg-moss" />
          </div>

          <div className="hidden h-7 w-px bg-ledger-line sm:block" />

          <button
            type="button"
            onClick={logout}
            className="group relative text-xs font-medium uppercase tracking-wider text-sage transition hover:text-parchment"
          >
            Sign out
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-brass transition-all duration-200 group-hover:w-full" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
