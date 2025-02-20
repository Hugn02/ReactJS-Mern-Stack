import BrandModel from "../models/brandModel.js";

// Lấy danh sách hãng sản phẩm
export const getBrands = async (req, res) => {
  try {
    const brands = await BrandModel.find();
    res.json({ success: true, data: brands });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi lấy hãng sản phẩm" });
  }
};

// Thêm hãng sản phẩm mới
export const addBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const existingBrand = await BrandModel.findOne({ name });
    if (existingBrand) return res.status(400).json({ success: false, message: "Hãng đã tồn tại" });

    const newBrand = new BrandModel({ name });
    await newBrand.save();
    res.status(201).json({ success: true, data: newBrand });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi thêm hãng sản phẩm" });
  }
};

// Cập nhật hãng sản phẩm
export const updateBrand = async (req, res) => {
  try {
    const { id, name } = req.body;
    await BrandModel.findByIdAndUpdate(id, { name });
    res.json({ success: true, message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi cập nhật hãng sản phẩm" });
  }
};

// Xóa hãng sản phẩm
export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.body;
    await BrandModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi xóa hãng sản phẩm" });
  }
};
