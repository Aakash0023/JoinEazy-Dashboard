const NAV_ITEMS = {
  student: ["Dashboard", "Assignments", "Progress"],
  admin: ["Dashboard", "Assignments", "Students"],
};

function TabList({ role, onClose }) {
  const items = NAV_ITEMS[role] || NAV_ITEMS.student;

  return (
    <nav className="flex flex-col gap-1 px-3 pt-6">
      {items.map((item, index) => {
        const active = index === 0;

        return (
          <button
            key={item}
            type="button"
            onClick={onClose}
            className={`group relative flex items-center overflow-hidden px-4 py-3 text-left text-sm transition-all duration-300 ${
              active
                ? "bg-[#f4b942]/10 text-white"
                : "text-white/35 hover:bg-white/[0.035] hover:text-white"
            }`}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 bg-[#f4b942] shadow-[0_0_10px_rgba(244,185,66,0.6)]" />
            )}

            <span
              className={`transition-all duration-300 ${
                active
                  ? "translate-x-1 text-[#f4b942]"
                  : "group-hover:translate-x-1"
              }`}
            >
              {item}
            </span>

            {!active && (
              <span className="ml-auto translate-x-2 text-white/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-white/20">
                →
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

function Sidebar({ role = "student", open, onClose }) {
  return (
    <>
      <aside className="hidden min-h-[calc(100vh-72px)] w-56 shrink-0 border-r border-white/10 bg-[#0b0b0c] lg:block">
        <TabList role={role} />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <aside className="relative z-50 h-full w-72 border-r border-white/10 bg-[#0b0b0c] shadow-2xl">
            <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
              <div>
                <p className="text-sm font-semibold text-white">Navigation</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/25">
                  Workspace
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center text-white/35 transition-all duration-300 hover:rotate-90 hover:text-white"
                aria-label="Close navigation"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <TabList role={role} onClose={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
