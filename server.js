import app from './src/app.js';
import * as dotenv from 'dotenv';
import { connection } from './src/configs/config.js';

const port = process.env.PORT;

const startServer = async () => {
    await connection();
    
    app.listen(port, () => {
        console.log(`Server đã khởi chạy tại port ${port}`)
    });
}

startServer();