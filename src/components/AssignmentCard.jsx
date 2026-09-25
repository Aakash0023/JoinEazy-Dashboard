import { useState } from "react";

function AssignmentCard({ assignment, submitted, onSubmit }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmation = () => {
    onSubmit(assignment.id);
    setShowConfirmation(false);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {assignment.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {assignment.description}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            submitted
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-amber-500/10 text-amber-400"
          }`}
        >
          {submitted ? "Submitted" : "Pending"}
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-slate-500">Due date</p>
          <p className="mt-1 text-sm text-slate-300">{assignment.dueDate}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-700 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Open Submission
          </a>

          {!submitted && (
            <button
              onClick={() => setShowConfirmation(true)}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              I have submitted
            </button>
          )}
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-white">
              Confirm Submission
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Are you sure you have submitted this assignment? Once confirmed,
              your submission status will be updated.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmation}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignmentCard;
