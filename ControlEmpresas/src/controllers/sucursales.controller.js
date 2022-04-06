const mongoose = require('mongoose');
const Sucursales = require('../models/sucursales.model');



function editarSucursales(req, res) {
    var idSucursal = req.params.idSucursal; //Obtener el valor de la variable en ruta
    var parametros = req.body; //Obtener los los parámetros en el body

    Sucursales.findByIdAndUpdate(idSucursal, parametros, { new: true }, (err, sucursalEditado) => {

        //Verificaciones
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!sucursalEditado) return res.status(404)
            .send({ mensaje: 'Error al Editar el sucursal' });
        //Verificaciones

        return res.status(200).send({ sucursal: sucursalEditado });
    })
}

module.exports = {
    editarSucursales
}