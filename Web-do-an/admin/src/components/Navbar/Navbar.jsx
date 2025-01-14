import React, { useEffect, useState } from 'react';
import './Navbar.css';
import axios from 'axios';

const Navbar = ({ onLogout, token, url }) => {
  const [adminInfo, setAdminInfo] = useState({ name: "", email: "" });
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Lấy thông tin admin
  const fetchAdminInfo = async () => {
    try {
      const response = await axios.get(`${url}/api/admin/info`, {
        headers: { token },
      });
      if (response.data.success) {
        setAdminInfo(response.data.admin); // Lưu thông tin admin vào state
      } else {
        console.error("Không thể lấy thông tin admin:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin admin:", error);
    }
  };

  // Đổi mật khẩu
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/admin/change-password`,
        { oldPassword, newPassword },
        { headers: { token } }
      );
      if (response.data.success) {
        alert("Đổi mật khẩu thành công!");
        setOldPassword("");
        setNewPassword("");
        setShowChangePassword(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error);
      alert("Đã xảy ra lỗi khi đổi mật khẩu!");
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdminInfo();
    }
  }, [token]);

  return (
    <div className="navbar">
      <h1>Quản lý Admin</h1>
      <div className="admin-info">
        <p><strong>Tên:</strong> {adminInfo.name}</p>
        <p><strong>Email:</strong> {adminInfo.email}</p>
      </div>
      <div className="actions">
        <button onClick={() => setShowChangePassword(!showChangePassword)}>
          Đổi mật khẩu
        </button>
        <button onClick={onLogout}>Đăng xuất</button>
      </div>
      {showChangePassword && (
        <form className="change-password-form" onSubmit={handleChangePassword}>
          <h3>Đổi mật khẩu</h3>
          <div>
            <label>Mật khẩu cũ:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Mật khẩu mới:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Xác nhận</button>
          <button type="button" onClick={() => setShowChangePassword(false)}>
            Hủy
          </button>
        </form>
      )}
    </div>
  );
};

export default Navbar;
