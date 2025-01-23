import React, { useState } from "react";
import styles from "./Resume.module.css";

const Resume = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (
        uploadedFile.type === "application/pdf" ||
        uploadedFile.type.includes("word")
      ) {
        setFile(uploadedFile);
        setError("");
      } else {
        setFile(null);
        setError("Please upload a valid PDF or Word document.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      console.log("File uploaded:", file.name);
      // Handle file upload logic
    } else {
      setError("Please upload a file before submitting.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.formTitle}>Upload Your Resume</h2>
        <div className={styles.input}>
          <input
            type="file"
            className={`${styles.fileInput} ${error ? styles.invalid : ""}`}
            onChange={handleFileChange}
            aria-label="file example"
            required
          />
          {error && <div className={styles.errorFeedback}>{error}</div>}
        </div>
        {file && (
          <div className={styles.fileName}>Selected file: {file.name}</div>
        )}
        <button type="submit" className={styles.submitButton}>
          Upload
        </button>
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
  );
};

export default Resume;
