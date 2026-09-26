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
      <div id="dashboard" className="scroll-mt-24">
        <section className="flex min-h-[calc(100vh-150px)] flex-col justify-center border-b border-white/10 pb-16 pt-8">
          <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
            <div className="max-w-5xl">
              <p
                className="animate-fade-up text-xs font-medium uppercase tracking-[0.28em] text-[#f4b942]"
                style={{ animationDelay: "0.1s" }}
              >
                Faculty dashboard
              </p>

              <h1
                className="mt-5 animate-fade-up text-5xl font-semibold leading-[0.95] tracking-[-0.065em] text-white sm:text-6xl lg:text-8xl"
                style={{ animationDelay: "0.2s" }}
              >
                Your assignments.
                <br />
                <span className="text-white/30">Your classroom.</span>
              </h1>

              <p
                className="mt-7 max-w-xl animate-fade-up text-sm leading-7 text-white/35 sm:text-base"
                style={{ animationDelay: "0.35s" }}
              >
                Create assignments, track submissions, and monitor student
                progress from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="group flex h-12 shrink-0 animate-scale-in items-center justify-center gap-3 bg-[#f4b942] px-6 text-sm font-semibold text-black transition-all duration-500 hover:bg-[#ffd166] hover:shadow-[0_15px_40px_rgba(244,185,66,0.12)]"
              style={{ animationDelay: "0.5s" }}
            >
              <span className="transition-transform duration-500 group-hover:translate-x-0.5">
                Create assignment
              </span>

              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-500 group-hover:rotate-90"
              >
                <path d="M12 5v14" strokeLinecap="round" />
                <path d="M5 12h14" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </section>

        <section id="assignments" className="scroll-mt-24 pt-16">
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group animate-fade-up bg-[#0b0b0c] px-6 py-8 transition-colors duration-500 hover:bg-white/[0.025] sm:px-7"
                style={{
                  animationDelay: `${0.55 + index * 0.1}s`,
                }}
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                      {stat.label}
                    </p>

                    <p
                      className={`mt-4 text-4xl font-semibold tracking-[-0.05em] transition-transform duration-500 group-hover:translate-x-1 ${
                        stat.accent ? "text-[#f4b942]" : "text-white"
                      }`}
                    >
                      {stat.value}
                    </p>
                  </div>

                  <span
                    className={`mb-2 h-1.5 w-1.5 rounded-full transition-all duration-500 group-hover:scale-[2] ${
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

          <div className="mt-16">
            <div
              className="animate-fade-up border-b border-white/10 pb-5"
              style={{ animationDelay: "0.95s" }}
            >
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#f4b942]">
                    Management
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                    Assignments
                  </h2>
                </div>

                {myAssignments.length > 0 && (
                  <span className="hidden text-xs text-white/25 sm:block">
                    {myAssignments.length}{" "}
                    {myAssignments.length === 1 ? "assignment" : "assignments"}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-5 space-y-4">
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
                    className="mt-6 text-sm font-medium text-[#f4b942] transition-colors duration-300 hover:text-[#ffd166]"
                  >
                    Create your first assignment →
                  </button>
                </div>
              ) : (
                myAssignments.map((assignment, index) => (
                  <div
                    key={assignment.id}
                    className="animate-fade-up"
                    style={{
                      animationDelay: `${1.05 + index * 0.12}s`,
                    }}
                  >
                    <AssignmentAdminCard
                      assignment={assignment}
                      students={students}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section id="students" className="scroll-mt-24 pb-20 pt-24">
          <div
            className="animate-fade-up border-b border-white/10 pb-5"
            style={{ animationDelay: "1.15s" }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#f4b942]">
              Classroom
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
              Students
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/30">
              View the students connected to your classroom workspace.
            </p>
          </div>

          <div className="mt-5 overflow-hidden border border-white/10">
            {students.map((student, index) => (
              <div
                key={student.id}
                className={`group flex animate-fade-up items-center justify-between gap-4 px-5 py-5 transition-colors duration-500 hover:bg-white/[0.025] sm:px-6 ${
                  index !== students.length - 1
                    ? "border-b border-white/10"
                    : ""
                }`}
                style={{
                  animationDelay: `${1.25 + index * 0.1}s`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.025] text-sm font-semibold text-white/60 transition-all duration-500 group-hover:border-[#f4b942]/30 group-hover:text-[#f4b942]">
                    {student.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white/80">
                      {student.name}
                    </p>

                    <p className="mt-1 text-xs text-white/25">
                      {student.email}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] uppercase tracking-[0.15em] text-white/20">
                  Student
                </span>
              </div>
            ))}
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
