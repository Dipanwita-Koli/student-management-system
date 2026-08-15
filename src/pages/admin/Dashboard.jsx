import "../../styles/dashboard.css";

function AdminDashboard() {
  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-brand">SM</div>
        <h2>Admin Panel</h2>

        <nav>
          <a className="active" href="/admin/dashboard">Dashboard</a>
          <a href="/admin/students">Students</a>
          <a href="#">Teachers</a>
          <a href="/admin/departments">Departments</a>
          <a href="#">Courses</a>
          <a href="#">Enrollments</a>
          <a href="#">Logout</a>
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="welcome-text">Welcome back,</p>
            <h1>Administrator Dashboard</h1>
          </div>
          <div className="profile-circle">A</div>
        </header>

        <div className="stats-grid">
          <article className="stat-card">
            <p>Total Students</p>
            <h2>0</h2>
          </article>
          <article className="stat-card">
            <p>Total Teachers</p>
            <h2>0</h2>
          </article>
          <article className="stat-card">
            <p>Total Courses</p>
            <h2>0</h2>
          </article>
          <article className="stat-card">
            <p>Total Departments</p>
            <h2>0</h2>
          </article>
        </div>

        <section className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            <button>Add Student</button>
            <button>Add Teacher</button>
            <button>Add Course</button>
            <button>Manage Departments</button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default AdminDashboard;