const { Router } = require("express");
const productoRutas = Router();

/**
 * API Rest Consultar Producto
 * Descripción: Consulta un nuevo producto en la BD
 * Ruta: /consultar
 * Método: POST
 * Datos de entrada: {nombre: "papa"}
 * Respuesta: {estado: "ok", msg: "Producto Guardado :)", data: {nombre: "papa", precio: 350, stock:130}}
 */
 productoRutas.post("/consultar", function (req, res) {
    const { nombre } = req.body; // {nombre: "papa"}
    Producto.findOne({ nombre }, function (error, prod) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: Al buscar" });
        } else {
            if (prod !== null) {
                return res.send({ estado: "ok", msg: "Producto Encontrado", data: prod });
            } else {
                return res.send({ estado: "error", msg: "Producto NO Encontrado" });
            }
        }
    })
});

/**
 * API Rest Guardar Producto
 * Descripción: Guarda un nuevo producto en la BD
 * Ruta: /guardar
 * Método: POST
 * Datos de entrada: {nombre: "papa", precio: 350, stock:130}
 * Respuesta: {estado: "ok", msg: "Producto Guardado :)"}
 */
productoRutas.post("/guardar", function (req, res) {
    //Desestructuración
    const data = req.body;
    const prod = new Producto(data);
    prod.save(function (error) {
        if (error) {
            console.log(error);
            return res.send({ estado: "error", msg: "ERROR: Al guardar Producto" });
        }
        res.send({ estado: "ok", msg: "Producto Guardado :)" });
    })

})

/**
 * API Rest Editar Producto
 * Descripción: Edita un producto guardado en BD
 * Ruta: /editar
 * Método: POST
 * Datos de entrada: {nombre: "papa", precio: 350, stock:130}
 * Respuesta: {estado: "ok", msg: "Producto Editado :)"}
 */
productoRutas.post("/editar", function (req, res) {
    //Desestructuración
    const { nombre, precio, stock } = req.body;
    //const prod = { title: nombre, price: precio, stock };
    // Buscar el producto a Editar
    let i = 0;
    for (const p of productos) {
        if (p.title.toLowerCase() == nombre.toLowerCase()) {
            productos[i].price = precio; // Editar precio
            productos[i].stock = stock; // Editar stock
            break;
        }
        i++;
    }
    res.send({ estado: "ok", msg: "Producto Editado :)" });
})

/**
 * API Rest Eliminar Producto
 * Descripción: Elimina un producto guardado en BD
 * Ruta: /eliminar
 * Método: POST
 * Datos de entrada: {nombre: "papa"}
 * Respuesta: {estado: "ok", msg: "Producto Eliminado"}
 */
productoRutas.post("/eliminar", function (req, res) {
    //Desestructuración
    const { nombre } = req.body;
    // Buscar el producto a Editar
    let i = 0;
    for (const p of productos) {
        if (p.title.toLowerCase() == nombre.toLowerCase()) {
            productos.splice(i, 1);
            break;
        }
        i++;
    }
    res.send({ estado: "ok", msg: "Producto Eliminado" });
})

exports.productoRutas = productoRutas;