const express = require('express');
const sucursalesControlador = require('../controllers/sucursales.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const api = express.Router();

api.post('/agregarSucursal', md_autenticacion.Auth, sucursalesControlador.agregarSucursal);// Agregar sucursal
api.put('/editarSucursal/:idSucursal', md_autenticacion.Auth, sucursalesControlador.editarSucursal);//editar sucursal
api.get('/obtenerSucursales', md_autenticacion.Auth, sucursalesControlador.obtenerSucursales);//obtener sucursales
api.delete('/eliminarSucursales/:idSucursal', md_autenticacion.Auth, sucursalesControlador.eliminarSucursal); //eliminar sucursales
api.put('/agregarProductos/:idSucursal', md_autenticacion.Auth, sucursalesControlador.agregarProductos);//agregar productos
api.get('/obtenerProductos/:idSucursal', md_autenticacion.Auth, sucursalesControlador.obtenerSucursales);//obtener productos



module.exports = api;