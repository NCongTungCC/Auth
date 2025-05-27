import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
const mongoseUrl = process.env.URL_MONGOSE;

export const connection = async () => {
    try {
        await mongoose.connect(mongoseUrl);
        console.log("Kết nối thành công đến MongoDB");
    } catch (error) {
        console.error("Lỗi kết nối đến MongoDB", error);
    }
}
