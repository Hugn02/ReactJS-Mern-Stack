import express from "express";
import { addReview, getReviewsByProductId, deleteReview } from "../controllers/reviewController.js";
import authMiddleware from "../middleware/auth.js";
const reviewRouter = express.Router();

reviewRouter.post("/add",authMiddleware, addReview);
reviewRouter.get('/:productId',authMiddleware, getReviewsByProductId);
reviewRouter.post("/delete", deleteReview);

export default reviewRouter;
