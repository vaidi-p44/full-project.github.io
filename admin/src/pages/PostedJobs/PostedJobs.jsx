import { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import styles from './PostedJobs.module.css';

const PostedJobs = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Tech Corp',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      postedDate: '2024-03-01',
      status: 'Active'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'Design Studio',
      location: 'Remote',
      type: 'Contract',
      salary: '$80,000 - $100,000',
      postedDate: '2024-03-05',
      status: 'Active'
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    postedDate: '',
    status: 'Active'
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      salary: '',
      postedDate: '',
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData(job);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingJob) {
      setJobs(jobs.map(job =>
        job.id === editingJob.id ? { ...formData, id: job.id } : job
      ));
    } else {
      setJobs([...jobs, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className={styles.postedJobs}>
      <div className={styles.header}>
        <h1>Posted Jobs</h1>
        <button className={styles.addButton} onClick={handleAdd}>
          <FiPlus /> Post New Job
        </button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Type</th>
              <th>Salary</th>
              <th>Posted Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{job.type}</td>
                <td>{job.salary}</td>
                <td>{job.postedDate}</td>
                <td>
                  <span className={`${styles.status} ${styles[job.status.toLowerCase()]}`}>
                    {job.status}
                  </span>
                </td>
                <td className={styles.actions}>
                  <button onClick={() => handleEdit(job)} className={styles.editButton}>
                    <FiEdit2 />
                  </button>
                  <button onClick={() => handleDelete(job.id)} className={styles.deleteButton}>
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
            <h2>{editingJob ? 'Edit Job Posting' : 'Post New Job'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Job Title:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Company:</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Location:</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Job Type:</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Salary Range:</label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Posted Date:</label>
                <input
                  type="date"
                  value={formData.postedDate}
                  onChange={(e) => setFormData({...formData, postedDate: e.target.value})}
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
                  <option value="Closed">Closed</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitButton}>
                  {editingJob ? 'Update Job' : 'Post Job'}
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

export default PostedJobs;