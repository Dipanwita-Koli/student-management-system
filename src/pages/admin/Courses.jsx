import { useState } from "react";
import "../../styles/dashboard.css";

const initialCourses = [
  {
    id: 1,
    courseCode: "CSE-323",
    title: "Web Programming Lab",
    credit: "1.5",
    semester: "7th",
    department: "CSE",
    teacher: "Abu Jafar Md Jakaria",
  },
  {
    id: 2,
    courseCode: "CSE-321",
    title: "Database Management Systems",
    credit: "3",
    semester: "7th",
    department: "CSE",
    teacher: "Sample Teacher",
  },
];

const emptyForm = {
  courseCode: "",
  title: "",
  credit: "",
  semester: "",
  department: "",
  teacher: "",
};

function Courses() {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const filteredCourses = courses.filter((course) =>
    `${course.courseCode} ${course.title} ${course.department} ${course.semester}`
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

    setCourses([
      ...courses,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    setFormData(emptyForm);
    setShowForm(false);
  };

  const deleteCourse = (id) => {
    if (window.confirm("Do you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== id));
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
          <a href="/admin/departments">Departments</a>
          <a className="active" href="/admin/courses">Courses</a>
          <a href="#">Enrollments</a>
          <a href="/">Logout</a>
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="page-title">
          <div>
            <p className="welcome-text">Administration</p>
            <h1>Course Management</h1>
          </div>

          <button onClick={() => setShowForm(true)}>
            + Add Course
          </button>
        </header>

        <section className="table-card">
          <div className="table-toolbar">
            <h2>All Courses</h2>

            <input
              type="search"
              placeholder="Search by code, title, department..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Credit</th>
                  <th>Semester</th>
                  <th>Department</th>
                  <th>Teacher</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.courseCode}</td>
                    <td>{course.title}</td>
                    <td>{course.credit}</td>
                    <td>{course.semester}</td>
                    <td>{course.department}</td>
                    <td>{course.teacher}</td>

                    <td className="table-actions">
                      <button
                        onClick={() =>
                          alert("Edit form will be added later.")
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => deleteCourse(course.id)}
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
                <h2>Add Course</h2>

                <button
                  className="close-button"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>

              <form className="student-form" onSubmit={handleSubmit}>
                <label>
                  Course Code
                  <input
                    name="courseCode"
                    placeholder="Example: CSE-323"
                    value={formData.courseCode}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Course Title
                  <input
                    name="title"
                    placeholder="Example: Web Programming Lab"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Credit
                  <input
                    type="number"
                    step="0.5"
                    name="credit"
                    placeholder="Example: 3"
                    value={formData.credit}
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
                  Assigned Teacher
                  <input
                    name="teacher"
                    placeholder="Teacher name"
                    value={formData.teacher}
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

                  <button type="submit">Save Course</button>
                </div>
              </form>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}

export default Courses;