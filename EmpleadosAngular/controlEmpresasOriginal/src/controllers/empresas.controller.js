const Sucursales = require('../models/sucursales.model');
const Productos = require('../models/productos.model');



function agregarSucursal(req, res) {
    const parametros = req.body;
    const modeloSucursales = new Sucursales();
  
    if (parametros.nombreSucursal &&  parametros.direccionSucursal) {
      modeloSucursales.nombre = parametros.nombreSucursal;
      modeloSucursales.direccion = parametros.direccionSucursal;
      modeloSucursales.idEmpresa = parametros.sub;
  
      Sucursales.find(
        { nombre: parametros.nombreSucursal, idEmpresa: req.user.sub },
        (err, sucursalEmcontrada) => {
          if (sucursalEmcontrada.length == 0) {
            modeloSucursales.save((err, SurcursalGuardada) => {
              if (err)
                return res.status(500).send({ mensaje: "Error en la peticion" });
              if (!SurcursalGuardada)
                return res
                  .status(500)
                  .send({ mensaje: "Error al agregar Surcusal" });
  
              return res.status(200).send({ Surcusal: SurcursalGuardada });
            });
          } else {
            return res
              .status(500)
              .send({ Surcusal: "La Sucursal ya a sido creada" });
          }
        }
      );
    } else {
      return res.status(500).send({ Surcusal: "enviar parametros obligatorios" });
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
        return res.status(200).send({ sucursales: sucursalesEncontradas });
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
    var parametros = req.body;
    var idProducto = req.params.idProducto;

    Productos.findOne({_idP: idProducto, _idEmpre: req.user.sub}, (err, productoEncontrado) =>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
        if(!productoEncontrado){
        return res.status(500).send({mensaje: 'Solo puede editar productos de su empresa'});
        } else {
            Productos.findByIdAndUpdate(idProducto, parametros, {new:true}, (err, productoEditado)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
                if(!productoEditado) return res.status(500).send({mensaje: 'Error al editar esta sucursal'});
                return res.status(200).send({producto: productoEditado});
            })
        }
    })
}

function eliminarProducto(req,res) {
    const idProducto = req.params.idProducto;

    Productos.findOne({idP: idProducto, idOwner: req.user.sub}, (err, productoEncontrado) =>{
        if(!productoEncontrado) {
            return res.status(500).send({mensaje: 'Solo puedes eliminar productos de tu propiedad'});
        }
        Productos.findByIdAndDelete(idProducto, (err, productoEliminado) => {
            if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
            if(!productoEliminado) return res.status(500).send({mensaje:'Error al eliminar sucursal'});
            return res.status(200).send({mensaje:'Eliminaste el siguiente producto: ', producto: productoEliminado});
        });
    });
}

function verProductos(req,res){
    Productos.find({idEmpresa: req.user.sub}, (err, productosEncontrados) => {
        return res.status(200).send({ productos: productosEncontrados });
      });
}

function enviarProductoSucursal(req,res) {

}


module.exports = {
    agregarSucursal,
    editarSucursal,
    eliminarSucursal,
    verSucursalesEmpresa,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    verProductos,
    enviarProductoSucursal
}
