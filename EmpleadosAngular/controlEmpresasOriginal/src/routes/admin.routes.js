const express = require('express')
const controladorAdmin = require('../controllers/admin.controller')
const md_autenticacion = require('../middlewares/autenticacion');
const md_role = require('../middlewares/roles');
const api = express.Router()

/ Empresas
api.post('/login', controladorAdmin.Login)
api.post('/registrarAdmin',[md_autenticacion.Auth, md_role.verAdmin],controladorAdmin.RegistrarAdmin)
api.post('/registrar', controladorAdmin.agregarEmpresa)
api.put('/editarEmpresa', [md_autenticacion.Auth, md_role.verAdmin], controladorAdmin.editarEmpresa)
api.delete('/eliminarEmpresa/:idUsuario', [md_autenticacion.Auth, md_role.verAdmin], controladorAdmin.eliminarEmpresa)
api.get('/verEmpresa', [md_autenticacion.Auth, md_role.verAdmin], controladorAdmin.verEmpresa)
//Municipios
api.post('/crearMunicipio', [md_autenticacion.Auth, md_role.verAdmin], controladorAdmin.crearMunicipio)
api.put('/editarMunicipio', [md_autenticacion.Auth, md_role.verAdmin], controladorAdmin.editarMunicipio)
api.put('/eliminarMunicipio', [md_autenticacion.Auth, md_role.verAdmin], controladorAdmin.deleteMunicipio)

module.exports = api
