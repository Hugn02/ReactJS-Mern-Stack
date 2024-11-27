import productModel from "../models/productModel.js";
import fs from 'fs';
import mongoose from "mongoose";

// Add product item
// Thêm sản phẩm vào MongoDB
const addProduct = async (req, res) => {
  try {
    const { name, category, old_price, new_price, sizes, image } = req.body;

    // Tạo sản phẩm mới
    const newProduct = await productModel.create({
      name,
      category,
      old_price: Number(old_price),
      new_price: Number(new_price),
      sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes),
      image,
    });

    // Sao chép `_id` vào `id`
    newProduct.id = newProduct._id;
    await newProduct.save(); // Lưu lại tài liệu với trường `id`

    res.status(201).json({
      success: true,
      product: newProduct, // Trả về toàn bộ sản phẩm, bao gồm `_id` và `id`
    });
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error.message);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi thêm sản phẩm",
      error: error.message,
    });
  }
};


  

// List all products
const listProduct = async (req, res) => {
    try {
      const products = await productModel.find({});
      res.json({ success: true, data: products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi khi lấy danh sách sản phẩm" });
    }
  };
// Remove product item
const removeProduct = async (req, res) => {
    try {
      const { id } = req.body;
  
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "ID không hợp lệ" });
      }
  
      const product = await productModel.findById(id);
      await saveToJSON();
  
      if (!product) {
        return res.status(404).json({ success: false, message: "Sản phẩm không tồn tại" });
      }
  
      await productModel.findByIdAndDelete(id);
  
      res.json({ success: true, message: "Sản phẩm đã được xóa" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi khi xóa sản phẩm",
        error: error.message,
      });
    }
  };
  

  const updateProduct = async (req, res) => {
    try {
      const { id, name, category, old_price, new_price, sizes, image } = req.body;
  
      // Kiểm tra ID hợp lệ
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "ID không hợp lệ" });
      }
  
      // Tạo một sản phẩm mới với ID cũ và dữ liệu mới
      const updatedProduct = await productModel.create({
        name,
        category,
        old_price: Number(old_price),
        new_price: Number(new_price),
        sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes),
        image,
      });
  
      // Xóa sản phẩm cũ nếu tồn tại
      await productModel.findByIdAndDelete(id);
  
      res.status(200).json({
        success: true,
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error.message);
      res.status(500).json({
        success: false,
        message: "Lỗi server khi cập nhật sản phẩm",
        error: error.message,
      });
    }
  };
  
  
  
  
  
const saveToJSON = async () => {
  const products = await productModel.find({});
  fs.writeFileSync("products.json", JSON.stringify(products, null, 2), "utf-8");
};

  
export { addProduct, listProduct, removeProduct, updateProduct, saveToJSON };