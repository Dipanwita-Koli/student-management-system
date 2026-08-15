import { useState } from "react";
import "../../styles/dashboard.css";

const initialStudents = [
  {
    id: 1,
    studentId: "232-115-001",
    name: "Rahim Ahmed",
    email: "rahim@email.com",
    department: "CSE",
    semester: "7th",
  },
  {
    id: 2,
    studentId: "232-115-002",
    name: "Karim Hasan",
    email: "karim@email.com",
    department: "CSE",
    semester: "7th",
  },
];

const emptyForm = {
  studentId: "",
  name: "",
  email: "",
  department: "",
  semester: "",
};

function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const filteredStudents = students.filter((student) =>
    `${student.studentId} ${student.name} ${student.department}`
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

    setStudents([
      ...students,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    setFormData(emptyForm);
    setShowForm(false);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Do you want to delete this student?")) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-brand">SM</div>
        <h2>Admin Panel</h2>

        <nav>
          <a href="/admin/dashboard">Dashboard</a>
          <a className="active" href="/admin/students">Students</a>
          <a href="#">Teachers</a>
          <a href="#">Departments</a>
          <a href="#">Courses</a>
          <a href="#">Enrollments</a>
          <a href="/">Logout</a>
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="page-title">
          <div>
            <p className="welcome-text">Administration</p>
            <h1>Student Management</h1>
          </div>

          <button onClick={() => setShowForm(true)}>
            + Add Student
          </button>
        </header>

        <section className="table-card">
          <div className="table-toolbar">
            <h2>All Students</h2>

            <input
              type="search"
              placeholder="Search by ID, name, department..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.studentId}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.department}</td>
                    <td>{student.semester}</td>
                    <td className="table-actions">
                      <button onClick={() => alert("Edit form will be added next.")}>
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => deleteStudent(student.id)}
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
                <h2>Add New Student</h2>
                <button
                  className="close-button"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>

              <form className="student-form" onSubmit={handleSubmit}>
                <label>
                  Student ID
                  <input
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Full Name
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                  Semester
                  <input
                    name="semester"
                    placeholder="Example: 7th"
                    value={formData.semester}
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

                  <button type="submit">Save Student</button>
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