const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpresasSchema = Schema({
    nombreEmpresa: String,
    tipoEmpresa: String,
    email: String,
    rol: String,
    password: String,
});

module.exports = mongoose.model('Empresas', EmpresasSchema);