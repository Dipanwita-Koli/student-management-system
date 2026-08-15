import { useState } from "react";
import "../../styles/dashboard.css";

const initialEnrollments = [
  {
    id: 1,
    studentId: "S-001",
    studentName: "Dipanwita Koli",
    courseCode: "CSE-323",
    courseName: "Web Programming Lab",
    semester: "7th",
  },
  {
    id: 2,
    studentId: "S-002",
    studentName: "Rahim Ahmed",
    courseCode: "CSE-321",
    courseName: "Database Management Systems",
    semester: "7th",
  },
];

const emptyForm = {
  studentId: "",
  studentName: "",
  courseCode: "",
  courseName: "",
  semester: "",
};

function Enrollments() {
  const [enrollments, setEnrollments] = useState(
    initialEnrollments
  );

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState(emptyForm);

  const filteredEnrollments = enrollments.filter((enrollment) =>
    `${enrollment.studentId}
     ${enrollment.studentName}
     ${enrollment.courseCode}
     ${enrollment.courseName}
     ${enrollment.semester}`
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

    const newEnrollment = {
      id: Date.now(),
      ...formData,
    };

    setEnrollments([
      ...enrollments,
      newEnrollment,
    ]);

    setFormData(emptyForm);
    setShowForm(false);
  };

  const deleteEnrollment = (id) => {
    if (
      window.confirm(
        "Do you want to remove this enrollment?"
      )
    ) {
      setEnrollments(
        enrollments.filter(
          (enrollment) => enrollment.id !== id
        )
      );
    }
  };

  return (
    <main className="dashboard-page">

      {/* Sidebar */}
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


      {/* Main Content */}
      <section className="dashboard-content">

        <header className="page-title">

          <div>
            <p className="welcome-text">
              Administration
            </p>

            <h1>
              Enrollment Management
            </h1>
          </div>

          <button
            onClick={() => setShowForm(true)}
          >
            + Enroll Student
          </button>

        </header>


        {/* Table */}
        <section className="table-card">

          <div className="table-toolbar">

            <h2>
              All Enrollments
            </h2>

            <input
              type="search"
              placeholder="Search student or course..."
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
                  <th>Student Name</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Semester</th>
                  <th>Actions</th>
                </tr>
              </thead>


              <tbody>

                {filteredEnrollments.length > 0 ? (

                  filteredEnrollments.map(
                    (enrollment) => (

                      <tr key={enrollment.id}>

                        <td>
                          {enrollment.studentId}
                        </td>

                        <td>
                          {enrollment.studentName}
                        </td>

                        <td>
                          {enrollment.courseCode}
                        </td>

                        <td>
                          {enrollment.courseName}
                        </td>

                        <td>
                          {enrollment.semester}
                        </td>

                        <td className="table-actions">

                          <button
                            className="delete-button"
                            onClick={() =>
                              deleteEnrollment(
                                enrollment.id
                              )
                            }
                          >
                            Remove
                          </button>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >
                      No enrollments found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>


        {/* Add Enrollment Modal */}
        {showForm && (

          <div className="modal-overlay">

            <section className="student-form-card">

              <div className="form-header">

                <h2>
                  Enroll Student
                </h2>

                <button
                  className="close-button"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  ×
                </button>

              </div>


              <form
                className="student-form"
                onSubmit={handleSubmit}
              >

                <label>
                  Student ID

                  <input
                    name="studentId"
                    placeholder="Example: S-003"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                  />

                </label>


                <label>
                  Student Name

                  <input
                    name="studentName"
                    placeholder="Student name"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                  />

                </label>


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
                  Course Name

                  <input
                    name="courseName"
                    placeholder="Course name"
                    value={formData.courseName}
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
                    onClick={() =>
                      setShowForm(false)
                    }
                  >
                    Cancel
                  </button>

                  <button type="submit">
                    Enroll Student
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