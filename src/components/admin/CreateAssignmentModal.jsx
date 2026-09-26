import { useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  dueDate: "",
  driveLink: "",
};

function CreateAssignmentModal({ onClose, onCreate }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.dueDate || !form.driveLink.trim()) {
      setError("Title, due date, and a Drive link are required.");
      return;
    }

    onCreate(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-8 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl animate-[fadeIn_0.2s_ease-out] border border-white/10 bg-[#101011] shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-white/10 px-6 py-5 sm:px-7">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#f4b942]">
              New assignment
            </p>

            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
              Create assignment
            </h3>

            <p className="mt-1 text-xs text-white/30">
              Add the details students need to complete the task.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center text-white/30 transition-all duration-300 hover:rotate-90 hover:text-white"
            aria-label="Close modal"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="space-y-5 px-6 py-6 sm:px-7">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-white/35">
              Assignment title
            </label>

            <input
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              placeholder="e.g. React Fundamentals"
              className="h-11 w-full border border-white/10 bg-white/[0.025] px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/15 focus:border-[#f4b942]/50 focus:bg-white/[0.04]"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-white/35">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={handleChange("description")}
              rows={4}
              placeholder="What should students complete?"
              className="w-full resize-none border border-white/10 bg-white/[0.025] px-4 py-3 text-sm leading-6 text-white outline-none transition-all duration-300 placeholder:text-white/15 focus:border-[#f4b942]/50 focus:bg-white/[0.04]"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-white/35">
                Due date
              </label>

              <input
                type="date"
                value={form.dueDate}
                onChange={handleChange("dueDate")}
                className="h-11 w-full border border-white/10 bg-white/[0.025] px-4 text-sm text-white outline-none transition-all duration-300 focus:border-[#f4b942]/50 focus:bg-white/[0.04]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-white/35">
                Drive link
              </label>

              <input
                type="url"
                value={form.driveLink}
                onChange={handleChange("driveLink")}
                placeholder="https://drive.google.com/..."
                className="h-11 w-full border border-white/10 bg-white/[0.025] px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/15 focus:border-[#f4b942]/50 focus:bg-white/[0.04]"
              />
            </div>
          </div>

          {error && (
            <div className="border border-red-400/20 bg-red-400/5 px-4 py-3">
              <p className="text-xs text-red-300">{error}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-white/10 px-6 py-5 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={onClose}
            className="h-10 border border-white/10 px-5 text-sm font-medium text-white/40 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03] hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="group flex h-10 items-center justify-center gap-2 bg-[#f4b942] px-5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#ffd166] hover:shadow-[0_0_20px_rgba(244,185,66,0.15)]"
          >
            Create assignment
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M5 12h14" strokeLinecap="round" />
              <path
                d="m13 6 6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAssignmentModal;
