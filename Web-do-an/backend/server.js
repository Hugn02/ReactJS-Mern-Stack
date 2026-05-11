import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import adminRouter from "./routes/adminRoute.js";
import brandRouter from "./routes/brandRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// Static files
app.use("/images", express.static("uploads"));

// API endpoints
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/review", reviewRouter);
app.use("/api/admin", adminRouter);
app.use("/api/brands", brandRouter);

// Default route
app.get("/", (req, res) => {
  res.send("API đang hoạt động");
});

// Start server
app.listen(port, () => {
  console.log(`Server đang chạy tại port ${port}`);
});
