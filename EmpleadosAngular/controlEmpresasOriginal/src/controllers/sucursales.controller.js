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
                if (!sucursalActualizado) return res.status(500).send({ mensaje: 'Error al Editar Sucursales' });

                return res.status(200).send({ sucursal: sucursalActualizado })
            }
        );
    })
}

function AgregarSucursal(req, res) {
    const parametros = req.body;
    const modeloSucursal = new Sucursales();

    if (parametros.nombreSucursal && parametros.direccion) {
        modeloSucursal.nombreEmpresa = parametros.nombreEmpresa;
        modeloSucursal.tipoEmpresa = parametros.tipoEmpresa;
        modeloSucursal.idEmpresa = req.user.sub;

 

        modeloSucursal.save((err, sucuralGuardado) => {
            if (err) return res.status(400).send({ mensaje: 'Error en la peticion' });
            if (!sucuralGuardado) return res.status(404).send({ mensaje: 'Error al agregar una sucursal' });
            return res.status(200).send({ Sucursal: sucuralGuardado });
        })

    } else {
        return res.status(404).send({ mensaje: 'Debe enviar los parametros obligatorios' })
    }

}

module.exports = {
    AgregarSucursal
}

