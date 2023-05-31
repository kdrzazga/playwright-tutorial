const { test, expect } = require('@playwright/test');
const {chromium} = require('playwright');

global.mainUrl = 'https://the-internet.herokuapp.com/';
global.abUrl = mainUrl + 'abtest';

test('page title', async ({ page }) => {
  await page.goto(mainUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Internet/);
});

test('page content', async ({ page }) => {
  await page.goto(mainUrl);
  
  await expect(page.locator('h1')).toHaveText('Welcome to the-internet');
  await expect(page.locator('h2')).toHaveText('Available Examples');
  
  const listItems = await page.$$('ul li');

  const texts = await Promise.all(listItems.map(async (item) => {
    return item.textContent();
  }));

  ['A/B Testing', 'Add/Remove Elements', 'Broken Images', 'Challenging DOM', 'Checkboxes', 'Context Menu']
    .forEach(element => {
      expect(texts).toContain(element);
	  console.log(`Presence of <${element}> verified.`);
    });
	
  await page.screenshot( {path: '1_page_content.png' });
});

test('A/B Testing', async ({ page }) => {
	console.log(`Navigating to ${abUrl}`);
	await page.goto('https://the-internet.herokuapp.com/abtest'); //abUrl);
		
	await expect(page.locator('h3')).toHaveText(/A\/B Test /);
	
	const textPortions = ['Also known as split testing.', 'This is a way in which businesses are able to simultaneously test and', ' learn different versions of a page to see which', 'text and/or functionality works best towards a desired outcome', '(e.g. a user action such as a click-through).'];
		
	await textPortions.forEach(portion => {
		const text = '/'+ portion + '/';
		console.log(`Checking if page contains ${portion}`);
		
		expect(page.locator('.example p')).toHaveText(new RegExp(portion));
	});
  await page.screenshot( {path: '2_ab_testing.png' });
});
