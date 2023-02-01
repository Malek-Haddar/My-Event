import nodemailer from "nodemailer";

export const sendmail = async (result, qr) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: process.env.USER,
    to: result.email,
    attachDataUrls: true,
    subject: " Event Pass ",
    text: " Hello, " + result.name,
    html:
      ' This is your QRCode, Enjoy the Event ! </br> <img src="' + qr + '"> ',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
export const sendResetEmail = async (user, resetUrl) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    to: user.email,
    subject: "Password reset",
    text: `To reset your password, please click the following link: \n\n ${resetUrl}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
