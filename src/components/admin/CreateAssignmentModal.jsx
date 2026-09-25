import { useState } from "react";

const emptyForm = { title: "", description: "", dueDate: "", driveLink: "" };

function CreateAssignmentModal({ onClose, onCreate }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-sm border border-ledger-line bg-ledger-surface p-7 sm:p-8"
      >
        <p className="text-xs uppercase tracking-wide text-sage">New ledger entry</p>
        <h3 className="mt-2 font-display text-2xl italic text-parchment">Create assignment</h3>

        <div className="mt-6 space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wide text-sage">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              placeholder="e.g. React Fundamentals"
              className="field-line mt-1 w-full"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-sage">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={handleChange("description")}
              rows={3}
              placeholder="What should students do?"
              className="field-line mt-1 w-full resize-none"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-wide text-sage">
                Due date
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={handleChange("dueDate")}
                className="field-line mt-1 w-full font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-sage">
                Drive link
              </label>
              <input
                type="url"
                value={form.driveLink}
                onChange={handleChange("driveLink")}
                placeholder="https://drive.google.com/..."
                className="field-line mt-1 w-full"
              />
            </div>
          </div>

          {error && <p className="text-sm text-stamp">{error}</p>}
        </div>

        <div className="mt-8 flex justify-end gap-6 text-sm">
          <button
            type="button"
            onClick={onClose}
            className="text-sage transition hover:text-parchment"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="border-b border-brass pb-0.5 font-medium text-brass"
          >
            Add to ledger
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAssignmentModal;
