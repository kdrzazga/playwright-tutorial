const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

test('page content', async () => {
  const browser = await chromium.launch({ headless: false }); // Launch the browser in non-headless mode
  const context = await browser.newContext();
  const page = await context.newPage();

  // Your test code here
  throw new Error('Not implemented yet.');

  await browser.close();
});
