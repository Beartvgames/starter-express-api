const express = require('express');
const path = require('path');
const app = express();

// Configura el directorio donde se encuentran los archivos estáticos (por ejemplo, index.html)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});
