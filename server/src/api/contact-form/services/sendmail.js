const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

module.exports = {
  send: async (to, subject, html) => {
    await transporter.sendMail({
      from: `Delegación de Alumnos de Teleco - UPV ${process.env.EMAIL_FROM}`,
      cc: to,
      bcc: process.env.EMAIL_FROM,
      subject,
      html
    })
  }
}
