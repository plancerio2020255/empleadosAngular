const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadoSchema = new Schema({
    nombre: String,
    apellido: String,
    puesto: String,
    departamento: String,
    idEmpresa: { type: Schema.Types.ObjectId, ref: 'Usuarios' }  
})

module.exports = mongoose.model('Empleados', empleadoSchema);