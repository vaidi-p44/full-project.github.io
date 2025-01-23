import { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import styles from './JobSeekers.module.css';

const JobSeekers = () => {
  const [jobSeekers, setJobSeekers] = useState([
    { 
      id: 1, 
      name: 'Alice Johnson', 
      email: 'alice@example.com', 
      skills: 'React, Node.js, JavaScript',
      experience: '3 years',
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Bob Wilson', 
      email: 'bob@example.com', 
      skills: 'Python, Django, SQL',
      experience: '5 years',
      status: 'Active'
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingJobSeeker, setEditingJobSeeker] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: '',
    status: 'Active'
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredJobSeekers = jobSeekers.filter(seeker =>
    seeker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seeker.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seeker.skills.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingJobSeeker(null);
    setFormData({
      name: '',
      email: '',
      skills: '',
      experience: '',
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleEdit = (seeker) => {
    setEditingJobSeeker(seeker);
    setFormData(seeker);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job seeker?')) {
      setJobSeekers(jobSeekers.filter(seeker => seeker.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingJobSeeker) {
      setJobSeekers(jobSeekers.map(seeker =>
        seeker.id === editingJobSeeker.id ? { ...formData, id: seeker.id } : seeker
      ));
    } else {
      setJobSeekers([...jobSeekers, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className={styles.jobSeekers}>
      <div className={styles.header}>
        <h1>Job Seekers</h1>
        <button className={styles.addButton} onClick={handleAdd}>
          <FiPlus /> Add Job Seeker
        </button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search job seekers..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Skills</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobSeekers.map(seeker => (
              <tr key={seeker.id}>
                <td>{seeker.name}</td>
                <td>{seeker.email}</td>
                <td>{seeker.skills}</td>
                <td>{seeker.experience}</td>
                <td>
                  <span className={`${styles.status} ${styles[seeker.status.toLowerCase()]}`}>
                    {seeker.status}
                  </span>
                </td>
                <td className={styles.actions}>
                  <button onClick={() => handleEdit(seeker)} className={styles.editButton}>
                    <FiEdit2 />
                  </button>
                  <button onClick={() => handleDelete(seeker.id)} className={styles.deleteButton}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{editingJobSeeker ? 'Edit Job Seeker' : 'Add Job Seeker'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Skills:</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Experience:</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Status:</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Hired">Hired</option>
                </select>
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitButton}>
                  {editingJobSeeker ? 'Update' : 'Add'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSeekers;