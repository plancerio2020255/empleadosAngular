const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductosSucursalesSchema = Schema({
  nombreProductoSucursal: String,
  stockSucursal: String,
  cantidadVendidaSucursal: String
})

module.exports = mongoose.model('ProductosSucursales', ProductosSucursalesSchema)
