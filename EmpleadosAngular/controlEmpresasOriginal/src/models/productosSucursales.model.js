const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductosSucursalesSchema = Schema({
    nombreProductoSucursal: String,
    stockSucursal: String,
    cantidadVendidaSucursal: String
})

module.exports = mongoose.model('ProductosSucursales', ProductosSucursalesSchema)