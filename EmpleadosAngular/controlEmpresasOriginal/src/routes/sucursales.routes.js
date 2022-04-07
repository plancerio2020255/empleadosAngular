const express = require('express');
const sucursalControlador = require('../controllers/sucursales.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.delete('/eliminarSucursal/:idSucursal', [md_autenticacion.Auth], sucursalControlador.eliminarSucursales);




module.exports = api;