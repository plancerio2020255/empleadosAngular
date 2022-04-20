const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TipoSchema = Schema({
  nombreTipo: String
})

module.exports = mongoose.model('Tipo', TipoSchema)
