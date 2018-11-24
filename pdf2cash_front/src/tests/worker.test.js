
import puppeteer from "puppeteer";
import faker from "faker";

const APP = "http://localhost:3000/worker";
const ADM = "http://localhost:3000/admin";
const LOG = "http://localhost:3000/login";
const EDIT = "http://localhost:3000/worker/edit?id=1";


describe('invoices pages tests', () => {

    test('with admin valid', async () => {
      const browser = await puppeteer.launch({ args: [ '--no-sandbox' ] });
      const page = await browser.newPage();

      page.emulate({
        viewport: {
          width: 500,
          height: 2400,
        },
        userAgent: '',
      });

      await page.goto(ADM);
      let html = await page.evaluate(() => document.body.innerHTML);
      expect(html).toMatch('Cadastrar');
      await page.goto(ADM);
      await page.click('input[name=name]');
      await page.type('input[name=name]', 'LeandroLeal');
      await page.click('input[name=email]');
      await page.type('input[name=email]', 'leandro@gmail.com');
      await page.click('input[name=cpf]');
      await page.type('input[name=cpf]', '05587734145');
      await page.click('input[name=password]');
      await page.type('input[name=password]', '12345678');
      await page.click('button[type=submit]');
      await page.goto(LOG);
      await page.click('input[id=username]');
      await page.type('input[id=username]', 'LeandroLeal');
      await page.click('input[id=password]');
      await page.type('input[id=password]', '12345678');
      await page.click('button[type=submit]');
      const APP = "http://localhost:3000/worker";
      html = await page.evaluate(() => document.body.innerHTML);
      expect(html).toMatch('Listar Funcionarios');
      expect(html).toMatch('LeandroLeal');
      await page.goto(EDIT);
      html = await page.evaluate(() => document.body.innerHTML);
      await page.click("input[name=username]");
      await page.type("input[name=username]", 'a');
      await page.click("input[name=cpf]");
      await page.type("input[name=cpf]", '1');
      await page.click("input[name=email]");
      await page.type("input[name=email]", 'a');
      await page.click("input[name=password]");
      await page.type("input[name=password]", '1');
      await page.click("button[type=submit]");
      html = await page.evaluate(() => document.body.innerHTML);
      await expect(html).toMatch('Digite um nome válido');
      await expect(html).toMatch('Digite um nome válido');
      await expect(html).toMatch('Digite um CPF válido');
      await expect(html).toMatch('Este e-mail não é válido');
      await expect(html).toMatch('Minimo de 6 dígitos');
      html = await page.evaluate(() => document.body.innerHTML);
      await page.click("input[name=username]");
      await page.type("input[name=username]", 'RenatoAlgusto');
      await page.click("input[name=cpf]");
      await page.type("input[name=cpf]", '05287434146');
      await page.click("input[name=email]");
      await page.type("input[name=email]", 'renato@gmail.com');
      await page.click("input[name=password]");
      await page.type("input[name=password]", '12345678');
      await page.click("button[type=submit]");
      html = await page.evaluate(() => document.body.innerHTML);
      await expect(html).toMatch('Listar Funcionarios');
      expect(html).toMatch('RenatoAlgusto');
      browser.close();
    }, 160000);
        });
