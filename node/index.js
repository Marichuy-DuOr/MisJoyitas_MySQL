const express = require('express');
const bodyParser = require('body-parser');
const connection = require("./conexion");
const cors = require('cors');
const misrutas = require('./routes/rutas');
const misrutasT = require('./routes/rutasToken');
const misrutasC = require('./routes/rutasCarrito');
const misrutasAdmin = require('./routes/rutasAdmin');
const misrutasCompras = require('./routes/rutasCompras');
const PORT = process.env.PORT || 3000;

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', misrutas);
app.use('/', misrutasT);
app.use('/', misrutasC);
app.use('/', misrutasAdmin);
app.use('/', misrutasCompras);

//Check connect
connection.connect((err, res) => {
    if (err) {
        console.log(err)
        console.log('Error de conexion con sql')
        return;
    }
    console.log('Conexion exitosa a la base de datos')
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))