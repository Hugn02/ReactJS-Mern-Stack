import express from 'express';
import { changePassword, getUserInfo, loginUser,registerUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/info', authMiddleware , getUserInfo)
userRouter.post('/change-password',authMiddleware ,changePassword)

export default userRouter;