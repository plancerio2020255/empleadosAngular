const express = require('express');
const cors = require('cors');
var app = express();

const UsuarioRutas = require('./src/routes/usuario.router');
const EmpresaRutas = require('./src/routes/empresa.router');
const SucursalesRutas = require('./src/routes/sucursales.router')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api', UsuarioRutas, EmpresaRutas, SucursalesRutas);


module.exports = app;