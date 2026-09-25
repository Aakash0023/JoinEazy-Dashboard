import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import AssignmentAdminCard from "../components/admin/AssignmentAdminCard";
import CreateAssignmentModal from "../components/admin/CreateAssignmentModal";
import { useApp } from "../context/AppContext";

function AdminDashboard() {
  const { currentUser, assignments, students, addAssignment } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const myAssignments = assignments.filter(
    (a) => a.createdBy === currentUser.id
  );

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-slate-400">Admin Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            Welcome, {currentUser.name}
          </h1>
          <p className="mt-2 text-slate-400">
            Manage your assignments and track student submissions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          New Assignment
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Assignments Created</p>
          <p className="mt-3 text-3xl font-bold">{myAssignments.length}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Total Students</p>
          <p className="mt-3 text-3xl font-bold">{students.length}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Submissions Received</p>
          <p className="mt-3 text-3xl font-bold text-emerald-400">
            {totalSubmissions}/{possibleSubmissions}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Overall Submission Rate</p>
          <p className="mt-3 text-3xl font-bold text-indigo-400">
            {overallRate}%
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Your Assignments</h2>

        <div className="mt-4 grid gap-4">
          {myAssignments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 p-10 text-center">
              <p className="text-slate-400">
                You haven't created any assignments yet.
              </p>

              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="mt-4 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
              >
                Create your first assignment
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
