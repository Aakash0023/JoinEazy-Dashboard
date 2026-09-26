import { useState } from "react";
import ProgressBar from "../ProgressBar";

function AssignmentAdminCard({ assignment, students }) {
  const [expanded, setExpanded] = useState(true);

  const submittedCount = students.filter(
    (student) => assignment.submissions[student.id]
  ).length;

  const total = students.length;
  const rate = total ? Math.round((submittedCount / total) * 100) : 0;

  return (
    <article className="group relative overflow-hidden border border-white/10 bg-[#101011] transition-all duration-500 hover:border-white/20 hover:bg-[#121213]">
      <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[#f4b942] transition-transform duration-500 group-hover:scale-y-100" />

      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium tracking-[0.15em] text-white/20">
                {String(assignment.id).padStart(2, "0")}
              </span>

              <span className="h-px w-6 bg-white/10" />

              <span className="text-[11px] uppercase tracking-[0.12em] text-white/25">
                Assignment
              </span>
            </div>

            <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em] text-white transition-transform duration-300 group-hover:translate-x-0.5">
              {assignment.title}
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/35">
              {assignment.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
              <span className="text-white/30">
                Due <span className="text-white/60">{assignment.dueDate}</span>
              </span>

              <span className="h-3 w-px bg-white/10" />

              <a
                href={assignment.driveLink}
                target="_blank"
                rel="noreferrer"
                className="group/link flex items-center gap-1.5 text-white/45 transition-colors duration-300 hover:text-[#f4b942]"
              >
                Drive folder
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
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
          </div>

          <div className="flex shrink-0 items-start gap-3">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/25">
                Completion
              </p>

              <p className="mt-1 text-xl font-semibold text-[#f4b942]">
                {rate}%
              </p>
            </div>

            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/35 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
              aria-label={expanded ? "Hide students" : "Show students"}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className={`transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              >
                <path
                  d="m6 9 6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/30">Submission progress</span>

            <span className="text-white/50">
              {submittedCount} of {total} submitted
            </span>
          </div>

          <div className="mt-3">
            <ProgressBar
              value={rate}
              showPercent={false}
              size="sm"
              colorClass="bg-[#f4b942]"
            />
          </div>
        </div>

        {expanded && (
          <div className="mt-5 overflow-hidden border border-white/10">
            {students.map((student, index) => {
              const submitted = Boolean(assignment.submissions[student.id]);

              return (
                <div
                  key={student.id}
                  className={`group/student flex flex-col gap-3 px-4 py-4 transition-colors duration-300 hover:bg-white/[0.025] sm:flex-row sm:items-center sm:justify-between ${
                    index !== students.length - 1
                      ? "border-b border-white/10"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/10 bg-white/[0.025] text-xs font-semibold text-white/60 transition-all duration-300 group-hover/student:border-[#f4b942]/30 group-hover/student:text-[#f4b942]">
                      {student.name.charAt(0)}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white/70">
                        {student.name}
                      </p>

                      <p className="mt-0.5 text-[11px] text-white/25">
                        {student.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:w-56">
                    <div className="flex-1">
                      <ProgressBar
                        value={submitted ? 100 : 0}
                        showPercent={false}
                        size="sm"
                        colorClass="bg-[#f4b942]"
                      />
                    </div>

                    <span
                      className={`min-w-[72px] text-right text-[11px] font-medium uppercase tracking-[0.1em] ${
                        submitted ? "text-[#f4b942]" : "text-white/25"
                      }`}
                    >
                      {submitted ? "Submitted" : "Pending"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}

export default AssignmentAdminCard;
