//Escreva suas rotas para as receitas aqui//
const express = require("express");
const router = express.Router();
//Importe o express e instancie o Router aqui

// Importe os models aqui
const RecipeModel = require("../models/Recipe.model");

//1º rota: Criar uma receita
router.post("/create", async (req, res) => {
  try {
    const newReceita = await RecipeModel.create({ ...req.body });
    return res.status(200).json(newReceita);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//2º rota: Acessar todas as receitas

router.get("/all", async (req, res) => {
  try {
    const allRecepiees = await RecipeModel.find();
    return res.status(201).json(allRecepiees);
  } catch (error) {
    console.log(error);
    return res.status(200).json("ERRO");
  }
});

//3º rota: Acessar uma única receita pelo seu ID
router.get("/all/:idRecepie", async (req, res) => {
  try {
    const { idRecepie } = req.params;
    const receitaEspecifica = await RecipeModel.findById(idRecepie);
    return res.status(200).json(receitaEspecifica);
  } catch (error) {
    return res.status(400).json("ERRO");
  }
});
//4º rota: Criar várias receitas de uma só vez
router.post("/createmany", async (req, res) => {
  try {
    const newReceita = await RecipeModel.insertMany({ ...req.body });
    return res.status(200).json(newReceita);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});
//6º rota: Acessar todos os usuários que favoritaram essa receita

//7º rota: Acessar todos os usuários que deram dislike essa receita

//!5º rota: Deletar uma receita pelo seu ID - retira-la da array de favorites e dislikes dos USERS

//Não se esqueça de exportar o router!
module.exports = router;
