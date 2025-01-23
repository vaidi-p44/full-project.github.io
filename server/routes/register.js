import jwt from "jsonwebtoken";
import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import query from "../config/db.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("user_email").isEmail().withMessage("Invalid email format"),
    body("user_mobile").isMobilePhone().withMessage("Invalid mobile number"),
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

      // Insert the new user into the database
      const sqlInsert = `INSERT INTO ${
        role === "job_seeker" ? "job_seeker" : "employee"
      } (user_email, user_mobile, password) VALUES (?, ?, ?)`;
      const result = await query(sqlInsert, [
        user_email,
        user_mobile,
        hashedPassword,
        role,
      ]);

      const userId = result.insertId; // Get the newly created user_id

      // Generate a JWT token
      const token = jwt.sign(
        { user_id: userId }, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Token expiration
      );

      // Respond with success and the token
      return res.status(200).json({
        status: "success",
        message: "Registration successful",
        user_id: userId,
        token, // Include the token in the response
      });
    } catch (error) {
      console.error("Registration error:", error);
      return res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  }
);

export default router;
