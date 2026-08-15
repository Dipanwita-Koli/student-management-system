import { useState } from "react";
import "../../styles/dashboard.css";

const students = [
  {
    id: 1,
    studentId: "S-001",
    name: "Dipanwita Koli",
  },
  {
    id: 2,
    studentId: "S-002",
    name: "Rahim Ahmed",
  },
  {
    id: 3,
    studentId: "S-003",
    name: "Karim Hasan",
  },
  {
    id: 4,
    studentId: "S-004",
    name: "Nusrat Jahan",
  },
];

function Attendance() {
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = "Present";
      return acc;
    }, {})
  );

  const handleAttendanceChange = (id, value) => {
    setAttendance({
      ...attendance,
      [id]: value,
    });
  };

  const saveAttendance = () => {
    alert("Attendance saved successfully!");
  };

  return (
    <main className="dashboard-page">

      <aside className="sidebar">

        <div className="sidebar-brand">
          SM
        </div>

        <h2>Teacher Panel</h2>

        <nav>
          <a href="/teacher/dashboard">
            Dashboard
          </a>

          <a
            className="active"
            href="/teacher/attendance"
          >
            Attendance
          </a>

          <a href="/teacher/results">
            Results
          </a>

          <a href="/">
            Logout
          </a>
        </nav>

      </aside>


      <section className="dashboard-content">

        <header className="page-title">

          <div>
            <p className="welcome-text">
              Teacher Portal
            </p>

            <h1>
              Attendance
            </h1>
          </div>

        </header>


        <section className="table-card">

          <div className="table-toolbar">

            <h2>
              CSE-323 — Web Programming Lab
            </h2>

            <div>

              <label>
                Date:{" "}

                <input
                  type="date"
                  value={date}
                  onChange={(event) =>
                    setDate(event.target.value)
                  }
                />

              </label>

            </div>

          </div>


          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Attendance</th>
                </tr>

              </thead>


              <tbody>

                {students.map((student) => (

                  <tr key={student.id}>

                    <td>
                      {student.studentId}
                    </td>

                    <td>
                      {student.name}
                    </td>

                    <td>

                      <select
                        value={attendance[student.id]}
                        onChange={(event) =>
                          handleAttendanceChange(
                            student.id,
                            event.target.value
                          )
                        }
                      >

                        <option value="Present">
                          Present
                        </option>

                        <option value="Absent">
                          Absent
                        </option>

                        <option value="Late">
                          Late
                        </option>

                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          <div
            style={{
              padding: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >

            <button onClick={saveAttendance}>
              Save Attendance
            </button>

          </div>

        </section>

      </section>

    </main>
  );
}

export default Attendance;