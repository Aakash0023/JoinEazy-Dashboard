function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="flex h-16 items-center justify-between px-6 lg:px-8">
        <div>
          <h1 className="text-xl font-bold text-white">Joineazy</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">Aakash</p>
            <p className="text-xs text-slate-500">Student</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
