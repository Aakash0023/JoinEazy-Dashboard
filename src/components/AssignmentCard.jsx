import { useState } from "react";

function AssignmentCard({ assignment, submitted, onSubmit }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [justStamped, setJustStamped] = useState(false);

  const handleConfirmation = () => {
    onSubmit(assignment.id);
    setShowConfirmation(false);
    setJustStamped(true);

    setTimeout(() => {
      setJustStamped(false);
    }, 1200);
  };

  return (
    <>
      <article className="group relative overflow-hidden border border-white/10 bg-[#101011] transition-all duration-700 hover:-translate-y-1 hover:border-white/20 hover:bg-[#131314] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
        <div className="absolute left-0 top-0 h-full w-[2px] origin-bottom scale-y-0 bg-[#f4b942] transition-transform duration-700 ease-out group-hover:scale-y-100" />

        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-5">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-medium tracking-[0.18em] text-white/20">
                {String(assignment.id).padStart(2, "0")}
              </span>

              <span className="h-px w-7 bg-white/10 transition-all duration-500 group-hover:w-10 group-hover:bg-[#f4b942]/40" />

              <span className="text-[10px] uppercase tracking-[0.16em] text-white/20">
                Assignment
              </span>
            </div>

            <div
              className={`flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-500 ${
                submitted ? "text-[#f4b942]" : "text-white/25"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                  submitted
                    ? "bg-[#f4b942] shadow-[0_0_10px_rgba(244,185,66,0.5)]"
                    : "bg-white/20"
                }`}
              />

              {submitted ? "Submitted" : "Open"}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold tracking-[-0.045em] text-white transition-all duration-500 group-hover:translate-x-1 sm:text-[28px]">
              {assignment.title}
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/30 transition-colors duration-500 group-hover:text-white/40">
              {assignment.description}
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-5 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <span className="text-white/25">
                Due{" "}
                <span className="ml-1 text-white/55">{assignment.dueDate}</span>
              </span>

              <span className="h-3 w-px bg-white/10" />

              <a
                href={assignment.driveLink}
                target="_blank"
                rel="noreferrer"
                className="group/link flex items-center gap-2 text-white/35 transition-colors duration-300 hover:text-[#f4b942]"
              >
                Open folder
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="transition-transform duration-500 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                >
                  <path
                    d="M14 5h5v5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M19 5l-9 9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            {!submitted && (
              <button
                type="button"
                onClick={() => setShowConfirmation(true)}
                className="group/submit flex items-center gap-3 self-start text-sm font-medium text-white/45 transition-all duration-500 hover:text-[#f4b942] sm:self-auto"
              >
                <span>Mark as submitted</span>

                <span className="flex h-7 w-7 items-center justify-center border border-white/10 transition-all duration-500 group-hover/submit:border-[#f4b942]/40 group-hover/submit:bg-[#f4b942]/10 group-hover/submit:translate-x-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M5 12h14" strokeLinecap="round" />

                    <path
                      d="M13 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            )}

            {submitted && (
              <div
                className={`flex items-center gap-2 text-xs text-[#f4b942] ${
                  justStamped ? "animate-pulse" : ""
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center bg-[#f4b942]/10">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="m5 12 4 4L19 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Submission recorded
              </div>
            )}
          </div>
        </div>
      </article>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-md">
          <div className="w-full max-w-md animate-scale-in border border-white/10 bg-[#101011] p-7 shadow-2xl sm:p-8">
            <div className="flex h-10 w-10 items-center justify-center bg-[#f4b942] text-sm font-bold text-black">
              !
            </div>

            <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.18em] text-[#f4b942]">
              Confirm submission
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
              Mark as submitted?
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/30">
              This will mark{" "}
              <span className="text-white/65">{assignment.title}</span> as
              submitted on your record.
            </p>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="border border-white/10 px-5 py-2.5 text-sm text-white/40 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03] hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmation}
                className="bg-[#f4b942] px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#ffd166] hover:shadow-[0_0_30px_rgba(244,185,66,0.15)]"
              >
                Confirm submission
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AssignmentCard;
