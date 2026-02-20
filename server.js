require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sgMail = require('@sendgrid/mail');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// SendGrid setup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    const msg = {
        to: process.env.EMAIL_TO, // your email
        from: process.env.EMAIL_TO, // sender email (must be verified in SendGrid)
        subject: `New Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent!');
        res.send('Message sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email. Check server logs.');
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));