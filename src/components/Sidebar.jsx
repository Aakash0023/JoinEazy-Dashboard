function Sidebar() {
  return (
    <aside className="hidden min-h-[calc(100vh-4rem)] w-64 border-r border-slate-800 bg-slate-950 lg:block">
      <div className="p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Menu
        </p>

        <nav className="space-y-1">
          <button className="w-full rounded-lg bg-slate-800 px-4 py-3 text-left text-sm font-medium text-white">
            Dashboard
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            Assignments
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            Progress
          </button>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
