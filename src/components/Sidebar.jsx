import { useEffect, useState } from "react";

const NAV_ITEMS = {
  student: [
    { label: "Dashboard", target: "dashboard" },
    { label: "Assignments", target: "assignments" },
    { label: "Progress", target: "progress" },
  ],
  admin: [
    { label: "Dashboard", target: "dashboard" },
    { label: "Assignments", target: "assignments" },
    { label: "Students", target: "students" },
  ],
};

function TabList({ role, onClose }) {
  const items = NAV_ITEMS[role] || NAV_ITEMS.student;
  const [activeTarget, setActiveTarget] = useState(items[0].target);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.target))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveTarget(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  const handleNavigation = (target) => {
    document.getElementById(target)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveTarget(target);
    onClose?.();
  };

  return (
    <nav className="flex flex-col gap-1 px-3 pt-7">
      <p className="mb-3 px-4 text-[9px] font-medium uppercase tracking-[0.22em] text-white/20">
        Workspace
      </p>

      {items.map((item, index) => {
        const active = activeTarget === item.target;

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => handleNavigation(item.target)}
            className={`group relative flex h-11 items-center overflow-hidden px-4 text-left text-sm transition-all duration-500 ${
              active
                ? "bg-white/[0.055] text-white"
                : "text-white/30 hover:bg-white/[0.025] hover:text-white/70"
            }`}
            style={{
              animationDelay: `${index * 0.08}s`,
            }}
          >
            <span
              className={`absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 bg-[#f4b942] transition-all duration-500 ${
                active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
              }`}
            />

            <span
              className={`transition-all duration-500 ${
                active
                  ? "translate-x-1 text-white"
                  : "group-hover:translate-x-1"
              }`}
            >
              {item.label}
            </span>

            <span
              className={`ml-auto text-xs transition-all duration-500 ${
                active
                  ? "translate-x-0 text-[#f4b942]/50"
                  : "translate-x-2 text-transparent group-hover:translate-x-0 group-hover:text-white/15"
              }`}
            >
              →
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function Sidebar({ role = "student", open, onClose }) {
  return (
    <>
      <aside className="hidden min-h-[calc(100vh-72px)] w-56 shrink-0 border-r border-white/[0.08] bg-[#0b0b0c] lg:block">
        <TabList role={role} />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in"
            onClick={onClose}
            aria-hidden="true"
          />

          <aside className="relative z-50 h-full w-72 animate-[slideIn_0.45s_cubic-bezier(0.22,1,0.36,1)] border-r border-white/10 bg-[#0b0b0c] shadow-2xl">
            <div className="flex h-[72px] items-center justify-between border-b border-white/[0.08] px-5">
              <div>
                <p className="text-sm font-semibold tracking-[-0.02em] text-white">
                  Navigation
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/20">
                  JoinEazy
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center text-white/25 transition-all duration-500 hover:rotate-90 hover:text-white"
                aria-label="Close navigation"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
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
