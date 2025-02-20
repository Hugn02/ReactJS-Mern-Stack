import React from 'react';
import './Sidebar.css'
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import list_icon from '../../assets/list.png'
import brand_icon from '../../assets/brand_icon.png'
const Sidebar = () => {
  return (
    <div className='sidebar'>
     <div className="sidebar-options">
        <NavLink to='/brand' className="sidebar-option">
            <img src={brand_icon} alt="" />
            <p>Thêm hãng sản phẩm</p>
        </NavLink>
        <NavLink to='/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Thêm sản phẩm</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src={list_icon} alt="" />
            <p>Danh sách sản phẩm</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Đặt hàng</p>
        </NavLink>
     </div>
    </div>
  )
}

export default Sidebar;