import reviewModel from "../models/reviewModel.js";

const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.body.userId; // Lấy từ token

    if (!productId || !rating || !comment) {
        return res.status(400).json({ success: false, message: "Thiếu dữ liệu đầu vào." });
    }

    // Thêm đánh giá cho từng sản phẩm
    const reviews = productId.map((productId) => ({
        userId,
        productId,
        rating,
        comment,
        createdAt: new Date(),
    }));

    await reviewModel.insertMany(reviews);

    res.json({ success: true, message: "Đánh giá thành công!" });
} catch (error) {
    console.error("Error in /api/review/add:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ." });
}
};
const getReviewsByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
      if (!productId) {
          return res.status(400).json({
              success: false,
              message: "Thiếu productId"
          });
      }

      const reviews = await reviewModel.find({ productId }).populate('userId', 'name'); // Lấy thông tin người dùng
      res.status(200).json({
          success: true,
          reviews
      });
  } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({
          success: false,
          message: "Error fetching reviews"
      });
  }
};
  const deleteReview = async (req, res) => {
    try {
      const { reviewId } = req.body;
  
      if (!reviewId) {
        return res.status(400).json({ success: false, message: "Thiếu ID đánh giá" });
      }
  
      await reviewModel.findByIdAndDelete(reviewId);
  
      res.status(200).json({ success: true, message: "Đánh giá đã được xóa" });
    } catch (error) {
      console.error("Lỗi khi xóa đánh giá:", error.message);
      res.status(500).json({ success: false, message: "Lỗi server khi xóa đánh giá" });
    }
  };
  export {addReview,getReviewsByProductId,deleteReview}