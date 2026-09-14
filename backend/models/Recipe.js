const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  text: String,
  author: String
});

module.exports = mongoose.model("Recipe", recipeSchema);

