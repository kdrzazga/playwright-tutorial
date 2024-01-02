const { test, expect } = require('@playwright/test');
global.mainUrl = 'http://demo.seleniumeasy.com/';
global.paginationPageUrl = mainUrl + 'table-pagination-demo.html';

class TablePaginationPage {
    navigate(){
		console.log(`Navigating to ${paginationPageUrl}`);
		await page.goto(paginationPageUrl);
	}
};

 module.exports = {
        pop: TablePaginationPage
    }
