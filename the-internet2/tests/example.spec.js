const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false }); // Launch the browser in non-headless mode
  const context = await browser.newContext();
  const page = await context.newPage();

  // Your test code here

  await browser.close();
})();
