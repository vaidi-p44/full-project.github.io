import React, { useState } from "react";
import styles from "./SkillAndLanguage.module.css";
import { TbLanguageHiragana } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
const Language = () => {
  // for language
  const [lang, setlang] = useState([]);
  const [addlang, setaddlang] = useState("");
  const [errMessage2, setErrMessage2] = useState("");

  const enterlang = () => {
    if (addlang.trim() !== "") {
      setlang((prev) => [...prev, addlang.trim()]);
      setaddlang("");
      setErrMessage2("");
    } else {
      setErrMessage2("Enter language");
    }
  };

  const deletelanguage = (indexToDelete) => {
    setlang(lang.filter((_, index) => index !== indexToDelete));
  };
  return (
    <>
      <div className={styles.container}>
        <form action="">
          <h2 className={styles.formTitle}>Add languages</h2>
          <label>Enter known languages</label>
          <div className={styles.input}>
            <input
              type="text"
              value={addlang}
              onChange={(e) => setaddlang(e.target.value)}
              placeholder="Add a languages"
              className={styles.inputField}
            />
            <TbLanguageHiragana className={styles.icon} />

            <button type="button" onClick={enterlang} className={styles.add}>
              Add language
            </button>
          </div>
          {errMessage2 && <p className={styles.errMessage}>{errMessage2}</p>}
          <div className={styles.skillcard}>
            {lang.map((langs, index) => (
              <div key={index} className={styles.skilldiv}>
                <p className={styles.skillText}>{langs}</p>
                <RxCross2
                  className={styles.deleteImg}
                  onClick={() => deletelanguage(index)}
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

export default Language;
