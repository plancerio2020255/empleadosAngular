const express = require('express');
const usuarioControlador = require('../controllers/usuario.controller');

const api = express.Router();

api.post('/login', usuarioControlador.Login);// Login de Administrador y de Clientes

module.exports = api;