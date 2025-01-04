import express from "express";
import { createOrder, listOrders, updateStatus, userOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

// Route để tạo đơn hàng
orderRouter.post("/create",authMiddleware, createOrder);
orderRouter.post("/userorders",authMiddleware, userOrders);
orderRouter.get("/listorders", listOrders);
orderRouter.post("/status", updateStatus)

export default orderRouter;
