const puppeteer = require('puppeteer')

export const isDebugging = () => {
  let debugging_mode = {
    puppeteer: {
      headless: false,
      slowMo: 80,
      args: [`--window-size=1920,1080`]
    },
    jasmine: 16000
  };
  return process.env.NODE_ENV === "debug" ? debugging_mode : false;
};

describe('on home page', () => {
  test('title loads correctly', async() => {
    let browser = await puppeteer.launch({args: ['--no-sandbox']});
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400,
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000/worker/create');
    let html = await page.evaluate(() => document.body.innerHTML);
    expect(html).toMatch('CADASTRAR FUNCIONÁRIO');
    browser.close();
  }, 16000);
});
