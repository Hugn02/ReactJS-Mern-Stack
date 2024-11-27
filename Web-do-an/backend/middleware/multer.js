import multer from 'multer';
import path from 'path';

// Cấu hình Multer để lưu trữ file vào thư mục 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Kiểm tra thư mục uploads có tồn tại không, nếu chưa có thì tạo nó
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Đặt tên file với timestamp và tên file gốc
    cb(null, uniqueSuffix + path.extname(file.originalname));  // Đảm bảo đuôi file đúng
  },
});

// Tạo middleware Multer với cấu hình trên
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Giới hạn kích thước file (5MB)
}).single('image');  // 'image' là tên trường form-data

export default upload;
