import express from "express";
import { registerAdmin, loginAdmin, getAdminInfo, changeAdminPassword } from "../controllers/adminController.js";
import { authenticateAdmin } from "../middleware/authenticateAdmin.js";

const router = express.Router();

// Route đăng ký admin
router.post("/register", registerAdmin);

// Route đăng nhập admin
router.post("/login", loginAdmin);

// Route bảo mật (chỉ dành cho admin đã xác thực)
router.get("/protected", authenticateAdmin, (req, res) => {
    res.json({ success: true, message: "Truy cập thành công", adminId: req.adminId });
});

router.get("/info", authenticateAdmin, getAdminInfo); // Lấy thông tin admin
router.post("/change-password", authenticateAdmin, changeAdminPassword); // Đổi mật khẩu


export default router;
