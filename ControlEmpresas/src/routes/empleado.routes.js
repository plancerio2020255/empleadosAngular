const express = require('express');
const empleadoControlador = require('../controllers/empleados.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();



api.post('/AgregarEmpleados', md_autenticacion.Auth,md_roles.verEmpresa, empleadoControlador.AgregarEmpleados);
api.put('/EditarEmpleados/:idEmpleado',md_autenticacion.Auth, md_roles.verEmpresa, empleadoControlador.EditarEmpleados);
api.get('/BuscarEmpleadoId/:idEmpleado',md_autenticacion.Auth, md_roles.verEmpresa, empleadoControlador.BuscarEmpleadoId);
api.get('/BuscarEmpleadoNombre/:nombreEmpleado',md_autenticacion.Auth, md_roles.verEmpresa, empleadoControlador.BuscarEmpleadoNombre);
api.get('/BuscarEmpleadoPuesto/:puesto',md_autenticacion.Auth, md_roles.verEmpresa, empleadoControlador.BuscarEmpleadoPuesto );
api.get('/BuscarEmpleadoDepartamento/:departamento',md_autenticacion.Auth, md_roles.verEmpresa, empleadoControlador.BuscarEmpleadoDepartamento);
api.delete('/EliminarEmpleados/:idEmpleado',md_autenticacion.Auth, md_roles.verEmpresa, empleadoControlador.EliminarEmpleados);
api.get('/TodosEmpleados',md_autenticacion.Auth, md_roles.verEmpresa, empleadoControlador.TodosEmpleados);


api.get('/CrearPdf',md_autenticacion.Auth, md_roles.verEmpresa, empleadoControlador.CrearPdf);


module.exports = api;