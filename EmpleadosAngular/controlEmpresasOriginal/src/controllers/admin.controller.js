const Empresas = require('../models/empresa.model')

const Tipo = require('../models/tipoEmpresa.model')

const Municipios = require('../models/municipios.model')

const bcrypt = require('bcrypt-nodejs')

function crearAdmin (req, res) {
  const administrador = new Empresas()

  Empresas.findOne({ usuario: 'SuperAdmin' }, (err, crearAdmin) => {
    if (err) {
      console.log('Error al crear usuario administrador')
    } else if (crearAdmin) {
      console.log('Ya existe un usuario administrador')
    } else {
      bcrypt.hash('123456', null, null, (err, contraseñaEncriptada) => {
        if (err) {
          res.status(500).send({ mensaje: 'Error al encriptar contraseña' })
        } else if (contraseñaEncriptada) {
          administrador.nombre = 'SuperAdmin'
          administrador.usuario = 'SuperAdmin'
          administrador.email = 'SuperAdmin'
          administrador.password = contraseñaEncriptada
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

// ------------------- Municipios------------------ //

function crearMunicipio () {

}

function editarMunicipio () {

}

function deleteMunicipio () {

}

// ---------------- Tipo Empresas ----------------

function crearTipoEmpresa () {

}

function editarTipoEmpresa () {

}

function deleteTipoEmpresa () {

}

// --------------------- Empresas -------------------------------- //

function agregarEmpresa () {

}

function editarEmpresa () {

}

function eliminarEmpresa () {

}

module.exports = {
  crearAdmin,
  // -------- Municipios ------//
  crearMunicipio,
  editarMunicipio,
  deleteMunicipio,
  // -------- Empresas ------//
  agregarEmpresa,
  editarEmpresa,
  eliminarEmpresa,
  // -------- Tipo Empresas ------//
  crearTipoEmpresa,
  editarTipoEmpresa,
  deleteTipoEmpresa
}
