const { Router } = require("express");
const ventasRutas = Router();
const { ventaModel } = require("../modelos/ventasModel");
const Producto = require("../modelos/productosModel");
const { userAuthGuard } = require("../guards/userAuthGuard");

ventasRutas.post("/guardar", userAuthGuard, function (req, res) {
    const data = req.body;
    Producto.findOne({ stock: { $gt: 0 }, _id: data.producto }, function (err, prod) {
        if (prod) {
            const ventas = new ventaModel(data);
            ventas.save(function (error, venta) {
                if (error) {
                    return res.status(500).send({ estado: "error", msg: "ERROR: Venta NO guardada" })
                }
                res.status(200).send({ estado: "ok", msg: "Venta Guardada", id: venta._id });
            })
        } else {
            return res.status(500).send({ estado: "error", msg: "ERROR: Prodcuto SIN Stock" })
        }
    })

})

ventasRutas.get("/listar", userAuthGuard, function (req, res) {
    ventaModel.find({}, function (err, ventas) {
        Producto.populate(ventas, { path: "producto" }, function (err, ventas) {
            if (err) {
                return res.status(500).json({ estado: "error", msg: "ERROR: Al buscar Ventas" });
            }
            return res.status(200).json({ estado: "ok", msg: "Ventas encontradas", ventas })
        })
    })
})


exports.ventasRutas = ventasRutas;