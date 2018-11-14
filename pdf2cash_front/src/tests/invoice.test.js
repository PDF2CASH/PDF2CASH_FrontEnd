import puppeteer from "puppeteer";

const APP = "http://localhost:3000/invoice";

describe('invoices pages tests', () => {

    test('test invoices list', async () => {
        let browser = await puppeteer.launch({
            args: ['--no-sandbox']
        });
        let page = await browser.newPage();

        page.emulate({
            viewport: {
                width: 500,
                height: 2400,
            },
            userAgent: ''
        });

        await page.goto(APP);
        let html = await page.evaluate(() => document.body.innerHTML);
        expect(html).toMatch('Listar Notas Fiscais');
        expect(html).toMatch('00000000000000000000000000000000000000000000');
        browser.close();
    }, 160000);

    test('test delete with select no option', async () => {
        let browser = await puppeteer.launch({
            args: ['--no-sandbox']
        });
        let page = await browser.newPage();

        page.emulate({
            viewport: {
                width: 500,
                height: 2400,
            },
            userAgent: ''
        });

        await page.goto(APP);
        let html = await page.evaluate(() => document.body.innerHTML);
        expect(html).toMatch('Listar Notas Fiscais');
        expect(html).toMatch('00000000000000000000000000000000000000000000');
        await page.click("button[id='00000000000000000000000000000000000000000000']");
        await page.click("button[id='NAO']");
        html = await page.evaluate(() => document.body.innerHTML);
        expect(html).toMatch('Listar Notas Fiscais');
        expect(html).toMatch('00000000000000000000000000000000000000000000');

        browser.close();
    }, 160000);

    test('test delete with select yes option', async () => {
        let browser = await puppeteer.launch({
            args: ['--no-sandbox']
        });
        let page = await browser.newPage();

        page.emulate({
            viewport: {
                width: 500,
                height: 2400,
            },
            userAgent: ''
        });

        await page.goto(APP);
        let html = await page.evaluate(() => document.body.innerHTML);
        expect(html).toMatch('Listar Notas Fiscais');
        expect(html).toMatch('00000000000000000000000000000000000000000000');
        await page.click("button[id='00000000000000000000000000000000000000000000']");
        await page.click("button[id='SIM']");
        await page.goto(APP);
        html = await page.evaluate(() => document.body.innerHTML);
        expect(html).toMatch('Listar Notas Fiscais');
        expect(html).not.toMatch('00000000000000000000000000000000000000000000');

        browser.close();
    }, 160000);

});