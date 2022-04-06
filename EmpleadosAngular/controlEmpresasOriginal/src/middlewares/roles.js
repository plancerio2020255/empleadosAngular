exports.verAdmin = function(req, res, next) {
    if(req.user.rol !== "ROL_SuperAdmin") return res.status(403).send({mensaje: "Solo puede acceder el ADMIN"})
    
    next();
}

exports.verEmpresa = function(req, res, next) {
    if(req.user.rol !== "ROL_Empresa") return res.status(403).send({mensaje: "Solo puede acceder la EMPRESA"})
    
    next();
}