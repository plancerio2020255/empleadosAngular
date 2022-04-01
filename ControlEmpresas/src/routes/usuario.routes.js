const express = require('express');
const usuarioControlador = require('../controllers/empresa.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/RegistrarEmpresa', md_autenticacion.Auth, usuarioControlador.RegistrarEmpresa);
api.post('/RegistrarAdministrador', usuarioControlador.RegistrarAdministrador);
api.post('/Login', usuarioControlador.Login);
api.put('/editarEmpresa/:idUsuario', md_autenticacion.Auth, usuarioControlador.EditarEmpresa);
api.delete('/eliminarEmpresa/:idUsuario', usuarioControlador.EliminarEmpresa);
api.get('/ControlEmpresa/:idUsuario', md_autenticacion.Auth, usuarioControlador.ControlEmpresa);


module.exports = api;