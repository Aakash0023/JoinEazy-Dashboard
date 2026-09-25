import { useApp } from "../context/AppContext";

function Navbar({ onMenuClick }) {
  const { currentUser, logout } = useApp();
  const initial = currentUser?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <header className="sticky top-0 z-30 border-b border-ledger-line bg-ledger/95 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="-ml-2 rounded p-2 text-sage hover:text-parchment lg:hidden"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>

          <div>
            <p className="font-display text-2xl italic leading-none text-parchment">
              JoinEazy
            </p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-sage">
              Assignment Ledger
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-parchment">{currentUser?.name}</p>
            <p className="text-xs text-sage">
              {currentUser?.role === "admin" ? "Faculty" : "Student"} record
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brass/60 font-display italic text-brass">
            {initial}
          </div>

          <button
            type="button"
            onClick={logout}
            className="border-b border-transparent pb-0.5 text-sm text-sage transition hover:border-brass hover:text-parchment"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
