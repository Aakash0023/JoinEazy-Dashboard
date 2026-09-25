import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import AssignmentAdminCard from "../components/admin/AssignmentAdminCard";
import CreateAssignmentModal from "../components/admin/CreateAssignmentModal";
import { useApp } from "../context/AppContext";

function AdminDashboard() {
  const { currentUser, assignments, students, addAssignment } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Admins only ever see the assignments *they* created.
  const myAssignments = assignments.filter((a) => a.createdBy === currentUser.id);

  const totalSubmissions = myAssignments.reduce(
    (sum, a) => sum + students.filter((s) => a.submissions[s.id]).length,
    0
  );
  const possibleSubmissions = myAssignments.length * students.length;
  const overallRate = possibleSubmissions
    ? Math.round((totalSubmissions / possibleSubmissions) * 100)
    : 0;

  return (
    <DashboardLayout role="admin">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-sage">Faculty ledger</p>
          <h1 className="mt-3 font-display text-4xl italic text-parchment sm:text-5xl">
            {currentUser.name.split(" ").slice(-1)[0]}'s assignments
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start bg-brass px-5 py-2.5 text-sm font-medium text-ledger transition hover:bg-brass-dim"
        >
          + New assignment
        </button>
      </div>

      <div className="mt-10 grid grid-cols-2 divide-x divide-y divide-ledger-line border border-ledger-line sm:grid-cols-4 sm:divide-y-0">
        {[
          { label: "Assignments", value: myAssignments.length },
          { label: "Students", value: students.length },
          { label: "Submitted", value: `${totalSubmissions}/${possibleSubmissions}`, tone: "text-moss" },
          { label: "Completion", value: `${overallRate}%`, tone: "text-brass" },
        ].map((stat) => (
          <div key={stat.label} className="px-4 py-6 text-center">
            <p className={`font-display text-3xl italic ${stat.tone || "text-parchment"}`}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-sage">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="font-display text-2xl italic text-parchment">Your assignments</h2>

        <div className="mt-4 border-t border-ledger-line">
          {myAssignments.length === 0 ? (
            <div className="border-b border-dashed border-ledger-line py-14 text-center">
              <p className="text-sage">You haven't opened any assignments yet.</p>
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="mt-4 border-b border-brass pb-0.5 text-sm font-medium text-brass"
              >
                Create your first one
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
