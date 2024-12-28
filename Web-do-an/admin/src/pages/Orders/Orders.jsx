import React, { useEffect, useState } from 'react';
import './Orders.css'
import {toast} from "react-toastify"
import axios from "axios"
import parcel_icon from "../../assets/parcel_icon.png"
const Orders = ({url}) => {

  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/listorders");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
      
    }else{
      toast.error("Lỗi khi lấy dữ liệu đơn hàng")
    }
  }

  const statusHandler = async (event,orderId) => {
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])
  return (
    <div className='order add'>
      <h3>Danh sách đơn đặt hàng</h3>
      <div className='order-list'>
        {orders.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={parcel_icon} alt="" />
            <div>
              <p className='order-item-product'>
                {order.items.map((item,index)=>{
                  if(index === order.items.length - 1){
                    return item.name + " X " + item.quantity
                  }else{
                    return item.name + " X " + item.quantity + ", "
                  }
                })}
              </p>
              <p className='order-item-name'>{order.customer.name}</p>
              <div className="order-item-address">
                <p>{order.customer.street+","}</p>
                <p>{order.customer.city+", "+order.customer.state+", "+order.customer.country+", "+order.customer.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.customer.phone}</p>
            </div>
            <p>Sản phẩm : {order.items.length}</p>
            <p>${order.totalAmount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Chờ giao hàng">Chờ giao hàng</option>
              <option value="Đã giao">Đã giao</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders;