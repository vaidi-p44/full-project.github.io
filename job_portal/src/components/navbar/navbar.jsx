import styles from "./navbar.module.css";
import logo from "../../assets/futurefit.png";
import ProfileIcon from "../../assets/profile.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For navigation
import Register from "../register/Register";
import Login from "../login/login";
import { IoMdNotificationsOutline } from "react-icons/io";
import Navlink from "./Navlink";
// import ProfileSection from "../ProfileSection/Profilesection";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false); // To toggle the login form visibility
  const [ropen, setRopen] = useState(false); // To toggle the register form visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // User login state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To toggle the profile dropdown
  const navigate = useNavigate();
  const toggleLoginForm = () => {
    setOpen((prev) => !prev);
  };

  const toggleregister = () => {
    setRopen((prev) => !prev);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Store in localStorage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Remove from localStorage
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the profile dropdown menu
  };

  useEffect(() => {
    // Check if the user is logged in after page reload
    const storedLoginState = localStorage.getItem("isLoggedIn");
    if (storedLoginState === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const Openprofile = () => {
    navigate("/ProfileSection");
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.imglogo}>
        <img src={logo} alt="logo" />
      </div>
      <Navlink />
      <div className={styles.logininfo}>
        {isLoggedIn ? (
          <>
            <div className={styles.profilename}>vaidehi</div>
            <div className={styles.profileIcon} onClick={toggleDropdown}>
              <img
                src={ProfileIcon}
                alt="Profile"
                className={styles.profileImg}
              />
            </div>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button className={styles.dropdownItem} onClick={Openprofile}>
                  Profile
                </button>
                <button className={styles.dropdownItem} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
            <div className={styles.notification}>
              <IoMdNotificationsOutline className={styles.icon} />
            </div>
          </>
        ) : (
          <>
            <div className={styles.navlogin} onClick={toggleLoginForm}>
              Login
            </div>
            {open && (
              <div onClick={() => setOpen(false)} className={styles.openlogin}>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={styles.onclicklogin}
                >
                  <Login onLoginSuccess={handleLoginSuccess} />
                </div>
              </div>
            )}
            <div className={styles.navRegister} onClick={toggleregister}>
              Register
            </div>
            {ropen && (
              <div onClick={() => setRopen(false)} className={styles.openrg}>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={styles.onclickrg}
                >
                  <Register />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
