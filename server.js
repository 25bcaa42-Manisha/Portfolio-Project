require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const path = require('path');

app.use(express.static(path.join(__dirname)));



const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: Number(process.env.MYSQLPORT)
});

db.connect(err => {
    if (err) {
        console.log("❌ DB Connection Failed:", err);
    } else {
        console.log("✅ Connected to Railway MySQL");
    }
});

app.post('/add-user', (req, res) => {
    const { name, email, message } = req.body;

    console.log("Incoming:", req.body);

const sql = "INSERT INTO contact (Name, Gmail, Message) VALUES (?, ?, ?)"; 

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log("❌ FULL DB ERROR:", err);
            res.status(500).send(err.message);
        } else {
            console.log("✅ Inserted:", result);
            res.send("User added successfully!");
        }
    });
});
app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
});
