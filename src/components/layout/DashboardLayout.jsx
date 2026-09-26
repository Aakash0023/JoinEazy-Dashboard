import { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function DashboardLayout({ role, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex min-h-[calc(100vh-72px)]">
        <Sidebar
          role={role}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1500px] p-5 sm:p-7 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
