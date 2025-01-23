import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiBriefcase,
  FiFileText,
  FiSettings,
} from "react-icons/fi";
import styles from "./Sidebar.module.css";
import logo from "../../assets/futurefit.png";

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { path: "/", icon: FiHome, label: "Dashboard" },
    { path: "/employees", icon: FiUsers, label: "Employees" },
    { path: "/job-seekers", icon: FiUserCheck, label: "Job Seekers" },
    { path: "/posted-jobs", icon: FiBriefcase, label: "Posted Jobs" },
    { path: "/applied-jobs", icon: FiFileText, label: "Applied Jobs" },
    { path: "/profile", icon: FiSettings, label: "Profile" },
  ];

  return (
    <div className={`${styles.sidebar} ${isOpen ? "" : styles.collapsed}`}>
      <div className={styles.imglogo}>
        <img src={logo} alt="logo" />
      </div>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <item.icon className={styles.icon} />
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
