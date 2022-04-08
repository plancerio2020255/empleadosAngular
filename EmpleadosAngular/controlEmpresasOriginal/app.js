const express = require('express');
const cors = require('cors');
const app = express();

const empleadoRoutes = require('./src/routes/empresas.routes');
const sucursalRoutes = require('./src/routes/sucursales.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api', empleadoRoutes, sucursalRoutes);

module.exports = app;