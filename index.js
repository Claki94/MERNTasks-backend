const express = require('express');

// crear el servidor
const app = express();

// Puerto de la app
const PORT = process.env.PORT || 4000;

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
});