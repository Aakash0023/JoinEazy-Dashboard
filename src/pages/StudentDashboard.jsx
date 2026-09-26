import DashboardLayout from "../components/layout/DashboardLayout";
import AssignmentCard from "../components/AssignmentCard";
import ProgressBar from "../components/ProgressBar";
import { useApp } from "../context/AppContext";

function StudentDashboard() {
  const { currentUser, assignments, setSubmissionStatus } = useApp();

  const submittedCount = assignments.filter(
    (assignment) => assignment.submissions[currentUser.id]
  ).length;

  const total = assignments.length;
  const pendingCount = total - submittedCount;
  const progress = total ? Math.round((submittedCount / total) * 100) : 0;
  const firstName = currentUser.name.split(" ")[0];

  const handleSubmit = (assignmentId) => {
    setSubmissionStatus(assignmentId, currentUser.id, true);
  };

  const stats = [
    {
      label: "Assignments",
      value: total,
    },
    {
      label: "Submitted",
      value: submittedCount,
    },
    {
      label: "Pending",
      value: pendingCount,
    },
  ];

  return (
    <DashboardLayout role="student">
      <div id="dashboard" className="scroll-mt-24">
        <section className="flex min-h-[calc(100vh-150px)] flex-col justify-center border-b border-white/10 pb-16 pt-8">
          <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
            <div className="max-w-5xl">
              <p
                className="animate-fade-up text-xs font-medium uppercase tracking-[0.28em] text-[#f4b942]"
                style={{ animationDelay: "0.1s" }}
              >
                Student dashboard
              </p>

              <h1
                className="mt-5 animate-fade-up text-5xl font-semibold leading-[0.95] tracking-[-0.065em] text-white sm:text-6xl lg:text-8xl"
                style={{ animationDelay: "0.2s" }}
              >
                Good to see you,
                <br />
                <span className="text-white/30">{firstName}.</span>
              </h1>

              <p
                className="mt-7 max-w-xl animate-fade-up text-sm leading-7 text-white/35 sm:text-base"
                style={{ animationDelay: "0.35s" }}
              >
                Keep track of your assignments, stay on top of your deadlines,
                and know exactly where you stand.
              </p>
            </div>

            <div
              className="shrink-0 animate-scale-in"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="group border border-white/10 bg-white/[0.025] px-7 py-5 backdrop-blur-xl transition-all duration-500 hover:border-[#f4b942]/30 hover:bg-[#f4b942]/[0.03]">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                  Completion
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white transition-transform duration-500 group-hover:translate-x-1">
                  {progress}%
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="progress" className="scroll-mt-24 pt-16">
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group animate-fade-up bg-[#0b0b0c] px-6 py-8 transition-colors duration-500 hover:bg-white/[0.025] sm:px-8"
                style={{
                  animationDelay: `${0.55 + index * 0.1}s`,
                }}
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                      {stat.label}
                    </p>

                    <p className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white transition-transform duration-500 group-hover:translate-x-1">
                      {stat.value}
                    </p>
                  </div>

                  <span
                    className={`mb-2 h-1.5 w-1.5 rounded-full transition-all duration-500 group-hover:scale-[2] ${
                      index === 1
                        ? "bg-[#f4b942]"
                        : index === 2
                        ? "bg-white/20"
                        : "bg-white/40"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-4 animate-fade-up border border-white/10 bg-white/[0.015] p-6 sm:p-8"
            style={{ animationDelay: "0.85s" }}
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-medium text-white">
                  Overall progress
                </p>

                <p className="mt-1 text-xs text-white/30">
                  {submittedCount} of {total} assignments submitted
                </p>
              </div>

              <span className="text-sm font-semibold text-[#f4b942]">
                {progress}%
              </span>
            </div>

            <div className="mt-6">
              <ProgressBar
                value={progress}
                showPercent={false}
                size="sm"
                colorClass="bg-[#f4b942]"
              />
            </div>
          </div>
        </section>

        <section id="assignments" className="scroll-mt-24 pb-16 pt-20">
          <div
            className="animate-fade-up border-b border-white/10 pb-5"
            style={{ animationDelay: "0.95s" }}
          >
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#f4b942]">
                  Your work
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                  Assignments
                </h2>
              </div>

              <p className="hidden text-xs text-white/25 sm:block">
                {pendingCount} pending
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {assignments.map((assignment, index) => (
              <div
                key={assignment.id}
                className="animate-fade-up"
                style={{
                  animationDelay: `${1.05 + index * 0.12}s`,
                }}
              >
                <AssignmentCard
                  assignment={assignment}
                  submitted={Boolean(assignment.submissions[currentUser.id])}
                  onSubmit={handleSubmit}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;
