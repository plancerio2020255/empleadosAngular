const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


//--------------------------------------Registro Administrador Prueba 2
function RegistrarAdministrador(req, res) {
    var usuarioModel = new Usuario();

    Usuario.find({rol: 'ROL_SuperAdmin'}, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length > 0) {
            return console.log({mensaje: "Ya existe el SuperAdmin"})
        } else {
            usuarioModel.nombre = 'SuperAdmin';
            usuarioModel.email = 'SuperAdmin';
            usuarioModel.rol = 'ROL_SuperAdmin';
            bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                usuarioModel.password = passwordEncriptada;

                usuarioModel.save((err, usuarioGuardado) => {
                    if (err) console.log({mensaje: 'Error en la peticion'});
                    if (!usuarioGuardado) return console.log({mensaje: 'Error al agregar'});

                    return console.log({usuario: usuarioGuardado});
                });
            });
        }
    })

}

//--------------------------LOGIN

function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({email: parametros.email}, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({mensaje: 'Error en la peticion'});
        if (usuarioEncontrado) {
            bcrypt.compare(parametros.password, usuarioEncontrado.password,
                (err, verificacionPassword) => {
                    if (verificacionPassword) {
                        return res.status(200)
                            .send({token: jwt.crearToken(usuarioEncontrado)})
                    } else {
                        return res.status(500)
                            .send({mensaje: 'La contrasena no coincide.'})
                    }
                })
        } else {
            return res.status(500)
                .send({mensaje: 'El usuario, no se ha podido identificar'})
        }
    })
}
//--------------------------Registro Empresas

function RegistrarEmpresa(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();

    if (req.user.rol == 'ROL_ADMIN') {

        if (parametros.nombre && parametros.email && parametros.password) {
            usuarioModel.nombre = parametros.nombre;
            usuarioModel.apellido = parametros.apellido;
            usuarioModel.email = parametros.email;
            usuarioModel.rol = 'ROL_EMPRESA';
            usuarioModel.imagen = null;



            Usuario.find({email: parametros.email}, (err, usuarioEncontrado) => {
                if (usuarioEncontrado.length == 0) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({mensaje: 'Error en la peticion'});
                            if (!usuarioGuardado) return res.status(500)
                                .send({mensaje: 'Error al agregar el Usuario'});

                            return res.status(200).send({usuario: usuarioGuardado});
                        });
                    });
                } else {
                    return res.status(500)
                        .send({mensaje: 'Este correo, ya  se encuentra utilizado'});
                }
            })
        }
    } else {
        return res.status(400).send({mensaje: 'No tiene acceso a registrar'})
    }

}


//--------------------------EDITAR EMPRESA 

function EditarEmpresa(req, res) {
    var parametros = req.body;

    if (req.user.rol !== 'ROL_ADMIN') return res.status(500)
        .send({mensaje: 'Solo el admin puede editar'});

    delete parametros.password

    Usuario.findByIdAndUpdate(req.params.idUsuario, parametros, {new: true},
        (err, usuarioActualizado) => {
            if (err) return res.status(500)
                .send({mensaje: 'Error en la peticion'});
            if (!usuarioActualizado) return res.status(500)
                .send({mensaje: 'Error al editar el Usuario'});

            return res.status(200).send({usuario: usuarioActualizado})
        })
}

//-------------------------------ELIMINAR EMPRESA

function EliminarEmpresa(req, res) {
    var idUsuario = req.params.idUsuario;

    Usuario.findByIdAndDelete(req.params.idUsuario, (err, usuarioEliminado) => {
        if (err) return res.status(500).send({mensaje: 'Error en la peticion'});
        if (!usuarioEliminado) return res.status(500)
            .send({mensaje: 'Error al eliminar el usuario'})

        return res.status(200).send({usuario: usuarioEliminado});
    })
}


//------------------------------------
function ControlEmpresa(req, res) {
    Usuario.find({}, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({mensaje: 'Error en la peticion'})
        if (!usuarioEncontrado) return res.status(500).send({mensaje: 'Error al buscar empresa'})

        return res.status(200).send({usuario: usuarioEncontrado})
    })
}


module.exports = {
    RegistrarEmpresa,
    Login,
    RegistrarAdministrador,
    EditarEmpresa,
    EliminarEmpresa,
    ControlEmpresa
}
