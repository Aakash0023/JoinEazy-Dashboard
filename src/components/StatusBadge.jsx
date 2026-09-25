/**
 * Renders submission status as an ink stamp — "Submitted" stamped down for
 * done, a plain dashed circle standing in for an entry still open.
 */
function StatusBadge({ submitted, animate = false, size = "md" }) {
  const dims = size === "sm" ? "w-11 h-11 text-[0.5rem]" : "w-[3.25rem] h-[3.25rem] text-[0.6rem]";

  if (submitted) {
    return (
      <span
        className={`stamp ${dims} ${animate ? "stamp-animate" : ""}`}
        role="status"
        aria-label="Submitted"
      >
        Submitted
      </span>
    );
  }

  return (
    <span className={`stamp stamp-pending ${dims}`} role="status" aria-label="Not yet submitted">
      Open
    </span>
  );
}

export default StatusBadge;
