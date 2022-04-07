const mongoose = require('mongoose');
const Sucursales = require('../models/sucursales.models');


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




// function BusquedaProductoPorNombre(req, res) {
//     var nomProd = req.params.nombreProducto;

//     Productos.find({ nombre: nomProd }, (err, productosEncontrados) => {
//         if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
//         if(!productosEncontrados) return res.status(500)
//             .send({ mensaje: 'Error al obtener los productos'})

//         return res.status(200).send({ productos: productosEncontrados })
//     })
// }


module.exports = {
    eliminarSucursales
}