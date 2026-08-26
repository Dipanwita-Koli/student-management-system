import { useMemo, useState } from "react";
import "../../styles/dashboard.css";

const initialDepartments = [
  {
    id: 1,
    departmentId: "D-001",
    name: "Computer Science & Engineering",
    head: "Dr. Ahmed Rahman",
    email: "cse@university.com",
    phone: "01711-123456",
    status: "Active",
  },
  {
    id: 2,
    departmentId: "D-002",
    name: "Electrical & Electronic Engineering",
    head: "Dr. Karim Hasan",
    email: "eee@university.com",
    phone: "01822-654321",
    status: "Active",
  },
];

const emptyForm = {
  departmentId: "",
  name: "",
  head: "",
  email: "",
  phone: "",
  status: "Active",
};

function Departments() {
  const [departments, setDepartments] = useState(
    initialDepartments
  );

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] =
    useState(null);

  const [formData, setFormData] = useState(emptyForm);

  // =========================
  // SEARCH
  // =========================
  const filteredDepartments = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return departments;
    }

    return departments.filter((department) =>
      `${department.departmentId} ${department.name} ${department.head} ${department.email} ${department.phone} ${department.status}`
        .toLowerCase()
        .includes(query)
    );
  }, [departments, search]);

  // =========================
  // ADD DEPARTMENT
  // =========================
  const openAddForm = () => {
    setEditingDepartment(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  // =========================
  // EDIT DEPARTMENT
  // =========================
  const openEditForm = (department) => {
    setEditingDepartment(department);

    setFormData({
      departmentId: department.departmentId,
      name: department.name,
      head: department.head,
      email: department.email,
      phone: department.phone,
      status: department.status,
    });

    setShowForm(true);
  };

  // =========================
  // CLOSE FORM
  // =========================
  const closeForm = () => {
    setShowForm(false);
    setEditingDepartment(null);
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

    // UPDATE
    if (editingDepartment) {
      setDepartments((current) =>
        current.map((department) =>
          department.id === editingDepartment.id
            ? {
                ...department,
                ...formData,
              }
            : department
        )
      );
    }

    // ADD
    else {
      setDepartments((current) => [
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
  const deleteDepartment = (id) => {
    const department = departments.find(
      (item) => item.id === id
    );

    if (
      department &&
      window.confirm(
        `Are you sure you want to delete ${department.name}?`
      )
    ) {
      setDepartments((current) =>
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

          <a
            className="active"
            href="/admin/departments"
          >
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
              Department Management
            </h1>

          </div>

          <button onClick={openAddForm}>
            + Add Department
          </button>

        </header>

        {/* ================= TABLE ================= */}
        <section className="table-card">

          <div className="table-toolbar">

            <div>

              <h2>
                All Departments
              </h2>

              <p className="table-count">
                {filteredDepartments.length} department
                {filteredDepartments.length !== 1
                  ? "s"
                  : ""}{" "}
                shown
              </p>

            </div>

            <input
              type="search"
              placeholder="Search departments..."
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
                    Department ID
                  </th>

                  <th>
                    Department Name
                  </th>

                  <th>
                    Head of Department
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Phone
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

                {filteredDepartments.length > 0 ? (

                  filteredDepartments.map(
                    (department) => (

                      <tr key={department.id}>

                        <td>
                          {department.departmentId}
                        </td>

                        <td>
                          {department.name}
                        </td>

                        <td>
                          {department.head}
                        </td>

                        <td>
                          {department.email}
                        </td>

                        <td>
                          {department.phone}
                        </td>

                        <td>

                          <span
                            className={`status-badge ${
                              department.status.toLowerCase() ===
                              "active"
                                ? "status-active"
                                : "status-inactive"
                            }`}
                          >
                            {department.status}
                          </span>

                        </td>

                        <td className="table-actions">

                          <button
                            onClick={() =>
                              openEditForm(
                                department
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() =>
                              deleteDepartment(
                                department.id
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
                      colSpan="7"
                      className="empty-state"
                    >
                      No departments found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* ================= ADD / EDIT FORM ================= */}

        {showForm && (

          <div className="modal-overlay">

            <section className="student-form-card">

              {/* FORM HEADER */}
              <div className="form-header">

                <div>

                  <p className="welcome-text">
                    {editingDepartment
                      ? "Update record"
                      : "New record"}
                  </p>

                  <h2>
                    {editingDepartment
                      ? "Edit Department"
                      : "Add New Department"}
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

                  <label>

                    Department ID

                    <input
                      name="departmentId"
                      value={
                        formData.departmentId
                      }
                      onChange={handleChange}
                      placeholder="Example: D-003"
                      required
                    />

                  </label>

                  <label>

                    Department Name

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Department name"
                      required
                    />

                  </label>

                  <label>

                    Head of Department

                    <input
                      name="head"
                      value={formData.head}
                      onChange={handleChange}
                      placeholder="HOD name"
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
                      placeholder="department@university.com"
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

                    {editingDepartment
                      ? "Update Department"
                      : "Save Department"}

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

export default Departments;