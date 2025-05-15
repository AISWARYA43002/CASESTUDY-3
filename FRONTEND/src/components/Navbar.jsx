import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Login.css'

const Navbar = () => {
    const userRole = localStorage.getItem('role'); 
  return (
   <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#78073e', fontWeight:'600' }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          Employee Management
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
                        {userRole === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin-dashboard">Admin Dashboard</Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link text-white" to="/employees">Employee List</Link>
            </li>
            {userRole === 'admin' && (

            <li className="nav-item">
              <Link className="nav-link text-white" to="/add-employee">Add Employee</Link>
            </li>
            )}


            <li className="nav-item">
              <Link className="nav-link text-white" to="/" onClick={() => {
                localStorage.removeItem('logintoken'); 
                localStorage.removeItem('role'); 
              }}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
