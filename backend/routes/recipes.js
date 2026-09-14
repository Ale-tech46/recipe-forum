const express = require("express");
const Recipe = require("../models/Recipe");

const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Devi effettuare il login." });
  }
}

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Errore nel caricamento delle ricette." });
  }
});

router.post("/", isAuthenticated, async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).json({ message: "Scrivi una ricetta." });
    }

    const recipe = await Recipe.create({
      text: req.body.text,
      author: req.session.userName
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Errore durante il salvataggio della ricetta." });
  }
});

module.exports = router;

