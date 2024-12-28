import OrderModel from "../models/orderModel.js";

const createOrder = async (req, res) => {
    try {
        const { customer, items, totalAmount } = req.body;

        if (!customer || !items || items.length === 0) {
            return res.status(400).json({ success: false, message: "Dữ liệu không đầy đủ" });
        }

        const newOrder = await OrderModel.create({
            customer,
            items,
            totalAmount,
            status: "Đơn hàng đang được xử lý",
        });

        res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

//user order for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({userId: req.body.userId});
        res.json({ success: true, data:orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error"})
        
    }
}

//Order admin panel
const listOrders = async (req,res) => {
    try {
        const orders = await OrderModel.find({});
        res.json({ success: true, data:orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message:"Error"});
    }
}

//api for update order status
const updateStatus = async (req, res) => {
    try {
        await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({ success: true, message: "Cập nhật trạng thái thành công"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {createOrder,userOrders,listOrders,updateStatus}
