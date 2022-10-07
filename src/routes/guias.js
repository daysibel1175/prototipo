const { application } = require("express");
const express = require("express");
const guias = require("../models/guias.js");
const guia = require("../models/guias.js")

const router = express.Router();


// Create - Inserir novos dados ao banco de dados
router.post("/guias/insert", (req, res) => {
  try{
    const guia =  guias(req.body)
    const {nome, contato} = req.body
    if(!nome){ res.status(422).json('O nome é obrigatorio')
      return}
    if(!contato){ res.status(422).json('O campo contato ainda nao foi preenchido')
      return}
     guia
    .save()
    .then((data) => res.status(201).send(data + 'Dados inseridos com susseso!'))
    .catch((error) => res.status(404).json({ message: error }))
  }catch(error){
    res.status(500)
    console.error({ error: error })
  }
});

// Read - leitura de todos os guias que existem no banco de datos
router.get("/guias/read", (req, res) => {
  try{
    guia
    .find()
    .populate('trilha')
    .then((data) => res.json((data)))
    .catch((error) => res.json({ message: error }))
  }catch(error){
    res.status(500)
    console.error({ error: error })
  }
});

// Read - leitura de um dado especifico usando o parametro ID
router.get('/guias/read/:id', (req, res) => {
  try{
    const { id } = req.params;
    guia
    .findById(id)
    .then((data) => res.status(200).send(data))
    .catch((error) => res.status(404).json({message: error + 'O Id não foi encontrado'}))
  }catch(error){
    res.status(500)
    console.error({ error: error })
  }
});

// Update - atualizar dados ou inserir valores faltantes
router.put('/guias/update/:id', (req, res) => {
  try {
    const { id } = req.params;
    const requisicao = (req.body);
    const dados = requisicao

    guia
    .updateOne({ _id: id }, { $set: dados })
    .then((data) => res.status(200).json(data + 'Atualizado com susseso'))
    .catch((error) => res.status(304).json({message: error + 'Nao foi possivel fazer atualizacao dos dados! O ID não existe'}))
  
    console.log(dados);
  } catch (error) {
    res.status(500)
    console.error({ error: error })
  }

});

//Delete - deletar dados do banco de dados 
router.delete("/guias/delete/:id", (req, res) => {
  try{
  const { id } = req.params;
  guia
    .deleteOne({ _id: id })
    .then((data) => res.status(200).json(data + 'Deletado com susseso!!'))
    .catch((error) => res.status(400).json({ message: error + 'Error ao deletar os dados selecionados, ID ainda nao foi inserido ou ID invalido'}))
  }catch(error){
    res.status(500)
    console.error({ error: error })
  }
});

module.exports = router;