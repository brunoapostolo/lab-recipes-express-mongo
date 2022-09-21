//escreva seu código aqui
const express = require("express");
require("dotenv").config();
require("./config/db.config")();

const app = express();
app.use(express.json());

const RecipeModel = require("./routes/recipes.routes");
app.use("/receitas", RecipeModel);

const ClientModel = require("./routes/users.routes");
app.use("/usuarios", ClientModel);

app.listen(Number(process.env.PORT), () => {
  console.log("Server up and running on port", process.env.PORT);
});
