import jwt from "jsonwebtoken";
import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import query from "../config/db.js";
import nodemailer from "nodemailer";
import twilio from "twilio";

const router = express.Router();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendEmailOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    // Configure your email service here
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"future fit',
    to: email,
    subject: "Your OTP for registration",
    text: `Your OTP is: ${otp}`,
    html: `<b>Your OTP is: ${otp}</b>`,
  });
};

// const sendSMSOTP = async (phone, otp) => {
//   const client = twilio(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_AUTH_TOKEN
//   );

//   await client.messages.create({
//     body: `Your OTP is: ${otp}`,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: phone,
//   });
// };

router.post(
  "/register",
  [
    body("user_email").isEmail().withMessage("Invalid email format"),
    // body("user_mobile").isMobilePhone().withMessage("Invalid mobile number"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("role")
      .isIn(["employee", "job_seeker"])
      .withMessage("Role must be either 'employee' or 'job_seeker'"),
  ],
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_email, user_mobile, password, role } = req.body;

    try {
      // Check if email already exists
      const sqlCheckEmail = `SELECT * FROM ${
        role === "job_seeker" ? "job_seeker" : "employee"
      } WHERE user_email = ?`;
      const existingUser = await query(sqlCheckEmail, [user_email]);

      if (existingUser.length > 0) {
        return res
          .status(400)
          .json({ status: "error", message: "Email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const emailOTP = generateOTP();
      const mobileOTP = generateOTP();

      try {
        await sendEmailOTP(user_email, emailOTP);
        await sendSMSOTP(user_mobile, mobileOTP);

        // Store OTPs in the database or cache
        // For simplicity, we'll store them in the user object for now
        const userObj = {
          user_email,
          user_mobile,
          password: hashedPassword,
          role,
          emailOTP,
          mobileOTP,
          isEmailVerified: false,
          isMobileVerified: false,
        };

        // Store userObj in database or cache instead of inserting directly
        //For this example we will just send the object back.  In a real application you would store this in a database or cache.

        res.status(200).json({
          status: "pending_verification",
          message: "OTPs sent to email and mobile",
          userObj, // Sending the user object back for now.  In a real application you would store this in a database or cache and return a user_id
        });
      } catch (error) {
        console.error("OTP sending error:", error);
        res
          .status(500)
          .json({ status: "error", message: "Failed to send OTPs" });
      }
    } catch (error) {
      console.error("Registration error:", error);
      return res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  }
);

const getUserById = (user_id) => {
  // Implement your logic to retrieve user from database or cache based on user_id
  // For this example, we'll return a dummy user object.
  // In a real application, you would fetch the user from your database or cache.
  // Replace this with your actual database or cache retrieval logic.
  const dummyUser = {
    id: user_id,
    user_email: "test@example.com",
    user_mobile: "1234567890",
    password: "hashedPassword",
    role: "employee",
    emailOTP: "123456",
    mobileOTP: "789012",
    isEmailVerified: false,
    isMobileVerified: false,
  };
  return dummyUser;
};

router.post("/verify-otp", async (req, res) => {
  const { user_id, emailOTP, mobileOTP } = req.body;

  // Retrieve user object from database or cache
  const user = getUserById(user_id); // Implement this function

  if (!user) {
    return res.status(400).json({ status: "error", message: "User not found" });
  }

  if (emailOTP === user.emailOTP) {
    user.isEmailVerified = true;
  }

  if (mobileOTP === user.mobileOTP) {
    user.isMobileVerified = true;
  }

  if (user.isEmailVerified && user.isMobileVerified) {
    // Insert the verified user into the database
    const sqlInsert = `INSERT INTO ${
      user.role === "job_seeker" ? "job_seeker" : "employee"
    } (user_email, user_mobile, password, role) VALUES (?, ?, ?, ?)`;
    const result = await query(sqlInsert, [
      user.user_email,
      user.user_mobile,
      user.password,
      user.role,
    ]);

    const token = jwt.sign(
      { user_id: result.insertId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success",
      message: "Registration successful",
      user_id: result.insertId,
      token,
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "OTP verification failed",
      isEmailVerified: user.isEmailVerified,
      isMobileVerified: user.isMobileVerified,
    });
  }
});

export default router;
