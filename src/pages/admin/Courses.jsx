import { useMemo, useState } from "react";
import "../../styles/dashboard.css";

const initialCourses = [
  {
    id: 1,
    courseId: "C-001",
    code: "CSE101",
    name: "Introduction to Computer Science",
    department: "CSE",
    credit: "3",
    semester: "1st",
    teacher: "Dr. Ahmed Rahman",
    status: "Active",
  },
  {
    id: 2,
    courseId: "C-002",
    code: "CSE201",
    name: "Data Structures",
    department: "CSE",
    credit: "3",
    semester: "3rd",
    teacher: "Ms. Nusrat Jahan",
    status: "Active",
  },
];

const emptyForm = {
  courseId: "",
  code: "",
  name: "",
  department: "",
  credit: "",
  semester: "",
  teacher: "",
  status: "Active",
};

function Courses() {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return courses;
    }

    return courses.filter((course) =>
      `${course.courseId} ${course.code} ${course.name} ${course.department} ${course.credit} ${course.semester} ${course.teacher} ${course.status}`
        .toLowerCase()
        .includes(query)
    );
  }, [courses, search]);

  // =========================
  // ADD COURSE
  // =========================
  const openAddForm = () => {
    setEditingCourse(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  // =========================
  // EDIT COURSE
  // =========================
  const openEditForm = (course) => {
    setEditingCourse(course);

    setFormData({
      courseId: course.courseId,
      code: course.code,
      name: course.name,
      department: course.department,
      credit: course.credit,
      semester: course.semester,
      teacher: course.teacher,
      status: course.status,
    });

    setShowForm(true);
  };

  // =========================
  // CLOSE FORM
  // =========================
  const closeForm = () => {
    setShowForm(false);
    setEditingCourse(null);
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

    if (editingCourse) {
      setCourses((current) =>
        current.map((course) =>
          course.id === editingCourse.id
            ? {
                ...course,
                ...formData,
              }
            : course
        )
      );
    } else {
      setCourses((current) => [
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
  // DELETE COURSE
  // =========================
  const deleteCourse = (id) => {
    const course = courses.find(
      (item) => item.id === id
    );

    if (
      course &&
      window.confirm(
        `Are you sure you want to delete ${course.name}?`
      )
    ) {
      setCourses((current) =>
        current.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <main className="dashboard-page">

      {/* SIDEBAR */}
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

          <a
            className="active"
            href="/admin/courses"
          >
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
              Course Management
            </h1>

          </div>

          <button onClick={openAddForm}>
            + Add Course
          </button>

        </header>

        {/* COURSE TABLE */}
        <section className="table-card">

          <div className="table-toolbar">

            <div>

              <h2>
                All Courses
              </h2>

              <p className="table-count">
                {filteredCourses.length} course
                {filteredCourses.length !== 1
                  ? "s"
                  : ""}{" "}
                shown
              </p>

            </div>

            <input
              type="search"
              placeholder="Search courses..."
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
                    Course ID
                  </th>

                  <th>
                    Code
                  </th>

                  <th>
                    Course Name
                  </th>

                  <th>
                    Department
                  </th>

                  <th>
                    Credit
                  </th>

                  <th>
                    Semester
                  </th>

                  <th>
                    Teacher
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

                {filteredCourses.length > 0 ? (

                  filteredCourses.map((course) => (

                    <tr key={course.id}>

                      <td>
                        {course.courseId}
                      </td>

                      <td>
                        {course.code}
                      </td>

                      <td>
                        {course.name}
                      </td>

                      <td>
                        {course.department}
                      </td>

                      <td>
                        {course.credit}
                      </td>

                      <td>
                        {course.semester}
                      </td>

                      <td>
                        {course.teacher}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${
                            course.status.toLowerCase() ===
                            "active"
                              ? "status-active"
                              : "status-inactive"
                          }`}
                        >
                          {course.status}
                        </span>

                      </td>

                      <td className="table-actions">

                        <button
                          onClick={() =>
                            openEditForm(course)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            deleteCourse(course.id)
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
                      colSpan="9"
                      className="empty-state"
                    >
                      No courses found.
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
                    {editingCourse
                      ? "Update record"
                      : "New record"}
                  </p>

                  <h2>
                    {editingCourse
                      ? "Edit Course"
                      : "Add New Course"}
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
                    Course ID

                    <input
                      name="courseId"
                      value={formData.courseId}
                      onChange={handleChange}
                      placeholder="Example: C-003"
                      required
                    />
                  </label>

                  <label>
                    Course Code

                    <input
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="Example: CSE301"
                      required
                    />
                  </label>

                  <label>
                    Course Name

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Course name"
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
                    Credit

                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      name="credit"
                      value={formData.credit}
                      onChange={handleChange}
                      placeholder="Example: 3"
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
                    Teacher

                    <input
                      name="teacher"
                      value={formData.teacher}
                      onChange={handleChange}
                      placeholder="Teacher name"
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

                    {editingCourse
                      ? "Update Course"
                      : "Save Course"}

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

export default Courses;