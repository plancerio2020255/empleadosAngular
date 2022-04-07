const express = require('express');
const usuarioControlador = require('../controllers/empresas.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/RegistrarAdministrador', usuarioControlador.RegistrarAdministrador);
api.post('/Login', usuarioControlador.Login);
api.post('/AgregarEmpresa', [md_autenticacion.Auth], usuarioControlador.AgregarEmpresa);



module.exports = api;