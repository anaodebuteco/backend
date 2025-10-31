require('dotenv').config();
const usuariosRouter = require('./routes/usuariosRouter');
app.use('/usuarios', usuariosRouter);
const produtosRouter = require('./routes/produtosRouter');
app.use('/produtos', produtosRouter);
