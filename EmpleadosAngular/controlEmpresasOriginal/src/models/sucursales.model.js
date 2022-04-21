const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SucursalesSchema = Schema({
    nombreSucursal: String,
    direccionSucursal: String,
    idEmpresa: {type: Schema.Types.ObjectId, ref:'Empresas'},
    idMunicipio: {type: Schema.Types.ObjectId, ref:'Municipios'},
    idProductosSucursal: {type: Schema.Types.ObjectId, ref:'ProductosSucursales'}
})

module.exports = mongoose.model('Sucursales', SucursalesSchema)