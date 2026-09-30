import { useState } from "react";
import { useApp } from "../context/AppContext";
import StatusBadge from "./StatusBadge";

function AssignmentCard({ assignment }) {
  const {
    currentUser,
    students,
    getAssignmentStatus,
    acknowledgeAssignment,
    getStudentGroup,
  } = useApp();

  const [showConfirm, setShowConfirm] = useState(false);
  const [justAcknowledged, setJustAcknowledged] = useState(false);

  const status = getAssignmentStatus(assignment, currentUser?.id);

  const group = getStudentGroup(assignment.courseId, currentUser?.id);

  const groupLeader = group
    ? students.find((student) => student.id === group.leaderId)
    : null;

  const isGroupAssignment = assignment.submissionType === "group";
  const isGroupLeader =
    isGroupAssignment && group?.leaderId === currentUser?.id;

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
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101012] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-[#121214]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#f4b942]/[0.035] blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f4b942]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                  {isGroupAssignment ? "Group assignment" : "Assignment"}
                </span>
              </div>

              <h3 className="text-xl font-semibold tracking-[-0.035em] text-white">
                {assignment.title}
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                {assignment.description}
              </p>
            </div>

            <div className="shrink-0">
              <StatusBadge status={statusLabel} />
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4 border-y border-white/[0.06] py-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/20">
                Due date
              </p>

              <p className="mt-1.5 text-sm font-medium text-white/65">
                {formattedDate}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/20">
                Due time
              </p>

              <p className="mt-1.5 text-sm font-medium text-white/65">
                {formattedTime}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
            {isGroupAssignment ? (
              <>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/35">
                    Group submission
                  </p>

                  <span className="text-[10px] font-medium text-white/20">
                    TEAM
                  </span>
                </div>

                {group ? (
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/75">
                        {group.name}
                      </p>

                      <p className="mt-0.5 text-xs text-white/30">
                        Group workspace
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-[9px] uppercase tracking-[0.14em] text-white/20">
                        Leader
                      </p>

                      <p className="mt-0.5 text-xs font-medium text-white/55">
                        {groupLeader?.name || "Unknown"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 rounded-lg border border-amber-400/10 bg-amber-400/[0.04] px-4 py-3">
                    <p className="text-sm leading-6 text-amber-400/70">
                      You are not part of any group. Form or join one to submit
                      this assignment.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/35">
                  Individual submission
                </p>

                <p className="mt-2 text-sm leading-6 text-white/30">
                  Submit your completed work using the submission link.
                </p>
              </>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={assignment.driveLink}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-white/45 transition hover:text-white"
            >
              Open submission link
              <span className="transition-transform duration-300 group-hover/link:translate-x-0.5">
                ↗
              </span>
            </a>

            {status.acknowledged ? (
              <div className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-emerald-400/10 bg-emerald-400/[0.07] px-4 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Submission confirmed
              </div>
            ) : !isGroupAssignment ? (
              <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="h-10 rounded-lg bg-[#f4b942] px-5 text-xs font-bold text-black shadow-[0_0_24px_rgba(244,185,66,0.08)] transition-all duration-300 hover:bg-[#ffd166] hover:shadow-[0_0_28px_rgba(244,185,66,0.14)]"
              >
                Yes, I have submitted
              </button>
            ) : !group ? (
              <div className="inline-flex h-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025] px-4 text-xs font-medium text-white/25">
                Group required
              </div>
            ) : isGroupLeader ? (
              <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="h-10 rounded-lg bg-[#f4b942] px-5 text-xs font-bold text-black shadow-[0_0_24px_rgba(244,185,66,0.08)] transition-all duration-300 hover:bg-[#ffd166] hover:shadow-[0_0_28px_rgba(244,185,66,0.14)]"
              >
                Yes, I have submitted
              </button>
            ) : (
              <div className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-4 text-xs font-medium text-white/35">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                Waiting for group leader
              </div>
            )}
          </div>

          {justAcknowledged && (
            <div className="mt-4 rounded-lg border border-emerald-400/10 bg-emerald-400/[0.06] px-4 py-3 text-xs font-medium text-emerald-400">
              Your submission has been confirmed.
            </div>
          )}

          {status.overdue && !status.acknowledged && (
            <div className="mt-4 rounded-lg border border-red-400/10 bg-red-400/[0.06] px-4 py-3 text-xs font-medium text-red-400">
              This assignment is past its deadline.
            </div>
          )}
        </div>
      </article>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111113] p-6 shadow-2xl">
            <div className="mb-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#f4b942]/20 bg-[#f4b942]/10 text-[#f4b942]">
                ✓
              </div>

              <h2 className="text-xl font-semibold tracking-[-0.025em] text-white">
                Confirm submission
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/40">
                Have you completed and submitted this assignment using the
                submission link?
              </p>
            </div>

            {isGroupAssignment && group && (
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
                <p className="text-[9px] uppercase tracking-[0.14em] text-white/20">
                  Group
                </p>

                <p className="mt-1 text-sm font-medium text-white/70">
                  {group.name}
                </p>

                <p className="mt-1 text-xs text-white/25">
                  Acknowledging as group leader will confirm the submission for
                  all group members.
                </p>
              </div>
            )}

            {status.overdue && (
              <p className="mt-4 text-xs font-medium text-red-400">
                This assignment is already past its deadline.
              </p>
            )}

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border border-white/10 px-4 py-2.5 text-xs font-medium text-white/45 transition hover:bg-white/[0.04] hover:text-white"
              >
                Not yet
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-lg bg-[#f4b942] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#ffd166]"
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
