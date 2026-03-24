require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Send the database data to the HTML
app.get('/data', (req, res) => {
    db.query("SELECT * FROM profile ORDER BY id DESC LIMIT 1", (err, result) => {
        if (err) return res.json({ name: "Error", about: "Could not load data", skills: "" });
        res.json(result[0]);
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));