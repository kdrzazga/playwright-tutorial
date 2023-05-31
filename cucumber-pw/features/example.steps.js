const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { test, expect } = require('@playwright/test');
const playwright = require('playwright');

let result;

When('I add {int} and {int}', async function(a, b){
	result = a + b;
});

Then('I get {int}', async function(expectedResult){
	assert.strictEqual(result, expectedResult);
});

siteNameUrlJson = {
	parabank : 'https://parabank.parasoft.com/parabank/index.htm'
};

async function openUrl(url){
	const browser = await playwright.chromium.launch({
		headless: true,
	});
	
	const context = await browser.newContext({ignoreHTTPSErrors: true});
	this.page = await context.newPage();
	await this.page.goto(url);
}

Given('User navigates to {string} website', async function(siteName){
	await openUrl(siteNameUrlJson[siteName]);
});
