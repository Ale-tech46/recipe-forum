import { useState } from "react";
import { postData } from "../api";

function Register(props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: ""
  });
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
      await postData("/api/register", form);
      alert("Registrazione completata. Ora puoi effettuare il login.");
      props.onRegistered();
    } catch (error) {
      setMessage(error.message);
      setSending(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="card auth-card shadow-sm">
        <div className="card-body p-4 p-md-5">
          <h1 className="h2 text-center mb-4">Registrazione</h1>

          {message && <p className="alert alert-danger">{message}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">Nome</label>
              <input className="form-control" type="text" id="name" name="name"
                value={form.name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-control" type="email" id="email" name="email"
                value={form.email} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password</label>
              <input className="form-control" type="password" id="password" name="password"
                value={form.password} onChange={handleChange} required />
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="repeatPassword">Ripeti password</label>
              <input className="form-control" type="password" id="repeatPassword"
                name="repeatPassword" value={form.repeatPassword}
                onChange={handleChange} required />
            </div>

            <button className="btn btn-primary w-100" disabled={sending}>
              {sending ? "Registrazione..." : "REGISTRATI"}
            </button>
          </form>

          <button className="btn btn-link w-100 mt-3" onClick={props.onLogin}>
            Torna al login
          </button>
        </div>
      </section>
    </main>
  );
}

export default Register;

