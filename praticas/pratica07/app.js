require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const produtosRouter = require('./routes/produtosRouter');


const app = express();


app.use(express.json());


// Conexão com MongoDB Atlas
const user = process.env.MONGODB_USER || '';
const pass = process.env.MONGODB_PASSWORD || '';
const host = process.env.MONGODB_HOST || '';
const db = process.env.MONGODB_DATABASE || 'pratica07';


const connString = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority`;


mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar MongoDB:', err.message));


// rotas
app.use('/produtos', produtosRouter);


// middleware de erro simples (opcional)
app.use((err, req, res, next) => {
console.error(err);
res.status(500).json({ msg: 'Erro interno' });
});


module.exports = app;