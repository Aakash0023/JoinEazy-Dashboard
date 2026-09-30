import { useMemo, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import CreateAssignmentModal from "../components/admin/CreateAssignmentModal";
import { useApp } from "../context/AppContext";
import AssignmentAdminCard from "../components/admin/AssignmentAdminCard";

function AdminDashboard() {
  const {
    currentUser,
    courses,
    students,
    groups,
    getProfessorCourses,
    getCourseAssignments,
    getAssignmentAnalytics,
    addAssignment,
  } = useApp();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const courseAssignments = selectedCourse
    ? getCourseAssignments(selectedCourse.id)
    : [];

  const filteredAssignments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return courseAssignments.filter((assignment) => {
      const analytics = getAssignmentAnalytics(assignment);

      const matchesSearch =
        !query ||
        assignment.title.toLowerCase().includes(query) ||
        assignment.description?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "submitted" && analytics.submitted > 0) ||
        (statusFilter === "pending" && analytics.pending > 0) ||
        (statusFilter === "overdue" && analytics.overdue > 0);

      return matchesSearch && matchesStatus;
    });
  }, [courseAssignments, searchQuery, statusFilter, getAssignmentAnalytics]);

  const courseGroups = selectedCourse
    ? groups.filter((group) => group.courseId === selectedCourse.id)
    : [];

  const handleCreateAssignment = (data) => {
    addAssignment({
      ...data,
      courseId: selectedCourse?.id,
    });

    setShowCreateModal(false);
  };

  const resetAssignmentFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  if (selectedCourse) {
    return (
      <DashboardLayout role="admin">
        <div className="min-h-[calc(100vh-150px)]">
          <button
            type="button"
            onClick={() => {
              setSelectedCourse(null);
              resetAssignmentFilters();
            }}
            className="group mb-10 flex items-center gap-2 text-xs font-medium text-white/30 transition-colors duration-300 hover:text-white"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to courses
          </button>

          <section className="relative overflow-hidden border-b border-white/10 pb-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#f4b942]/[0.035] blur-3xl" />

            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f4b942] shadow-[0_0_10px_rgba(244,185,66,0.7)]" />

                  <p className="glow-accent text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f4b942]/80">
                    {selectedCourse.code}
                  </p>
                </div>

                <h1 className="glow-heading mt-4 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">
                  {selectedCourse.name}
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/35 sm:text-base">
                  {selectedCourse.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="group flex h-11 shrink-0 items-center justify-center gap-3 rounded-lg bg-[#f4b942] px-5 text-sm font-semibold text-black shadow-[0_0_28px_rgba(244,185,66,0.06)] transition-all duration-300 hover:bg-[#ffd166] hover:shadow-[0_0_32px_rgba(244,185,66,0.12)]"
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

          <section className="pt-10">
            <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
              <CourseStat
                label="Students"
                value={selectedCourse.studentIds.length}
              />

              <CourseStat
                label="Assignments"
                value={courseAssignments.length}
              />

              <CourseStat label="Groups" value={courseGroups.length} accent />
            </div>
          </section>

          <section className="pb-20 pt-16">
            <div className="glow-line border-b border-white/10 pb-5">
              <p className="glow-accent text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f4b942]">
                Course management
              </p>

              <div className="mt-3 flex items-end justify-between gap-4">
                <h2 className="glow-heading text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                  Assignments
                </h2>

                <span className="text-xs text-white/25">
                  {filteredAssignments.length}{" "}
                  {filteredAssignments.length === 1
                    ? "assignment"
                    : "assignments"}
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_180px]">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search assignments..."
                  className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.025] px-4 pr-10 text-sm text-white outline-none placeholder:text-white/20 transition-all duration-300 focus:border-[#f4b942]/30 focus:bg-[#f4b942]/[0.025]"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-white/25 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-12 rounded-lg border border-white/10 bg-[#101012] px-4 text-sm text-white/60 outline-none transition-all duration-300 focus:border-[#f4b942]/30"
              >
                <option value="all">All status</option>
                <option value="submitted">Submitted</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            {(searchQuery || statusFilter !== "all") && (
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-xs text-white/25">
                  Showing {filteredAssignments.length} of{" "}
                  {courseAssignments.length} assignments
                </p>

                <button
                  type="button"
                  onClick={resetAssignmentFilters}
                  className="text-xs font-medium text-[#f4b942]/70 transition-colors hover:text-[#f4b942]"
                >
                  Clear filters
                </button>
              </div>
            )}

            <div className="mt-6 space-y-4">
              {filteredAssignments.map((assignment, index) => {
                const analytics = getAssignmentAnalytics(assignment);

                return (
                  <AssignmentAdminCard
                    key={assignment.id}
                    assignment={assignment}
                    analytics={analytics}
                    index={index}
                  />
                );
              })}

              {!filteredAssignments.length && courseAssignments.length > 0 && (
                <div className="glow-card glow-border rounded-xl border border-dashed border-white/10 bg-white/[0.01] px-6 py-16 text-center">
                  <div className="relative z-10">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-[#f4b942]">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-4-4" strokeLinecap="round" />
                      </svg>
                    </div>

                    <h3 className="glow-heading mt-5 text-base font-medium text-white">
                      No matching assignments
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/30">
                      Try changing your search or submission status filter.
                    </p>

                    <button
                      type="button"
                      onClick={resetAssignmentFilters}
                      className="glow-accent mt-6 text-sm font-medium text-[#f4b942] transition-colors duration-300 hover:text-[#ffd166]"
                    >
                      Clear filters →
                    </button>
                  </div>
                </div>
              )}

              {!courseAssignments.length && (
                <div className="glow-card glow-border rounded-xl border border-dashed border-white/10 bg-white/[0.01] px-6 py-16 text-center">
                  <div className="relative z-10">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-[#f4b942] shadow-[0_0_24px_rgba(244,185,66,0.06)]">
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

                    <h3 className="glow-heading mt-5 text-base font-medium text-white">
                      No assignments yet
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/30">
                      Create an assignment for this course to start tracking
                      submissions.
                    </p>

                    <button
                      type="button"
                      onClick={() => setShowCreateModal(true)}
                      className="glow-accent mt-6 text-sm font-medium text-[#f4b942] transition-colors duration-300 hover:text-[#ffd166]"
                    >
                      Create assignment →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="pb-20 pt-4">
            <div className="glow-line border-b border-white/10 pb-5">
              <p className="glow-accent text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f4b942]">
                Classroom
              </p>

              <div className="mt-3 flex items-end justify-between gap-4">
                <h2 className="glow-heading text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                  Groups
                </h2>

                <span className="text-xs text-white/25">
                  {courseGroups.length}{" "}
                  {courseGroups.length === 1 ? "group" : "groups"}
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {courseGroups.map((group) => {
                const members = group.memberIds
                  .map((memberId) =>
                    students.find((student) => student.id === memberId)
                  )
                  .filter(Boolean);

                const leader = students.find(
                  (student) => student.id === group.leaderId
                );

                return (
                  <div
                    key={group.id}
                    className="glow-card glow-border group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#101012] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-[#121214]"
                  >
                    <div className="relative z-10">
                      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#f4b942] shadow-[0_0_10px_rgba(244,185,66,0.7)]" />

                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
                              Group
                            </p>
                          </div>

                          <h3 className="glow-heading mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                            {group.name}
                          </h3>
                        </div>

                        <span className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/30">
                          {members.length} members
                        </span>
                      </div>

                      <div className="mt-6 border-t border-white/[0.07] pt-5">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/20">
                          Group leader
                        </p>

                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#f4b942]/20 bg-[#f4b942]/[0.05] text-xs font-semibold text-[#f4b942] shadow-[0_0_18px_rgba(244,185,66,0.06)]">
                            {leader?.name?.charAt(0) || "?"}
                          </div>

                          <div>
                            <p className="text-sm font-medium text-white/70">
                              {leader?.name || "Unknown"}
                            </p>

                            <p className="mt-1 text-xs text-white/25">
                              {leader?.email || "No email available"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-white/[0.07] pt-5">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/20">
                          Members
                        </p>

                        <div className="mt-3 space-y-2">
                          {members.map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center justify-between gap-4 rounded-lg border border-white/[0.06] bg-white/[0.015] px-4 py-3 transition-colors hover:bg-white/[0.03]"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-xs font-semibold text-white/50">
                                  {member.name.charAt(0)}
                                </div>

                                <div>
                                  <p className="text-sm text-white/60">
                                    {member.name}
                                  </p>

                                  <p className="mt-0.5 text-[11px] text-white/20">
                                    {member.email}
                                  </p>
                                </div>
                              </div>

                              {member.id === group.leaderId && (
                                <span className="rounded-full bg-[#f4b942]/[0.08] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#f4b942] shadow-[0_0_14px_rgba(244,185,66,0.05)]">
                                  Leader
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!courseGroups.length && (
              <div className="glow-card rounded-xl border border-dashed border-white/10 px-6 py-16 text-center">
                <p className="relative z-10 text-sm text-white/30">
                  No groups have been created for this course yet.
                </p>
              </div>
            )}
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
        <section className="relative flex min-h-[calc(100vh-150px)] flex-col justify-center overflow-hidden border-b border-white/10 pb-16 pt-8">
          <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#f4b942]/[0.025] blur-3xl" />

          <div className="relative max-w-5xl">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f4b942] shadow-[0_0_12px_rgba(244,185,66,0.75)]" />

              <p className="glow-accent animate-fade-up text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f4b942]">
                Faculty dashboard
              </p>
            </div>

            <h1
              className="glow-heading mt-5 animate-fade-up text-5xl font-semibold leading-[0.95] tracking-[-0.065em] text-white sm:text-6xl lg:text-8xl"
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
            className="glow-line animate-fade-up border-b border-white/10 pb-5"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-end justify-between">
              <div>
                <p className="glow-accent text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f4b942]">
                  Teaching
                </p>

                <h2 className="glow-heading mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
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

              const courseGroups = groups.filter(
                (group) => group.courseId === course.id
              );

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
                  <div className="glow-card glow-border relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#101012] p-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/[0.15] group-hover:bg-[#121214] sm:p-7">
                    <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[#f4b942] shadow-[0_0_12px_rgba(244,185,66,0.6)] transition-transform duration-500 group-hover:scale-y-100" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <p className="glow-accent text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f4b942]/70">
                            {course.code}
                          </p>

                          <h3 className="glow-heading mt-3 text-2xl font-semibold tracking-[-0.045em] text-white">
                            {course.name}
                          </h3>

                          <p className="mt-3 max-w-lg text-sm leading-6 text-white/30">
                            {course.description}
                          </p>
                        </div>

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/25 transition-all duration-500 group-hover:border-[#f4b942]/30 group-hover:bg-[#f4b942]/[0.05] group-hover:text-[#f4b942] group-hover:shadow-[0_0_18px_rgba(244,185,66,0.08)]">
                          →
                        </span>
                      </div>

                      <div className="mt-8 border-t border-white/[0.07] pt-5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/25">
                            Class overview
                          </span>

                          <span className="glow-number text-xs font-semibold text-white/60">
                            {completion}%
                          </span>
                        </div>

                        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.07]">
                          <div
                            className="h-full rounded-full bg-[#f4b942] shadow-[0_0_10px_rgba(244,185,66,0.35),0_0_22px_rgba(244,185,66,0.12)] transition-all duration-700"
                            style={{ width: `${completion}%` }}
                          />
                        </div>

                        <div className="mt-5 grid grid-cols-3 gap-3">
                          <MiniStat
                            label="Students"
                            value={course.studentIds.length}
                          />

                          <MiniStat
                            label="Assignments"
                            value={courseAssignments.length}
                          />

                          <MiniStat
                            label="Groups"
                            value={courseGroups.length}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {!professorCourses.length && (
            <div className="glow-card rounded-xl border border-dashed border-white/10 px-6 py-16 text-center">
              <p className="relative z-10 text-sm text-white/30">
                No courses have been assigned to you yet.
              </p>
            </div>
          )}
        </section>

        <section id="students" className="scroll-mt-24 pb-20 pt-24">
          <div
            className="glow-line animate-fade-up border-b border-white/10 pb-5"
            style={{ animationDelay: "0.8s" }}
          >
            <p className="glow-accent text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f4b942]">
              Classroom
            </p>

            <h2 className="glow-heading mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
              Students
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/30">
              Students connected to your teaching workspace.
            </p>
          </div>

          <div className="glow-border mt-5 overflow-hidden rounded-xl border border-white/[0.08] bg-[#101012]">
            {students.map((student, index) => (
              <div
                key={student.id}
                className={`group flex items-center justify-between gap-4 px-5 py-5 transition-colors duration-500 hover:bg-white/[0.025] sm:px-6 ${
                  index !== students.length - 1
                    ? "border-b border-white/[0.07]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-sm font-semibold text-white/60 transition-all duration-500 group-hover:border-[#f4b942]/30 group-hover:bg-[#f4b942]/[0.04] group-hover:text-[#f4b942] group-hover:shadow-[0_0_18px_rgba(244,185,66,0.06)]">
                    {student.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white/80 transition-all duration-300 group-hover:text-white">
                      {student.name}
                    </p>

                    <p className="mt-1 text-xs text-white/25">
                      {student.email}
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.15em] text-white/20">
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
    <div className="group relative overflow-hidden bg-[#0b0b0c] px-6 py-7 transition-colors duration-500 hover:bg-white/[0.025] sm:px-7">
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#f4b942]/[0.04] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
          {label}
        </p>

        <p
          className={`glow-number mt-4 text-4xl font-semibold tracking-[-0.05em] transition-transform duration-500 group-hover:translate-x-1 ${
            accent ? "glow-accent text-[#f4b942]" : "text-white"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-3 transition-all duration-300 hover:border-[#f4b942]/10 hover:bg-[#f4b942]/[0.025]">
      <div className="pointer-events-none absolute -right-4 -top-4 h-10 w-10 rounded-full bg-[#f4b942]/[0.06] blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <p className="text-[8px] font-semibold uppercase tracking-[0.13em] text-white/20">
          {label}
        </p>

        <p className="glow-number mt-1.5 text-sm font-semibold text-white/65">
          {value}
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
