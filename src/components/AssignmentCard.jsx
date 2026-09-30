import { useState } from "react";
import { useApp } from "../context/AppContext";

function AssignmentCard({ assignment }) {
  const {
    currentUser,
    getAssignmentStatus,
    acknowledgeAssignment,
    getStudentGroup,
  } = useApp();

  const [showConfirm, setShowConfirm] = useState(false);
  const [justAcknowledged, setJustAcknowledged] = useState(false);

  const status = getAssignmentStatus(assignment, currentUser.id);
  const group = getStudentGroup(currentUser.id, assignment.courseId);

  const handleAcknowledge = () => {
    acknowledgeAssignment(assignment.id, currentUser.id);
    setShowConfirm(false);
    setJustAcknowledged(true);

    setTimeout(() => {
      setJustAcknowledged(false);
    }, 1200);
  };

  const formattedDate = new Date(assignment.dueDate).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  const formattedTime = new Date(assignment.dueDate).toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <>
      <article className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.18] hover:bg-white/[0.035] sm:p-7">
        <div
          className={`absolute left-0 top-0 h-full w-[2px] origin-top bg-[#f4b942] transition-transform duration-500 ${
            status.acknowledged
              ? "scale-y-100"
              : "scale-y-0 group-hover:scale-y-100"
          }`}
        />

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/25">
                {assignment.submissionType === "group"
                  ? "Group assignment"
                  : "Individual assignment"}
              </span>

              <span className="h-1 w-1 rounded-full bg-white/15" />

              <span className="text-[10px] uppercase tracking-[0.14em] text-white/20">
                Due {formattedDate}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.045em] text-white">
              {assignment.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/35">
              {assignment.description}
            </p>
          </div>

          <div className="shrink-0">
            {status.acknowledged ? (
              <div
                className={`flex items-center gap-2 border border-[#f4b942]/20 bg-[#f4b942]/[0.05] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#f4b942] transition-all duration-500 ${
                  justAcknowledged ? "scale-105" : "scale-100"
                }`}
              >
                <span className="text-sm">✓</span>
                Acknowledged
              </div>
            ) : (
              <div className="border border-white/10 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/25">
                Pending
              </div>
            )}
          </div>
        </div>

        <div className="mt-7 border-t border-white/[0.07] pt-5">
          {assignment.submissionType === "group" && group && (
            <div className="mb-5 flex flex-col gap-2 border border-white/[0.07] bg-white/[0.015] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/20">
                  Your group
                </p>

                <p className="mt-1 text-sm font-medium text-white/65">
                  {group.name}
                </p>
              </div>

              <span className="text-[10px] uppercase tracking-[0.12em] text-white/20">
                {status.isLeader ? "Group leader" : "Group member"}
              </span>
            </div>
          )}

          {assignment.submissionType === "group" && !group && (
            <div className="border border-[#f4b942]/10 bg-[#f4b942]/[0.025] px-4 py-4">
              <p className="text-sm font-medium text-white/65">
                You are not part of any group.
              </p>

              <p className="mt-1 text-xs leading-5 text-white/30">
                Form or join a group to submit this assignment.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/25">
              <span>Due at {formattedTime}</span>

              <span>
                {assignment.submissionType === "group"
                  ? "Group submission"
                  : "Individual submission"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={assignment.driveLink}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-white/35 transition-colors duration-300 hover:text-[#f4b942]"
              >
                Open OneDrive →
              </a>

              {!status.acknowledged &&
                status.canAcknowledge &&
                !status.noGroup && (
                  <button
                    type="button"
                    onClick={() => setShowConfirm(true)}
                    className="border border-[#f4b942]/20 bg-[#f4b942]/[0.05] px-4 py-2.5 text-xs font-medium text-[#f4b942] transition-all duration-300 hover:border-[#f4b942]/40 hover:bg-[#f4b942]/[0.1]"
                  >
                    Yes, I have submitted
                  </button>
                )}

              {assignment.submissionType === "group" &&
                group &&
                !status.acknowledged &&
                !status.isLeader && (
                  <span className="text-xs text-white/25">
                    Waiting for group leader
                  </span>
                )}
            </div>
          </div>
        </div>
      </article>

      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-5 backdrop-blur-md">
          <div className="w-full max-w-md border border-white/10 bg-[#101011] p-7 shadow-2xl">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#f4b942]">
              Confirm submission
            </p>

            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
              Have you submitted this assignment?
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/35">
              Confirm only after uploading your work through the provided
              OneDrive link.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="border border-white/10 px-5 py-3 text-xs font-medium text-white/40 transition-colors duration-300 hover:text-white"
              >
                Not yet
              </button>

              <button
                type="button"
                onClick={handleAcknowledge}
                className="bg-[#f4b942] px-5 py-3 text-xs font-semibold text-black transition-all duration-300 hover:bg-[#ffd06a]"
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
