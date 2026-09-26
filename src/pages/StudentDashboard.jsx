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
      <div
        id="dashboard"
        className="animate-[fadeIn_0.5s_ease-out] scroll-mt-24"
      >
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#f4b942]">
              Student dashboard
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Good to see you,{" "}
              <span className="text-white/40">{firstName}.</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/35">
              Keep track of your assignments and stay on top of your
              submissions.
            </p>
          </div>

          <div className="shrink-0">
            <div className="border border-white/10 bg-white/[0.025] px-5 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                Completion
              </p>

              <p className="mt-1 text-xl font-semibold text-white">
                {progress}%
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group bg-[#0b0b0c] px-5 py-6 transition-colors duration-300 hover:bg-white/[0.025] sm:px-7"
            >
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                    {stat.label}
                  </p>

                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:scale-150 ${
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

        <section
          id="progress"
          className="mt-10 scroll-mt-24 border border-white/10 bg-white/[0.015] p-5 sm:p-7"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-white">Overall progress</p>

              <p className="mt-1 text-xs text-white/30">
                {submittedCount} of {total} assignments submitted
              </p>
            </div>

            <span className="text-sm font-semibold text-[#f4b942]">
              {progress}%
            </span>
          </div>

          <div className="mt-5">
            <ProgressBar
              value={progress}
              showPercent={false}
              size="sm"
              colorClass="bg-[#f4b942]"
            />
          </div>
        </section>

        <section id="assignments" className="mt-12 scroll-mt-24">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#f4b942]">
                Your work
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Assignments
              </h2>
            </div>

            <p className="hidden text-xs text-white/25 sm:block">
              {pendingCount} pending
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                submitted={Boolean(assignment.submissions[currentUser.id])}
                onSubmit={handleSubmit}
              />
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;
