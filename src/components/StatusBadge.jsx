function StatusBadge({ status }) {
  if (status === "Submitted") {
    return (
      <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
        Submitted
      </span>
    );
  }

  if (status === "Overdue") {
    return (
      <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
        Overdue
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
      Pending
    </span>
  );
}

export default StatusBadge;
