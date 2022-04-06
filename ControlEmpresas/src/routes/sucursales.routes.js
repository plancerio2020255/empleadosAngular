//  IMPORTACIONES
const express = require('express');
const controladorSucursales = require('../controllers/sucursales.controller');

// MIDDLEWARES
const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

//RUTAS
const api = express.Router();

api.put('/EditarSucursal/:idSucursal', md_autenticacion.Auth, md_roles.verEmpresa, controladorSucursales.editarSucursales);
//api.delete('/eliminarProducto/:idProducto', [md_autenticacion.Auth, md_roles.verAdminDelete], controladorProducto.eliminarProducto);

module.exports = api;