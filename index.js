require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// This allows the server to read the data from your contact form
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
});

db.connect((err) => {
    if (err) {
        console.error('TiDB Connection Error: ' + err.stack);
        return;
    }
    console.log('Connected to TiDB Cloud as Adithya S');
});

// 1. Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. The Data Route (Updates Views + Sends Profile Info)
app.get('/data', (req, res) => {
    // Increment the view counter in the database
    db.query("UPDATE site_stats SET views = views + 1 WHERE id = 1", (err) => {
        if (err) console.log("View increment failed");

        // Fetch everything: Profile info + View count
        const sql = `
            SELECT p.*, s.views 
            FROM profile p, site_stats s 
            WHERE p.id = 1 AND s.id = 1
        `;

        db.query(sql, (err, result) => {
            if (err || result.length === 0) {
                // Fallback if DB is empty or acting up
                return res.json({
                    name: "Adithya S",
                    about: "Second Sem Bsc AIML Student",
                    skills: "HTML, CSS, JS, MySQL, MongoDB, C, R, Python",
                    views: 0,
                    email: "adithya4879@gmail.com",
                    phone: "7619301852",
                    linkedin: "https://www.linkedin.com/in/adithya-s-13b7b3382"
                });
            }
            res.json(result[0]);
        });
    });
});

// 3. The Message Route (Receives Form Submissions)
app.post('/message', (req, res) => {
    const { name, message } = req.body;
    const sql = "INSERT INTO messages (name, message) VALUES (?, ?)";
    
    db.query(sql, [name, message], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database Error");
        }
        res.send("Message Saved!");
    });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});