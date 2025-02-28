import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message:"Người dùng không tồn tại"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message:"Thông tin đăng nhập không hợp lệ"});
        }

        const token = createToken(user._id)
        res.json({success: true,token})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        //checking is user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success: false,message:"Người dùng đã tồn tại"})
        }
        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success: false, message:"Vui lòng nhập email hợp lệ"})
        }
        if(password.length < 8){
            return res.json({success: false, message:"Vui lòng nhập mật khẩu mạnh"})
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success: true,token})

    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Error"})
    }
}
// Lấy thông tin người dùng
const getUserInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "Người dùng không tồn tại" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
};
// Đổi mật khẩu người dùng
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await userModel.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "Người dùng không tồn tại" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Mật khẩu cũ không đúng" });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ success: false, message: "Mật khẩu mới phải có ít nhất 8 ký tự" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({ success: true, message: "Đổi mật khẩu thành công" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

export { loginUser, registerUser, getUserInfo, changePassword}