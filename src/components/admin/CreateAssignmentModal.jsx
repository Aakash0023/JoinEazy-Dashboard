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

  const handleChange = (field) => (event) => {
    setForm((previous) => ({
      ...previous,
      [field]: event.target.value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.dueDate || !form.driveLink.trim()) {
      setError("Title, due date, and a Drive link are required.");
      return;
    }

    onCreate({
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate,
      driveLink: form.driveLink.trim(),
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-xl animate-fade-in"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl animate-scale-in overflow-hidden border border-white/10 bg-[#101011] shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
      >
        <div className="border-b border-white/10 px-6 py-6 sm:px-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#f4b942]">
                Faculty workspace
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-white sm:text-3xl">
                Create assignment
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-white/30">
                Add the details students need to complete the task.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-transparent text-white/25 transition-all duration-500 hover:rotate-90 hover:border-white/10 hover:bg-white/[0.03] hover:text-white"
              aria-label="Close modal"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-6 px-6 py-7 sm:px-8">
          <div>
            <label className="mb-2.5 block text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">
              Assignment title
            </label>

            <input
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              placeholder="React Fundamentals"
              className="h-12 w-full border border-white/10 bg-white/[0.025] px-4 text-sm text-white outline-none transition-all duration-500 placeholder:text-white/15 focus:border-[#f4b942]/40 focus:bg-white/[0.045] focus:shadow-[0_0_30px_rgba(244,185,66,0.04)]"
            />
          </div>

          <div>
            <label className="mb-2.5 block text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={handleChange("description")}
              rows={4}
              placeholder="What should students complete?"
              className="w-full resize-none border border-white/10 bg-white/[0.025] px-4 py-3.5 text-sm leading-7 text-white outline-none transition-all duration-500 placeholder:text-white/15 focus:border-[#f4b942]/40 focus:bg-white/[0.045] focus:shadow-[0_0_30px_rgba(244,185,66,0.04)]"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2.5 block text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">
                Due date
              </label>

              <input
                type="date"
                value={form.dueDate}
                onChange={handleChange("dueDate")}
                className="h-12 w-full border border-white/10 bg-white/[0.025] px-4 text-sm text-white outline-none transition-all duration-500 focus:border-[#f4b942]/40 focus:bg-white/[0.045]"
              />
            </div>

            <div>
              <label className="mb-2.5 block text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">
                Drive link
              </label>

              <input
                type="url"
                value={form.driveLink}
                onChange={handleChange("driveLink")}
                placeholder="https://drive.google.com/..."
                className="h-12 w-full border border-white/10 bg-white/[0.025] px-4 text-sm text-white outline-none transition-all duration-500 placeholder:text-white/15 focus:border-[#f4b942]/40 focus:bg-white/[0.045]"
              />
            </div>
          </div>

          {error && (
            <div className="animate-fade-in border border-red-400/20 bg-red-400/[0.04] px-4 py-3">
              <p className="text-xs leading-5 text-red-300">{error}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-white/10 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="h-11 border border-white/10 px-6 text-sm font-medium text-white/35 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.03] hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="group flex h-11 items-center justify-center gap-3 bg-[#f4b942] px-6 text-sm font-semibold text-black transition-all duration-500 hover:bg-[#ffd166] hover:shadow-[0_10px_35px_rgba(244,185,66,0.14)]"
          >
            Create assignment
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-500 group-hover:translate-x-1"
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
