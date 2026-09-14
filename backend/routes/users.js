const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const data = req.body;

    if (!data.name || !data.email || !data.password || !data.repeatPassword) {
      return res.status(400).json({ message: "Compila tutti i campi." });
    }

    if (data.password !== data.repeatPassword) {
      return res.status(400).json({ message: "Le password non coincidono." });
    }

    const oldUser = await User.findOne({ email: data.email });
    if (oldUser) {
      return res.status(400).json({ message: "Questa email è già registrata." });
    }

    await User.create({
      name: data.name,
      email: data.email,
      password: data.password
    });

    res.status(201).json({ message: "Registrazione completata." });
  } catch (error) {
    res.status(500).json({ message: "Errore durante la registrazione." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !await user.passwordComparison(req.body.password)) {
      return res.status(401).json({ message: "Email o password non corretti." });
    }

    req.session.userId = user._id;
    req.session.userName = user.name;
    res.json({ name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Errore durante il login." });
  }
});

router.post("/logout", (req, res) => {
  req.session.userId = null;
  req.session.userName = null;
  req.session.save(() => res.json({ message: "Logout completato." }));
});

router.get("/me", (req, res) => {
  if (req.session.userId) {
    res.json({ name: req.session.userName });
  } else {
    res.status(401).json({ message: "Utente non autenticato." });
  }
});

module.exports = router;

