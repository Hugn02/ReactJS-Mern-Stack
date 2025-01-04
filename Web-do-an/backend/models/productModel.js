import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true, // Đảm bảo không trùng lặp
    },
    name: { type: String, required: true },
    category: { type: String, required: true },
    old_price: { type: Number, required: true },
    new_price: { type: Number, required: true },
    sizes: { type: [String], required: true },
    image: { type: String, required: true },
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
