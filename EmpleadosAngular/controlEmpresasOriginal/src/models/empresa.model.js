const mongoose = require('moongose');

var Schema = mongoose.Schema;

var EmpresaSchema = Schema({
    nombre: String,
    rol: String,
    idTipoEmpresa: {type: Schema.Types.ObjectId, ref:'Tipo'},
    idProductos: {type: Schema.Types.objectId, ref:'Productos'},
})

module.exports = mongoose.model('Empresas', EmpresaSchema)