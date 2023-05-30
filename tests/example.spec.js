// @ts-check
const { test, expect } = require('@playwright/test');
global.mainUrl = 'http://demo.seleniumeasy.com/';
global.checkboxesUrl = mainUrl + 'basic-checkbox-demo.html';
global.simpleFormUrl = mainUrl + 'basic-first-form-demo.html';

test('has title', async ({ page }) => {
  console.log(`Navigating to ${global.mainUrl}`);
  await page.goto(global.mainUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Selenium Easy/);
});

test('checkboxes', async ({ page }) => {
  console.log(`Navigating to ${checkboxesUrl}`);
  await page.goto(checkboxesUrl);

  const checkAllButton = await page.$('#check1');
  await checkAllButton.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*checkbox/);
  
  const checkboxDivs = await page.$$('.checkbox');
  
  for (const chkboxDiv of checkboxDivs) {
	  const label = await chkboxDiv.$('label');//.$('input');
	  //const labelText = await label.isVisible(); //no such method
	  const divText = await chkboxDiv.textContent();
	  const message = 'Text from div: ' + divText.trim();
	  const checkbox = await chkboxDiv.$('input');
	  //const isChecked = await chkbox.isChecked(); //no such method
	  console.log(divText.trim());
  }
  
  await page.screenshot({ path: '1_checkboxes.png' });
});


test('simple form', async ({ page }) => {
  console.log(`Navigating to ${simpleFormUrl}`);
  await page.goto(simpleFormUrl);

  const a = 3;
  const b = 2;
  var expectedResult = a + b;

  const textboxA = await page.$('#value1');
  await textboxA.type(a.toString());
  
  const textboxB = await page.$('#value2');
  await textboxB.type(b.toString());
  
  const buttons = await page.$$('[class=\'btn btn-primary\']');
  const sumButton = buttons[1];
  await sumButton.click();

  const result = await page.$('#displayvalue');
  const resultString = await result.textContent();
  
  await page.screenshot({ path: '2_forms.png' });
  
  console.log(`result string: ${resultString} Expected: ${expectedResult}`);  
  await expect(resultString.startsWith(expectedResult.toString())).toBe(true);
  
});