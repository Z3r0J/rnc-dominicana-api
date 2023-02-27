import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import AppRouter from './AppRouter.js';

const app = express();

const PORT = process.env.PORT || 5147;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(AppRouter);
app.use(cors());

app.listen(PORT);

console.log(`Server Listen on localhost:${PORT}`);

