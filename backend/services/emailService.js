const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendWelcomeEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to BookmarkMe!',
      html: `
        <h2>Welcome to BookmarkMe!</h2>
        <p>Your account has been created successfully.</p>
        <p>Start saving, organizing, and sharing your favorite bookmarks with the world.</p>
        <p><a href="${process.env.FRONTEND_URL}">Visit BookmarkMe</a></p>
      `
    });
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

module.exports = { sendWelcomeEmail };
