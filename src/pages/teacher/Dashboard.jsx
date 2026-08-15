import "../../styles/dashboard.css";

const assignedCourses = [
  {
    code: "CSE-323",
    title: "Web Programming Lab",
    semester: "7th",
    students: 32,
  },
  {
    code: "CSE-321",
    title: "Database Management Systems",
    semester: "7th",
    students: 35,
  },
];

function TeacherDashboard() {
  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-brand">SM</div>
        <h2>Teacher Panel</h2>

        <nav>
          <a className="active" href="/teacher/dashboard">Dashboard</a>
          <a href="#">My Courses</a>
          <a href="#">Attendance</a>
          <a href="#">Results</a>
          <a href="/">Logout</a>
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="welcome-text">Welcome back,</p>
            <h1>Teacher Dashboard</h1>
          </div>

          <div className="profile-circle">T</div>
        </header>

        <div className="stats-grid teacher-stats">
          <article className="stat-card">
            <p>Assigned Courses</p>
            <h2>2</h2>
          </article>

          <article className="stat-card">
            <p>Total Students</p>
            <h2>67</h2>
          </article>

          <article className="stat-card">
            <p>Pending Results</p>
            <h2>0</h2>
          </article>
        </div>

        <section className="table-card teacher-course-card">
          <div className="table-toolbar">
            <h2>My Assigned Courses</h2>
            <button onClick={() => alert("Attendance page will be added next.")}>
              Manage Attendance
            </button>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Semester</th>
                  <th>Enrolled Students</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {assignedCourses.map((course) => (
                  <tr key={course.code}>
                    <td>{course.code}</td>
                    <td>{course.title}</td>
                    <td>{course.semester}</td>
                    <td>{course.students}</td>
                    <td className="table-actions">
                      <button onClick={() => alert("Course details will be added next.")}>
                        View Students
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

export default TeacherDashboard;