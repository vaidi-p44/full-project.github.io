import { useState } from "react";
import axios from "axios";
import styles from "./register.module.css";
import { FaUser } from "react-icons/fa6";
import { LuLock } from "react-icons/lu";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    user_email: "",
    user_mobile: "",
    password: "",
    role: "job_seeker",
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // email verification
  // const [otp, setOtp] = useState("");
  // const [isOtpSent, setIsOtpSent] = useState(false);
  // const [isOtpVerified, setIsOtpVerified] = useState(false);

  // const sendOtp = async () => {
  //   if (!values.user_email) {
  //     toast.error("Please enter your email to send OTP.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("http://localhost:8081/send-otp", {
  //       user_email: values.user_email,
  //     });

  //     if (response.data.message === "OTP sent successfully") {
  //       setIsOtpSent(true);
  //       toast.success("OTP has been sent to your email.");
  //     }
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     toast.error("Failed to send OTP. Please try again.");
  //   }
  // };

  // const verifyOtp = async () => {
  //   if (!otp) {
  //     toast.error("Please enter the OTP.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("http://localhost:8081/verify-otp", {
  //       user_email: values.user_email,
  //       otp,
  //     });

  //     if (response.data.message === "OTP verified successfully") {
  //       setIsOtpVerified(true);
  //       toast.success("OTP verified successfully.");
  //     }
  //   } catch (error) {
  //     console.error("Error verifying OTP:", error);
  //     toast.error("Invalid or expired OTP.");
  //   }
  // };
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isValidEmail(values.user_email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(values.user_mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (values.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/Register",
        values
      );

      if (response.data.status === "success") {
        const userId = response.data.user_id; // Get user_id from response
        localStorage.setItem("user_id", userId); // Save user_id in local storage

        toast.success("Registration successful! Redirecting...");
        setTimeout(() => {
          navigate("/Aboutyou");
          location.reload();
        }, 2000);
      } else {
        toast.error(
          response.data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "Email already exists"
      ) {
        toast.error(
          "This email is already registered. Please use a different email."
        );
      } else {
        toast.error("An error occurred during registration. Please try again.");
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <ToastContainer />
      <h2 className={styles.formTitle}>Register</h2>
      <form className={styles.registerForm} onSubmit={handleRegister}>
        <div className={styles.input}>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.inputField}
            onChange={(e) =>
              setValues({ ...values, user_email: e.target.value })
            }
            required
            autoComplete="off"
          />
          <MdOutlineMail className={styles.icon} />
        </div>
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Enter your mobile number"
            className={styles.inputField}
            onChange={(e) =>
              setValues({ ...values, user_mobile: e.target.value })
            }
            required
            autoComplete="off"
          />
          <MdLocalPhone className={styles.icon} />
        </div>
        <div className={styles.input}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={styles.inputField}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
            autoComplete="off"
          />
          <LuLock className={styles.icon} />
          <span className={styles.eye} onClick={togglePasswordVisibility}>
            {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
          </span>
        </div>
        <div className={styles.input_type}>
          <label className={styles.radios}>
            <input
              className={styles.radiobtn}
              type="radio"
              name="role"
              value="job_seeker"
              checked={values.role === "job_seeker"}
              onChange={(e) => setValues({ ...values, role: e.target.value })}
            />
            JobSeeker
          </label>

          <label className={styles.radios}>
            <input
              className={styles.radiobtn}
              type="radio"
              name="role"
              value="employee"
              checked={values.role === "employee"}
              onChange={(e) => setValues({ ...values, role: e.target.value })}
            />
            Employee
          </label>
        </div>
        <button className={styles.registerButton}>Register</button>
      </form>
    </div>
  );
};

export default Register;
