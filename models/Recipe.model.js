const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: { type: Array },
  cuisine: { type: String },
  dishType: {
    type: String,
    enum: [
      "breakfast",
      "main_course",
      "soup",
      "snack",
      "drink",
      "dessert",
      "other",
    ],
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date },
  favorites: { type: Number, default: 0 },
  deslikes: { type: Number, default: 0 },
});

const RecipeModel = mongoose.model("RecipeModel", recipeSchema);

module.exports = RecipeModel;
