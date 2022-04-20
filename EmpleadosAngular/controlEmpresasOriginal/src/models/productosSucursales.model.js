const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductosSucursalesSchema = Schema({
    nombreProductoSucursal: String,
    stockSucursal: String,
    cantidadVendidaSucursal: String,
    idSucursal: {type: Schema.Types.ObjectId, ref:'Sucursales'}
})

module.exports = mongoose.model('ProductosSucursales', ProductosSucursalesSchema)