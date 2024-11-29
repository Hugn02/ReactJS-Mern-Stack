import React, { useState } from 'react';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [data, setData] = useState({
    name: '',
    category: 'Motor Nuclear',
    old_price: '',
    new_price: '',
    sizes: [],
    image: '', // Lưu URL ảnh
  });

  const [loading, setLoading] = useState(false); // Trạng thái loading

  const onChangeHandler = (event) => {
    const { name, value, checked } = event.target;

    if (name === 'sizes') {
      setData((prevData) => ({
        ...prevData,
        sizes: checked
          ? [...prevData.sizes, value]
          : prevData.sizes.filter((size) => size !== value),
      }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const validateData = () => {
    if (!data.name.trim()) {
      toast.error('Tên sản phẩm không được để trống!');
      return false;
    }
    if (!data.old_price || isNaN(data.old_price) || Number(data.old_price) <= 0) {
      toast.error('Giá cũ phải là số hợp lệ!');
      return false;
    }
    if (!data.new_price || isNaN(data.new_price) || Number(data.new_price) <= 0) {
      toast.error('Giá mới phải là số hợp lệ!');
      return false;
    }
    if (!data.image.trim()) {
      toast.error('URL hình ảnh không được để trống!');
      return false;
    }
    return true;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validateData()) return;

    setLoading(true); // Bắt đầu loading

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('old_price', Number(data.old_price));
    formData.append('new_price', Number(data.new_price));
    formData.append('sizes', JSON.stringify(data.sizes));
    formData.append('image', data.image);

    try {
      const response = await axios.post(`${url}/api/product/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setData({
          name: '',
          category: 'Motor Nuclear',
          old_price: '',
          new_price: '',
          sizes: [],
          image: '',
        });
        toast.success('Thêm sản phẩm thành công!');
      } else {
        toast.error('Thêm sản phẩm thất bại!');
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi thêm sản phẩm!');
      console.error(error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>URL Hình ảnh</p>
          <input
            type="text"
            name="image"
            value={data.image}
            onChange={onChangeHandler}
            placeholder="Nhập URL hình ảnh"
            required
          />
        </div>
        <div className="add-img-preview">
          <p>Xem trước hình ảnh:</p>
          {data.image && <img src={data.image} alt="Preview" />}
        </div>
        <div className="add-product-name flex-col">
          <p>Tên sản phẩm</p>
          <textarea
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Nhập vào đây"
            required
          />
        </div>
        <div className="add-category flex-col">
          <p>Hãng sản phẩm</p>
          <select
            name="category"
            value={data.category}
            onChange={onChangeHandler}
          >
            <option value="Motor Nuclear">Motor Nuclear</option>
            <option value="Inera">Inera</option>
            <option value="Moshow">Moshow</option>
          </select>
        </div>
        <div className="add-product-price">
          <div className="add-price flex-col">
            <p>Giá cũ sản phẩm</p>
            <input
              type="number"
              name="old_price"
              value={data.old_price}
              onChange={onChangeHandler}
              placeholder="$50"
              required
            />
          </div>
          <div className="add-price flex-col">
            <p>Giá mới sản phẩm</p>
            <input
              type="number"
              name="new_price"
              value={data.new_price}
              onChange={onChangeHandler}
              placeholder="$50"
              required
            />
          </div>
        </div>
        <div className="add-product-sizes">
          <p>Kích thước sản phẩm</p>
          <div className="size-checkboxes">
            {['SD', 'HG', 'RG', 'MG', 'PG'].map((size) => (
              <label key={size}>
                <input
                  type="checkbox"
                  name="sizes"
                  value={size}
                  checked={data.sizes.includes(size)}
                  onChange={onChangeHandler}
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="add-btn" disabled={loading}>
          {loading ? 'Đang thêm...' : 'Thêm'}
        </button>
      </form>
    </div>
  );
};

export default Add;
