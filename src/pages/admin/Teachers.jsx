import { useMemo, useState } from "react";
import "../../styles/dashboard.css";

const initialTeachers = [
  {
    id: 1,
    teacherId: "T-001",
    name: "Dr. Ahmed Rahman",
    email: "ahmed@university.com",
    phone: "01711-123456",
    department: "CSE",
    designation: "Professor",
    status: "Active",
  },
  {
    id: 2,
    teacherId: "T-002",
    name: "Ms. Nusrat Jahan",
    email: "nusrat@university.com",
    phone: "01822-654321",
    department: "CSE",
    designation: "Lecturer",
    status: "Active",
  },
];

const emptyForm = {
  teacherId: "",
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  status: "Active",
};

function Teachers() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filteredTeachers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return teachers;
    }

    return teachers.filter((teacher) =>
      `${teacher.teacherId} ${teacher.name} ${teacher.email} ${teacher.phone} ${teacher.department} ${teacher.designation} ${teacher.status}`
        .toLowerCase()
        .includes(query)
    );
  }, [teachers, search]);

  // ADD
  const openAddForm = () => {
    setEditingTeacher(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  // EDIT
  const openEditForm = (teacher) => {
    setEditingTeacher(teacher);

    setFormData({
      teacherId: teacher.teacherId,
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      department: teacher.department,
      designation: teacher.designation,
      status: teacher.status,
    });

    setShowForm(true);
  };

  // CLOSE FORM
  const closeForm = () => {
    setShowForm(false);
    setEditingTeacher(null);
    setFormData(emptyForm);
  };

  // INPUT CHANGE
  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  // SAVE / UPDATE
  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingTeacher) {
      setTeachers((current) =>
        current.map((teacher) =>
          teacher.id === editingTeacher.id
            ? {
                ...teacher,
                ...formData,
              }
            : teacher
        )
      );
    } else {
      setTeachers((current) => [
        ...current,
        {
          id: Date.now(),
          ...formData,
        },
      ]);
    }

    closeForm();
  };

  // DELETE
  const deleteTeacher = (id) => {
    const teacher = teachers.find(
      (item) => item.id === id
    );

    if (
      teacher &&
      window.confirm(
        `Are you sure you want to delete ${teacher.name}?`
      )
    ) {
      setTeachers((current) =>
        current.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <main className="dashboard-page">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">SM</div>

        <h2>Admin Panel</h2>

        <nav>
          <a href="/admin/dashboard">
            Dashboard
          </a>

          <a href="/admin/students">
            Students
          </a>

          <a
            className="active"
            href="/admin/teachers"
          >
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

      {/* MAIN CONTENT */}
      <section className="dashboard-content">

        {/* HEADER */}
        <header className="page-title">
          <div>
            <p className="welcome-text">
              Administration
            </p>

            <h1>
              Teacher Management
            </h1>
          </div>

          <button onClick={openAddForm}>
            + Add Teacher
          </button>
        </header>

        {/* TABLE */}
        <section className="table-card">

          <div className="table-toolbar">

            <div>
              <h2>
                All Teachers
              </h2>

              <p className="table-count">
                {filteredTeachers.length} teacher
                {filteredTeachers.length !== 1
                  ? "s"
                  : ""}{" "}
                shown
              </p>
            </div>

            <input
              type="search"
              placeholder="Search teachers..."
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
                  <th>Teacher ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredTeachers.length > 0 ? (

                  filteredTeachers.map((teacher) => (

                    <tr key={teacher.id}>

                      <td>
                        {teacher.teacherId}
                      </td>

                      <td>
                        {teacher.name}
                      </td>

                      <td>
                        {teacher.email}
                      </td>

                      <td>
                        {teacher.phone}
                      </td>

                      <td>
                        {teacher.department}
                      </td>

                      <td>
                        {teacher.designation}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${
                            teacher.status.toLowerCase() ===
                            "active"
                              ? "status-active"
                              : "status-inactive"
                          }`}
                        >
                          {teacher.status}
                        </span>

                      </td>

                      <td className="table-actions">

                        <button
                          onClick={() =>
                            openEditForm(teacher)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            deleteTeacher(teacher.id)
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
                      No teachers found.
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* ADD / EDIT MODAL */}
        {showForm && (

          <div className="modal-overlay">

            <section className="student-form-card">

              <div className="form-header">

                <div>

                  <p className="welcome-text">
                    {editingTeacher
                      ? "Update record"
                      : "New record"}
                  </p>

                  <h2>
                    {editingTeacher
                      ? "Edit Teacher"
                      : "Add New Teacher"}
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
                    Teacher ID

                    <input
                      name="teacherId"
                      value={formData.teacherId}
                      onChange={handleChange}
                      placeholder="Example: T-003"
                      required
                    />
                  </label>

                  <label>
                    Full Name

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Teacher name"
                      required
                    />
                  </label>

                  <label>
                    Email Address

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="teacher@email.com"
                      required
                    />
                  </label>

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

                  <label>
                    Designation

                    <input
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="Example: Lecturer"
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

                <div className="form-actions">

                  <button
                    type="button"
                    className="cancel-button"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>

                  <button type="submit">
                    {editingTeacher
                      ? "Update Teacher"
                      : "Save Teacher"}
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

export default Teachers;