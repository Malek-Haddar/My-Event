import nodemailer from "nodemailer";

export const sendmail = async (result, qr) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
      ciphere: "SSLv3",
    },
    auth: {
      user: "pin-event@outlook.com",
      pass: "hanover96",
    },
  });
  const mailOptions = {
    from: "pin-event@outlook.com",
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
