import { create } from "phantom";
const url =
    "https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/rnc.aspx#razonsocial";

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function checkRNC(rnc) {
    if (!rnc) return;

    const instance = await create();
    const page = await instance.createPage();

    await page.open(url);
    await page.evaluate(function (rnc) {
        document.getElementById("cphMain_txtRNCCedula")?.setAttribute("value", rnc);
        document.getElementById("cphMain_btnBuscarPorRNC")?.click();
    }, rnc);

    timeout(1500);

    const result = await page.evaluate(function () {
        const informacion = document
            .getElementsByTagName("tbody")
            ?.item(0)?.innerText;
        return informacion;
    });

    instance.exit();

    return result;
}