const Usuario = require('../models/usuario.model');
const Empresa = require('../models/empresa.model')
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');



function crearAdmin (req, res) {
    const administrador = new Empresa()
  
    Empresa.findOne({ usuario: 'SuperAdmin' }, (err, crearAdmin) => {
      if (err) {
        console.log('Error al crear usuario administrador')
      } else if (crearAdmin) {
        console.log('Ya existe un usuario administrador')
      } else {
        bcrypt.hash('123456', null, null, (err, contrase単aEncriptada) => {
          if (err) {
            res.status(500).send({ mensaje: 'Error al encriptar contrase単a' })
          } else if (contrase単aEncriptada) {
            administrador.nombre = 'SuperAdmin'
            administrador.usuario = 'SuperAdmin'
            administrador.email = 'SuperAdmin'
            administrador.password = contrase単aEncriptada
            administrador.rol = 'SuperAdmin'
            administrador.save((err, usuarioGuardado) => {
              if (err) {
                console.log('Error al crear usuario administrador')
              } else if (usuarioGuardado) {
                console.log('Usuario administrador creado con extio, bienvenido: ' + usuarioGuardado.nombre)
              } else {
                console.log('Usuario administrador no creado')
              }
            })
          }
        })
      }
    })
  }
  
function Login(req, res) {
    var parametros = req.body;

    Usuario.findOne({ email: parametros.email}, (err, usuarioencontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion ' });
        if (usuarioencontrado) {
            bcrypt.compare(parametros.password, usuarioencontrado.password, (err, Verificaciondepasswor) => {
                if (Verificaciondepasswor) {
                    if(parametros.obtenerToken == 'true'){
                        return res.status(200).send({ token: jwt.crearToken(usuarioencontrado) })
                    } else {
                        usuarioencontrado.password = undefined;

                        return res.status(200)
                            .send({ usuario: usuarioencontrado })
                    }
                } else {
                    return res.status(500).send({ mensaje: 'la contraseÃ±a no coincide' })
                }
            })

        } else {
            return res.status(500).send({ mensaje: 'El usuario nose ha podido identificar' })
        }
    })
}

module.exports = {
    crearAdmin,
    Login
}