const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MunicipiosSchema = Schema({
  nombreMunicipio: String
})

module.exports = mongoose.model('Municipios', MunicipiosSchema)
