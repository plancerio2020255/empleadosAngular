const mongoose = require('mongoose');
const app = require('./app');
//const usuarioControlador = require('./src/controllers/empresas.controller');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ControlEmpresasSucursales', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Se ha conectado correctamente a la base de datos.');

   // usuarioControlador.crearAdmin();

    app.listen(3000, function (){
        console.log("Servidor de Express corriendo correctamente en el puerto 3000");
    })

}).catch(error => console.log(error));