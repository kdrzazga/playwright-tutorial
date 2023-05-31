// @ts-check
const { test, expect } = require('@playwright/test');
global.mainUrl = 'http://demo.seleniumeasy.com/';
global.checkboxesUrl = mainUrl + 'basic-checkbox-demo.html';
global.simpleFormUrl = mainUrl + 'basic-first-form-demo.html';
global.inputFormUrl = mainUrl + 'input-form-demo.html';

test('has title', async ({ page }) => {
  console.log(`Navigating to ${global.mainUrl}`);
  await page.goto(global.mainUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Selenium Easy/);
});
