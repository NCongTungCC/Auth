import UserModel from '../models/user.model.js'
import crypto from 'crypto'
import { comparePassword } from '../helpers/password.helper.js'
import { generateToken } from '../middlewares/generateToken.middleware.js'
import { hashPassword } from '../helpers/password.helper.js'
import { sendOTPEmail } from '../ultis/sendEmail.js'
class authService {
    constructor(UserModel) {
        this.UserModel = UserModel
    }
    async login({email ,password}) {
        const user = await UserModel.findOne({email : email});
        if(!user) {
            return {
                code : 404,
                message : 'Không tồn tại tài khoản',
            }
        }
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) {
            return { 
                code : 404,
                message : 'Mật khẩu không chính xác',
            }
        }
        const accessToken = await generateToken(user);
        return {
            code : 200,
            message : 'Đăng nhập thành công',
            accessToken : accessToken,
        }
    }
    async signup({username, password, email, photo, gender, birthday}) {
        
        const user = await UserModel.findOne({email : email});
        if(user) {
            return {
                code : 404,
                message : 'Email đã được đăng ký',
            }
        }
        const hashedPassword = await hashPassword(password);
        const userCount = await UserModel.countDocuments();
        const role = userCount === 0 ? 'admin' : 'user';

        const createUser = await UserModel.create({
            username,
            password : hashedPassword,
            email,
            photo,
            role,
            gender,
            birthday,
        })
        return {
            code : 201,
            message : 'Tạo tài khoản thành công',
            data : createUser,
        }
    }
    async changePassword({id, password, newPassword, confirmPassword}) {
        const user = await UserModel.findOne({_id : id});
        if(!user) {
            return {
                code : 404,
                message : 'Không tìm thấy tài khoản',
            }
        }
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) {
            return {
                code : 404,
                message : 'Mật khẩu cũ không chính xác',
            }
        }
        if(newPassword !== confirmPassword) {
            return {
                code : 404,
                message : 'Mật khẩu không trùng khớp',
            }
        }
        const hashedPassword = await hashPassword(newPassword);
        await user.updateOne({password : hashedPassword});
        return {
            code : 200,
            message : 'Đổi mật khẩu thành công',
        }
    }
    async forgotPassword({email}) {
        const user = await UserModel.findOne({email : email});
        if(!user) {
            return {
                code : 404,
                message : 'Không tìm thấy email đăng ký',
            }
        }
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        user.otp = otp;
        user.otpexpiresAt = expiresAt;
        await user.save();
        await sendOTPEmail(email, otp);
        return {
            code : 200,
            message : 'Vui lòng kiểm tra mã trong email',
        }
    }
    async verifyOTP({email, otp}) {
        const user = await UserModel.findOne({email : email});
        if(!user) {
            return {
                code : 404,
                message : 'Không tìm thấy email đăng ký',
            }
        }
        if(user.otp == otp && (user.otpexpiresAt) > Date.now()) {
            user.otp = null;
            user.otpexpiresAt = null;
            await user.save();
            return {
            code : 200,
            message : 'OTP hợp lệ',
            }
        }
        return {
            code : 404,
            message : 'OTP không hợp lệ',
        }
    }
    async resetPassword({email, newPassword, confirmPassword}) {
        const user = await UserModel.findOne({email : email});
        if(!user) {
            return {
                code : 404,
                message : 'Không tìm thấy email đăng ký',
            }
        }
        if(newPassword !== confirmPassword) {
            return {
                code : 404,
                message : 'Mật khẩu không trùng khớp',
            }
        }
        const hashedPassword = await hashPassword(newPassword);
        await user.updateOne({password : hashedPassword});
        return {
            code : 200,
            message : 'Đặt lại mật khẩu thành công',
        }
    }
}

export default authService;