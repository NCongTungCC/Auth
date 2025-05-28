import express from 'express';
import errorHandlerMiddleware from './middlewares/errors.middlewares.js';
import router from './routers/index.js';

const app = express();

app.use(express.json());

app.use('', router);

app.use(errorHandlerMiddleware);

export default app;