import jwt from "jsonwebtoken";

export const authenticateAdmin = (req, res, next) => {
    const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "Token không tồn tại" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.adminId = token_decode.id; // Lưu adminId vào request
    next();
  } catch (error) {
    console.error("Lỗi xác thực:", error.message);
    res.status(401).json({ success: false, message: "Token không hợp lệ" });
  }
};

