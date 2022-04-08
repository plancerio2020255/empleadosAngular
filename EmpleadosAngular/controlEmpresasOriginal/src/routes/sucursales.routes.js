const express = require('express');
const sucursalControlador = require('../controllers/sucursales.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/AgregarSucursal', [md_autenticacion.Auth], sucursalControlador.AgregarSucursal);
api.delete('/eliminarSucursal/:idSucursal', [md_autenticacion.Auth], sucursalControlador.eliminarSucursales);

api.get('/buscarSucursal/:nombreSucursal', [md_autenticacion.Auth], sucursalControlador.BusquedaSucursalPorNombre);


module.exports = api;