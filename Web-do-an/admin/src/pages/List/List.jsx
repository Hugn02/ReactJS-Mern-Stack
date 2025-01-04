import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';


const List = ({ url }) => {
  const [list, setList] = useState([]); // Danh sách sản phẩm
  const [editingProduct, setEditingProduct] = useState(null); // Sản phẩm đang được chỉnh sửa

  // Lấy danh sách sản phẩm từ API
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Lỗi khi lấy danh sách sản phẩm');
      }
    } catch (error) {
      console.error(error);
      toast.error('Lỗi server');
    }
  };

  // Xóa sản phẩm
  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(`${url}/api/product/remove`, { id: productId });
      if (response.data.success) {
        toast.success('Xóa thành công');
        fetchList(); // Cập nhật danh sách sau khi xóa
      } else {
        toast.error('Xóa thất bại');
      }
    } catch (error) {
      console.error(error);
      toast.error('Lỗi server khi xóa sản phẩm');
    }
  };

  // Cập nhật sản phẩm
  const updateProduct = async (updatedProduct) => {
    // Kiểm tra ID là chuỗi và có độ dài là 24 ký tự (chuỗi ObjectId hợp lệ)
    if (!updatedProduct.id || updatedProduct.id.length !== 24) {
      toast.error("ID không hợp lệ");
      return;
    }
  
    console.log("Dữ liệu gửi đi:", updatedProduct); // Log dữ liệu gửi đi
  
    try {
      const response = await axios.put(`${url}/api/product/update`, {
        ...updatedProduct,
        id: String(updatedProduct.id), // Đảm bảo ID là chuỗi ObjectId hợp lệ
      });
  
      if (response.data.success) {
        toast.success("Cập nhật thành công");
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Lỗi từ API:", error);
      toast.error("Lỗi server khi cập nhật sản phẩm");
    }
  };

  // Hiển thị form chỉnh sửa
  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  // Lấy danh sách sản phẩm khi component được render
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>Danh sách sản phẩm</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Ảnh</b>
          <b>Tên sản phẩm</b>
          <b>Hãng sản phẩm</b>
          <b>Giá cũ</b>
          <b>Giá mới</b>
          <b>Kích thước</b>
          <b>Thao tác</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            {editingProduct && editingProduct.id === item.id ? (
              // Form chỉnh sửa sản phẩm
              <>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, image: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                />
                <select
                  
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, category: e.target.value })
                  }
                  >
                  <option value="motornuclear">motornuclear</option>
                  <option value="inera">inera</option>
                  <option value="moshow">moshow</option>
                  </select>
                <input
                  type="number"
                  value={editingProduct.old_price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, old_price: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editingProduct.new_price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, new_price: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editingProduct.sizes}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      sizes: e.target.value.split(',').map(s => s.trim()),
                    })
                  }
                />
                <button onClick={() => updateProduct(editingProduct)}>Lưu</button>
                <button onClick={() => setEditingProduct(null)}>Hủy</button>
              </>
            ) : (
              // Hiển thị sản phẩm bình thường
              <>
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.old_price}</p>
                <p>{item.new_price}</p>
                <p>{item.sizes.join(', ')}</p>
                <div>
                  <button onClick={() => handleEditClick(item)}>✎</button>
                  <button onClick={() => removeProduct(item._id)}>X</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
