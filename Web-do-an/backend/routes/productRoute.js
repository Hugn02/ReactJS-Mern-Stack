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
productRouter.get('/api/product/list', async (req, res) => {
    try {
      const products = await productModel.find();
      res.status(200).json({
        success: true,
        data: products.length > 0 ? products : [
          {
            _id: "1",
            name: "Sản phẩm mẫu",
            category: "Motor Nuclear",
            old_price: 100,
            new_price: 90,
            sizes: ["M", "L"],
            image: "https://via.placeholder.com/150",
          }
        ],
      });
    } catch (error) {
      console.error("Error fetching products:", error.message);
      res.status(500).json({
        success: false,
        message: "Error fetching products",
      });
    }
  });
  
  

export default productRouter;
