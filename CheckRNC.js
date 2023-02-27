/* import { create } from "phantom";
const url =
    "https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/rnc.aspx#razonsocial";

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function checkRNC(rnc) {
    try {
        if (!rnc) return;

        const instance = await create();
        const page = await instance.createPage();

        await page.open(url);
        await page.evaluate(function (rnc) {
            document.getElementById("cphMain_txtRNCCedula").setAttribute("value", rnc);
            document.getElementById("cphMain_btnBuscarPorRNC").click();
        }, rnc);

        timeout(1500);

        const result = await page.evaluate(function () {
            const informacion = document.getElementsByTagName("tbody").item(0).innerText;
            return informacion;
        });

        instance.exit();

        return result;
    } catch (error) {
        return error;
    }
} */

import puppeteer from "puppeteer"

export const checkRNC = async (rnc) => {

    const url = "https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/rnc.aspx";

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            ignoreDefaultArgs: ['--disable-extensions']
        });
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36");

        await page.goto(url);

        await page.evaluate(function (rnc) {
            document.getElementById("cphMain_txtRNCCedula").setAttribute("value", rnc);
            document.getElementById("cphMain_btnBuscarPorRNC").click();
        }, rnc);

        const res = await page.waitForSelector('tbody', { timeout: 3000 }).then(async (e) => await e.getProperty("innerText"));

        await browser.close();

        return res.jsonValue();

    } catch (error) {
        console.log(error);
    }

}