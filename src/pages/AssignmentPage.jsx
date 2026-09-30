import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import AssignmentCard from "../components/AssignmentCard";
import { useApp } from "../context/AppContext";

function AssignmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assignments } = useApp();

  const assignment = assignments.find((item) => item.id === Number(id));

  if (!assignment) {
    return (
      <DashboardLayout role="student">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#f4b942]">
            Assignment not found
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-white">
            We couldn't find that assignment.
          </h1>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 rounded-lg bg-[#f4b942] px-5 py-3 text-xs font-bold text-black transition hover:bg-[#ffd166]"
          >
            Back to dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">
      <div className="min-h-[calc(100vh-150px)]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group mb-10 flex items-center gap-2 text-xs font-medium text-white/30 transition-colors duration-300 hover:text-white"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          Back
        </button>

        <section className="mb-10 border-b border-white/10 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#f4b942]">
            Assignment
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl">
            {assignment.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/35">
            View the assignment details, submission information and
            acknowledgment status.
          </p>
        </section>

        <div className="max-w-4xl">
          <AssignmentCard assignment={assignment} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AssignmentPage;
