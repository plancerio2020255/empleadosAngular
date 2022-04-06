const Empleados = require('../models/empleados.model');
const PDF = require('pdfkit-construct');
const fs = require('fs');
var doc = new PDF();
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

//---------------------------------------------AGREGAR EMPLEADO

function AgregarEmpleados(req, res) {
    const parametros = req.body;
    const modeloEmpleados = new Empleados();

    if (parametros.nombre) {
        modeloEmpleados.nombre = parametros.nombre;
        modeloEmpleados.apellido = parametros.apellido;
        modeloEmpleados.puesto = parametros.puesto;
        modeloEmpleados.departamento = parametros.departamento;
        modeloEmpleados.idEmpresa = req.user.sub;

        modeloEmpleados.save((err, empleadoGuardado) => {
            if (err) return res.status(400).send({ mensaje: 'Error en la peticion' });
            if (!empleadoGuardado) return res.status(404).send({ mensaje: 'Error al agregar un Empleado' });
            return res.status(200).send({ empleado: empleadoGuardado });
        })

    } else {
        return res.status(404).send({ mensaje: 'Debe enviar los parametros obligatorios' })
    }

}






//-----------------------------------------------------------pdf
function CrearPdf(req, res) {

    Empleados.find({ idEmpresa: req.user.sub }, (err, empresaEncontrada) => {
        doc.pipe(fs.createWriteStream('pdf/' + req.user.nombre + '.pdf'));

        for (var i = 0; i < empresaEncontrada.length; i++) {
            //--------------------------------Se le añade fecha al pdf para mas formalidad
            let date = new Date();
            let output = String(date.getDate()).padStart(2, '0') + '/' +
                String(date.getMonth() + 1).padStart(2, '0') + '/' +
                date.getFullYear();

            const empleados = [
                {
                    No: i,
                    nombre: empresaEncontrada[i].nombre,
                    apellido: empresaEncontrada[i].apellido,
                    puesto: empresaEncontrada[i].puesto,
                    departamento: empresaEncontrada[i].departamento
                }

            ];
            //-----------------------se le asigna la cabecera del pdf
            doc.setDocumentHeader({
                height: '15'
            }, () => {
                doc.fontSize(25).text("Empleados de " + req.user.nombre + ":", {
                    with: 380,
                    align: 'center',
                    stripedColors: ["#45B39D", "#45B39D"]
                });

                doc.fontSize(14);
                doc.text("Guatemala " + output, {
                    with: 380,
                    align: 'right',
                    stripedColors: ["#45B39D", "#45B39D"]
                });
            });

            //---------------------------Se le agregan los datos del empleado

            doc.addTable(
                [
                    { key: 'No', label: 'No', align: 'center' },
                    { key: 'nombre', label: 'Nombre', align: 'center' },
                    { key: 'apellido', label: 'Apellido', align: 'center' },
                    { key: 'puesto', label: 'Puesto', align: 'center' },
                    { key: 'departamento', label: 'Departamento', align: 'center' }
                ], empleados, {

                //-------------------------------diseño de fili del empleado
                border: null,
                width: "fill_body",
                striped: true,
                stripedColors: ["#979A9A", "#45B39D"],
                cellsPadding: 6,
                marginLeft: 35,
                marginRight: 55,
                headAlign: 'center',
                
            });

        }

        doc.render();
        doc.end();
    })
    return res.status(200).send("PDF generado")
}



//----------------------------------------------------------------------------------EDITAR EMPLEADOS
function EditarEmpleados(req, res) {
    const parametros = req.body;
    const idEmpleado = req.params.idEmpleado;

    Empleados.findOne({ _id: idEmpleado, idEmpresa: req.user.sub }, (err, empresaEncontrada) => {
        if (!empresaEncontrada) {
            return res.status(400).send({ mensaje: "No puedes editar un empleado de otra empresa" });
        }
        Empleados.findByIdAndUpdate(idEmpleado, parametros, { new: true },
            (err, empleadoActualizado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if (!empleadoActualizado) return res.status(500).send({ mensaje: 'Error al Editar el Empleado' });

                return res.status(200).send({ empleado: empleadoActualizado })
            }
        );
    }
    )
}



//------------------------------------------------ELIMINAR EMPLEADO

function EliminarEmpleados(req, res) {
    var idEmpleado = req.params.idEmpleado;


    Empleados.findOne({ _id: idEmpleado, idEmpresa: req.user.sub },
        (err, empresaEncontrada) => {

            if (!empresaEncontrada) {
                return res.status(400).send({ mensaje: 'No puedes eliminar Empleados de otra Empresa' });
            }

            Empleados.findByIdAndDelete(idEmpleado, (err, empleadoEliminado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
                if (!empleadoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar empleado' });

                return res.status(200).send({ empleado: 'se elimino el empleado', empleadoEliminado })
            });
        }
    )
}

//----------------BUSUQUEDAS DE EMPLEADO
function BuscarEmpleadoId(req, res) {
    const idEmpleado = req.params.idEmpleado;

    Empleados.findOne({ _id: idEmpleado, idEmpresa: req.user.sub }, (err, empresaEncontrada) => {
        if (!empresaEncontrada) {
            return res.status(400).send({ mensaje: "No puedes ver empleado de otra Empresa" });
        }
        Empleados.find({ _id: idEmpleado }, (err, empleadoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!empleadoEncontrado) return res.status(500).send({ mensaje: 'Error al buscar empleado' });

            return res.status(200).send({ empleado: empleadoEncontrado })
        }
        );
    }
    )
}

function BuscarEmpleadoNombre(req, res) {
    const Empleado = req.params.nombreEmpleado;

    Empleados.findOne({ nombre: Empleado, idEmpresa: req.user.sub }, (err, empresaEncontrada) => {
        if (!empresaEncontrada) {
            return res.status(400).send({ mensaje: 'no puedes ver empleados de otra empresa' });
        }
        Empleados.find({ nombre: Empleado }, (err, empleadoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!empleadoEncontrado) return res.status(500).send({ mensaje: 'Error al buscar empleado' });

            return res.status(200).send({ empleado: empleadoEncontrado })
        }
        );
    }
    )

}

function BuscarEmpleadoPuesto(req, res) {
    const puestoEmpleado = req.params.puesto;

    Empleados.findOne({ puesto: puestoEmpleado, idEmpresa: req.user.sub }, (err, empresaEncontrada) => {


        if (!empresaEncontrada) {
            return res.status(400).send({ mensaje: 'no puedes ver empleados de otra empresa' });
        }
        Empleados.find({ puesto: puestoEmpleado }, (err, empleadoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!empleadoEncontrado) return res.status(500).send({ mensaje: 'Error al buscar empleado' });

            return res.status(200).send({ empleado: empleadoEncontrado })
        }
        );
    }
    )

}

function BuscarEmpleadoDepartamento(req, res) {
    const departamentoEmpleado = req.params.departamento;

    Empleados.findOne({ departamento: departamentoEmpleado, idEmpresa: req.user.sub }, (err, empresaEncontrada) => {

        if (!empresaEncontrada) {
            return res.status(400).send({ mensaje: 'no puedes ver empleados de otra empresa' });
        }
        Empleados.find({ departamento: departamentoEmpleado }, (err, empleadoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!empleadoEncontrado) return res.status(500).send({ mensaje: 'Error al buscar empleado' });

            return res.status(200).send({ empleado: empleadoEncontrado })
        }
        );
    }
    )

}


function TodosEmpleados(req, res) {


    Empleados.findOne({ idEmpresa: req.user.sub }, (err, empresaEncontrada) => {


        if (!empresaEncontrada) {
            return res.status(400).send({ mensaje: 'No puedes ver Empleados de otra Empresa' });
        }
        Empleados.find({}, (err, empleadosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
            if (!empleadosEncontrados) return res.status(500).send({ mensaje: 'Error al obtener empleadp' })

            return res.status(200).send({ Empleados: empleadosEncontrados })
        });
    }
    )

}

module.exports = {
    AgregarEmpleados,
    EditarEmpleados,
    EliminarEmpleados,
    BuscarEmpleadoId,
    BuscarEmpleadoNombre,
    BuscarEmpleadoPuesto,
    BuscarEmpleadoDepartamento,
    CrearPdf,
    TodosEmpleados
}