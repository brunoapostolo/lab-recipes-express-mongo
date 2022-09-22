const express = require("express");
const router = express.Router();
const ClientModel = require("../models/User.model");
const RecipeModel = require("../models/Recipe.model");
//1º rota: Criar um user
router.post("/createuser", async (req, res) => {
  try {
    const newUsuario = await ClientModel.create({ ...req.body });
    return res.status(200).json(req.body);
  } catch (error) {
    return res.status(400).json(error);
  }
});
//2º rota: Pegar todos os users
router.get("/allusers", async (req, res) => {
  try {
    const allUsuarios = await ClientModel.find();
    return res.status(200).json(allUsuarios);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});
//3º rota: Acessar um usuário pelo seu ID
router.get("/allusers/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const usuarioEspecifico = await ClientModel.findById(userID);
    return res.status(200).json(usuarioEspecifico);
  } catch (error) {
    return res.status(400).json(error);
  }
});
//4º Adicionar uma receita na array de favorites
router.post("/create/:idReceita/:iddousuario", async (req, res) => {
  try {
    const { idReceita, iddousuario } = req.params;
    await ClientModel.findByIdAndUpdate(iddousuario, {
      $push: {
        favorites: idReceita,
      },
    });
    await RecipeModel.findByIdAndUpdate(idReceita, {
      $inc: { favorites: 1 },
    });
    return res.status(200).json(req.body);
  } catch (error) {
    console.log(error);
    return res.status(400).json("ERRO");
  }
});
//5º Adicionar uma receita na array de deslikes
router.post(
  "/dandodeslike/:iddessaReceita/:iddaqueleusuario",
  async (req, res) => {
    try {
      const { iddessaReceita, iddaqueleusuario } = req.params;
      await ClientModel.findByIdAndUpdate(iddaqueleusuario, {
        $push: {
          dislikes: iddessaReceita,
        },
      });
      await RecipeModel.findByIdAndUpdate(iddessaReceita, {
        $inc: { deslikes: 1 },
      });
      return res.status(200).json(req.body);
    } catch (error) {
      console.log(error);
      return res.status(400).json("erro");
    }
  }
);
//6º Remover uma receita na array de favorite
router.delete(
  "/deletando/favoritos/:usuariodaqui/:idreceitafavorita",
  async (req, res) => {
    try {
      const { usuariodaqui, idreceitafavorita } = req.params;
      await ClientModel.findByIdAndUpdate(usuariodaqui, {
        $pull: {
          favorites: idreceitafavorita,
        },
      });
      await RecipeModel.findByIdAndUpdate(idreceitafavorita, {
        $inc: { favorites: -1 },
      });
      return res.status(200).json("tudo Sérgio");
    } catch (error) {
      console.log(error);
      return res.status(400).json("Tudo errado");
    }
  }
);
//7º Remover uma receita na array de deslikes
router.delete(
  "/deletando/deslikes/:iddousuarioarrependido/:iddodeslike",
  async (req, res) => {
    try {
      const { iddousuarioarrependido, iddodeslike } = req.params;
      await ClientModel.findByIdAndUpdate(iddousuarioarrependido, {
        $pull: {
          dislikes: iddodeslike,
        },
      });
      await RecipeModel.findByIdAndUpdate(iddodeslike, {
        $inc: { deslikes: -1 },
      });
      return res.status(200).json("LEGAL");
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
);

module.exports = router;
