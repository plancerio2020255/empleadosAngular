const Sucursales = require('../models/sucursales.model');
const Productos = require('../models/productos.model');

function agregarSucursal(req, res) {
    var parametro = req.body;
    var sucursalesModel = new Sucursales();
  
    if (
      parametro.nombre &&
      parametro.direccion
    ) {
      sucursalesModel.nombreSucursal = parametro.nombre;
      sucursalesModel.direccionSucursal = parametro.direccion;
      sucursalesModel.idEmpresa = req.user.sub
  
      Sucursales.find({ nombreSucursal: parametro.nombre, idEmpresa: req.user.sub}, (err, sucursalEncontrada) => {
        if (sucursalEncontrada.length == 0) {
            sucursalesModel.save((err, sucursalGuardada) => {
                if(err) return res.status(500).send({mensaje: "Error en la peticion"});
                if(!sucursalGuardada) return res.status(500).send({mensaje: 'Error al agregar sucursal'});
                return res.status(200).send({sucursal: sucursalGuardada});
            })
        } else {
            return res.status(500).send({mensaje: 'Ya existe esta sucursal'})
        } 
      });
    } else {
        return res.status(500).send({mensaje: 'Debe enviar los parametros obligatorios'});
    } 
}

function editarSucursal(req, res) {
    var parametros = req.body;
    var idSucursal = req.params.idSucursal;

    Sucursales.findOne({_id: idSucursal, _idEmpre: req.user.sub}, (err, sucursalEncontrada) =>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
        if(!sucursalEncontrada){
        return res.status(500).send({mensaje: 'Solo puede editar sucursales de su propiedades'});
        } else {
            Sucursales.findByIdAndUpdate(idSucursal, parametros, {new:true}, (err, sucursalEditada)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
                if(!sucursalEditada) return res.status(500).send({mensaje: 'Error al editar esta sucursal'});
                return res.status(200).send({sucursal: sucursalEditada});
            })
        }
    })
}

function eliminarSucursal(req,res) {
    const idSucursal = req.params.idSucursal

    Sucursales.findOne({id: idSucursal, idOwner: req.user.sub}, (err, sucursalEncontrada) =>{
        if(!sucursalEncontrada) {
            return res.status(500).send({mensaje: 'Solo puedes eliminar sucursales de tu propiedad'});
        }
        Sucursales.findByIdAndDelete(idSucursal, (err, sucursalEliminada) => {
            if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
            if(!sucursalEliminada) return res.status(500).send({mensaje:'Error al eliminar sucursal'});
            return res.status(200).send({sucursal: sucursalEliminada});
        });
    });
}

function verSucursalesEmpresa(req,res) {
    Sucursales.find({idEmpresa: req.user.sub}, (err, sucursalesEncontradas) => {
        return res.status(200).send({ Sucursales: sucursalesEncontradas });
      });
}

function agregarProducto(req,res) {
    var parametros = req.body;
    var productosModel = new Productos();

    if(parametros.nombre && parametros.proveedor && parametros.stock) {
        productosModel.nombreProducto = parametros.nombre;
        productosModel.nombreProveedor = parametros.proveedor;
        productosModel.stock = parametros.stock;
        productosModel.idEmpresa = req.user.sub;

        Productos.find({nombreProducto: parametros.nombre, idEmpresa: req.user.sub}, (err, productoEncontrado)=>{
            if(productoEncontrado.length==0) {
                productosModel.save((err, productoGuardado) => {
                    if(err) return res.status(500).send({mensaje: "Error en la peticion"});
                    if(!productoGuardado) return res.status(500).send({mensaje: 'Error al agregar sucursal'});
                    return res.status(200).send({producto: productoGuardado});
                })
            } else {
                return res.status(500).send({mensaje:'Este producto ya existe'});
            }
        })
    } else {
        return res.status(500).send({mensaje: 'Debe enviar los parametros obligatorios'})
    }
}

function editarProducto(req,res) {

}

function eliminarProducto(req,res) {

}

function enviarProductoSucursal(req,res) {

}


module.exports = {
    agregarSucursal,
    editarSucursal,
    eliminarSucursal,
    verSucursalesEmpresa,
    agregarProducto,
}
