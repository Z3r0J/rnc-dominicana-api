import { Router } from "express";
import { checkRNC } from "./CheckRNC.js";
import { cleanData } from "./helper.js";
import cors from 'cors';

const AppRouter = Router();

AppRouter.get('/', cors(), (req, res, next) => { return res.status(403).json({ error: "You cannot belong here" }) });

AppRouter.get('/api/checkRNC/:rnc', async (req, res, next) => {
    const rnc = req.params.rnc;

    await checkRNC(rnc).then((response) => {
        const splitInformation = response.split('\n');

        return res.status(200).json({
            rnc: cleanData(splitInformation[0]).split('-').join(""),
            socialName: cleanData(splitInformation[1]),
            comercialName: cleanData(splitInformation[2]),
            status: cleanData(splitInformation[5])
        })
    }).catch(() => {

        return res.status(404).json({ error: 'This RNC doesnt exist' });
    });
    /* 
        if (response) {
    
            return res.status(200).json({
                rnc: splitInformation[1].split('-').join(""),
                socialName: splitInformation[3],
                comercialName: splitInformation[5],
                status: splitInformation[10]
            })
        } */

});

export default AppRouter;