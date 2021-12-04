const express = require("express");
const cors = require("cors");
const { productos } = require("./datos.js");
const app = express();
app.use(cors()); //Middleware cors
app.use(express.json()); //Middleware convertir json()
//app.use(express.urlencoded({ extended: true }));

//API HOME
app.get("/", function (req, res) {
    res.send("Bienvenidos al mundo dev!!")
});

/**
 * API Rest Consultar Producto
 * Descripción: Consulta un nuevo producto en la BD
 * Ruta: /producto/consultar
 * Método: POST
 * Datos de entrada: {nombre: "papa"}
 * Respuesta: {estado: "ok", msg: "Producto Guardado :)", data: {nombre: "papa", precio: 350, stock:130}}
 */
app.get("/producto/consultar/:name", function (req, res) {
    // Define las variables necesarias
    // Por defecto se falla
    let mensaje = "NO encontrado";
    let estado = "error";
    //Captura el nombre del producto a Consultar
    const name = req.params.name;
    const prod = productos.find(p => p.title.toLowerCase() == name.toLowerCase());
    // Producto Encontrado
    if (prod != null && prod != undefined) {
        mensaje = "Encontrado";
        estado = "ok";
    }
    res.send({ estado, msg: mensaje, data: prod });
});

/**
 * API Rest Guardar Producto
 * Descripción: Guarda un nuevo producto en la BD
 * Ruta: /producto/guardar
 * Método: POST
 * Datos de entrada: {nombre: "papa", precio: 350, stock:130}
 * Respuesta: {estado: "ok", msg: "Producto Guardado :)"}
 */
app.post("/producto/guardar", function (req, res) {
    //Desestructuración
    const { nombre, precio, stock } = req.body;
    const prod = { title: nombre, price: precio, stock };
    productos.push(prod);
    console.log(productos);
    res.send({ estado: "ok", msg: "Producto Guardado :)" });
})

/**
 * API Rest Editar Producto
 * Descripción: Edita un producto guardado en BD
 * Ruta: /producto/editar
 * Método: POST
 * Datos de entrada: {nombre: "papa", precio: 350, stock:130}
 * Respuesta: {estado: "ok", msg: "Producto Editado :)"}
 */
app.post("/producto/editar", function (req, res) {
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
 * Ruta: /producto/eliminar
 * Método: POST
 * Datos de entrada: {nombre: "papa"}
 * Respuesta: {estado: "ok", msg: "Producto Eliminado"}
 */
app.post("/producto/eliminar", function (req, res) {
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

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080")
});