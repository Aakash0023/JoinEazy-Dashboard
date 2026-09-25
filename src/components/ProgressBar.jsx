/**
 * A tally gauge, styled like a ruled ledger line rather than a rounded
 * SaaS pill: square ends, a hairline track, and a brass fill.
 */
function ProgressBar({ value = 0, label, showPercent = true, size = "md" }) {
  const clamped = Math.max(0, Math.min(100, value));
  const heights = { sm: "h-1.5", md: "h-2.5" };

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="mb-2 flex items-baseline justify-between gap-3">
          {label && <span className="text-sm text-sage">{label}</span>}
          {showPercent && (
            <span className="font-mono text-sm font-medium text-parchment">
              {clamped}%
            </span>
          )}
        </div>
      )}

      <div className={`w-full overflow-hidden bg-ledger-raised ${heights[size]}`}>
        <div
          className="h-full bg-brass transition-all duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
