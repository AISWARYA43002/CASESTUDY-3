
import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import EmployeeList from './components/EmployeeList';
import Addemployee from './components/Addemployee';
import Main from './components/Main';
import Login from './components/Login';
import AdminDashboard from './components/Admin';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('logintoken'));
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('logintoken');
    setIsLoggedIn(!!token);
  }, [location]);
  return (
    <>
     {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/Admin" element={<Main child={<AdminDashboard />} />} />
          <Route path="/employees" element={<Main child={<EmployeeList />} />} />
        </Route>
        <Route element={<PrivateRoutes adminRequired={true} />}>
          <Route path="/add-employee" element={<Addemployee />} />
          <Route path="/edit/:id" element={<Addemployee />} />
        </Route>
      </Routes>
    </>
  );
};
  

export default App


