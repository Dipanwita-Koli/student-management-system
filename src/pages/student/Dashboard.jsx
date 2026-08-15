import "../../styles/dashboard.css";

const courses = [
  {
    code: "CSE-323",
    title: "Web Programming Lab",
    teacher: "Abu Jafar Md Jakaria",
    attendance: "92%",
    result: "Not Published",
  },
  {
    code: "CSE-321",
    title: "Database Management Systems",
    teacher: "Sample Teacher",
    attendance: "88%",
    result: "A-",
  },
];

function StudentDashboard() {
  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-brand">SM</div>
        <h2>Student Panel</h2>

        <nav>
          <a className="active" href="/student/dashboard">Dashboard</a>
          <a href="#">My Profile</a>
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
            <h1>Student Dashboard</h1>
          </div>

          <div className="profile-circle">S</div>
        </header>

        <div className="stats-grid teacher-stats">
          <article className="stat-card">
            <p>Enrolled Courses</p>
            <h2>2</h2>
          </article>

          <article className="stat-card">
            <p>Average Attendance</p>
            <h2>90%</h2>
          </article>

          <article className="stat-card">
            <p>Published Results</p>
            <h2>1</h2>
          </article>
        </div>

        <section className="profile-summary">
          <div>
            <p className="welcome-text">Student Profile</p>
            <h2>Rahim Ahmed</h2>
          </div>

          <div className="profile-details">
            <p><strong>Student ID:</strong> 232-115-001</p>
            <p><strong>Department:</strong> CSE</p>
            <p><strong>Semester:</strong> 7th</p>
            <p><strong>Email:</strong> rahim@email.com</p>
          </div>
        </section>

        <section className="table-card student-course-card">
          <div className="table-toolbar">
            <h2>My Courses</h2>
            <button onClick={() => alert("Course details page will be added next.")}>
              View All Courses
            </button>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Teacher</th>
                  <th>Attendance</th>
                  <th>Result</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course) => (
                  <tr key={course.code}>
                    <td>{course.code}</td>
                    <td>{course.title}</td>
                    <td>{course.teacher}</td>
                    <td>{course.attendance}</td>
                    <td>{course.result}</td>
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

export default StudentDashboard;