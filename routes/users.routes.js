const express = require("express");
const router = express.Router();
const ClientModel = require("../models/User.model");
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
router.post("/create/:idReceita", async (req, res) => {
  try {
    const { idReceita } = req.params;
    await ClientModel.findByIdAndUpdate(idReceita, {
      $push: {
        favorites: idReceita,
      },
    });
    return res.status(200).json(req.body);
  } catch (error) {
    console.log(error);
    return res.status(400).json("ERRO");
  }
});
//5º Adicionar uma receita na array de deslikes
router.post("/dandodeslike/:iddessaReceita", async (req, res) => {
  try {
    const { iddessaReceita } = req.params;
    await ClientModel.findByIdAndUpdate(iddessaReceita, {
      $push: {
        dislikes: iddessaReceita,
      },
    });
    return res.status(200).json(req.body);
  } catch (error) {
    console.log(error);
    return res.status(400).json("erro");
  }
});
//6º Remover uma receita na array de favorite
router.delete("/deletando/favoritos/:idFavorito", async (req, res) => {
  try {
    const { idFavorito } = req.params;
    await ClientModel.findByIdAndUpdate(idFavorito, {
      $pull: {
        favorites: idFavorito,
      },
    });
    return res.status(200).json("tudo Sérgio");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Tudo errado");
  }
});
//7º Remover uma receita na array de deslikes
router.delete("/deletando/deslikes/:iddodeslike", async (req, res) => {
  try {
    const { iddodeslike } = req.params;
    await ClientModel.findByIdAndUpdate(iddodeslike, {
      $pull: {
        dislikes: iddodeslike,
      },
    });
    return res.status(200).json("LEGAL");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
