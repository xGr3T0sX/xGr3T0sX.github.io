const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario', 
    password: 'tu_contraseña', 
    database: 'nombre_de_tu_base_de_datos'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para recibir los datos del formulario
app.post('/submit-survey', (req, res) => {
    const { q1, q2, q3 } = req.body;

    const query = 'INSERT INTO respuestas (pregunta1, pregunta2, pregunta3) VALUES (?, ?, ?)';
    db.query(query, [q1, q2, q3], (err, result) => {
        if (err) {
            console.error('Error al insertar los datos:', err);
            res.status(500).json({ message: 'Error al guardar los datos' });
        } else {
            res.status(200).json({ message: 'Datos guardados correctamente' });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor API corriendo en http://localhost:${port}`);
});
