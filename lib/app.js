import express from 'express';
import cors from 'cors';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import sauceController from './controllers/sauces.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(sauceController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
