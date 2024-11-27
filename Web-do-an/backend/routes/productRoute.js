import express from 'express';
import multer from 'multer';
import { addProduct, listProduct, removeProduct, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: "uploads", // Thư mục lưu ảnh
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Routes
productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/list", listProduct);
productRouter.post("/remove", removeProduct);
productRouter.put("/update", updateProduct);

export default productRouter;
