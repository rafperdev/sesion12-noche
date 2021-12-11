const { verify } = require("jsonwebtoken");

// Se crea un Guardian para denegar/autorizar al usuario
function userGuard(req, res, next) {
    //Captura la cabecera Authorization
    const { authorization } = req.headers;
    // Se comprueba que tenga la cabecera Authorization
    if (!authorization) {
        // Devuelve error 403, sino envió cabecera
        next(res.status(403).json({ estado: "error", msg: "NO autorizado" }));
    }
    try {
        //Obtiene el token desde la cabera Authorization
        const token = authorization.split(" ")[1];
        //Obtiene el payload del token
        const payload = verify(token, process.env.JWT_SECRET_KEY);
        //Verifica el rol del usuario, admite solo "admin"
        if (payload.rol !== "admin") {
            next(res.status(403).json({ estado: "error", msg: "NO autorizado" }));
        }
    } catch (error) {
        console.log(error);
        next(res.status(500).json({ estado: "error", msg: "Ocurrió un error" }));
    }
    // Pasa a ejecutar la API
    next();
}

exports.userGuard = userGuard