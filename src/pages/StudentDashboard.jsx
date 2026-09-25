import DashboardLayout from "../components/layout/DashboardLayout";
import AssignmentCard from "../components/AssignmentCard";
import ProgressBar from "../components/ProgressBar";
import { useApp } from "../context/AppContext";

function StudentDashboard() {
  const { currentUser, assignments, setSubmissionStatus } = useApp();

  const submittedCount = assignments.filter((a) => a.submissions[currentUser.id]).length;
  const total = assignments.length;
  const progress = total ? Math.round((submittedCount / total) * 100) : 0;
  const firstName = currentUser.name.split(" ")[0];

  const handleSubmit = (assignmentId) => {
    setSubmissionStatus(assignmentId, currentUser.id, true);
  };

  return (
    <DashboardLayout role="student">
      <p className="text-xs uppercase tracking-[0.25em] text-sage">Your record</p>
      <h1 className="mt-3 font-display text-4xl italic text-parchment sm:text-5xl">
        {submittedCount} of {total} turned in, {firstName}
      </h1>

      <div className="mt-10 grid grid-cols-3 divide-x divide-ledger-line border-y border-ledger-line">
        {[
          { label: "Assignments", value: total },
          { label: "Submitted", value: submittedCount, tone: "text-moss" },
          { label: "Still open", value: total - submittedCount, tone: "text-stamp" },
        ].map((stat) => (
          <div key={stat.label} className="px-4 py-6 text-center sm:px-6">
            <p className={`font-display text-4xl italic ${stat.tone || "text-parchment"}`}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-sage">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <ProgressBar value={progress} label="Term completion" />
      </div>

      <div className="mt-12">
        <h2 className="font-display text-2xl italic text-parchment">Assignments</h2>
        <div className="mt-4 border-t border-ledger-line">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              submitted={Boolean(assignment.submissions[currentUser.id])}
              onSubmit={handleSubmit}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;
