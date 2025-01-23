import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ProfileSection.module.css";
import CareerPreferences from "../CareerPreferences/CareerPreferences";
import { IoMdClose } from "react-icons/io";
import EducationForm from "../Education/EducationForm";
import Skills from "../other info/Skills";
import Language from "../other info/Language";
import Resume from "../Resume/Resume";
import ProfileIcon from "../../assets/profile.jpg";
import Aboutyou from "../About_you/Aboutyou";
import { MdOutlineModeEdit } from "react-icons/md";

const ProfileSection = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [showAboutYouForm, setShowAboutYouForm] = useState(false);
  const [userData, setUserData] = useState(null);
  const [eData, seteData] = useState([]);
  const [cData, setcData] = useState({});

  const [activeEducationType, setActiveEducationType] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user_id = localStorage.getItem("user_id");
      console.log("Fetched user_id:", user_id); // Debugging

      if (!user_id) {
        console.error("User ID not found in local storage.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8081/api/Aboutyou/${user_id}`
        );
        console.log("API Response:", response.data); // Debugging
        if (response.data?.data) {
          setUserData(response.data.data); // Adjust if API wraps data
        } else {
          setUserData(response.data); // Directly set data
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    const fetchCareerPreferencesData = async () => {
      const user_id = localStorage.getItem("user_id");

      if (!user_id) {
        console.error("User ID not found in local storage.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8081/api/CareerPreferences/${user_id}`
        );
        console.log("Career Preferences API Response:", response.data);

        // Ensure correct state update
        setcData(
          response.data?.data || {
            looking_for: "",
            available_time: "",
            preferred_location: "",
          }
        );
      } catch (error) {
        console.error("Failed to fetch career preferences data:", error);
      }
    };

    const fetcheducationData = async () => {
      const user_id = localStorage.getItem("user_id");

      if (!user_id) {
        console.error("User ID not found in local storage.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8081/api/EducationForm/${user_id}`
        );
        console.log("API Response:", response.data);
        seteData(response.data?.data || []); // Ensure skills exist in data
      } catch (error) {
        console.error("Failed to fetch education data:", error.message);
      }
    };
    fetchUserData();
    fetchCareerPreferencesData();
    fetcheducationData();
  }, []);

  const toggleForm = (index) => {
    setActiveForm(activeForm === index ? null : index); // Toggle the form
  };
  const renderEducationDetails = (educationData) => {
    if (!educationData || educationData.length === 0) return null;

    const educationTypes = [
      { type: "post_graduation", title: "Post Graduation" },
      { type: "graduation", title: "Graduation" },
      { type: "class12", title: "Class XII" },
      { type: "class10", title: "Class X" },
    ];

    return educationTypes.map((eduType) => {
      const edu = educationData.find((e) => e.education_type === eduType.type);
      if (!edu) return null;

      return (
        <div key={eduType.type} className={styles.edetails}>
          <div className={styles.ceducation}>
            <h4>{eduType.title}</h4>
            <h5>
              {edu.course_name || "Not Provided"},{" "}
              {edu.college_name || "Not Provided"}
              <MdOutlineModeEdit
                className={styles.editIcon}
                onClick={() => {
                  setActiveEducationType(eduType.type);
                  toggleForm(1);
                }}
              />
            </h5>
            {eduType.type !== "class12" && eduType.type !== "class10" && (
              <p>
                graduating in {edu.ending_year || ""},
                {edu.course_type || "Not Provided"}
              </p>
            )}
            {eduType.type !== "graduation" &&
              eduType.type !== "post_graduation" && (
                <>
                  <p>
                    scored {edu.percentage || ""}%, passed out in{" "}
                    {edu.ending_year || ""}
                  </p>
                </>
              )}
          </div>
        </div>
      );
    });
  };
  const sections = [
    {
      title: "Your career preferences",
      description: cData?.looking_for
        ? null
        : "Add your career preferences details",
      button: cData?.looking_for ? "Edit details" : "Add details",
      form: <CareerPreferences cData={cData} />,
      details:
        cData && Object.keys(cData).length > 0 ? (
          <>
            <h4>{cData.looking_for || "No career preference specified"}</h4>
            <p>Available Time: {cData.available_time || "Not Provided"}</p>
            <p>
              Preferred Location: {cData.preferred_location || "Not Provided"}
            </p>
          </>
        ) : null,
    },
    {
      title: "Education",
      description:
        eData && eData.length > 0 ? null : "Add your education details",
      button: eData && eData.length > 0 ? "Edit details" : "Add details",
      form: <EducationForm eData={eData} educationType={activeEducationType} />,
      details:
        eData && eData.length > 0 ? (
          <>
            {renderEducationDetails(eData)}
            {!eData.find((e) => e.education_type === "post_graduation") && (
              <div className={styles.edetails}>
                <div>
                  <button
                    className={styles.ebutton}
                    onClick={() => {
                      setActiveEducationType("post_graduation");
                      toggleForm(1);
                    }}
                  >
                    Add Post Graduation Details
                  </button>
                  <p>Add your post graduation education details</p>
                </div>
              </div>
            )}
            {!eData.find((e) => e.education_type === "graduation") && (
              <div className={styles.edetails}>
                <div>
                  <button
                    className={styles.ebutton}
                    onClick={() => {
                      setActiveEducationType("graduation");
                      toggleForm(1);
                    }}
                  >
                    Add Graduation Details
                  </button>
                  <p>Add your graduation education details</p>
                </div>
              </div>
            )}
            {!eData.find((e) => e.education_type === "class12") && (
              <div className={styles.edetails}>
                <div>
                  <button
                    className={styles.ebutton}
                    onClick={() => {
                      setActiveEducationType("class12");
                      toggleForm(1);
                    }}
                  >
                    Add Class XII Details
                  </button>
                  <p>Add your higher secondary education details</p>
                </div>
              </div>
            )}
            {!eData.find((e) => e.education_type === "class10") && (
              <div className={styles.edetails}>
                <div>
                  <button
                    className={styles.ebutton}
                    onClick={() => {
                      setActiveEducationType("class10");
                      toggleForm(1);
                    }}
                  >
                    Add Class X Details
                  </button>
                  <p>Add your secondary education details</p>
                </div>
              </div>
            )}
          </>
        ) : null,
    },
    {
      title: "Skills",
      description: "Enter the skills details",
      button: "Add",
      form: <Skills />,
      details: "",
    },
    {
      title: "Language",
      description: "Talk about the languages you know",
      button: "Add",
      form: <Language />,
      details: "",
    },
    {
      title: "Resume",
      description: "Upload your resume",
      button: "Add Resume",
      form: <Resume />,
      details: "",
    },
  ];

  useEffect(() => {
    const html = document.documentElement;
    if (activeForm !== null) {
      document.body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      html.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      html.style.overflow = "";
    };
  }, [activeForm]);

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.profilecard}
          onClick={() => setShowAboutYouForm(!showAboutYouForm)}
        >
          <div className={styles.profileIcon}>
            <img
              src={userData?.profile_photo || ProfileIcon}
              alt="Profile"
              className={styles.profileImg}
            />
          </div>

          <div className={styles.details}>
            <div>
              <h2>{userData?.full_name || "Your Name"}</h2>
            </div>

            <p className={styles.separator}></p>
            <div className={styles.otherdetails}>
              <div>
                <h4>{userData?.city || "City"}</h4>
                <h4>
                  {userData?.dob
                    ? new Date(userData.dob).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Birthdate"}
                </h4>
                <h4>{userData?.gender || "Gender"}</h4>
              </div>
              <p className={styles.separator2}></p>
              <div>
                <h4>
                  {userData?.user_email ||
                    "No email provided. Please complete your profile."}
                </h4>
                <h4>{userData?.user_mobile || "No mobile number provided."}</h4>
              </div>
            </div>
          </div>

          <MdOutlineModeEdit
            className={styles.editButton}
            onClick={() => setShowAboutYouForm(!showAboutYouForm)}
          />
        </div>
        {showAboutYouForm && (
          <>
            <div className={styles.overlay}></div>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <IoMdClose
                  className={styles.closeButton}
                  onClick={() => setShowAboutYouForm(null)} // Close modal on button click
                />
              </div>
              <div className={styles.modalContent}>
                <Aboutyou userData={userData} />
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.container}>
        {sections.map((section, index) => (
          <div
            className={`${styles.card} ${section.details ? styles.empty : ""}`}
            key={index}
          >
            <div className={styles.header}>
              <span className={styles.title}>{section.title}</span>
              <p className={styles.description}>{section.description}</p>
            </div>

            <div>
              {/* Render details for Education if available, or show button */}
              {section.details || (
                <button
                  className={styles.button}
                  onClick={() => toggleForm(index)}
                >
                  {section.button}
                </button>
              )}
            </div>
          </div>
        ))}
        {activeForm === 0 && userData && <Aboutyou userData={userData} />}

        {/* Modal for active form */}
        {activeForm !== null && (
          <>
            <div className={styles.overlay}></div>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <IoMdClose
                  className={styles.closeButton}
                  onClick={() => setActiveForm(null)} // Close modal on button click
                />
              </div>
              <div className={styles.modalContent}>
                {sections[activeForm].form}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileSection;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./ProfileSection.module.css";
// import CareerPreferences from "../CareerPreferences/CareerPreferences";
// import { IoMdClose } from "react-icons/io";
// import EducationForm from "../Education/EducationForm";
// import Language from "../other info/Language";
// import Resume from "../Resume/Resume";
// import ProfileIcon from "../../assets/profile.jpg";
// import Aboutyou from "../About_you/Aboutyou";
// import { MdOutlineModeEdit } from "react-icons/md";
// import { IoSchoolSharp } from "react-icons/io5";
// import { FaBook } from "react-icons/fa";
// import { MdOutlinePercent } from "react-icons/md";
// import { RxCross2 } from "react-icons/rx";
// import { GiSkills } from "react-icons/gi";

// const ProfileSection = () => {
//   const [activeForm, setActiveForm] = useState(null);
//   const [showAboutYouForm, setShowAboutYouForm] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [eData, seteData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user_id = localStorage.getItem("user_id");
//       console.log("Fetched user_id:", user_id); // Debugging

//       if (!user_id) {
//         console.error("User ID not found in local storage.");
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `http://localhost:8081/api/Aboutyou/${user_id}`
//         );
//         console.log("API Response:", response.data); // Debugging
//         if (response.data?.data) {
//           setUserData(response.data.data); // Adjust if API wraps data
//         } else {
//           setUserData(response.data); // Directly set data
//         }
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       }
//     };

//     const fetcheducationData = async () => {
//       const user_id = localStorage.getItem("user_id");

//       if (!user_id) {
//         console.error("User ID not found in local storage.");
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `http://localhost:8081/api/EducationForm/${user_id}`
//         );
//         console.log("API Response:", response.data);
//         seteData(response.data?.data || {}); // Ensure skills exist in data
//       } catch (error) {
//         console.error("Failed to fetch education data:", error.message);
//       }
//     };
//     fetchUserData();
//     fetcheducationData();
//   }, []);
//   const toggleForm = (index) => {
//     setActiveForm(activeForm === index ? null : index); // Toggle the form
//   };
//   const sections = [
//     {
//       title: "Your career preferences",
//       description: "Add your career preferences details",
//       button: "Add details",
//       form: <CareerPreferences />,
//       details: "",
//     },
//     {
//       title: "Education",
//       description: eData ? null : "Add your education details",
//       button: eData ? "Edit details" : "Add details",
//       form: <EducationForm eData={eData} />,
//       details: eData ? (
//         <>
//           <div className={styles.edetails}>
//             <div className={styles.ceducation}>
//               <h4>
//                 {eData.course_name || "Not Provided"},
//                 {eData.college_name || "Not Provided"}
//                 <MdOutlineModeEdit
//                   className={styles.editIcon}
//                   onClick={() => toggleForm(1)} // Open the EducationForm modal
//                 />
//               </h4>

//               <p> {eData.course_type || "Not Provided"},</p>

//               {/* <p>
//               Skills:{" "}
//               {eData.skills
//                 ? JSON.parse(eData.skills).join(", ")
//                 : "Not Provided"}
//             </p> */}
//             </div>
//             {/* <div>
//               <button className={styles.button} onClick={() => toggleForm(1)}>
//                 Edit
//               </button>
//             </div> */}
//           </div>
//           <div className={styles.edetails}>
//             <div>
//               <button className={styles.ebutton} onClick={() => toggleForm(1)}>
//                 Add Class XII Details
//               </button>
//               <p>Scored Percentage, Passed out in Passing Year</p>
//             </div>
//           </div>
//           <div className={styles.edetails}>
//             <div>
//               <button className={styles.ebutton} onClick={() => toggleForm(1)}>
//                 Add Class X Details
//               </button>
//               <p>Scored Percentage, Passed out in Passing Year</p>
//             </div>
//           </div>
//         </>
//       ) : null,
//     },
//     {
//       title: "Language",
//       description: "Talk about the languages you know",
//       button: "Add",
//       form: <Language />,
//       details: "",
//     },
//     {
//       title: "Resume",
//       description: "Upload your resume",
//       button: "Add Resume",
//       form: <Resume />,
//       details: "",
//     },
//   ];

//   useEffect(() => {
//     const html = document.documentElement;
//     if (activeForm !== null) {
//       document.body.style.overflow = "hidden";
//       html.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//       html.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//       html.style.overflow = "";
//     };
//   }, [activeForm]);

//   return (
//     <>
//       <div className={styles.container}>
//         <div
//           className={styles.profilecard}
//           onClick={() => setShowAboutYouForm(!showAboutYouForm)}
//         >
//           <div className={styles.profileIcon}>
//             <img
//               src={userData?.profile_photo || ProfileIcon}
//               alt="Profile"
//               className={styles.profileImg}
//             />
//           </div>

//           <div className={styles.details}>
//             <div>
//               <h2>{userData?.full_name || "Your Name"}</h2>
//             </div>

//             <p className={styles.separator}></p>
//             <div className={styles.otherdetails}>
//               <div>
//                 <h4>{userData?.city || "City"}</h4>
//                 <h4>
//                   {userData?.dob
//                     ? new Date(userData.dob).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       })
//                     : "Birthdate"}
//                 </h4>
//                 <h4>{userData?.gender || "Gender"}</h4>
//               </div>
//               <p className={styles.separator2}></p>
//               <div>
//                 <h4>
//                   {userData?.user_email ||
//                     "No email provided. Please complete your profile."}
//                 </h4>
//                 <h4>{userData?.user_mobile || "No mobile number provided."}</h4>
//               </div>
//             </div>
//           </div>

//           <MdOutlineModeEdit
//             className={styles.editButton}
//             onClick={() => setShowAboutYouForm(!showAboutYouForm)}
//           />
//         </div>
//         {showAboutYouForm && (
//           <>
//             <div className={styles.overlay}></div>
//             <div className={styles.modal}>
//               <div className={styles.modalHeader}>
//                 <IoMdClose
//                   className={styles.closeButton}
//                   onClick={() => setShowAboutYouForm(null)} // Close modal on button click
//                 />
//               </div>
//               <div className={styles.modalContent}>
//                 <Aboutyou userData={userData} />
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//       <div className={styles.container}>
//         {sections.map((section, index) => (
//           <div
//             className={`${styles.card} ${section.details ? styles.empty : ""}`}
//             key={index}
//           >
//             <div className={styles.header}>
//               <span className={styles.title}>{section.title}</span>
//               <p className={styles.description}>{section.description}</p>
//             </div>

//             <div>
//               {/* Render details for Education if available, or show button */}
//               {section.details || (
//                 <button
//                   className={styles.button}
//                   onClick={() => toggleForm(index)}
//                 >
//                   {section.button}
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//         {activeForm === 0 && userData && <Aboutyou userData={userData} />}

//         {/* Modal for active form */}
//         {activeForm !== null && (
//           <>
//             <div className={styles.overlay}></div>
//             <div className={styles.modal}>
//               <div className={styles.modalHeader}>
//                 <IoMdClose
//                   className={styles.closeButton}
//                   onClick={() => setActiveForm(null)} // Close modal on button click
//                 />
//               </div>
//               <div className={styles.modalContent}>
//                 {sections[activeForm].form}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default ProfileSection;
