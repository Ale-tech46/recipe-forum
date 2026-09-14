import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
  const [page, setPage] = useState("loading");
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("/api/me")
      .then(response => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then(data => {
        setUser(data.name);
        setPage("home");
      })
      .catch(() => setPage("login"));
  }, []);

  if (page === "loading") {
    return <p className="text-center mt-5">Caricamento...</p>;
  }

  if (page === "register") {
    return (
      <Register
        onLogin={() => setPage("login")}
        onRegistered={() => setPage("login")}
      />
    );
  }

  if (page === "home") {
    return (
      <Home
        user={user}
        onLogout={() => {
          setUser("");
          setPage("login");
        }}
      />
    );
  }

  return (
    <Login
      onRegister={() => setPage("register")}
      onLogin={name => {
        setUser(name);
        setPage("home");
      }}
    />
  );
}

export default App;

