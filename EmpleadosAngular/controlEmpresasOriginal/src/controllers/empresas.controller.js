const Usuario = require('../models/usuarios.models');
const Empresas = require('../models/empresas.models');

const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function RegistrarAdministrador(req, res) {
    var usuarioModel = new Usuario();

    Usuario.find({ rol: 'SuperAdmin' }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length > 0) {
            return console.log({ mensaje: "Ya existe el SuperAdmin" })
        } else {
            usuarioModel.nombre = 'SuperAdmin';
            usuarioModel.email = 'SuperAdmin';
            usuarioModel.rol = 'SuperAdmin';
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

const Empresas = require('../models/empresa.model')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../services/jwt')

function Login(req, res) {
    var parametros = req.body;
    Empresas.findOne({ email: parametros.email }, (err, empresaEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (empresaEncontrada) {
            bcrypt.compare(parametros.password, empresaEncontrada.password,
                (err, verificacionPassword) => {
                    if (verificacionPassword) {
                        if (parametros.obtenerToken == 'true') {
                            return res.status(200)
                                .send({ token: jwt.crearToken(empresaEncontrada) })
                        } else {
                            empresaEncontrada.password = undefined;

                            return res.status(200)
                                .send({ empresa: empresaEncontrada })
                        }
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

function actualizarEmpresa(req, res) {
    var idempresa = req.params.idempresa;
    var parametros = req.body;

    if (req.user.sub !== idempresa) {
        return res.status(500).send({ mensaje: "No tienes permiso para editar la empresa" })
    }

    Empresas.findByIdAndUpdate(req.user.sub, parametros, { new: true }, (err, empresaActualizado) => {

        if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
        if (!empresaEditada) return res.status(500).send({ mensaje: 'Error al actualizar la empresa' });

        return res.status(200).send({ empresa: empresaEditada });

    })

}

function eliminarEmpresa(req, res) {

    var idEmpresa = req.params.idempresa;

    Empresas.findByIdAndDelete(idEmpresa, (err, empresaEliminada) => {
        if (err) return res.status(400).send({ mensaje: "error en la Peticion" });
        if (!empresaEliminada) return res.status(400).send({ mensaje: "error al eliminar la Empresa" });

        return res.status(200).send({ empresa: empresaEliminada })
    })

}

module.exports = {
    RegistrarAdministrador,
    Login,
    AgregarEmpresa,
    editarEmpresa,
    eliminarEmpresa,
    actualizarEmpresa
}