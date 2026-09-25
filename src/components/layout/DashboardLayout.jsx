import { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

/**
 * Shared shell for both role dashboards: header + folder-tab nav + content.
 * Owns the mobile-drawer open/close state so pages stay focused on data.
 */
function DashboardLayout({ role, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ledger text-parchment">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar role={role} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
