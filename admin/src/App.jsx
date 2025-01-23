import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import JobSeekers from './pages/JobSeekers/JobSeekers';
import PostedJobs from './pages/PostedJobs/PostedJobs';
import AppliedJobs from './pages/AppliedJobs/AppliedJobs';
import Profile from './pages/Profile/Profile';
import styles from './App.module.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <Router>
      <div className={`${styles.app} ${darkMode ? styles.darkMode : ''}`}>
        <Sidebar isOpen={sidebarOpen} />
        <div className={styles.mainContent}>
          <Navbar 
            toggleDarkMode={toggleDarkMode} 
            darkMode={darkMode}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          <div className={styles.pageContent}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/job-seekers" element={<JobSeekers />} />
              <Route path="/posted-jobs" element={<PostedJobs />} />
              <Route path="/applied-jobs" element={<AppliedJobs />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;