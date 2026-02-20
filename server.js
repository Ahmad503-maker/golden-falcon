const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express(); // <-- Declare app first
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

app.use(cors());
app.use(express.json()); // replaces bodyParser.json()

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect(err => {
  if (err) {
    console.error('DB Connection Error:', err);
  } else {
    console.log('Connected to Railway MySQL');
  }
});

// Contact form route
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const query = `
    INSERT INTO contacts (name, email, message)
    VALUES (?, ?, ?)
  `;

  db.query(query, [name, email, message], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving message');
    }

    res.send('Message saved successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});