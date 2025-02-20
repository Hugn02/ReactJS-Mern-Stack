import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./ManageBrands.css"; // Thêm CSS tùy chỉnh

const ManageBrands = ({ url }) => {
  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState("");
  const [editingBrand, setEditingBrand] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Lấy danh sách hãng sản phẩm
  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${url}/api/brands/list`);
      if (response.data.success) {
        setBrands(response.data.data);
      }
    } catch (error) {
      toast.error("Lỗi khi tải danh sách hãng sản phẩm");
    }
  };

  // Thêm hãng mới
  const addBrand = async () => {
    try {
      const response = await axios.post(`${url}/api/brands/add`, { name: newBrand });
      if (response.data.success) {
        toast.success("Thêm hãng thành công!");
        fetchBrands();
        setNewBrand("");
      }
    } catch (error) {
      toast.error("Lỗi khi thêm hãng");
    }
  };

  // Cập nhật hãng sản phẩm
  const updateBrand = async () => {
    try {
      await axios.put(`${url}/api/brands/update`, { id: editingBrand, name: updatedName });
      toast.success("Cập nhật thành công!");
      setEditingBrand(null);
      setUpdatedName("");
      fetchBrands();
    } catch (error) {
      toast.error("Lỗi khi cập nhật hãng");
    }
  };

  // Xóa hãng sản phẩm
  const deleteBrand = async (id) => {
    try {
      await axios.delete(`${url}/api/brands/delete`, { data: { id } });
      toast.success("Xóa thành công!");
      fetchBrands();
    } catch (error) {
      toast.error("Lỗi khi xóa hãng");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="manage-brands">
      <h2>Quản lý Hãng Sản Phẩm</h2>
      <div className="brand-form">
        <input
          type="text"
          placeholder="Nhập tên hãng..."
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
        />
        <button onClick={addBrand}>Thêm</button>
      </div>
      <div className="brand-list">
        {brands.map((brand) => (
          <div key={brand._id} className="brand-item">
            {editingBrand === brand._id ? (
              <>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
                <button onClick={updateBrand}>Lưu</button>
                <button onClick={() => setEditingBrand(null)}>Hủy</button>
              </>
            ) : (
              <>
                <p>{brand.name}</p>
                <button onClick={() => { setEditingBrand(brand._id); setUpdatedName(brand.name); }}>✎</button>
                <button onClick={() => deleteBrand(brand._id)}>X</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBrands;
