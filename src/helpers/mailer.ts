import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const token = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: { verifyToken: token, verifyTokenExpiry: Date.now() + 3600000 },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: token,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "75cb367999c26d",
        pass: "6a12ff9b7d2c14",
      },
    });
    const mailOptions = {
      from: '"NEXT-AUTH 👻" <admin@gmail.com>', // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password", // Subject line
      text: "Hello world?", // plain text body
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?${token}">here</a> to ${
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"
      } or copy and paste the link below in your browser. <br/> ${
        process.env.DOMAIN
      }/verifyemail?${token}</p>`,
    };

    let mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
