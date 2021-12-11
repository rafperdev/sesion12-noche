const { Router } = require("express");
const userRutas = Router();
const { userModel } = require("../modelos/userModel");
const { compare } = require("bcryptjs");

userRutas.post("/login", async function (req, res) {
    //Capturar usuario / password
    const { usuario, password } = req.body;
    // Comprobrar el usuario exista en BD
    const user = await userModel.findOne({ usuario });
    
    if (!user) {
        return res.status(401).json({ estado: "error", msg: "ERROR: Credenciales inválidas1" })
    }
    // Comparar la contreña
    const passOK = await compare(password, user.password);
    if (passOK === true) {
        return res.status(200).json({ estado: "ok", msg: "Logueado" });
    }
    return res.status(401).json({ estado: "error", msg: "ERROR: Credenciales inválidas2" });
    // Dar/denegar acceso
});


userRutas.post("/save", function (req, res) {
    const data = req.body;
    const user = new userModel(data);
    user.save(function (error) {
        if (error) {
            return res.status(500).json({ estado: "error", msg: "ERROR: Usuario NO guardado" });
        }
        res.status(200).json({ estado: "ok", msg: "Usuario Guardado" });
    })
});

exports.userRutas = userRutas;