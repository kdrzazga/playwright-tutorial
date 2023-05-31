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

test('input form demo', async ({ page }) => {
  console.log(`Navigating to ${global.inputFormUrl}`);
  await page.goto(global.inputFormUrl);
  
  const personJson ={ name : 'Jan',
	lastName : 'Kowalski',
	email : 'jan@kowalski.pl',
	phone : '532-138-1673',
	address : 'ul. Minska',
	city: 'Warsaw',
	state: 'Mass',
	zip : '99410',
	website : 'www.ala.ma.kota',
	hosting : 'true',
	description : 'L1two 0jczyzno moj@'	
  };
    
  await page.fill("[name='first_name']", personJson.name);
  await page.fill("[name='last_name']", personJson.lastName);
  await page.fill("[name='email']", personJson.email);
  await page.fill("[name='phone']", personJson.phone);
  await page.fill("[name='address']", personJson.address);
  await page.fill("[name='city']", personJson.city);
  
  const stateDropdown = await page.$("[name='state']");
  await stateDropdown.click();
  await stateDropdown.type(personJson.state);
  
  await page.fill("[name='zip']", personJson.zip);
  await page.fill("[name='website']", personJson.website);
  
  const hostingQuestion = await page.locator('text="Do you have hosting?"').first();
  const isHostingQuestionVisible = await hostingQuestion.isVisible();
  await expect(isHostingQuestionVisible).toBe(true);
  
  const yesRadio = await page.locator('text="Yes"').first();
  const noRadio = await page.locator('text="No"').first();

  if ('true' === personJson.hosting) {
    await yesRadio.click();
  } else {
    await noRadio.click();
  }

  await page.fill("[name='comment']", personJson.description);
  
  await page.locator('text="Send"').click();
  
  const errorMessageElements = await page.$$('text=/Please supply your /');
  expect(errorMessageElements).toHaveLength(7);

  await Promise.all(errorMessageElements.map(async (element) => {
	const elementVisible = await element.isVisible();
		expect(elementVisible).toBe(false);
	}));

  await page.screenshot( {path: '3_input_form.png'} );

});
