import puppeteer from "puppeteer";
import faker from "faker";

const APP = "http://localhost:3000/login";

const lead_fail = {
  username: faker.name.findName(),
  password: faker.internet.password()
};

describe('on login page', () => {
  test('with login invalid', async() => {
    let browser = await puppeteer.launch({args: ['--no-sandbox']});
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
    expect(html).toMatch('Login');
    await page.goto(APP);
    await page.click("input[id=username]");
    await page.type("input[id=username]", lead_fail.username);
    await page.click("input[id=password]");
    await page.type("input[id=password]", lead_fail.password);
    await page.click("button[type=submit]");
    page.waitForSelector('span');
    browser.close();
  }, 160000);

});
