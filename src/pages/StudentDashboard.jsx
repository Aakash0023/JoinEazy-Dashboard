import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AssignmentCard from "../components/AssignmentCard";
import { assignments } from "../data/mockData";
import { getSubmissions, setSubmissions } from "../utils/storage";

function StudentDashboard() {
  const [assignmentList, setAssignmentList] = useState(assignments);

  useEffect(() => {
    const savedSubmissions = getSubmissions();

    setAssignmentList(
      assignments.map((assignment) => ({
        ...assignment,
        submissions: {
          ...assignment.submissions,
          1:
            savedSubmissions[assignment.id] !== undefined
              ? savedSubmissions[assignment.id]
              : assignment.submissions[1],
        },
      }))
    );
  }, []);

  const submittedCount = assignmentList.filter(
    (assignment) => assignment.submissions[1]
  ).length;

  const totalAssignments = assignmentList.length;
  const progress = totalAssignments
    ? Math.round((submittedCount / totalAssignments) * 100)
    : 0;

  const handleSubmit = (assignmentId) => {
    const updatedAssignments = assignmentList.map((assignment) =>
      assignment.id === assignmentId
        ? {
            ...assignment,
            submissions: {
              ...assignment.submissions,
              1: true,
            },
          }
        : assignment
    );

    setAssignmentList(updatedAssignments);

    const currentSubmissions = getSubmissions();

    setSubmissions({
      ...currentSubmissions,
      [assignmentId]: true,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div>
              <p className="text-sm text-slate-400">Student Dashboard</p>
              <h1 className="mt-1 text-3xl font-bold">Good morning, Aakash</h1>
              <p className="mt-2 text-slate-400">
                Keep track of your assignments and submission progress.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm text-slate-400">Total Assignments</p>
                <p className="mt-3 text-3xl font-bold">{totalAssignments}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm text-slate-400">Submitted</p>
                <p className="mt-3 text-3xl font-bold">{submittedCount}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm text-slate-400">Pending</p>
                <p className="mt-3 text-3xl font-bold">
                  {totalAssignments - submittedCount}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold">Your Progress</h2>

              <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Assignment Completion
                  </span>

                  <span className="font-semibold">{progress}%</span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-white transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold">Your Assignments</h2>

              <div className="mt-4 grid gap-4">
                {assignmentList.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    submitted={assignment.submissions[1]}
                    onSubmit={handleSubmit}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
