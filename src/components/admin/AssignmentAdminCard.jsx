import { useState } from "react";
import ProgressBar from "../ProgressBar";
import StatusBadge from "../StatusBadge";

/**
 * Admin view of a single assignment: an overall completion gauge plus a
 * roll of every student, each with their own stamp and mini gauge.
 */
function AssignmentAdminCard({ assignment, students }) {
  const [expanded, setExpanded] = useState(true);

  const submittedCount = students.filter((s) => assignment.submissions[s.id]).length;
  const total = students.length;
  const rate = total ? Math.round((submittedCount / total) * 100) : 0;

  return (
    <div className="border-b border-ledger-line py-8 first:pt-0 last:border-b-0">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl italic text-parchment">{assignment.title}</h3>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-sage">
            {assignment.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
            <span className="font-mono text-parchment-dim">Due {assignment.dueDate}</span>
            <a
              href={assignment.driveLink}
              target="_blank"
              rel="noreferrer"
              className="border-b border-transparent text-brass transition hover:border-brass"
            >
              View Drive folder
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="shrink-0 border-b border-ledger-line pb-0.5 text-xs uppercase tracking-wide text-sage transition hover:border-brass hover:text-parchment"
        >
          {expanded ? "Hide roll" : "Show roll"}
        </button>
      </div>

      <div className="mt-6 max-w-sm">
        <ProgressBar value={rate} label={`${submittedCount} of ${total} submitted`} />
      </div>

      {expanded && (
        <div className="mt-6 divide-y divide-ledger-line border-t border-ledger-line">
          {students.map((student) => {
            const submitted = Boolean(assignment.submissions[student.id]);
            return (
              <div
                key={student.id}
                className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm text-parchment">{student.name}</span>

                <div className="flex items-center gap-4 sm:w-64">
                  <div className="flex-1">
                    <ProgressBar value={submitted ? 100 : 0} showPercent={false} size="sm" />
                  </div>
                  <StatusBadge submitted={submitted} size="sm" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AssignmentAdminCard;
