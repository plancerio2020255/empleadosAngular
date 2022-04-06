const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sucursalSchema = new Schema({
    nombreSucursal: String,
    direccion: String,
    idEmpresa: { type: Schema.Types.ObjectId, ref: 'Usuarios' }  
})

module.exports = mongoose.model('Sucursales', sucursalSchema);