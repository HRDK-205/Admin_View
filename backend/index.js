const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi Database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_bebek_tentrem'
});

app.get('/menu', (req, res) => {
  db.query("SELECT * FROM menu", (err, rows) => {
    res.json(rows);
  });
});

app.post('/menu', (req, res) => {
  db.query("INSERT INTO menu (name,harga) VALUES (?,?)", [req.body.name, req.body.harga], (err, result) => {
    res.json({ id: result.insertId, name: req.body.name, harga: req.body.harga });
  });
});

app.put('/menu/:id', (req, res) => {
  db.query("UPDATE menu SET name=?, harga=? WHERE id=?", [req.body.name, req.body.harga, req.params.id]);
  res.json({ message: "updated" });
});

app.delete('/menu/:id', (req, res) => {
  db.query("DELETE FROM menu WHERE id=?", [req.params.id]);
  res.json({ message: "deleted" });
});

app.listen(5000, () => console.log("API running on port 5000"));
