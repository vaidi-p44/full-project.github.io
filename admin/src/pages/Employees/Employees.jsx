import { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import styles from './Employees.module.css';

const Employees = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', department: 'HR', position: 'Manager', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'IT', position: 'Developer', joinDate: '2023-02-20' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    joinDate: ''
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      email: '',
      department: '',
      position: '',
      joinDate: ''
    });
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      setEmployees(employees.map(emp =>
        emp.id === editingEmployee.id ? { ...formData, id: emp.id } : emp
      ));
    } else {
      setEmployees([...employees, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className={styles.employees}>
      <div className={styles.header}>
        <h1>Employees</h1>
        <button className={styles.addButton} onClick={handleAdd}>
          <FiPlus /> Add Employee
        </button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search employees..."
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
              <th>Department</th>
              <th>Position</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>{employee.joinDate}</td>
                <td className={styles.actions}>
                  <button onClick={() => handleEdit(employee)} className={styles.editButton}>
                    <FiEdit2 />
                  </button>
                  <button onClick={() => handleDelete(employee.id)} className={styles.deleteButton}>
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
            <h2>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
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
                <label>Department:</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Position:</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Join Date:</label>
                <input
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitButton}>
                  {editingEmployee ? 'Update' : 'Add'}
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

export default Employees;