import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import AppRouter from './AppRouter.js';

const app = express();

const PORT = process.env.PORT || 5147;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter);
app.use(cors({ origin: ["http://localhost:5173"], methods: "GET,HEAD,PUT,PATCH,POST,DELETE", allowedHeaders: ['origin',] }));

app.listen(PORT);

console.log(`Server Listen on localhost:${PORT}`);

