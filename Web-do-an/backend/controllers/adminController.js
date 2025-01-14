import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import adminModel from "../models/adminModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Đăng ký admin
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Kiểm tra xem admin đã tồn tại chưa
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: "Admin đã tồn tại" });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo admin mới
        const newAdmin = new adminModel({
            name,
            email,
            password: hashedPassword,
        });

        await newAdmin.save();

        // Tạo token
        const token = createToken(newAdmin._id);

        res.status(201).json({ success: true, message: "Đăng ký thành công", token });
    } catch (error) {
        console.error("Lỗi đăng ký admin:", error);
        res.status(500).json({ success: false, message: "Lỗi server khi đăng ký admin" });
    }
};

// Đăng nhập admin
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm admin theo email
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin không tồn tại" });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Mật khẩu không chính xác" });
        }

        // Tạo token
        const token = createToken(admin._id);

        res.status(200).json({ success: true, message: "Đăng nhập thành công", token });
    } catch (error) {
        console.error("Lỗi đăng nhập admin:", error);
        res.status(500).json({ success: false, message: "Lỗi server khi đăng nhập admin" });
    }
};
export const getAdminInfo = async (req, res) => {
    try {
      const admin = await adminModel.findById(req.body.adminId); // `adminId` từ middleware
      if (!admin) {
        return res.status(404).json({ success: false, message: "Admin không tồn tại" });
      }
      res.json({ success: true, admin });
    } catch (error) {
      console.error("Lỗi khi lấy thông tin admin:", error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  };
  
  export const changeAdminPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
      const admin = await adminModel.findById(req.body.adminId); // `adminId` từ middleware
      if (!admin) {
        return res.status(404).json({ success: false, message: "Admin không tồn tại" });
      }
  
      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Mật khẩu cũ không đúng" });
      }
  
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(newPassword, salt);
      await admin.save();
  
      res.json({ success: true, message: "Đổi mật khẩu thành công" });
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  };