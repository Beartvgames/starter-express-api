
const express = require('express');
const path = require('path');
const request = require('request');
const app = express();
const GDPSUrl = process.env.GDPS || "unknown";

// Configura el directorio donde se encuentran los archivos estáticos (por ejemplo, index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para manejar URLs limpias
app.use((req, res, next) => {
    // Verifica si hay un parámetro 'user' en la URL
    const userId = req.query.user;
    if (userId) {
        // Hacer una solicitud POST al otro sitio web
        const apiUrl = `http://${GDPSUrl}/tools/bot/userName.php?extID=${userId}`;
        request.post(apiUrl, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                // Almacena la respuesta del otro sitio web en la variable res.locals.result
                res.locals.result = body;
            } else {
                // Manejar errores de la solicitud POST
                res.locals.result = 'Error en la solicitud POST';
            }
            next();
        });
    } else if (!req.path.includes('.')) {
        // Si no hay un parámetro 'user' y la URL no tiene una extensión, enviar index.html
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        next();
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});

