const express = require('express');
const controladorEmpresas = require('../controllers/empresas.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_rol = require('../middlewares/roles');
const api = express.Router();

api.post('/agregarSucursales',  controladorEmpresas.agregarSucursal);
api.put('/editarSucursales/:idSucursal', [md_autenticacion.Auth, md_rol.verEmpresa], controladorEmpresas.editarSucursal);
api.delete('/eliminarSucursal/:idSucursal', [md_autenticacion.Auth, md_rol.verEmpresa], controladorEmpresas.eliminarSucursal);
api.get('/verSucursales', [md_autenticacion.Auth],controladorEmpresas.verSucursalesEmpresa);
api.post('/agregarProducto', [md_autenticacion.Auth, md_rol.verEmpresa] ,controladorEmpresas.agregarProducto);
api.put('/editarProducto', [md_autenticacion.Auth, md_rol.verEmpresa], controladorEmpresas.editarProducto);
api.delete('/eliminarProducto', [md_autenticacion.Auth, md_rol.verEmpresa] ,controladorEmpresas.eliminarProducto);
api.get('/verProductos', [md_autenticacion.Auth, md_rol.verEmpresa], controladorEmpresas.verProductos);
api.post('/enviarProductosSucursal', [md_autenticacion.Auth, md_rol.verEmpresa], controladorEmpresas.enviarProductoSucursal);

module.exports = api
