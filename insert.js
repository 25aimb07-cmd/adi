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

// FILL THIS PART OUT WITH YOUR REAL STUFF
const name = "Your Real Name"; 
const about = "I am a student specializing in Economics and CS.";
const skills = "HTML, CSS, JS, Node.js, MySQL";

const sql = "INSERT INTO profile (name, about, skills) VALUES (?, ?, ?)";

db.query(sql, [name, about, skills], (err, result) => {
    if (err) {
        console.error("Error saving data: ", err);
        process.exit(1);
    }
    console.log("SUCCESS: Your details are now saved in TiDB Cloud!");
    process.exit();
});