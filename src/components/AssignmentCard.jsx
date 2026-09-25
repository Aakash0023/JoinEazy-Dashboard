import { useState } from "react";
import StatusBadge from "./StatusBadge";

/**
 * A single ledger entry for a student: assignment details on the left,
 * the stamp and actions on the right. Confirming submission requires a
 * second explicit step, so a stray tap can't alter the record.
 */
function AssignmentCard({ assignment, submitted, onSubmit }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [justStamped, setJustStamped] = useState(false);

  const handleConfirmation = () => {
    onSubmit(assignment.id);
    setShowConfirmation(false);
    setJustStamped(true);
  };

  return (
    <div className="border-b border-ledger-line py-6 first:pt-0 last:border-b-0">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="font-display text-xl italic text-parchment">{assignment.title}</h3>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-sage">
            {assignment.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            <span className="font-mono text-parchment-dim">Due {assignment.dueDate}</span>
            <a
              href={assignment.driveLink}
              target="_blank"
              rel="noreferrer"
              className="border-b border-transparent text-brass transition hover:border-brass"
            >
              Open submission folder
            </a>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          <StatusBadge submitted={submitted} animate={justStamped} />

          {!submitted && (
            <button
              type="button"
              onClick={() => setShowConfirmation(true)}
              className="border-b border-parchment-dim pb-0.5 text-sm text-parchment transition hover:border-brass hover:text-brass"
            >
              I have submitted
            </button>
          )}
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-sm border border-ledger-line bg-ledger-surface p-7">
            <p className="text-xs uppercase tracking-wide text-sage">Confirm entry</p>
            <h3 className="mt-2 font-display text-2xl italic text-parchment">
              Stamp this as submitted?
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-sage">
              This marks <span className="text-parchment">{assignment.title}</span> as
              submitted on your record. Your professor will see the stamp immediately.
            </p>

            <div className="mt-7 flex justify-end gap-6 text-sm">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="text-sage transition hover:text-parchment"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmation}
                className="border-b border-brass pb-0.5 font-medium text-brass"
              >
                Yes, stamp it submitted
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignmentCard;
