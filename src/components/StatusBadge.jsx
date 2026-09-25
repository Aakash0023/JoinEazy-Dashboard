function StatusBadge({ submitted }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
        submitted
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-amber-500/10 text-amber-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          submitted ? "bg-emerald-400" : "bg-amber-400"
        }`}
      />
      {submitted ? "Submitted" : "Pending"}
    </span>
  );
}

export default StatusBadge;
