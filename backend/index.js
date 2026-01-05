const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
// const jwt = require('jsonwebtoken');

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
  db.query("INSERT INTO menu (name,harga,kategori,stok,deskripsi) VALUES (?,?,?,?,?)", [req.body.name, req.body.harga, req.body.kategori, req.body.stok, req.body.deskripsi], (err, result) => {
    res.json({ id: result.insertId, name: req.body.name, harga: req.body.harga, kategori: req.body.kategori, stok: req.body.stok, deskripsi: req.body.deskripsi });
  });
});

app.put('/menu/:id', (req, res) => {
  db.query("UPDATE menu SET name=?, harga=?, kategori=?, stok=?, deskripsi=? WHERE id=?", [req.body.name, req.body.harga, req.body.kategori, req.body.stok, req.body.deskripsi, req.params.id]);
  res.json({ message: "updated" });
});

app.delete('/menu/:id', (req, res) => {
  db.query("DELETE FROM menu WHERE id=?", [req.params.id]);
  res.json({ message: "deleted" });
});

app.get('/menu/rekap/kategori',(req,res)=>{
 db.query('SELECT kategori, COUNT(*) jumlah FROM menu GROUP BY kategori',
 (err,rows)=>res.json(rows));
});

app.get('/orders', (req, res) => {
  db.query("SELECT * FROM orders", (err, rows) => {
    res.json(rows);
  });
});

app.post('/orders', (req, res) => {
  console.log("Data diterima dari React:", req.body);
  db.query("INSERT INTO orders (pelanggan, pesanan, jumlah_pesanan, harga, total_harga, status, waktu) VALUES (?, ?, ?, ?, ?, ?, ?)", [req.body.pelanggan, req.body.pesanan, req.body.jumlah_pesanan, req.body.harga, req.body.total_harga, req.body.status, req.body.waktu], (err, result) => {
    res.json({ pelanggan: req.body.pelanggan, pesanan: req.body.pesanan, jumlah_pesanan: req.body.jumlah_pesanan, harga: req.body.harga, total_harga: req.body.total_harga, status: req.body.status, waktu: req.body.waktu });
  });
});

app.use(express.json());

app.post('/users', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (result.length > 0) {
      res.json({ 
        success: true, 
        user: result[0] 
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: "Email atau Password salah!" 
      });
    }
  });
});

app.listen(5000, () => console.log("API running on port 5000"));
