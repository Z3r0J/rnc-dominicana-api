import { Router } from "express";
import { checkRNC } from "./CheckRNC.js";

const AppRouter = Router();

AppRouter.get('/', (req, res, next) => { return res.status(403).json({ error: "You cannot belong here" }) });

AppRouter.get('/api/checkRNC/:rnc', async (req, res, next) => {
    const rnc = req.params.rnc;

    const response = await checkRNC(rnc);

    if (response) {
        const splitInformation = response.split('\n');

        return res.status(200).json({
            rnc: splitInformation[1].split('-').join(""),
            socialName: splitInformation[3],
            comercialName: splitInformation[5],
            status: splitInformation[10]
        })
    }

    return res.status(404).json({ error: 'This RNC doesnt exist' });
});

export default AppRouter;