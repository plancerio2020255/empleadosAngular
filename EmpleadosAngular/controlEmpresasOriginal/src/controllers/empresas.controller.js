const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


function RegistrarAdministrador(req, res) {
    var usuarioModel = new Usuario();

    Usuario.find({ rol: 'ROL_SuperAdmin' }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length > 0) {
            return console.log({ mensaje: "Ya existe el SuperAdmin" })
        } else {
            usuarioModel.nombre = 'SuperAdmin';
            usuarioModel.email = 'SuperAdmin';
            usuarioModel.rol = 'ROL_SuperAdmin';
            bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                usuarioModel.password = passwordEncriptada;

                usuarioModel.save((err, usuarioGuardado) => {
                    if (err) console.log({ mensaje: 'Error en la peticion' });
                    if (!usuarioGuardado) return console.log({ mensaje: 'Error al agregar' });

                    return console.log({ usuario: usuarioGuardado });
                });
            });
        }
    })

}

module.exports = {
    RegistrarAdministrador
   
}