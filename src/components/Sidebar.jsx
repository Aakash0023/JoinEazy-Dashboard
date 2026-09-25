const NAV_ITEMS = {
  student: ["Dashboard", "Assignments", "Progress"],
  admin: ["Dashboard", "Assignments", "Students"],
};

function TabList({ role }) {
  const items = NAV_ITEMS[role] || NAV_ITEMS.student;

  return (
    <nav className="flex flex-col pt-8">
      {items.map((item, index) => {
        const active = index === 0;
        return (
          <button
            key={item}
            type="button"
            className={`relative border-y border-transparent px-6 py-3.5 text-left text-sm transition ${
              active
                ? "-mr-px border-ledger-line bg-ledger-surface font-medium text-parchment"
                : "text-sage hover:text-parchment"
            }`}
          >
            {active && (
              <span className="absolute inset-y-0 left-0 w-[3px] bg-brass" aria-hidden="true" />
            )}
            {item}
          </button>
        );
      })}
    </nav>
  );
}

function Sidebar({ role = "student", open, onClose }) {
  return (
    <>
      {/* Desktop: folder-tab rail */}
      <aside className="hidden min-h-[calc(100vh-5rem)] w-56 shrink-0 border-r border-ledger-line lg:block">
        <TabList role={role} />
      </aside>

      {/* Mobile: drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
          <aside className="relative z-50 h-full w-64 border-r border-ledger-line bg-ledger shadow-2xl">
            <TabList role={role} />
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
