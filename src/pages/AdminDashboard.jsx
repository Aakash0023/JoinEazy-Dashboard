import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import AssignmentAdminCard from "../components/admin/AssignmentAdminCard";
import CreateAssignmentModal from "../components/admin/CreateAssignmentModal";
import { useApp } from "../context/AppContext";

function AdminDashboard() {
  const { currentUser, assignments, students, addAssignment } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const myAssignments = assignments.filter(
    (assignment) => assignment.createdBy === currentUser.id
  );

  const totalSubmissions = myAssignments.reduce(
    (sum, assignment) =>
      sum +
      students.filter((student) => assignment.submissions[student.id]).length,
    0
  );

  const possibleSubmissions = myAssignments.length * students.length;

  const overallRate = possibleSubmissions
    ? Math.round((totalSubmissions / possibleSubmissions) * 100)
    : 0;

  const stats = [
    {
      label: "Assignments",
      value: myAssignments.length,
    },
    {
      label: "Students",
      value: students.length,
    },
    {
      label: "Submissions",
      value: `${totalSubmissions}/${possibleSubmissions}`,
    },
    {
      label: "Completion",
      value: `${overallRate}%`,
      accent: true,
    },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="animate-[fadeIn_0.5s_ease-out]">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#f4b942]">
              Faculty dashboard
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Your assignments
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/35">
              Create assignments, track submissions and monitor student progress
              from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="group relative flex h-11 shrink-0 items-center justify-center gap-2 overflow-hidden bg-[#f4b942] px-5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#ffd166] hover:shadow-[0_0_25px_rgba(244,185,66,0.15)]"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              Create assignment
            </span>

            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:rotate-90"
            >
              <path d="M12 5v14" strokeLinecap="round" />
              <path d="M5 12h14" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group bg-[#0b0b0c] px-5 py-6 transition-colors duration-300 hover:bg-white/[0.025] sm:px-6"
            >
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                    {stat.label}
                  </p>

                  <p
                    className={`mt-3 text-3xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 ${
                      stat.accent ? "text-[#f4b942]" : "text-white"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>

                <span
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:scale-150 ${
                    stat.accent
                      ? "bg-[#f4b942]"
                      : index === 2
                      ? "bg-white/30"
                      : "bg-white/15"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#f4b942]">
                Management
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Your assignments
              </h2>
            </div>

            {myAssignments.length > 0 && (
              <span className="text-xs text-white/25">
                {myAssignments.length}{" "}
                {myAssignments.length === 1 ? "assignment" : "assignments"}
              </span>
            )}
          </div>

          <div className="mt-4 space-y-3">
            {myAssignments.length === 0 ? (
              <div className="border border-dashed border-white/10 bg-white/[0.01] px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center border border-white/10 bg-white/[0.025] text-[#f4b942]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </div>

                <h3 className="mt-5 text-base font-medium text-white">
                  No assignments yet
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/30">
                  Create your first assignment and start tracking student
                  submissions.
                </p>

                <button
                  type="button"
                  onClick={() => setShowCreateModal(true)}
                  className="mt-6 text-sm font-medium text-[#f4b942] transition-colors hover:text-[#ffd166]"
                >
                  Create your first assignment →
                </button>
              </div>
            ) : (
              myAssignments.map((assignment) => (
                <AssignmentAdminCard
                  key={assignment.id}
                  assignment={assignment}
                  students={students}
                />
              ))
            )}
          </div>
        </section>
      </div>

      {showCreateModal && (
        <CreateAssignmentModal
          onClose={() => setShowCreateModal(false)}
          onCreate={addAssignment}
        />
      )}
    </DashboardLayout>
  );
}

export default AdminDashboard;
