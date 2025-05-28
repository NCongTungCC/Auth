import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Vui lòng nhập tài khoản"],
        minlength : [6, "Tài khoản ít nhất có 6 ký tự"],
        unique : true,
    },
    password : {
        type : String,
        required : [true, "Vui lòng nhập mật khẩu"],
        minlength : [6, "Mật khẩu ít nhất có 6 ký tự"]
    },
    role : {
        type : String,
        enum : ["admin", "user"],
        default : "user",
    },
    photo : {
        type : String,
    },
    email : {
        type : String,
        required : [true, "Vui lòng nhập email"],
        unique : true,
    },
    gender : {
        type : String,
        required : [true, "Vui lòng nhập giới tính"],
        enum : ["Nam", "Nữ"],
    },
    birthday : {
        type : Date,
        required : [true, "Vui lòng nhập ngày sinh"],
    },
    otp : {
        type : String,
        default : null,
    },
    otpexpiresAt : {
        type : Date,
        default : null,
    }
}, {
    timestamps : true,
})

export default mongoose.model("UserModel", UserSchema, "users");