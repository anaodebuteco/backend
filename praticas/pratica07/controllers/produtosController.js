const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

// Criar produto
async function criar(req, res) {
  try {
    const { nome, preco } = req.body;

    if (!nome || preco === undefined) {
      return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
    }

    const novoProduto = await Produto.create({ nome, preco });
    return res.status(201).json(novoProduto);
  } catch (err) {
    return res.status(500).json({ msg: 'Erro ao criar produto', erro: err.message });
  }
}

// Listar todos os produtos
async function listar(req, res) {
  const produtosCadastrados = await Produto.find({});
  return res.status(200).json(produtosCadastrados);
}

// Buscar produto por ID (middleware)
async function buscar(req, res, next) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ msg: 'Parâmetro inválido' });
  }

  const produtoEncontrado = await Produto.findById(id);
  if (!produtoEncontrado) {
    return res.status(404).json({ msg: 'Produto não encontrado' });
  }

  req.produto = produtoEncontrado;
  return next();
}

// Exibir produto encontrado
function exibir(req, res) {
  return res.status(200).json(req.produto);
}

// Atualizar produto
async function atualizar(req, res) {
  const { id } = req.params;
  const { nome, preco } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ msg: 'Parâmetro inválido' });
  }

  if (!nome || preco === undefined) {
    return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }

  const produtoAtualizado = await Produto.findByIdAndUpdate(
    id,
    { nome, preco },
    { new: true, runValidators: true }
  );

  if (!produtoAtualizado) {
    return res.status(404).json({ msg: 'Produto não encontrado' });
  }

  return res.status(200).json(produtoAtualizado);
}

// Remover produto
async function remover(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ msg: 'Parâmetro inválido' });
  }

  const removido = await Produto.findByIdAndDelete(id);
  if (!removido) {
    return res.status(404).json({ msg: 'Produto não encontrado' });
  }

  return res.status(204).send();
}

module.exports = {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover,
};
