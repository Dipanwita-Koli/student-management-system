import { useState } from "react";
import "../../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    alert("Login API will be connected later.");
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand">
          <span className="brand-icon">SM</span>
          <div>
            <h1>Student Management System</h1>
            <p>Sign in to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Sign In</button>
        </form>

        <p className="login-note">
          Use your Student, Teacher, or Administrator account.
        </p>
      </section>
    </main>
  );
}

export default Login;