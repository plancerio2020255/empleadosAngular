const mongoose = require('mongoose');
var Schema = mongoose.Schema; //Variable de esquema

//Crear variable
var sucursalesSchema = Schema({
    nombreSucursal: String,
    direccion: String,
    idAdmin: { type: Schema.Types.ObjectId, ref: 'Empresas' } //Referencia a model Usuarios
})

module.exports = mongoose.model('Sucursales', sucursalesSchema);