import express from "express";
import query from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { user_email, password } = req.body;

  try {
    const sqlGetJobSeeker = "SELECT * FROM job_seeker WHERE user_email = ?";
    const jobSeekerUsers = await query(sqlGetJobSeeker, [user_email]);

    if (jobSeekerUsers.length > 0) {
      const jobSeeker = jobSeekerUsers[0];
      const match = await bcrypt.compare(password, jobSeeker.password);

      if (match) {
        const token = jwt.sign(
          { user_id: jobSeeker.user_id, role: "job_seeker" },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.cookie("token", token);
        return res.json({
          status: "success",
          message: "Login successful!",
          user_id: jobSeeker.user_id,
          role: "job_seeker",
        });
      }
    }

    // Check employee table
    const sqlGetEmployee = "SELECT * FROM employee WHERE user_email = ?";
    const employeeUsers = await query(sqlGetEmployee, [user_email]);

    if (employeeUsers.length > 0) {
      const employee = employeeUsers[0];
      const match = await bcrypt.compare(password, employee.password);

      if (match) {
        const token = jwt.sign(
          { user_id: employee.user_id, role: "employee" },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.cookie("token", token);
        return res.json({
          status: "success",
          message: "Login successful!",
          user_id: employee.user_id,
          role: "employee",
        });
      }
    }

    res.status(400).json({ message: "Invalid email or password" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ status: "success" });
});

export default router;
