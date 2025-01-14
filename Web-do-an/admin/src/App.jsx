import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Orders from './pages/Orders/Orders';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Login from './pages/Login/Login'; // Trang đăng nhập admin
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:4000";
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái xác thực

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAuthenticated(!!token); // Kiểm tra token trong localStorage
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  return (
    <div>
      <ToastContainer />
      {isAuthenticated ? (
        <>
          <Navbar onLogout={handleLogout} /> {/* Thêm nút đăng xuất */}
          <hr />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/orders" element={<Orders url={url} />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
