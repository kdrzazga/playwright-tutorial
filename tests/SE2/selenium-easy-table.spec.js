//npx playwright test --ui
// @ts-check
const { test, expect } = require('@playwright/test');
global.mainUrl = 'http://demo.seleniumeasy.com/';
global.checkboxesUrl = mainUrl + 'basic-checkbox-demo.html';
global.simpleFormUrl = mainUrl + 'basic-first-form-demo.html';
global.inputFormUrl = mainUrl + 'input-form-demo.html';
global.popupsUrl = mainUrl + 'window-popup-modal-demo.html';

/*

async function enterA(page, a){
	page.locator('#value1').type(a.toString());
}

async function enterB(page, b){
	page.locator('#value2').type(b.toString());
}

async function readResult(page){
	return page.$('#displayvalue').textContent();
}
*/


	let paginationPage;
	
	async function beforeEach(() => {
		paginationPage = new TablePaginationPage();
		paginationPage.navigate();
	});
	
	test('test table pagination', async ( {page} ) => {
		
	});



/*
test('simple form', async ({ page }) => {
  console.log(`Navigating to ${simpleFormUrl}`);
  await page.goto(simpleFormUrl);

  const a = 3;
  const b = 2;
  var expectedResult = a + b;
 
  await enterA(page, a);
  await enterB(page, b);
    
  const buttons = await page.$$('[class=\'btn btn-primary\']');
  const sumButton = buttons[1];
  await sumButton.click();

  const result = await page.$('#displayvalue');
  const resultString = await result.textContent();//await readResult(page);
  
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
*/