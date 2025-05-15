
import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosinterceptor"; // Ensure this works correctly
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Addemployee.css';

const Addemployee = () => {
  const [form, setForm] = useState({
    name: '',
    empId: '',
    designation: '',
    salary: '',
    department: '',
    location: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.employee) {
      const emp = location.state.employee;
      setForm({
        name: emp.name || '',
        empId: emp.empId || '',
        designation: emp.designation || '',
        salary: emp.salary || '',
        department: emp.department || '',
        location: emp.location || '',
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.empId) {
      setError('Employee name and ID are required.');
      return;
    }

    try {
      const token = localStorage.getItem('logintoken');

      if (location.state?.employee) {
        // Edit mode
        await axiosInstance.put(`/admin/edit/${location.state.employee._id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Employee updated successfully!');
      } else {
        // Add mode
        await axiosInstance.post('/admin/addemp', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Employee added successfully!');
      }

      navigate('/empl');
    } catch (err) {
      setError('Failed to submit. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-success text-white text-center">
              <h4>{location.state?.employee ? 'Edit Employee' : 'Add New Employee'}</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                  <label className="form-label">Employee Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Employee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.empId}
                    onChange={(e) => setForm({ ...form, empId: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    {location.state?.employee ? 'Update Employee' : 'Add Employee'}
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-muted text-center">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addemployee;
