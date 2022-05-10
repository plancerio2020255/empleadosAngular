const express = require('express');
const controladorEmpresas = require('../controllers/empresas.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_rol = require('../middlewares/roles');
const api = express.Router();

api.post('/agregarSucursales', [md_autenticacion.Auth, md_rol.verEmpresa], controladorEmpresas.agregarSucursal);
api.put('/editarSucursales/:idSucursal', [md_autenticacion.Auth, md_rol.verEmpresa], controladorEmpresas.editarSucursal);
api.delete('/eliminarSucursal/:idSucursal', [md_autenticacion.Auth, md_rol.verEmpresa], controladorEmpresas.eliminarSucursal);
api.get('/verSucursales', [md_autenticacion.Auth, md_rol.verEmpresa], controladorEmpresas.verSucursalesEmpresa);

module.exports = api
