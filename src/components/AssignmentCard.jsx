import { useState } from "react";
import { useApp } from "../context/AppContext";
import StatusBadge from "./StatusBadge";

function AssignmentCard({ assignment }) {
  const {
    currentUser,
    getAssignmentStatus,
    acknowledgeAssignment,
    getStudentGroup,
  } = useApp();

  const [showConfirm, setShowConfirm] = useState(false);
  const [justAcknowledged, setJustAcknowledged] = useState(false);

  const status = getAssignmentStatus(assignment, currentUser?.id);

  const group = getStudentGroup(assignment.courseId, currentUser?.id);

  const isGroupAssignment = assignment.submissionType === "group";
  const isGroupLeader = group?.leaderId === currentUser?.id;

  const handleConfirm = () => {
    acknowledgeAssignment(assignment.id, currentUser.id);
    setShowConfirm(false);
    setJustAcknowledged(true);

    setTimeout(() => {
      setJustAcknowledged(false);
    }, 2500);
  };

  const formattedDate = assignment.dueDate
    ? new Date(`${assignment.dueDate}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No due date";

  const formattedTime = assignment.dueTime
    ? new Date(`2000-01-01T${assignment.dueTime}`).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No time set";

  const statusLabel = status.acknowledged
    ? "Submitted"
    : status.overdue
    ? "Overdue"
    : "Pending";

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {assignment.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {assignment.description}
            </p>
          </div>

          <StatusBadge status={statusLabel} />
        </div>

        <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
          <div>
            <span className="font-medium text-slate-800">Due date:</span>{" "}
            {formattedDate}
          </div>

          <div>
            <span className="font-medium text-slate-800">Due time:</span>{" "}
            {formattedTime}
          </div>
        </div>

        {isGroupAssignment && (
          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">
              Group submission
            </p>

            {group ? (
              <div className="mt-2">
                <p className="text-sm text-slate-600">
                  Group:{" "}
                  <span className="font-medium text-slate-900">
                    {group.name}
                  </span>
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  Leader:{" "}
                  <span className="font-medium text-slate-900">
                    {group.leaderId === currentUser?.id
                      ? currentUser.name
                      : "Group leader"}
                  </span>
                </p>

                {!isGroupLeader && !status.acknowledged && (
                  <p className="mt-3 text-xs text-slate-500">
                    Waiting for your group leader to submit.
                  </p>
                )}
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                You are not assigned to a group for this course.
              </p>
            )}
          </div>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Open submission link
          </a>

          {isGroupAssignment && !isGroupLeader ? (
            <div className="text-sm font-medium text-slate-500">
              Waiting for group leader
            </div>
          ) : status.acknowledged ? (
            <div className="text-sm font-semibold text-green-600">
              Submission confirmed
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Yes, I have submitted
            </button>
          )}
        </div>

        {justAcknowledged && (
          <div className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            Your submission has been confirmed.
          </div>
        )}

        {status.overdue && !status.acknowledged && (
          <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            This assignment is past its deadline.
          </div>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-slate-900">
              Have you submitted this assignment?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Please confirm that you have completed and submitted the
              assignment using the submission link.
            </p>

            {status.overdue && (
              <p className="mt-3 text-sm font-medium text-red-600">
                This assignment is already past its deadline.
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Not yet
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                Yes, confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AssignmentCard;
