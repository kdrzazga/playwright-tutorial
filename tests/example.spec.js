// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://demo.seleniumeasy.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Selenium Easy/);
});

test('checkboxes', async ({ page }) => {
  await page.goto('http://demo.seleniumeasy.com/basic-checkbox-demo.html');

  const checkAllButton = await page.$('#check1');
  await checkAllButton.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*checkbox/);
  const checkboxes = await page.$$('.checkbox');
});
