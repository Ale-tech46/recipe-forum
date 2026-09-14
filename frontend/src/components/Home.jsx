import { useEffect, useState } from "react";
import { postData } from "../api";

function Home(props) {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadRecipes();
  }, []);

  async function loadRecipes() {
    try {
      const response = await fetch("/api/recipes");
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setRecipes(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function addRecipe(event) {
    event.preventDefault();
    setMessage("");

    try {
      const newRecipe = await postData("/api/recipes", { text: text });
      setRecipes([...recipes, newRecipe]);
      setText("");
      setShowForm(false);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function logout() {
    try {
      await postData("/api/logout", {});
      props.onLogout();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="recipe-page">
      <header className="recipe-header">
        <div>
          <p className="small text-uppercase mb-1">Recipe Forum</p>
          <h1 className="h3 mb-0">Ciao, {props.user}</h1>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            ADD
          </button>
          <button className="btn btn-outline-dark" onClick={logout}>
            LOG OUT
          </button>
        </div>
      </header>

      {message && <p className="alert alert-danger mt-4">{message}</p>}

      {showForm && (
        <section className="card shadow-sm my-4">
          <div className="card-body">
            <form onSubmit={addRecipe}>
              <label className="form-label" htmlFor="recipe">La tua ricetta</label>
              <textarea
                className="form-control"
                id="recipe"
                rows="7"
                value={text}
                onChange={event => setText(event.target.value)}
                placeholder="Scrivi ingredienti e procedimento..."
                required
              />
              <button className="btn btn-success mt-3">INVIA RICETTA</button>
            </form>
          </div>
        </section>
      )}

      <section className="mt-4">
        <h2 className="h4 mb-3">Tutte le ricette</h2>

        {recipes.length === 0 ? (
          <p className="empty-message">Non ci sono ancora ricette.</p>
        ) : (
          recipes.map(recipe => (
            <article className="card recipe-card shadow-sm mb-3" key={recipe._id}>
              <div className="card-body">
                <h3 className="h6 recipe-author">{recipe.author}</h3>
                <p className="mb-0 recipe-text">{recipe.text}</p>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Home;

