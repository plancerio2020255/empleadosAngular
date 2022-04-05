const express = require('express');
const cors = require('cors');
const app = express();



const usuarioRoutes = require('./src/routes/usuario.routes');
const empleadoRoutes = require('./src/routes/empleado.routes');



app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(cors());

app.use('/api', usuarioRoutes, empleadoRoutes);

module.exports = app;