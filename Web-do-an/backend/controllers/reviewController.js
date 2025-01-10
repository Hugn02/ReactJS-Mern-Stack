import reviewModel from "../models/reviewModel.js";

const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!req.body.userId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const newReview = new reviewModel({
      productId,
      userId: req.body.userId,
      rating,
      comment,
    });

    await newReview.save();

    res.status(201).json({ success: true, message: "Đánh giá đã được thêm" });
  } catch (error) {
    console.error("Error adding review:", error.message);
    res.status(500).json({ success: false, message: "Error adding review" });
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