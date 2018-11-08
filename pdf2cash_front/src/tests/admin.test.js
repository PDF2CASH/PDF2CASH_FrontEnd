import puppeteer from "puppeteer";
import faker from "faker";


const APP = "http://localhost:3000/admin";

const lead = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  cpf: "06973325513",
  password: faker.internet.password()
};

const lead_fail = {
  name: "A",
  email: "B",
  cpf: "069733",
  password: "123"
};

describe('on register admin page', () => {
  test('with admin valid', async() => {
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
    expect(html).toMatch('Cadastrar');
    await page.goto(APP);
    await page.click("input[name=name]");
    await page.type("input[name=name]", lead.name);
    await page.click("input[name=email]");
    await page.type("input[name=email]", lead.email);
    await page.click("input[name=cpf]");
    await page.type("input[name=cpf]", lead.cpf);
    await page.click("input[name=password]");
    await page.type("input[name=password]", lead.password);
    await page.click("button[type=submit]");
    html = await page.evaluate(() => document.body.innerHTML);
    await expect(html).toMatch('Listar Funcionarios');
    browser.close();
  }, 160000);

  

});
