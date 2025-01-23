import React, { useState } from "react";
import { Search, MapPin, Briefcase, Building } from "lucide-react";
import styles from "./FindJobs.module.css";
import Navbar from "../navbar/navbar";

const MOCK_JOBS = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "Tech Corp",
    location: "New York, NY",
    type: "Full-time",
    category: "Software Development",
    salary: "$120,000 - $150,000",
    description:
      "We are looking for an experienced React developer to join our team and help build innovative web applications.",
    requirements: [
      "At least 5 years of experience with React",
      "Strong understanding of JavaScript and modern ES6+ features",
      "Experience with state management (Redux, Context API)",
      "Knowledge of responsive design and CSS-in-JS solutions",
    ],
  },
  {
    id: 2,
    title: "UX Designer",
    company: "Design Studio",
    location: "San Francisco, CA",
    type: "Full-time",
    category: "Design",
    salary: "$90,000 - $120,000",
    description:
      "Join our creative team as a UX Designer and help shape the future of our digital products.",
    requirements: [], // Added an empty requirements array to avoid undefined
  },
];

const FindJobs = () => {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    category: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching with term:", searchTerm);
    console.log("Filters:", filters);
  };

  return (
    <>
      <div className={styles.findJobs}>
        <div className={styles.searchSection}>
          <form onSubmit={handleSearch} className={styles.searchBar}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search jobs by title, skills, or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className={styles.filters}>
            <select
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            >
              <option value="">All Locations</option>
              <option value="new-york">New York</option>
              <option value="san-francisco">San Francisco</option>
              <option value="remote">Remote</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All Categories</option>
              <option value="software">Software Development</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
        </div>

        <div className={styles.jobsList}>
          {MOCK_JOBS.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <h3>{job.title}</h3>
              <div className={styles.jobInfo}>
                <span>
                  <Building size={16} /> {job.company}
                </span>
                <span>
                  <MapPin size={16} /> {job.location}
                </span>
                <span>
                  <Briefcase size={16} /> {job.type}
                </span>
              </div>
              <p className={styles.description}>{job.description}</p>
              <div className={styles.requirements}>
                <h4>Requirements:</h4>
                <ul>
                  {(job.requirements || []).map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.salary}>{job.salary}</div>
              <button className={styles.applyBtn}>Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FindJobs;
