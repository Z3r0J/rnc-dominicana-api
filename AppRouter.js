import { Router } from "express";

const AppRouter = Router();

AppRouter.get('/', (req, res, next) => { return res.status(200).json({ error: "Hello" }) });

export default AppRouter;