import React, { useState } from "react";
import styles from "./SkillAndLanguage.module.css";
import { RxCross2 } from "react-icons/rx";
import { GiSkills } from "react-icons/gi";

const Otherinfo = () => {
  //for skills
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const addSkill = () => {
    if (input.trim() !== "") {
      setSkills((prev) => [...prev, input.trim()]);
      setInput("");
      setErrMessage("");
    } else {
      setErrMessage("Enter Skill");
    }
  };

  const deleteSkill = (indexToDelete) => {
    setSkills(skills.filter((_, index) => index !== indexToDelete));
  };

  return (
    <>
      <div className={styles.container}>
        <form action="">
          <h2 className={styles.formTitle}>Add Skills</h2>
          <label>Enter your skills</label>

          <div className={styles.input}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a skill"
              className={styles.inputField}
            />
            <GiSkills className={styles.icon} />

            <button type="button" onClick={addSkill} className={styles.add}>
              Add Skill
            </button>
          </div>
          {errMessage && <p className={styles.errMessage}>{errMessage}</p>}
          <div className={styles.skillcard}>
            {skills.map((skill, index) => (
              <div key={index} className={styles.skilldiv}>
                <p className={styles.skillText}>{skill}</p>
                <RxCross2
                  className={styles.deleteImg}
                  onClick={() => deleteSkill(index)}
                />
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancel}>
              Cancel
            </button>
            <button type="button" className={styles.save}>
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Otherinfo;
