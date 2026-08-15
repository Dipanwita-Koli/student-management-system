import { useState } from "react";
import "../../styles/dashboard.css";

const initialStudents = [
  {
    id: 1,
    studentId: "S-001",
    name: "Dipanwita Koli",
    marks: 0,
    grade: "",
  },
  {
    id: 2,
    studentId: "S-002",
    name: "Rahim Ahmed",
    marks: 0,
    grade: "",
  },
  {
    id: 3,
    studentId: "S-003",
    name: "Karim Hasan",
    marks: 0,
    grade: "",
  },
  {
    id: 4,
    studentId: "S-004",
    name: "Nusrat Jahan",
    marks: 0,
    grade: "",
  },
];

function getGrade(marks) {
  if (marks >= 80) return "A+";
  if (marks >= 75) return "A";
  if (marks >= 70) return "A-";
  if (marks >= 65) return "B+";
  if (marks >= 60) return "B";
  if (marks >= 55) return "B-";
  if (marks >= 50) return "C+";
  if (marks >= 45) return "C";
  if (marks >= 40) return "D";
  return "F";
}

function Results() {
  const [students, setStudents] =
    useState(initialStudents);

  const handleMarksChange = (id, value) => {
    let marks = Number(value);

    if (marks < 0) marks = 0;
    if (marks > 100) marks = 100;

    setStudents(
      students.map((student) =>
        student.id === id
          ? {
              ...student,
              marks: marks,
              grade: getGrade(marks),
            }
          : student
      )
    );
  };

  const saveResults = () => {
    alert("Results saved successfully!");
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

          <a href="/teacher/attendance">
            Attendance
          </a>

          <a
            className="active"
            href="/teacher/results"
          >
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
              Result Management
            </h1>

          </div>

        </header>


        <section className="table-card">

          <div className="table-toolbar">

            <h2>
              CSE-323 — Web Programming Lab
            </h2>

          </div>


          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Marks</th>
                  <th>Grade</th>
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

                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={student.marks}
                        onChange={(event) =>
                          handleMarksChange(
                            student.id,
                            event.target.value
                          )
                        }
                        style={{
                          width: "90px",
                        }}
                      />

                    </td>

                    <td>
                      <strong>
                        {student.grade || "-"}
                      </strong>
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

            <button onClick={saveResults}>
              Save Results
            </button>

          </div>

        </section>

      </section>

    </main>
  );
}

export default Results;