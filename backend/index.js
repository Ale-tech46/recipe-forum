require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const userRoutes = require("./routes/users");
const recipeRoutes = require("./routes/recipes");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("../frontend/dist"));

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 86400000 }
}));

app.use("/api", userRoutes);
app.use("/api/recipes", recipeRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server avviato su http://localhost:${port}`);
    });
  })
  .catch(error => console.log(error));
