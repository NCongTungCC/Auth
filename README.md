# Auth - Hệ thống xác thực người dùng

## Giới thiệu
Dự án này là hệ thống xác thực người dùng đơn giản với Node.js, JWT và MongoDB. Hỗ trợ các tính năng đăng ký, đăng nhập, quên mật khẩu qua OTP, và phân quyền người dùng.

## Công nghệ sử dụng
- Node.js, Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Bcrypt.js (mã hóa mật khẩu)
- Nodemailer (gửi email)

## Cài đặt và chạy
1. Clone repo:
```bash
git clone https://github.com/NCongTungCC/Auth.git
```

2. Cài đặt các package:
```bash
npm install
```
3. Tạo file .env trong thư mục gốc với nội dung:
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```
4. Chạy ứng dụng:

```bash
npm start

Ứng dụng sẽ chạy trên http://localhost:3000 (hoặc port bạn khai báo).

Lưu ý:

Không đẩy file .env lên GitHub để bảo mật thông tin.

MONGO_URI là chuỗi kết nối MongoDB của bạn.

JWT_SECRET_KEY là chuỗi bí mật để ký JWT token.

EMAIL_USER và EMAIL_PASS dùng để gửi email OTP hoặc reset password.
```