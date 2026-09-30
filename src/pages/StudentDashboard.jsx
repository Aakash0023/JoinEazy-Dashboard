import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import AssignmentCard from "../components/AssignmentCard";
import ProgressBar from "../components/ProgressBar";
import { useApp } from "../context/AppContext";

function StudentDashboard() {
  const {
    currentUser,
    getStudentCourses,
    getCourseAssignments,
    getAssignmentStatus,
  } = useApp();

  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const courses = getStudentCourses(currentUser.id);
  const firstName = currentUser.name.split(" ")[0];

  const selectedCourse = courses.find(
    (course) => course.id === selectedCourseId
  );

  const getCourseProgress = (courseId) => {
    const courseAssignments = getCourseAssignments(courseId);

    if (!courseAssignments.length) return 0;

    const completed = courseAssignments.filter((assignment) => {
      return getAssignmentStatus(assignment, currentUser.id).acknowledged;
    }).length;

    return Math.round((completed / courseAssignments.length) * 100);
  };

  const getCourseStats = (courseId) => {
    const courseAssignments = getCourseAssignments(courseId);

    const statuses = courseAssignments.map((assignment) =>
      getAssignmentStatus(assignment, currentUser.id)
    );

    const completed = statuses.filter((status) => status.acknowledged).length;

    const overdue = statuses.filter((status) => status.overdue).length;

    const pending = statuses.filter(
      (status) => !status.acknowledged && !status.overdue
    ).length;

    return {
      total: courseAssignments.length,
      completed,
      pending,
      overdue,
    };
  };

  if (selectedCourse) {
    const assignments = getCourseAssignments(selectedCourse.id);
    const progress = getCourseProgress(selectedCourse.id);
    const stats = getCourseStats(selectedCourse.id);

    return (
      <DashboardLayout role="student">
        <div className="min-h-[calc(100vh-150px)]">
          <button
            type="button"
            onClick={() => setSelectedCourseId(null)}
            className="group mb-10 flex items-center gap-2 text-xs font-medium text-white/30 transition-colors duration-300 hover:text-white"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to courses
          </button>

          <section className="border-b border-white/10 pb-10">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#f4b942]">
              {selectedCourse.code}
            </p>

            <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <h1 className="text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">
                  {selectedCourse.name}
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/35 sm:text-base">
                  {selectedCourse.description}
                </p>
              </div>

              <div className="shrink-0 border border-white/10 bg-white/[0.025] px-6 py-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                  Course progress
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
                  {progress}%
                </p>
              </div>
            </div>
          </section>

          <section className="pt-10">
            <div className="grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-[#0b0b0c] px-5 py-5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/20">
                  Total
                </p>

                <p className="mt-2 text-2xl font-semibold text-white">
                  {stats.total}
                </p>
              </div>

              <div className="bg-[#0b0b0c] px-5 py-5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/20">
                  Submitted
                </p>

                <p className="mt-2 text-2xl font-semibold text-green-400">
                  {stats.completed}
                </p>
              </div>

              <div className="bg-[#0b0b0c] px-5 py-5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/20">
                  Pending
                </p>

                <p className="mt-2 text-2xl font-semibold text-white">
                  {stats.pending}
                </p>
              </div>

              <div className="bg-[#0b0b0c] px-5 py-5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/20">
                  Overdue
                </p>

                <p className="mt-2 text-2xl font-semibold text-red-400">
                  {stats.overdue}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <ProgressBar
                value={progress}
                showPercent={false}
                size="sm"
                colorClass="bg-[#f4b942]"
              />
            </div>
          </section>

          <section className="pt-12">
            <div className="flex items-end justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#f4b942]">
                  Course work
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">
                  Assignments
                </h2>
              </div>

              <p className="text-xs text-white/25">
                {assignments.length}{" "}
                {assignments.length === 1 ? "assignment" : "assignments"}
              </p>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {assignments.map((assignment, index) => (
                <div
                  key={assignment.id}
                  className="animate-fade-up h-full"
                  style={{
                    animationDelay: `${index * 0.08}s`,
                  }}
                >
                  <AssignmentCard assignment={assignment} />
                </div>
              ))}

              {!assignments.length && (
                <div className="border border-dashed border-white/10 px-6 py-16 text-center lg:col-span-2">
                  <p className="text-sm text-white/30">
                    No assignments have been added for this course yet.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">
      <div id="dashboard" className="scroll-mt-24">
        <section className="flex min-h-[calc(100vh-150px)] flex-col justify-center border-b border-white/10 pb-16 pt-8">
          <div className="max-w-4xl">
            <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.28em] text-[#f4b942]">
              Student dashboard
            </p>

            <h1
              className="mt-5 animate-fade-up text-5xl font-semibold leading-[0.95] tracking-[-0.065em] text-white sm:text-6xl lg:text-8xl"
              style={{ animationDelay: "0.1s" }}
            >
              Good to see you,
              <br />
              <span className="text-white/30">{firstName}.</span>
            </h1>

            <p
              className="mt-7 max-w-xl animate-fade-up text-sm leading-7 text-white/35 sm:text-base"
              style={{ animationDelay: "0.2s" }}
            >
              Explore your courses, keep track of assignments, and stay on top
              of your academic progress.
            </p>
          </div>
        </section>

        <section id="courses" className="scroll-mt-24 pb-16 pt-16">
          <div
            className="animate-fade-up border-b border-white/10 pb-5"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#f4b942]">
                  This semester
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                  Your Courses
                </h2>
              </div>

              <p className="hidden text-xs text-white/25 sm:block">
                {courses.length} {courses.length === 1 ? "course" : "courses"}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {courses.map((course, index) => {
              const stats = getCourseStats(course.id);
              const progress = getCourseProgress(course.id);

              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => setSelectedCourseId(course.id)}
                  className="group animate-fade-up block w-full cursor-pointer text-left"
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
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                          Progress
                        </span>

                        <span className="text-xs font-medium text-white/50">
                          {progress}%
                        </span>
                      </div>

                      <ProgressBar
                        value={progress}
                        showPercent={false}
                        size="sm"
                        colorClass="bg-[#f4b942]"
                      />

                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.12em] text-white/20">
                        <span>{stats.total} assignments</span>
                        <span>{stats.completed} completed</span>
                        <span>{stats.pending} pending</span>

                        {stats.overdue > 0 && (
                          <span className="text-red-400/70">
                            {stats.overdue} overdue
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {!courses.length && (
            <div className="border border-dashed border-white/10 px-6 py-16 text-center">
              <p className="text-sm text-white/30">
                You are not enrolled in any courses for this semester.
              </p>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;
