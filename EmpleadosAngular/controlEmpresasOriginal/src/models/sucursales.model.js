const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SucursalesSchema = Schema({
  nombreSucursal: String,
  direccionSucursal: String,
  idEmpresa: { type: Schema.Types.ObjectId, ref: 'Empresas' },
})

module.exports = mongoose.model('Sucursales', SucursalesSchema)
