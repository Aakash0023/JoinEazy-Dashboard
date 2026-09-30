import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import CreateAssignmentModal from "../components/admin/CreateAssignmentModal";
import { useApp } from "../context/AppContext";

function AdminDashboard() {
  const {
    currentUser,
    courses,
    students,
    assignments,
    groups,
    getProfessorCourses,
    getCourseAssignments,
    getAssignmentAnalytics,
    addAssignment,
  } = useApp();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const professorCourses = getProfessorCourses(currentUser.id);

  const totalAssignments = professorCourses.reduce(
    (sum, course) => sum + getCourseAssignments(course.id).length,
    0
  );

  const totalStudents = professorCourses.reduce(
    (sum, course) => sum + course.studentIds.length,
    0
  );

  const totalGroups = professorCourses.reduce(
    (sum, course) =>
      sum + groups.filter((group) => group.courseId === course.id).length,
    0
  );

  const stats = [
    {
      label: "Courses",
      value: professorCourses.length,
    },
    {
      label: "Students",
      value: totalStudents,
    },
    {
      label: "Assignments",
      value: totalAssignments,
    },
    {
      label: "Groups",
      value: totalGroups,
      accent: true,
    },
  ];

  const courseAssignments = selectedCourse
    ? getCourseAssignments(selectedCourse.id)
    : [];

  const handleCreateAssignment = (data) => {
    addAssignment({
      ...data,
      courseId: selectedCourse?.id,
    });

    setShowCreateModal(false);
  };

  if (selectedCourse) {
    return (
      <DashboardLayout role="admin">
        <div className="min-h-[calc(100vh-150px)]">
          <button
            type="button"
            onClick={() => setSelectedCourse(null)}
            className="group mb-10 flex items-center gap-2 text-xs font-medium text-white/30 transition-colors duration-300 hover:text-white"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to courses
          </button>

          <section className="border-b border-white/10 pb-10">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#f4b942]">
                  {selectedCourse.code}
                </p>

                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">
                  {selectedCourse.name}
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/35 sm:text-base">
                  {selectedCourse.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="flex h-11 shrink-0 items-center justify-center gap-3 bg-[#f4b942] px-5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#ffd166]"
              >
                <span>Create assignment</span>

                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14" strokeLinecap="round" />
                  <path d="M5 12h14" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </section>

          <section className="pt-12">
            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
              <CourseStat
                label="Students"
                value={selectedCourse.studentIds.length}
              />

              <CourseStat
                label="Assignments"
                value={courseAssignments.length}
              />

              <CourseStat
                label="Groups"
                value={
                  groups.filter((group) => group.courseId === selectedCourse.id)
                    .length
                }
                accent
              />
            </div>
          </section>

          <section className="pb-20 pt-16">
            <div className="border-b border-white/10 pb-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[#f4b942]">
                Course management
              </p>

              <div className="mt-3 flex items-end justify-between gap-4">
                <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                  Assignments
                </h2>

                <span className="text-xs text-white/25">
                  {courseAssignments.length}{" "}
                  {courseAssignments.length === 1
                    ? "assignment"
                    : "assignments"}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {courseAssignments.map((assignment, index) => {
                const analytics = getAssignmentAnalytics(assignment);

                return (
                  <AdminAssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    analytics={analytics}
                    index={index}
                  />
                );
              })}

              {!courseAssignments.length && (
                <div className="border border-dashed border-white/10 bg-white/[0.01] px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center border border-white/10 bg-white/[0.025] text-[#f4b942]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </div>

                  <h3 className="mt-5 text-base font-medium text-white">
                    No assignments yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/30">
                    Create an assignment for this course to start tracking
                    submissions.
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="mt-6 text-sm font-medium text-[#f4b942] transition-colors duration-300 hover:text-[#ffd166]"
                  >
                    Create assignment →
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {showCreateModal && (
          <CreateAssignmentModal
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreateAssignment}
          />
        )}
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="admin">
      <div id="dashboard" className="scroll-mt-24">
        <section className="flex min-h-[calc(100vh-150px)] flex-col justify-center border-b border-white/10 pb-16 pt-8">
          <div className="max-w-5xl">
            <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.28em] text-[#f4b942]">
              Faculty dashboard
            </p>

            <h1
              className="mt-5 animate-fade-up text-5xl font-semibold leading-[0.95] tracking-[-0.065em] text-white sm:text-6xl lg:text-8xl"
              style={{ animationDelay: "0.1s" }}
            >
              Your courses.
              <br />
              <span className="text-white/30">Your classroom.</span>
            </h1>

            <p
              className="mt-7 max-w-xl animate-fade-up text-sm leading-7 text-white/35 sm:text-base"
              style={{ animationDelay: "0.2s" }}
            >
              Manage your courses, create assignments, and track student
              progress from one place.
            </p>
          </div>
        </section>

        <section id="assignments" className="scroll-mt-24 pt-16">
          <div
            className="animate-fade-up border-b border-white/10 pb-5"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#f4b942]">
                  Teaching
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                  Your Courses
                </h2>
              </div>

              <p className="hidden text-xs text-white/25 sm:block">
                {professorCourses.length}{" "}
                {professorCourses.length === 1 ? "course" : "courses"}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {professorCourses.map((course, index) => {
              const courseAssignments = getCourseAssignments(course.id);

              const totalSubmissions = courseAssignments.reduce(
                (sum, assignment) =>
                  sum + getAssignmentAnalytics(assignment).submitted,
                0
              );

              const totalPossible = courseAssignments.reduce(
                (sum, assignment) =>
                  sum + getAssignmentAnalytics(assignment).total,
                0
              );

              const completion = totalPossible
                ? Math.round((totalSubmissions / totalPossible) * 100)
                : 0;

              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => setSelectedCourse(course)}
                  className="group animate-fade-up block w-full text-left"
                  style={{
                    animationDelay: `${0.4 + index * 0.1}s`,
                  }}
                >
                  <div className="relative h-full overflow-hidden border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/[0.18] group-hover:bg-white/[0.035] sm:p-7">
                    <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[#f4b942] transition-transform duration-500 group-hover:scale-y-100" />

                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#f4b942]/70">
                          {course.code}
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-white">
                          {course.name}
                        </h3>

                        <p className="mt-3 max-w-lg text-sm leading-6 text-white/30">
                          {course.description}
                        </p>
                      </div>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-white/25 transition-all duration-500 group-hover:border-[#f4b942]/30 group-hover:text-[#f4b942]">
                        →
                      </span>
                    </div>

                    <div className="mt-8 border-t border-white/[0.07] pt-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                          Class overview
                        </span>

                        <span className="text-xs font-medium text-white/50">
                          {completion}%
                        </span>
                      </div>

                      <div className="mt-3 h-[2px] w-full overflow-hidden bg-white/[0.07]">
                        <div
                          className="h-full bg-[#f4b942] transition-all duration-700"
                          style={{ width: `${completion}%` }}
                        />
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.12em] text-white/20">
                        <span>{course.studentIds.length} students</span>
                        <span>{courseAssignments.length} assignments</span>
                        <span>
                          {
                            groups.filter(
                              (group) => group.courseId === course.id
                            ).length
                          }{" "}
                          groups
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {!professorCourses.length && (
            <div className="border border-dashed border-white/10 px-6 py-16 text-center">
              <p className="text-sm text-white/30">
                No courses have been assigned to you yet.
              </p>
            </div>
          )}
        </section>

        <section id="students" className="scroll-mt-24 pb-20 pt-24">
          <div
            className="animate-fade-up border-b border-white/10 pb-5"
            style={{ animationDelay: "0.8s" }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#f4b942]">
              Classroom
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
              Students
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/30">
              Students connected to your teaching workspace.
            </p>
          </div>

          <div className="mt-5 overflow-hidden border border-white/10">
            {students.map((student, index) => (
              <div
                key={student.id}
                className={`group flex items-center justify-between gap-4 px-5 py-5 transition-colors duration-500 hover:bg-white/[0.025] sm:px-6 ${
                  index !== students.length - 1
                    ? "border-b border-white/10"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.025] text-sm font-semibold text-white/60 transition-all duration-500 group-hover:border-[#f4b942]/30 group-hover:text-[#f4b942]">
                    {student.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white/80">
                      {student.name}
                    </p>

                    <p className="mt-1 text-xs text-white/25">
                      {student.email}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] uppercase tracking-[0.15em] text-white/20">
                  Student
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

function CourseStat({ label, value, accent = false }) {
  return (
    <div className="group bg-[#0b0b0c] px-6 py-7 transition-colors duration-500 hover:bg-white/[0.025] sm:px-7">
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
        {label}
      </p>

      <p
        className={`mt-4 text-4xl font-semibold tracking-[-0.05em] transition-transform duration-500 group-hover:translate-x-1 ${
          accent ? "text-[#f4b942]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function AdminAssignmentCard({ assignment, analytics, index }) {
  return (
    <article
      className="group animate-fade-up border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/[0.18] hover:bg-white/[0.035] sm:p-7"
      style={{
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#f4b942]/70">
              {assignment.submissionType === "group"
                ? "Group assignment"
                : "Individual assignment"}
            </span>

            <span className="h-1 w-1 rounded-full bg-white/15" />

            <span className="text-[10px] uppercase tracking-[0.14em] text-white/20">
              Due{" "}
              {new Date(assignment.dueDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
            {assignment.title}
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/35">
            {assignment.description}
          </p>
        </div>

        <a
          href={assignment.driveLink}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-xs font-medium text-white/35 transition-colors duration-300 hover:text-[#f4b942]"
        >
          Open OneDrive →
        </a>
      </div>

      <div className="mt-7 grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
        <div className="bg-[#0b0b0c] px-5 py-5">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/20">
            Total
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {analytics.total}
          </p>
        </div>

        <div className="bg-[#0b0b0c] px-5 py-5">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/20">
            Submitted
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#f4b942]">
            {analytics.submitted}
          </p>
        </div>

        <div className="bg-[#0b0b0c] px-5 py-5">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/20">
            Pending
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {analytics.pending}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.15em] text-white/20">
            Completion
          </span>

          <span className="text-xs text-white/40">{analytics.progress}%</span>
        </div>

        <div className="h-[2px] w-full overflow-hidden bg-white/[0.07]">
          <div
            className="h-full bg-[#f4b942] transition-all duration-700"
            style={{ width: `${analytics.progress}%` }}
          />
        </div>
      </div>
    </article>
  );
}

export default AdminDashboard;
