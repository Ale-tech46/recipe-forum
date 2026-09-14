import { useState } from "react";
import { postData } from "../api";

function Login(props) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSending(true);
    setMessage("");

    try {
      const data = await postData("/api/login", form);
      props.onLogin(data.name);
    } catch (error) {
      setMessage(error.message);
      setSending(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="card auth-card shadow-sm">
        <div className="card-body p-4 p-md-5">
          <p className="brand-mark" aria-hidden="true">🍲</p>
          <h1 className="h2 text-center mb-4">Recipe Forum</h1>

          {message && <p className="alert alert-danger">{message}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-primary w-100" disabled={sending}>
              {sending ? "Accesso..." : "LOGIN"}
            </button>
          </form>

          <button className="btn btn-link w-100 mt-3" onClick={props.onRegister}>
            Crea un account
          </button>
        </div>
      </section>
    </main>
  );
}

export default Login;

