const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection using environment variables
const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
});

db.connect(err => {
    if (err) {
        console.error('DB Connection Error:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// API endpoint to save contact form
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving message');
            return;
        }
        res.send('Message saved successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});