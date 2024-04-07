import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import randomstring from "randomstring";

export const checkAuth = async (req, res, next) => {
  const secret_key = process.env.SECRET_KEY;

  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing." });
    }

    const verify = jwt.verify(token, secret_key);
    res.locals.id = verify.email;
    res.locals.type = verify.type;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Authorization token has expired." });
    }

    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const generateAndSendOTP = async (email) => {
  const otp = randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  // Configure nodemailer with your email service provider
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "nsmc21129nitw@gmail.com",
      pass: "usch khfq irmx xqqj",
    },
  });

  // Construct email message
  const mailOptions = {
    from: "nsmc21129nitw@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP to create account is: ${otp}`,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return otp;
  } catch (error) {
    if (error.message && error.message.includes("Invalid recipient")) {
      console.log("Invalid email address:", email);
    } else {
      console.error(error);
    }
    return 0;
  }
};
