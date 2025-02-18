const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
});

exports.sendEmail = (to, subject, text) => {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    });
};