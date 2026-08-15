import { useState } from "react";
import "../../styles/dashboard.css";

const initialDepartments = [
  {
    id: 1,
    departmentId: "CSE",
    name: "Computer Science and Engineering",
    description: "Department of Computer Science and Engineering",
  },
  {
    id: 2,
    departmentId: "EEE",
    name: "Electrical and Electronic Engineering",
    description: "Department of Electrical and Electronic Engineering",
  },
];

const emptyForm = {
  departmentId: "",
  name: "",
  description: "",
};

function Departments() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const filteredDepartments = departments.filter((department) =>
    `${department.departmentId} ${department.name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setDepartments([
      ...departments,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    setFormData(emptyForm);
    setShowForm(false);
  };

  const deleteDepartment = (id) => {
    if (window.confirm("Do you want to delete this department?")) {
      setDepartments(departments.filter((department) => department.id !== id));
    }
  };

  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-brand">SM</div>
        <h2>Admin Panel</h2>

        <nav>
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/students">Students</a>
          <a href="#">Teachers</a>
          <a className="active" href="/admin/departments">Departments</a>
          <a href="#">Courses</a>
          <a href="#">Enrollments</a>
          <a href="/">Logout</a>
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="page-title">
          <div>
            <p className="welcome-text">Administration</p>
            <h1>Department Management</h1>
          </div>

          <button onClick={() => setShowForm(true)}>
            + Add Department
          </button>
        </header>

        <section className="table-card">
          <div className="table-toolbar">
            <h2>All Departments</h2>

            <input
              type="search"
              placeholder="Search by ID or name..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Department ID</th>
                  <th>Department Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredDepartments.map((department) => (
                  <tr key={department.id}>
                    <td>{department.departmentId}</td>
                    <td>{department.name}</td>
                    <td>{department.description}</td>
                    <td className="table-actions">
                      <button onClick={() => alert("Edit form will be added later.")}>
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => deleteDepartment(department.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {showForm && (
          <div className="modal-overlay">
            <section className="student-form-card">
              <div className="form-header">
                <h2>Add Department</h2>

                <button
                  className="close-button"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>

              <form className="student-form" onSubmit={handleSubmit}>
                <label>
                  Department ID
                  <input
                    name="departmentId"
                    placeholder="Example: CSE"
                    value={formData.departmentId}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Department Name
                  <input
                    name="name"
                    placeholder="Example: Computer Science and Engineering"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Description
                  <input
                    name="description"
                    placeholder="Short department description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </label>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>

                  <button type="submit">Save Department</button>
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