const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_Pass,
    },
  });

  // Email options
  const mailOptions = {
    from: {email},
    to: 'pixwingai@gmail.com',
    subject: 'New Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }

    // Send a thank-you response to the user
    res.status(200).send(`Thank you for visiting our website, ${name}! Your message has been received.`);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
