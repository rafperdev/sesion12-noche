const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Producto = require("./modelos/productosModel");
const { productoRutas } = require("./rutas/productoRutas");
const { userRutas } = require("./rutas/userRutas");
const app = express();
app.use(cors()); //Middleware cors
app.use(express.json()); //Middleware convertir json()

// APIs
app.use("/producto", productoRutas);
app.use("/user", userRutas);

mongoose.connect("mongodb+srv://rperez:facil123456@cluster0.3nhnv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(res => console.log("Conectado a BD"))
    .catch(error => console.log(error));

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080")
});