const mongoose = require('mongoose');
const app = require('./app');
const usuarioController = require("./src/controllers/usuario.controller")

mongoose.Promise = global.Promise;                                                                  //function (){}
mongoose.connect('mongodb://localhost:27017/BackEnd', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se encuentra conectado a la base de datos.");

    usuarioController.RegistrarAd();

    app.listen(3000, function () {
        console.log("BackEnd, esta corriendo en el puerto 27017!")
    })

}).catch(error => console.log(error));