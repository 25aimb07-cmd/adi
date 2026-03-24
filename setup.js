require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
});

const sql = `CREATE TABLE IF NOT EXISTS profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    about TEXT,
    skills VARCHAR(255)
)`;

db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table 'profile' created successfully!");
    process.exit();
});