const Usuario = require('../models/usuarios.models')
const Empresas = require('../models/empresas.models')

const bcrypt = require('bcrypt-nodejs')
const jwt = require('../services/jwt')

function RegistrarAdministrador (req, res) {
  const usuarioModel = new Usuario()

  Usuario.find({ rol: 'SuperAdmin' }, (err, usuarioEncontrado) => {
    if (usuarioEncontrado.length > 0) {
      return console.log({ mensaje: 'Ya existe el SuperAdmin' })
    } else {
      usuarioModel.nombre = 'SuperAdmin'
      usuarioModel.email = 'SuperAdmin'
      usuarioModel.rol = 'SuperAdmin'
      bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
        usuarioModel.password = passwordEncriptada

        usuarioModel.save((err, usuarioGuardado) => {
          if (err) console.log({ mensaje: 'Error en la peticion' })
          if (!usuarioGuardado) return console.log({ mensaje: 'Error al agregar' })

          return console.log({ usuario: usuarioGuardado })
        })
      })
    }
  })
}

function Login (req, res) {
  const parametros = req.body
  Usuario.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
    if (usuarioEncontrado) {
      bcrypt.compare(parametros.password, usuarioEncontrado.password,
        (err, verificacionPassword) => {
          if (verificacionPassword) {
            return res.status(200)
              .send({ token: jwt.crearToken(usuarioEncontrado) })
          } else {
            return res.status(500)
              .send({ mensaje: 'La contrasena no coincide.' })
          }
        })
    } else {
      return res.status(500)
        .send({ mensaje: 'El usuario, no se ha podido identificar' })
    }
  })
}

function AgregarEmpresa (req, res) {
  const parametros = req.body
  const empresasModel = new Empresas()

  if (req.user.rol !== 'SuperAdmin') {
    if (parametros.nombreEmpresa && parametros.tipoEmpresa &&
            parametros.email && parametros.password) {
      empresasModel.nombreEmpresa = parametros.nombreEmpresa
      empresasModel.tipoEmpresa = parametros.tipoEmpresa
      empresasModel.email = parametros.email
      empresasModel.rol = 'Empresa'

      Empresas.find({ email: parametros.email }, (err, empresaEncontrada) => {
        if (empresaEncontrada.length == 0) {
          bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
            empresasModel.password = passwordEncriptada

            empresasModel.save((err, empresaGuardada) => {
              if (err) {
                return res.status(500)
                  .send({ mensaje: 'Error en la peticion' })
              }
              if (!empresaGuardada) {
                return res.status(500)
                  .send({ mensaje: 'Error al agregar el Empresa' })
              }

              return res.status(200).send({ empresas: empresaGuardada })
            })
          })
        } else {
          return res.status(500)
            .send({ mensaje: 'Este correo, ya  se encuentra utilizado' })
        }
      })
    }
  } else {
    return res.status(400).send({ mensaje: 'No tiene acceso a registrar' })
  }
}

function EliminarEmpresa (req, res) {
  const idEmp = req.params.idEmpresa // Obtener el valor de la variable en ruta

  Empresas.findByIdAndDelete(idEmp, (err, empresaEliminado) => {
    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
    if (!empresaEliminado) {
      return res.status(500)
        .send({ mensaje: 'Error al eliminar la empresa' })
    }

    return res.status(200).send({ empresa: empresaEliminado })
  })
}

function BusquedaEmpresaPorNombre (req, res) {
  const nomEmpres = req.params.nombreEmpresa

  Empresas.find({ nombreEmpresa: nomEmpres }, (err, empresasEncontrados) => {
    if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' })
    if (!empresasEncontrados) {
      return res.status(500)
        .send({ mensaje: 'Error al obtener la empresa' })
    }

    return res.status(200).send({ empresa: empresasEncontrados })
  })
}

function editarEmpresa (req, res) {
  const idempresa = req.params.idempresa
  const parametros = req.body

  delete parametros.password
  delete parametros.rol

  Empresas.findByIdAndUpdate(idempresa, parametros, { new: true }, (err, EmpresasEditado) => {
    if (err) return res.status(500).send({ mensaje: 'error en la petcion' })
    if (!EmpresasEditado) return res.status(500).send({ mensaje: 'error al editar la empresa' })

    return res.status(200).send({ usuario: EmpresasEditado })
  })
}

// Exportaciones
module.exports = {
  RegistrarAdministrador,
  Login,
  AgregarEmpresa,
  EliminarEmpresa,
  BusquedaEmpresaPorNombre,
  editarEmpresa
}
