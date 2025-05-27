import express from 'express';
import errorHandlerMiddleware from './middlewares/errors.middlewares.js';
const app = express();

app.use(express.json());

app.use('', (req, res) => {
    res.status(404).json("404 Not Found");
})

app.use(errorHandlerMiddleware);

export default app;