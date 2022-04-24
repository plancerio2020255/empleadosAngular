const express = require('express')
const controladorEmpresas = require('../controllers/empresas.controller')

const md_autenticacion = require('../middlewares/autenticacion')

const api = express.Router()

api.post('/login', controladorEmpresas.Login)

module.exports = api
