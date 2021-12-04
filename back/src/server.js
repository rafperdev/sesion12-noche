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

//API - Consultar Producto
app.get("/producto/consultar/:name", function (req, res) {
    const name = req.params.name;
    const prod = productos.find(p => p.title.toLowerCase() == name.toLowerCase());
    res.send(prod);
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
    res.send({estado: "ok", msg: "Producto Guardado :)"});
})

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080")
});