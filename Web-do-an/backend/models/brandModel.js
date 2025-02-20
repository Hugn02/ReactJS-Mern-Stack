import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now } 
});

const BrandModel = mongoose.model("Brand", brandSchema);
export default BrandModel;
