const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SucursalSchema = new Schema({
    nombreSucursal: String,
    direccion: String,
    idEmpresa: { type: Schema.Types.ObjectId, ref: 'Empresas' }  
})

module.exports = mongoose.model('Sucursales', SucursalSchema);