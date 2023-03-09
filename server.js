import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import AppRouter from './AppRouter.js';

const app = express();

const PORT = process.env.PORT || 5147;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(AppRouter);

app.listen(PORT);

console.log(`Server Listen on localhost:${PORT}`);

