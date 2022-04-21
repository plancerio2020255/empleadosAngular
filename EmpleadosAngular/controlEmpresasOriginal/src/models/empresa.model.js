const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmpresaSchema = Schema({
    nombre: String,
    usuario: String,
    email: String,
    password: String,
    rol: String
})

module.exports = mongoose.model('Empresas', EmpresaSchema);