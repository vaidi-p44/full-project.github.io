import React, { useState } from "react";
import { Search, MapPin, Briefcase, User } from "lucide-react";
import styles from "./FindTalent.module.css";

const MOCK_CANDIDATES = [
  {
    id: 1,
    name: "John Doe",
    title: "Senior React Developer",
    location: "New York, NY",
    experience: "8 years",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    summary:
      "Experienced full-stack developer with a focus on React and modern JavaScript.",
    availability: "Immediately",
    preferredRole: "Full-time",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "UX/UI Designer",
    location: "San Francisco, CA",
    experience: "5 years",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    summary:
      "Creative designer with a strong focus on user-centered design principles.",
    availability: "2 weeks",
    preferredRole: "Full-time",
  },
];

const FindTalent = () => {
  const [filters, setFilters] = useState({
    location: "",
    role: "",
    experience: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching with term:", searchTerm);
    console.log("Filters:", filters);
  };

  return (
    <div className={styles.findTalent}>
      <div className={styles.searchSection}>
        <form onSubmit={handleSearch} className={styles.searchBar}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search candidates by skills or title"
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
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          >
            <option value="">All Roles</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>

          <select
            value={filters.experience}
            onChange={(e) =>
              setFilters({ ...filters, experience: e.target.value })
            }
          >
            <option value="">Any Experience</option>
            <option value="entry">Entry Level (0-2 years)</option>
            <option value="mid">Mid Level (3-5 years)</option>
            <option value="senior">Senior Level (5+ years)</option>
          </select>
        </div>
      </div>

      <div className={styles.candidatesList}>
        {MOCK_CANDIDATES.map((candidate) => (
          <div key={candidate.id} className={styles.candidateCard}>
            <div className={styles.header}>
              <div className={styles.avatar}>
                <User size={32} />
              </div>
              <div className={styles.mainInfo}>
                <h3>{candidate.name}</h3>
                <p className={styles.title}>{candidate.title}</p>
              </div>
            </div>

            <div className={styles.details}>
              <span>
                <MapPin size={16} /> {candidate.location}
              </span>
              <span>
                <Briefcase size={16} /> {candidate.experience}
              </span>
            </div>

            <p className={styles.summary}>{candidate.summary}</p>

            <div className={styles.skills}>
              {candidate.skills.map((skill, index) => (
                <span key={index} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>

            <div className={styles.availability}>
              <p>Available: {candidate.availability}</p>
              <p>Preferred Role: {candidate.preferredRole}</p>
            </div>

            <button className={styles.contactBtn}>Contact Candidate</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindTalent;
