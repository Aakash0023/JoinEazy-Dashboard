function ProgressBar({
  value = 0,
  label,
  showPercent = true,
  size = "md",
  colorClass,
}) {
  const clamped = Math.max(0, Math.min(100, value));

  const autoColor =
    clamped === 100
      ? "bg-emerald-500"
      : clamped >= 50
      ? "bg-amber-400"
      : clamped > 0
      ? "bg-orange-500"
      : "bg-slate-600";

  const heights = {
    sm: "h-1.5",
    md: "h-3",
    lg: "h-4",
  };

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label && <span className="text-slate-400">{label}</span>}
          {showPercent && (
            <span className="font-semibold text-white">{clamped}%</span>
          )}
        </div>
      )}

      <div
        className={`w-full overflow-hidden rounded-full bg-slate-800 ${heights[size]}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            colorClass || autoColor
          }`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
