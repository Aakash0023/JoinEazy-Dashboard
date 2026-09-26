function ProgressBar({
  value = 0,
  label,
  showPercent = true,
  size = "md",
  colorClass,
}) {
  const clamped = Math.max(0, Math.min(100, value));

  const heights = {
    sm: "h-[2px]",
    md: "h-1",
    lg: "h-1.5",
  };

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="mb-2 flex items-center justify-between text-xs">
          {label && <span className="text-white/30">{label}</span>}

          {showPercent && (
            <span className="font-medium text-white/60">{clamped}%</span>
          )}
        </div>
      )}

      <div
        className={`w-full overflow-hidden bg-white/[0.07] ${heights[size]}`}
      >
        <div
          className={`h-full origin-left transition-[width] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            colorClass || "bg-[#f4b942]"
          }`}
          style={{
            width: `${clamped}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
