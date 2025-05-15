import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosinterceptor";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../css/Employeelist.css'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const fetchEmployees = async () => {
    try {
      const endpoint = role === "admin" ? "/admin/allemps" : "/user/viewemps";
      const response = await axiosInstance.get(endpoint);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleUpdate = (employee) => {
    navigate(`/edit/${employee._id}`, { state: { employee } });
  };

  const handleDelete = async (empId) => {
    try {
      await axiosInstance.delete(`/admin/delete/${empId}`);
      alert("Employee deleted successfully");
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Employee List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Salary</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.empId}</td>
              <td>{employee.designation}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>{employee.location}</td>
              {role === "admin" && (
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleUpdate(employee)}
                    className="me-2"
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    className="me-3"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeList;
