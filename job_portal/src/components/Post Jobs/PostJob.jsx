import React, { useState } from "react";
import styles from "./PostJob.module.css";

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    type: "full-time",
    category: "",
    experience: "",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", jobData);
  };

  return (
    <div className={styles.postJob}>
      <div className={styles.container}>
        <h1>Post a New Job</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Job Title</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleInputChange}
              required
              placeholder="e.g., Senior React Developer"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Company Name</label>
            <input
              type="text"
              name="company"
              value={jobData.company}
              onChange={handleInputChange}
              required
              placeholder="Your company name"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleInputChange}
                required
                placeholder="e.g., New York, NY"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Job Type</label>
              <select
                name="type"
                value={jobData.type}
                onChange={handleInputChange}
                required
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Category</label>
              <select
                name="category"
                value={jobData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="software">Software Development</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="customer-service">Customer Service</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Experience Level</label>
              <input
                type="text"
                name="experience"
                value={jobData.experience}
                onChange={handleInputChange}
                required
                placeholder="e.g., 3-5 years"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Salary Range</label>
            <input
              type="text"
              name="salary"
              value={jobData.salary}
              onChange={handleInputChange}
              required
              placeholder="e.g., $80,000 - $100,000"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Job Description</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleInputChange}
              required
              placeholder="Detailed description of the job role and responsibilities"
              rows="5"
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label>Requirements</label>
            <textarea
              name="requirements"
              value={jobData.requirements}
              onChange={handleInputChange}
              required
              placeholder="List the key requirements and qualifications"
              rows="4"
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label>Benefits</label>
            <textarea
              name="benefits"
              value={jobData.benefits}
              onChange={handleInputChange}
              required
              placeholder="List the benefits and perks offered"
              rows="3"
            ></textarea>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
