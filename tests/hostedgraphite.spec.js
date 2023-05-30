const { test, expect } = require('@playwright/test');
const { assert } = require('assert');
test.beforeEach(async ({ page }) => {
  await page.goto('https://elements.heroku.com/addons/hostedgraphite');
});


test.describe('sections-test', () => {
  test('verify several sections', async ({ page }) => {
	const h4Element = page.locator('h4').first();
    await expect(h4Element).toHaveText('Hosted Graphite');
	
	//const reliableHeader = page.locator('#details > .brick > .text-dark').first();
	const reliableHeader = page.locator('#details');
	console.log('Header is:', (await reliableHeader.innerText()).slice(0, 90));

	console.log('- - - - - - - -');
	const sendMetricsSection = await page.locator("text=Send Your Metrics- Fast");
	console.log('Text inside Send Your Metrics:', await sendMetricsSection.innerText());
	
	const ourAddonSection = await page.locator(':text("Our Addon") + p');
	const sectionText = await ourAddonSection.innerText();
	console.log('AddOn section:', sectionText);
	
	const expectedStart = 'Automated dashboards directly';
	assert.strictEqual(sectionText.startsWith(expectedStart), true, `The string does not start with '${expectedStart}'.`);
})



});
