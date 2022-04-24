const express = require('express')
const controladorAdmin = require('../controllers/admin.controller')
const md_autenticacion = require('../middlewares/autenticacion');
const md_role = require('../middlewares/roles');
const api = express.Router()

api.post('/agregarEmpresa', [md_autenticacion.Auth, md_role.verAdmin], controladorAdmin.agregarEmpresa)

api.post('/crearMunicipio', [md_autenticacion.Auth, md_role.verAdmin], controladorAdmin.crearMunicipio)

module.exports = api