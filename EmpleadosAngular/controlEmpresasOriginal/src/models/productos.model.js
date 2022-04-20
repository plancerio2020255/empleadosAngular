const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductosSchema = Schema({
  nombreProducto: String,
  nombreProveedor: String,
  stock: Number
})

module.exports = mongoose.model('Productos', ProductosSchema)
