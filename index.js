import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mysql from 'mysql2';

// Connection Database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'test',
});

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(morgan('dev'));
app.use(cors());

// GET: http://localhost:8000/
app.get('/', (req, res) => {
  res.send('Hello, Node.js');
});

// GET: http://localhost:8000/api/users
app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM `users`', (err, results, fields) => {
    if (err) throw err;

    res.status(200).json({
      status: 200,
      message: 'Success',
      data: results,
    });
  });
});

// Web Server
app.listen(port, () => {
  console.log('Server running at http://localhost:%s', port);
});
