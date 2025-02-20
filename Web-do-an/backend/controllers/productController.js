import productModel from "../models/productModel.js";
import fs from "fs";
import mongoose from "mongoose";

export const getProductsByBrand = async (req, res) => {
    try {
        const { brand } = req.params;
        const products = await productModel.find({ category: brand });

        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi lấy sản phẩm theo hãng" });
    }
};
// Thêm sản phẩm
const addProduct = async (req, res) => {
    try {
        const { name, category, old_price, new_price, sizes, image } = req.body;

        const newId = new mongoose.Types.ObjectId();

        const newProduct = new productModel({
            _id: newId,
            id: newId.toString(),
            name,
            category,
            old_price: Number(old_price),
            new_price: Number(new_price),
            sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes),
            image,
        });

        await newProduct.save();

        res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error.message);
        res.status(500).json({ success: false, message: "Lỗi server khi thêm sản phẩm", error: error.message });
    }
};

// Lấy danh sách sản phẩm
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error.message);
        res.status(500).json({ success: false, message: "Lỗi khi lấy danh sách sản phẩm" });
    }
};

// Xóa sản phẩm
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "ID không hợp lệ" });
        }

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Sản phẩm không tồn tại" });
        }

        await productModel.findByIdAndDelete(id);

        res.json({ success: true, message: "Sản phẩm đã được xóa" });
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error.message);
        res.status(500).json({ success: false, message: "Lỗi server khi xóa sản phẩm" });
    }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
    try {
        const { id, name, category, old_price, new_price, sizes, image } = req.body;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "ID không hợp lệ" });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            {
                name,
                category,
                old_price: Number(old_price),
                new_price: Number(new_price),
                sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes),
                image,
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Sản phẩm không tồn tại" });
        }

        res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error.message);
        res.status(500).json({ success: false, message: "Lỗi server khi cập nhật sản phẩm", error: error.message });
    }
};

// Lưu sản phẩm vào file JSON
const saveToJSON = async () => {
    const products = await productModel.find({});
    fs.writeFileSync("products.json", JSON.stringify(products, null, 2), "utf-8");
};

export { addProduct, listProduct, removeProduct, updateProduct, saveToJSON };
