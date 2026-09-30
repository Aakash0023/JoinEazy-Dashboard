import { useState } from "react";
import ProgressBar from "../ProgressBar";
import { useApp } from "../../context/AppContext";

function AssignmentAdminCard({ assignment, analytics, index }) {
  const { updateAssignment, deleteAssignment, students, groups } = useApp();

  const [expanded, setExpanded] = useState(true);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    title: assignment.title,
    description: assignment.description || "",
    dueDate: assignment.dueDate,
    dueTime: assignment.dueTime || "",
    driveLink: assignment.driveLink,
    submissionType: assignment.submissionType || "individual",
  });

  const handleChange = (field) => (event) => {
    setForm((previous) => ({
      ...previous,
      [field]: event.target.value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.dueDate ||
      !form.dueTime ||
      !form.driveLink.trim()
    ) {
      return;
    }

    updateAssignment(assignment.id, {
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate,
      dueTime: form.dueTime,
      driveLink: form.driveLink.trim(),
      submissionType: form.submissionType,
    });

    setEditing(false);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${assignment.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    deleteAssignment(assignment.id);
  };

  const courseGroups = groups.filter(
    (group) => group.courseId === assignment.courseId
  );

  const progress = analytics.percentage ?? analytics.progress ?? 0;

  return (
    <>
      <article
        className="glow-card glow-border group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#101012] transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-[#121214]"
        style={{
          animationDelay: `${index * 0.08}s`,
        }}
      >
        <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[#f4b942] shadow-[0_0_12px_rgba(244,185,66,0.6)] transition-transform duration-500 group-hover:scale-y-100" />

        <div className="relative z-10 p-6 sm:p-7">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="glow-accent text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f4b942]/70">
                  {assignment.submissionType === "group"
                    ? "Group assignment"
                    : "Individual assignment"}
                </span>

                <span className="h-1 w-1 rounded-full bg-white/15" />

                <span className="text-[10px] uppercase tracking-[0.14em] text-white/20">
                  Due {assignment.dueDate}
                </span>

                {assignment.dueTime && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-white/15" />

                    <span className="text-[10px] uppercase tracking-[0.14em] text-white/20">
                      {assignment.dueTime}
                    </span>
                  </>
                )}
              </div>

              <h3 className="glow-heading mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
                {assignment.title}
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/35">
                {assignment.description}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <div className="glow-card rounded-lg border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-right">
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/20">
                  Completion
                </p>

                <p className="glow-accent mt-1 text-xl font-semibold text-[#f4b942]">
                  {progress}%
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditing(true)}
                className="flex h-10 items-center gap-2 rounded-lg border border-white/10 px-4 text-xs font-medium text-white/35 transition-all duration-300 hover:border-[#f4b942]/30 hover:bg-[#f4b942]/[0.04] hover:text-[#f4b942] hover:shadow-[0_0_18px_rgba(244,185,66,0.05)]"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex h-10 items-center gap-2 rounded-lg border border-red-400/10 px-4 text-xs font-medium text-red-400/50 transition-all duration-300 hover:border-red-400/30 hover:bg-red-400/[0.04] hover:text-red-400"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-4 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <a
                href={assignment.driveLink}
                target="_blank"
                rel="noreferrer"
                className="glow-accent text-white/35 transition-colors duration-300 hover:text-[#f4b942]"
              >
                Open OneDrive →
              </a>

              <span className="h-3 w-px bg-white/10" />

              <span className="text-white/25">
                {assignment.submissionType === "group"
                  ? `${courseGroups.length} groups`
                  : `${students.length} students`}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="flex items-center gap-2 text-xs font-medium text-white/30 transition-colors duration-300 hover:text-white"
            >
              {expanded ? "Hide progress" : "View progress"}

              <svg
                width="14"
                height="14"
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

          <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">
            <AnalyticsStat label="Total" value={analytics.total} />

            <AnalyticsStat
              label="Submitted"
              value={analytics.submitted}
              tone="success"
            />

            <AnalyticsStat label="Pending" value={analytics.pending} />

            <AnalyticsStat
              label="Overdue"
              value={analytics.overdue}
              tone="danger"
            />
          </div>

          <div className="mt-5">
            <ProgressBar
              value={progress}
              showPercent={false}
              size="sm"
              colorClass="bg-[#f4b942] shadow-[0_0_10px_rgba(244,185,66,0.35)]"
            />
          </div>

          {expanded && (
            <div className="glow-border mt-5 overflow-hidden rounded-lg border border-white/[0.08] bg-[#0d0d0f]">
              {assignment.submissionType === "individual" &&
                students.map((student, studentIndex) => {
                  const studentStatus =
                    analytics.students?.find(
                      (item) => item.student.id === student.id
                    ) || {};

                  const submitted = studentStatus.acknowledged;
                  const overdue = studentStatus.overdue;

                  const statusLabel = submitted
                    ? "Submitted"
                    : overdue
                    ? "Overdue"
                    : "Pending";

                  const statusClass = submitted
                    ? "text-green-400"
                    : overdue
                    ? "text-red-400"
                    : "text-white/25";

                  return (
                    <div
                      key={student.id}
                      className={`group/row flex flex-col gap-3 px-4 py-4 transition-colors duration-300 hover:bg-white/[0.025] sm:flex-row sm:items-center sm:justify-between ${
                        studentIndex !== students.length - 1
                          ? "border-b border-white/[0.07]"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-xs font-semibold text-white/60 transition-all duration-300 group-hover/row:border-[#f4b942]/25 group-hover/row:bg-[#f4b942]/[0.04] group-hover/row:text-[#f4b942]">
                          {student.name.charAt(0)}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-white/70 transition-colors duration-300 group-hover/row:text-white">
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
                            colorClass={
                              submitted
                                ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.25)]"
                                : overdue
                                ? "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.2)]"
                                : "bg-white/15"
                            }
                          />
                        </div>

                        <span
                          className={`min-w-[72px] text-right text-[11px] font-medium uppercase tracking-[0.1em] ${statusClass}`}
                        >
                          {statusLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}

              {assignment.submissionType === "group" &&
                courseGroups.map((group, groupIndex) => {
                  const groupStatus =
                    analytics.groups?.find(
                      (item) => item.group.id === group.id
                    ) || {};

                  const submitted = groupStatus.submitted;
                  const overdue = groupStatus.overdue;

                  const statusLabel = submitted
                    ? "Submitted"
                    : overdue
                    ? "Overdue"
                    : "Pending";

                  const statusClass = submitted
                    ? "text-green-400"
                    : overdue
                    ? "text-red-400"
                    : "text-white/25";

                  return (
                    <div
                      key={group.id}
                      className={`group/row flex flex-col gap-4 px-4 py-4 transition-colors duration-300 hover:bg-white/[0.025] sm:flex-row sm:items-center sm:justify-between ${
                        groupIndex !== courseGroups.length - 1
                          ? "border-b border-white/[0.07]"
                          : ""
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-white/70 transition-colors duration-300 group-hover/row:text-white">
                          {group.name}
                        </p>

                        <p className="mt-1 text-[11px] text-white/25">
                          Leader:{" "}
                          {students.find(
                            (student) => student.id === group.leaderId
                          )?.name || "Unknown"}
                        </p>
                      </div>

                      <span
                        className={`text-[11px] font-medium uppercase tracking-[0.1em] ${statusClass}`}
                      >
                        {statusLabel}
                      </span>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </article>

      {editing && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-xl"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setEditing(false);
            }
          }}
        >
          <form
            onSubmit={handleSave}
            className="glow-card glow-border relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#101011] shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
          >
            <div className="relative z-10 border-b border-white/10 px-6 py-6 sm:px-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="glow-accent text-[9px] font-semibold uppercase tracking-[0.22em] text-[#f4b942]">
                    Faculty workspace
                  </p>

                  <h3 className="glow-heading mt-3 text-2xl font-semibold tracking-[-0.045em] text-white">
                    Edit assignment
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/25 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03] hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="relative z-10 space-y-5 px-6 py-7 sm:px-8">
              <input
                type="text"
                value={form.title}
                onChange={handleChange("title")}
                placeholder="Assignment title"
                className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.025] px-4 text-sm text-white outline-none placeholder:text-white/15 transition-all duration-300 focus:border-[#f4b942]/40 focus:bg-[#f4b942]/[0.025] focus:shadow-[0_0_22px_rgba(244,185,66,0.04)]"
              />

              <textarea
                value={form.description}
                onChange={handleChange("description")}
                rows={4}
                placeholder="Description"
                className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.025] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/15 transition-all duration-300 focus:border-[#f4b942]/40 focus:bg-[#f4b942]/[0.025] focus:shadow-[0_0_22px_rgba(244,185,66,0.04)]"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={handleChange("dueDate")}
                  className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.025] px-4 text-sm text-white outline-none transition-all duration-300 focus:border-[#f4b942]/40 focus:bg-[#f4b942]/[0.025] focus:shadow-[0_0_22px_rgba(244,185,66,0.04)]"
                />

                <input
                  type="time"
                  value={form.dueTime}
                  onChange={handleChange("dueTime")}
                  className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.025] px-4 text-sm text-white outline-none transition-all duration-300 focus:border-[#f4b942]/40 focus:bg-[#f4b942]/[0.025] focus:shadow-[0_0_22px_rgba(244,185,66,0.04)]"
                />
              </div>

              <input
                type="url"
                value={form.driveLink}
                onChange={handleChange("driveLink")}
                placeholder="OneDrive link"
                className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.025] px-4 text-sm text-white outline-none placeholder:text-white/15 transition-all duration-300 focus:border-[#f4b942]/40 focus:bg-[#f4b942]/[0.025] focus:shadow-[0_0_22px_rgba(244,185,66,0.04)]"
              />

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setForm((previous) => ({
                      ...previous,
                      submissionType: "individual",
                    }))
                  }
                  className={`rounded-lg border px-4 py-3 text-sm transition-all duration-300 ${
                    form.submissionType === "individual"
                      ? "border-[#f4b942]/50 bg-[#f4b942]/[0.06] text-[#f4b942] shadow-[0_0_20px_rgba(244,185,66,0.05)]"
                      : "border-white/10 text-white/35 hover:border-white/20"
                  }`}
                >
                  Individual
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm((previous) => ({
                      ...previous,
                      submissionType: "group",
                    }))
                  }
                  className={`rounded-lg border px-4 py-3 text-sm transition-all duration-300 ${
                    form.submissionType === "group"
                      ? "border-[#f4b942]/50 bg-[#f4b942]/[0.06] text-[#f4b942] shadow-[0_0_20px_rgba(244,185,66,0.05)]"
                      : "border-white/10 text-white/35 hover:border-white/20"
                  }`}
                >
                  Group
                </button>
              </div>
            </div>

            <div className="relative z-10 flex flex-col-reverse gap-3 border-t border-white/10 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="h-11 rounded-lg border border-white/10 px-6 text-sm font-medium text-white/35 transition-colors duration-300 hover:bg-white/[0.03] hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="h-11 rounded-lg bg-[#f4b942] px-6 text-sm font-semibold text-black shadow-[0_0_24px_rgba(244,185,66,0.08)] transition-all duration-300 hover:bg-[#ffd166] hover:shadow-[0_0_30px_rgba(244,185,66,0.14)]"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

function AnalyticsStat({ label, value, tone }) {
  const valueClass =
    tone === "success"
      ? "text-green-400"
      : tone === "danger"
      ? "text-red-400"
      : "text-white";

  return (
    <div className="group relative overflow-hidden bg-[#0b0b0c] px-5 py-5 transition-colors duration-300 hover:bg-white/[0.025]">
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          tone === "success"
            ? "bg-green-400/[0.06]"
            : tone === "danger"
            ? "bg-red-400/[0.06]"
            : "bg-white/[0.03]"
        }`}
      />

      <div className="relative">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/20">
          {label}
        </p>

        <p
          className={`mt-2 text-2xl font-semibold tracking-[-0.04em] ${valueClass}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default AssignmentAdminCard;
