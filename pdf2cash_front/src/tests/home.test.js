const puppeteer = require('puppeteer')

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true,
  }
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {}
}

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

    await page.goto('http://localhost:3000/');
    let html = await page.evaluate(() => document.body.innerHTML);
    expect(html).toMatch('PDF2CA$H');
    browser.close();
  }, 16000);
});
