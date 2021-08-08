import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import sauceController from './controllers/sauces';

const app = express();

app.use(express.json());
app.use(sauceController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
