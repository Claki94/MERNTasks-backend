const express = require('express');
const conectarDB = require('./config/db');

// crear el servidor
const app = express();

// conectar a la base de datos
conectarDB();

// Puerto de la app
const PORT = process.env.PORT || 4000;

// Define request information
app.use(express.json({ extended: true }));

// Routes import
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
});