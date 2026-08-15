import { useState } from "react";
import "../../styles/dashboard.css";

const initialTeachers = [
  {
    id: 1,
    teacherId: "T-001",
    name: "Abu Jafar Md Jakaria",
    email: "jakaria@example.com",
    department: "CSE",
    designation: "Lecturer",
  },
  {
    id: 2,
    teacherId: "T-002",
    name: "Sample Teacher",
    email: "teacher@example.com",
    department: "CSE",
    designation: "Assistant Professor",
  },
];

const emptyForm = {
  teacherId: "",
  name: "",
  email: "",
  department: "",
  designation: "",
};

function Teachers() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.teacherId} ${teacher.name} ${teacher.email} ${teacher.department}`
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

    setTeachers([
      ...teachers,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    setFormData(emptyForm);
    setShowForm(false);
  };

  const deleteTeacher = (id) => {
    if (window.confirm("Do you want to delete this teacher?")) {
      setTeachers(
        teachers.filter((teacher) => teacher.id !== id)
      );
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
          <a className="active" href="/admin/teachers">
            Teachers
          </a>
          <a href="/admin/departments">Departments</a>
          <a href="/admin/courses">Courses</a>
          <a href="#">Enrollments</a>
          <a href="/">Logout</a>
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="page-title">
          <div>
            <p className="welcome-text">Administration</p>
            <h1>Teacher Management</h1>
          </div>

          <button onClick={() => setShowForm(true)}>
            + Add Teacher
          </button>
        </header>

        <section className="table-card">
          <div className="table-toolbar">
            <h2>All Teachers</h2>

            <input
              type="search"
              placeholder="Search teacher..."
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
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.teacherId}</td>
                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.department}</td>
                    <td>{teacher.designation}</td>

                    <td className="table-actions">
                      <button
                        onClick={() =>
                          alert(
                            "Edit teacher feature will be added later."
                          )
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
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {showForm && (
          <div className="modal-overlay">
            <section className="student-form-card">
              <div className="form-header">
                <h2>Add Teacher</h2>

                <button
                  className="close-button"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>

              <form
                className="student-form"
                onSubmit={handleSubmit}
              >
                <label>
                  Teacher ID

                  <input
                    name="teacherId"
                    placeholder="Example: T-003"
                    value={formData.teacherId}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Full Name

                  <input
                    name="name"
                    placeholder="Teacher name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Email

                  <input
                    type="email"
                    name="email"
                    placeholder="teacher@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Department

                  <input
                    name="department"
                    placeholder="Example: CSE"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Designation

                  <input
                    name="designation"
                    placeholder="Example: Lecturer"
                    value={formData.designation}
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

                  <button type="submit">
                    Save Teacher
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