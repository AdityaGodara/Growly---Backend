const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(cors());

dotenv.config();

app.use(express.json());

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

app.post("/equiry", (req, res) => {
    const { name, email, businessType, number, message } = req.body;

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: process.env.TO_EMAIL,
        subject: "New Demo Request from Growly Landing Page",
        html: `
         <div style="background-color: #ffffffff; width: 100%; height: fit-content; border-radius: 10px; margin-bottom: 30px; overflow: hidden; display: flex; justify-content: center;">
    <img src='https://res.cloudinary.com/dapihhura/image/upload/v1754663696/growly_mail_zgsnlv.png'
         alt="Growly Logo"
         style="width: 250px; height: 100px; display: block; max-width: 100%;" />
</div>
        <div style="Font-family: Cambria, Georgia, serif. font-size: 16px;">
        <b style="font-size: 16px">Name:</b> ${name} <br/>
        <b style="font-size: 16px">Email:</B> ${email}<br/>
        <b style="font-size: 16px">Business Type:</b> ${businessType}<br/>
        <b style="font-size: 16px">Phone Number:</b> ${number}<br/>
        <b style="font-size: 16px">Message:</b> ${message}<br/>
        </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        console.log('Email sent:', info.response);
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending email' });
        }
        console.log('Email sent successfully');
        return res.status(200).json({ message: 'Enquiry received successfully!' });
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});