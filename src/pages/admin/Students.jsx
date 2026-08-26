import { useMemo, useState } from "react";
import "../../styles/dashboard.css";

const initialStudents = [
  {
    id: 1,
    studentId: "232-115-001",
    name: "Rahim Ahmed",
    email: "rahim@email.com",
    phone: "01711-123456",
    department: "CSE",
    semester: "7th",
    status: "Active",
  },
  {
    id: 2,
    studentId: "232-115-002",
    name: "Karim Hasan",
    email: "karim@email.com",
    phone: "01822-654321",
    department: "CSE",
    semester: "7th",
    status: "Active",
  },
];

const emptyForm = {
  studentId: "",
  name: "",
  email: "",
  phone: "",
  department: "",
  semester: "",
  status: "Active",
};

function Students() {
  const [students, setStudents] = useState(initialStudents);

  const [search, setSearch] = useState("");

  // Add/Edit form open-close
  const [showForm, setShowForm] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  // Form data
  const [formData, setFormData] = useState(emptyForm);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return students;
    }

    return students.filter((student) =>
      `${student.studentId} ${student.name} ${student.email} ${student.phone} ${student.department} ${student.semester} ${student.status}`
        .toLowerCase()
        .includes(query)
    );
  }, [students, search]);

  // =========================
  // ADD STUDENT
  // =========================
  const openAddForm = () => {
    setEditingStudent(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  // =========================
  // EDIT STUDENT
  // =========================
  const openEditForm = (student) => {
    setEditingStudent(student);

    setFormData({
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      phone: student.phone,
      department: student.department,
      semester: student.semester,
      status: student.status,
    });

    setShowForm(true);
  };

  // =========================
  // CLOSE FORM
  // =========================
  const closeForm = () => {
    setShowForm(false);
    setEditingStudent(null);
    setFormData(emptyForm);
  };

  // =========================
  // FORM INPUT CHANGE
  // =========================
  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  // =========================
  // SAVE / UPDATE STUDENT
  // =========================
  const handleSubmit = (event) => {
    event.preventDefault();

    // EDIT
    if (editingStudent) {
      setStudents((current) =>
        current.map((student) =>
          student.id === editingStudent.id
            ? {
                ...student,
                ...formData,
              }
            : student
        )
      );
    }

    // ADD
    else {
      setStudents((current) => [
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
  // DELETE STUDENT
  // =========================
  const deleteStudent = (id) => {
    const student = students.find((item) => item.id === id);

    if (
      student &&
      window.confirm(
        `Are you sure you want to delete ${student.name}?`
      )
    ) {
      setStudents((current) =>
        current.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <main className="dashboard-page">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <div className="sidebar-brand">SM</div>

        <h2>Admin Panel</h2>

        <nav>
          <a href="/admin/dashboard">
            Dashboard
          </a>

          <a
            className="active"
            href="/admin/students"
          >
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

          <a href="/admin/enrollments">
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
              Student Management
            </h1>
          </div>

          <button onClick={openAddForm}>
            + Add Student
          </button>

        </header>

        {/* ================= STUDENT TABLE ================= */}
        <section className="table-card">

          <div className="table-toolbar">

            <div>
              <h2>
                All Students
              </h2>

              <p className="table-count">
                {filteredStudents.length} student
                {filteredStudents.length !== 1
                  ? "s"
                  : ""}{" "}
                shown
              </p>
            </div>

            <input
              type="search"
              placeholder="Search students..."
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
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredStudents.length > 0 ? (

                  filteredStudents.map((student) => (

                    <tr key={student.id}>

                      <td>
                        {student.studentId}
                      </td>

                      <td>
                        {student.name}
                      </td>

                      <td>
                        {student.email}
                      </td>

                      <td>
                        {student.phone}
                      </td>

                      <td>
                        {student.department}
                      </td>

                      <td>
                        {student.semester}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${
                            student.status.toLowerCase() ===
                            "active"
                              ? "status-active"
                              : "status-inactive"
                          }`}
                        >
                          {student.status}
                        </span>

                      </td>

                      <td className="table-actions">

                        {/* EDIT BUTTON */}
                        <button
                          onClick={() =>
                            openEditForm(student)
                          }
                        >
                          Edit
                        </button>

                        {/* DELETE BUTTON */}
                        <button
                          className="delete-button"
                          onClick={() =>
                            deleteStudent(student.id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td
                      colSpan="8"
                      className="empty-state"
                    >
                      No students found.
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

              {/* FORM HEADER */}
              <div className="form-header">

                <div>

                  <p className="welcome-text">
                    {editingStudent
                      ? "Update record"
                      : "New record"}
                  </p>

                  <h2>
                    {editingStudent
                      ? "Edit Student"
                      : "Add New Student"}
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

              {/* FORM */}
              <form
                className="student-form"
                onSubmit={handleSubmit}
              >

                <div className="form-grid">

                  {/* STUDENT ID */}
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

                  {/* NAME */}
                  <label>
                    Full Name

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Student name"
                      required
                    />
                  </label>

                  {/* EMAIL */}
                  <label>
                    Email Address

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="student@email.com"
                      required
                    />
                  </label>

                  {/* PHONE */}
                  <label>
                    Phone

                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      required
                    />
                  </label>

                  {/* DEPARTMENT */}
                  <label>
                    Department

                    <input
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Example: CSE"
                      required
                    />
                  </label>

                  {/* SEMESTER */}
                  <label>
                    Semester

                    <input
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      placeholder="Example: 7th"
                      required
                    />
                  </label>

                  {/* STATUS */}
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

                {/* FORM BUTTONS */}
                <div className="form-actions">

                  <button
                    type="button"
                    className="cancel-button"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>

                  <button type="submit">

                    {editingStudent
                      ? "Update Student"
                      : "Save Student"}

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

export default Students;