const express = require('express');
const controladorEmpresas = require('../controllers/empresas.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_rol = require('../middlewares/roles');
const api = express.Router();

api.post('/agregarSucursales', [md_autenticacion.Auth, md_rol.verEmpresa], controladorEmpresas.agregarSucursal);
api.put('/editarSucursales', [md_autenticacion.Auth, md_rol.verEmpresa], controladorEmpresas.editarSucursal);
api.delete('/eliminarEmpresa', [md_autenticacion.Auth, md_rol.verEmpresa], controladorEmpresas.eliminarSucursal);
api.get('/verEmpresas', [md_autenticacion.Auth, md_rol.verEmpresa], controladorEmpresas.verSucursalesEmpresa);


module.exports = api
