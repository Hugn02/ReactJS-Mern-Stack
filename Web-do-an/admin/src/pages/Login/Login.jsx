import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Thêm CSS cho giao diện

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/admin/login', { email, password });
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("adminToken", token); // Lưu token
        onLogin(token); // Xử lý đăng nhập thành công
      } else {
        alert(response.data.message); // Hiển thị thông báo lỗi từ server
      }
    } catch (error) {
      if (error.response) {
        alert(`Đăng nhập thất bại: ${error.response.data.message}`);
      } else {
        console.error("Lỗi không xác định:", error);
        alert("Lỗi không xác định!");
      }
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Đăng nhập Admin</h2>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};

export default Login;
