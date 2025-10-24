const supertest = require('supertest');
const app = require('../app'); // caminho até seu app.js
const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

const request = supertest(app);

let produtoId;

describe('Testes de rotas de produtos', () => {
  beforeAll(async () => {
    // cria um produto de teste
    const produto = await Produto.create({ nome: 'Laranja', preco: 10.0 });
    produtoId = produto._id.toString();
  });

  afterAll(async () => {
    await Produto.deleteMany({});
    await mongoose.connection.close();
  });

  test('PUT /produtos/:id -> atualiza e retorna 200 com campos atualizados', async () => {
    const res = await request.put(`/produtos/${produtoId}`).send({ nome: 'Laranja Pera', preco: 18.0 });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('_id', produtoId);
    expect(res.body).toHaveProperty('nome', 'Laranja Pera');
    expect(Number(res.body.preco)).toBe(18.0);
  });

  test('PUT /produtos/:id sem JSON -> 422 Nome e preço obrigatórios', async () => {
    const res = await request.put(`/produtos/${produtoId}`).send({});
    expect(res.status).toBe(422);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  test('PUT /produtos/0 -> 400 Parâmetro inválido', async () => {
    const res = await request.put('/produtos/0').send({ nome: 'x', preco: 1 });
    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('PUT /produtos/000000000000000000000000 -> 404 Produto não encontrado', async () => {
    const res = await request.put('/produtos/000000000000000000000000').send({ nome: 'x', preco: 1 });
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  test('DELETE /produtos/:id -> 204 sem conteúdo', async () => {
    const res = await request.delete(`/produtos/${produtoId}`);
    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });

  test('DELETE /produtos/0 -> 400 Parâmetro inválido', async () => {
    const res = await request.delete('/produtos/0');
    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('DELETE /produtos/:id -> 404 Produto não encontrado', async () => {
    const res = await request.delete(`/produtos/${produtoId}`);
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
  });
});
