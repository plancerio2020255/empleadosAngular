const mongoose = require('mongoose');
const Sucursales = require('../models/sucursales.models');

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

function eliminarSucursales(req, res) {
    var idSucursal = req.params.idSucursal; //Obtener el valor de la variable en ruta

    Sucursales.findByIdAndDelete(idSucursal, (err, sucursalEliminado) => {

        //Verificaciones
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!sucursalEliminado) return res.status(500)
            .send({ mensaje: 'Error al eliminar el sucursal' })
            //Verificaciones

        return res.status(200).send({ sucursal: sucursalEliminado });
    })
}





module.exports = {
    AgregarSucursal,
    eliminarSucursales
}