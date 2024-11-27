import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRouter from './routes/productRoute.js';

// App config
const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// API endpoint
app.use("/api/product", productRouter);

// Default route
app.get("/", (req, res) => {
    res.send("API đang hoạt động");
});

// Start server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
