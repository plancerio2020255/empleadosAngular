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

function crearMunicipio (req, res) {
  const parametros = req.body
  const modeloMunicipio = new Municipios()

  if (parametros.nombreMunicipio) {
    modeloMunicipio.nombreMunicipio = parametros.nombreMunicipio

    modeloMunicipio.save((err, municipioGuardado) => {
      return res.send({ municipio: municipioGuardado })
    })
  } else {
    return res.status(400).send({ mensaje: 'Debe enviar los parametros obligatorios: nombreMunicipio' })
  }
}

function editarMunicipio () {
  const idMunicipio = req.params.idMuni
  const parametros = req.body

  Municipios.findByIdAndUpdate(idMunicipio, parametros,
    { new: true }, (err, municipioEditado) => {
      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
      if (!municipioEditado) {
        return res.status(404)
          .send({ mensaje: 'Error al editar el municipio' })
      }

      return res.status(200).send({ municipio: municipioEditado })
    })
}

function deleteMunicipio () {
  const idMunicipio = req.params.idMuni

  Municipios.findByIdAndUpdate(idMunicipio, (err, municipioEliminado) => {
    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
    if (!municipioEliminado) {
      return res.status(500)
        .send({ mensaje: 'Error al eliminar el municipio' })
    }

    return res.status(200).send({ municipio: municipioEliminado })
  })
}

// ---------------- Tipo Empresas ----------------

function crearTipoEmpresa () {
  const parametros = req.body
  const modeloTipo = new Tipo()

  if (parametros.nombreTipo) {
    modeloTipo.nombreTipo = parametros.nombreTipo

    modeloTipo.save((err, tipoGuardado) => {
      return res.sed({ Tipo: tipoGuardado })
    })
  } else {
    return res.status(400).send({ mensaje: 'Debe enviar los parametros obligatorios: nombreTipo' })
  }
}

function editarTipoEmpresa () {
  const parametros = req.body
  const idTipo = req.params.idTip

  Tipo.findByIdAndUpdate(idTipo, parametros, { new: true }, (err, tipoEditado) => {
    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
    if (!tipoEditado) {
      return res.status(404)
        .send({ mensaje: 'Error al editar tipo' })
    }

    return res.status(200).send({ tipo: tipoEditado })
  })
}

function deleteTipoEmpresa () {
  const idTipo = req.params.idTip

  Tipo.findByIdAndDelete(idTipo, (err, tipoEliminados) => {
    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
    if (!tipoEliminados) return res.status(500).send({ mensaje: 'Error al eliminar tipo' })

    return res.status(200).send({ tipo: tipoEliminados })
  })
}

// --------------------- Empresas -------------------------------- //

function agregarEmpresa () {
  const parametros = req.body
  const modeloEmpresa = new Empresas()

  if (parametros.nombre &&
    parametros.usuario &&
    parametros.email &&
    parametros.password) {
    Empresas.find({ email: parametros.email }, (err, empresaEncontrada) => {
      if (empresaEncontrada.length > 0) {
        return res.status(500).send({ mensaje: 'Este correo ya esta en uso' })
      } else {
        modeloEmpresa.nombre = parametros.nombre
        modeloEmpresa.usuario = parametros.usuario
        modeloEmpresa.email = parametros.email

        bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
          modeloEmpresa.password = passwordEncriptada

          modeloEmpresa.save((err, empresaGuardada) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
            if (!empresaGuardada) return res.status(500).send({ mensaje: 'Error al guardar la empresa' })

            return res.status(200).send({ empresa: empresaGuardada })
          })
        })
      }
    })
  } else {
    return res.status(404).send({ mensaje: 'Debe ingresar los parametros obligatorios' })
  }
}

function editarEmpresa () {
  const parametros = req.body
  const idEmpresa = req.params.idEmpre

  delete parametros.password

  if (req.user.sub !== idEmpresa) {
    return res.status(404).send({ mensaje: 'No tiene los permisos suficientes para editar este usuario' })
  }
  Empresas.findByIdAndUpdate(req.user.sub, parametros, { new: true }, (err, empresaEditada) => {
    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
    if (!empresaEditada) return res.status(500).send({ mensaje: 'Error al editar la empresa' })

    return res.status(200).send({ mensaje: 'empresa: empresaEditada' })
  })
}

function eliminarEmpresa () {
  const idEmpresa = req.params.idEmpre
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
