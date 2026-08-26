import { useMemo, useState } from "react";
import "../../styles/dashboard.css";

const initialEnrollments = [
  {
    id: 1,
    enrollmentId: "ENR-001",
    student: "Rahim Ahmed",
    studentId: "232-115-001",
    course: "Introduction to Computer Science",
    courseCode: "CSE101",
    semester: "1st",
    enrollmentDate: "2026-01-10",
    status: "Active",
  },
  {
    id: 2,
    enrollmentId: "ENR-002",
    student: "Karim Hasan",
    studentId: "232-115-002",
    course: "Data Structures",
    courseCode: "CSE201",
    semester: "3rd",
    enrollmentDate: "2026-01-12",
    status: "Active",
  },
];

const emptyForm = {
  enrollmentId: "",
  student: "",
  studentId: "",
  course: "",
  courseCode: "",
  semester: "",
  enrollmentDate: "",
  status: "Active",
};

function Enrollments() {
  const [enrollments, setEnrollments] = useState(
    initialEnrollments
  );

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEnrollment, setEditingEnrollment] =
    useState(null);

  const [formData, setFormData] = useState(emptyForm);

  // =========================
  // SEARCH
  // =========================
  const filteredEnrollments = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return enrollments;
    }

    return enrollments.filter((enrollment) =>
      `${enrollment.enrollmentId} ${enrollment.student} ${enrollment.studentId} ${enrollment.course} ${enrollment.courseCode} ${enrollment.semester} ${enrollment.enrollmentDate} ${enrollment.status}`
        .toLowerCase()
        .includes(query)
    );
  }, [enrollments, search]);

  // =========================
  // ADD
  // =========================
  const openAddForm = () => {
    setEditingEnrollment(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  // =========================
  // EDIT
  // =========================
  const openEditForm = (enrollment) => {
    setEditingEnrollment(enrollment);

    setFormData({
      enrollmentId: enrollment.enrollmentId,
      student: enrollment.student,
      studentId: enrollment.studentId,
      course: enrollment.course,
      courseCode: enrollment.courseCode,
      semester: enrollment.semester,
      enrollmentDate: enrollment.enrollmentDate,
      status: enrollment.status,
    });

    setShowForm(true);
  };

  // =========================
  // CLOSE FORM
  // =========================
  const closeForm = () => {
    setShowForm(false);
    setEditingEnrollment(null);
    setFormData(emptyForm);
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  // =========================
  // SAVE / UPDATE
  // =========================
  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingEnrollment) {
      setEnrollments((current) =>
        current.map((enrollment) =>
          enrollment.id === editingEnrollment.id
            ? {
                ...enrollment,
                ...formData,
              }
            : enrollment
        )
      );
    } else {
      setEnrollments((current) => [
        ...current,
        {
          id: Date.now(),
          ...formData,
        },
      ]);
    }

    closeForm();
  };

  // =========================
  // DELETE
  // =========================
  const deleteEnrollment = (id) => {
    const enrollment = enrollments.find(
      (item) => item.id === id
    );

    if (
      enrollment &&
      window.confirm(
        `Are you sure you want to delete enrollment ${enrollment.enrollmentId}?`
      )
    ) {
      setEnrollments((current) =>
        current.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <main className="dashboard-page">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        <div className="sidebar-brand">
          SM
        </div>

        <h2>Admin Panel</h2>

        <nav>

          <a href="/admin/dashboard">
            Dashboard
          </a>

          <a href="/admin/students">
            Students
          </a>

          <a href="/admin/teachers">
            Teachers
          </a>

          <a href="/admin/departments">
            Departments
          </a>

          <a href="/admin/courses">
            Courses
          </a>

          <a
            className="active"
            href="/admin/enrollments"
          >
            Enrollments
          </a>

          <a href="/">
            Logout
          </a>

        </nav>

      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <section className="dashboard-content">

        {/* HEADER */}
        <header className="page-title">

          <div>

            <p className="welcome-text">
              Administration
            </p>

            <h1>
              Enrollment Management
            </h1>

          </div>

          <button onClick={openAddForm}>
            + Add Enrollment
          </button>

        </header>

        {/* ================= TABLE ================= */}
        <section className="table-card">

          <div className="table-toolbar">

            <div>

              <h2>
                All Enrollments
              </h2>

              <p className="table-count">
                {filteredEnrollments.length} enrollment
                {filteredEnrollments.length !== 1
                  ? "s"
                  : ""}{" "}
                shown
              </p>

            </div>

            <input
              type="search"
              placeholder="Search enrollments..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Enrollment ID
                  </th>

                  <th>
                    Student
                  </th>

                  <th>
                    Student ID
                  </th>

                  <th>
                    Course
                  </th>

                  <th>
                    Course Code
                  </th>

                  <th>
                    Semester
                  </th>

                  <th>
                    Enrollment Date
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredEnrollments.length > 0 ? (

                  filteredEnrollments.map(
                    (enrollment) => (

                      <tr key={enrollment.id}>

                        <td>
                          {enrollment.enrollmentId}
                        </td>

                        <td>
                          {enrollment.student}
                        </td>

                        <td>
                          {enrollment.studentId}
                        </td>

                        <td>
                          {enrollment.course}
                        </td>

                        <td>
                          {enrollment.courseCode}
                        </td>

                        <td>
                          {enrollment.semester}
                        </td>

                        <td>
                          {enrollment.enrollmentDate}
                        </td>

                        <td>

                          <span
                            className={`status-badge ${
                              enrollment.status.toLowerCase() ===
                              "active"
                                ? "status-active"
                                : "status-inactive"
                            }`}
                          >
                            {enrollment.status}
                          </span>

                        </td>

                        <td className="table-actions">

                          <button
                            onClick={() =>
                              openEditForm(
                                enrollment
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() =>
                              deleteEnrollment(
                                enrollment.id
                              )
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="9"
                      className="empty-state"
                    >
                      No enrollments found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* ================= ADD / EDIT MODAL ================= */}

        {showForm && (

          <div className="modal-overlay">

            <section className="student-form-card">

              <div className="form-header">

                <div>

                  <p className="welcome-text">
                    {editingEnrollment
                      ? "Update record"
                      : "New record"}
                  </p>

                  <h2>
                    {editingEnrollment
                      ? "Edit Enrollment"
                      : "Add New Enrollment"}
                  </h2>

                </div>

                <button
                  className="close-button"
                  type="button"
                  onClick={closeForm}
                >
                  ×
                </button>

              </div>

              <form
                className="student-form"
                onSubmit={handleSubmit}
              >

                <div className="form-grid">

                  <label>

                    Enrollment ID

                    <input
                      name="enrollmentId"
                      value={
                        formData.enrollmentId
                      }
                      onChange={handleChange}
                      placeholder="Example: ENR-003"
                      required
                    />

                  </label>

                  <label>

                    Student Name

                    <input
                      name="student"
                      value={formData.student}
                      onChange={handleChange}
                      placeholder="Student name"
                      required
                    />

                  </label>

                  <label>

                    Student ID

                    <input
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      placeholder="Example: 232-115-003"
                      required
                    />

                  </label>

                  <label>

                    Course Name

                    <input
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      placeholder="Course name"
                      required
                    />

                  </label>

                  <label>

                    Course Code

                    <input
                      name="courseCode"
                      value={
                        formData.courseCode
                      }
                      onChange={handleChange}
                      placeholder="Example: CSE301"
                      required
                    />

                  </label>

                  <label>

                    Semester

                    <input
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      placeholder="Example: 5th"
                      required
                    />

                  </label>

                  <label>

                    Enrollment Date

                    <input
                      type="date"
                      name="enrollmentDate"
                      value={
                        formData.enrollmentDate
                      }
                      onChange={handleChange}
                      required
                    />

                  </label>

                  <label>

                    Status

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >

                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>

                    </select>

                  </label>

                </div>

                {/* BUTTONS */}
                <div className="form-actions">

                  <button
                    type="button"
                    className="cancel-button"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>

                  <button type="submit">

                    {editingEnrollment
                      ? "Update Enrollment"
                      : "Save Enrollment"}

                  </button>

                </div>

              </form>

            </section>

          </div>

        )}

      </section>

    </main>
  );
}

export default Enrollments;