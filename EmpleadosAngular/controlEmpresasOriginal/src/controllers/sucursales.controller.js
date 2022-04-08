const Usuario = require('../models/usuarios.models');
const Sucursales = require('../models/sucursales.models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function EditarSucursales(req, res) {
    const parametros = req.body;
    const idEmpleado = req.params.idEmpleado;

    Sucursales.findOne({ _id: idsucursales, idEmpresa: req.user.sub }, (err, SucursalEncontrada) => {
        if (!empresaEncontrada) {
            return res.status(400).send({ mensaje: "No puedes editar" });
        }
        Sucursales.findByIdAndUpdate(idEmpresa, parametros, { new: true },
            (err, sucursalActualizado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if (!sucursalActualizado) return res.status(500).send({ mensaje: 'Error al Editar Sucursal' });

                return res.status(200).send({ sucursal: sucursalActualizado })
            }
        );
    })
}