const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'tu_base_de_datos',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para manejar el envío del formulario
app.post('/contact', (req, res) => {
  const { name, email, message, phone } = req.body;

  // Insertar los datos en la base de datos
  const sql = 'INSERT INTO contact_info (name, email, message, phone) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, message, phone], (err, result) => {
    if (err) {
      console.error('Error al insertar datos en la base de datos:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Datos insertados correctamente en la base de datos');
      res.status(200).send('Datos enviados correctamente');
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
