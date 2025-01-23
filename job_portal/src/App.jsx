import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar/navbar";
import Fonts from "./components/Homepage/Homepage";
import Login from "./components/login/login";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register/Register";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import Findjobs from "./components/Find Jobs/Findjobs";
import PostJob from "./components/Post Jobs/PostJob";
import About from "./components/About us/About";
import FindTalent from "./components/FindTalent/FindTalent";
import ProfileSection from "./components/ProfileSection/ProfileSection";
import Aboutyou from "./components/About_you/Aboutyou";
import EducationForm from "./components/Education/EducationForm";
import AdminDashboard from "../../admin/src/App";
function App() {
  return (
    <BrowserRouter>
      <AppWithRouter />
    </BrowserRouter>
  );
}
function AppWithRouter() {
  const location = useLocation(); // Get current location (pathname)

  // Define routes where Navbar should not be shown
  // const hideNavbarRoutes = ["/RegistrationForm"]; // Add any routes where you don't want Navbar to appear
  // const hideFontsRoutes = ["/RegistrationForm"];
  return (
    <div>
      {/* Conditionally render Navbar based on the current path */}
      {/* {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      {!hideFontsRoutes.includes(location.pathname) && <Fonts />} */}
      <Navbar />
      <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/find-jobs" element={<Findjobs />} />
        <Route path="/post-jobs" element={<PostJob />} />
        <Route path="/About" element={<About />} />
        <Route path="/Find-talent" element={<FindTalent />} />
        <Route path="/" element={<Home />} />
        <Route path="/Aboutyou" element={<Aboutyou />} />
        <Route path="EducationForm" element={<EducationForm />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
        <Route path="ProfileSection" element={<ProfileSection />} />
        {/* <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/RegistrationForm" element={<RegistrationForm />} />{" "}
      
        <Route path="/RegistrationForm" element={<RegistrationForm />} />{" "}
        */}
      </Routes>
    </div>
  );
}

export default App;

// function App() {

//   return (
//     <>
//      <div>
//      <BrowserRouter>
//       <Navbar></Navbar>
//       <Fonts></Fonts>
//      <Routes>
//     <Route path="/navbar" element={<Navbar/>}/>
//     <Route path="/" element={<Home />} />
//     <Route path="/home" element={<Navigate to="/" />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="/Register" element={<Register />} />
//     <Route path="/Education" element={<Education />} />
//      </Routes>
//      </BrowserRouter>
//      </div>
//     </>
//   )
// }

// export default App
