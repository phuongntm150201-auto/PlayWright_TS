import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  const loginPage = new CRMLoginPage(page);

  await loginPage.goto();

  await loginPage.login('admin@example.com', '123456');

  await loginPage.expectLoggedIn();

});

function createCRMPages(page: Page) {

  return {

    dashboardPage: new CRMDashboardPage(page),

    customersPage: new CRMCustomerPage(page),

  };

}

test('TC_01 - Lấy toàn bộ dữ liệu 1 cột sử dụng column Map', async ({ page }) => {

  const { dashboardPage, customersPage } = createCRMPages(page);

  await test.step('Verify dashboard da load sau khi login', async () => {

    await dashboardPage.expectOnPage();

  });

  await test.step('Navigate tu dashboardPage -> customer page', async () => {

    await dashboardPage.navigateMenu('Customers');

    await customersPage.expectOnPage();

  });

  await test.step('Get all company names using column map', async () => {

    const companies = await customersPage.getColumnValues('company');

    console.log(companies);

  });

});


//hàm xây dựng có object chứa dữ liệu của 1 row
//mục đích:
//lấy text từ nhiều cells trong row
// trả về object với key = coloumnKey, value = text từ cell
//logic
//1. loop qua từng column key (từng cột)
//2. tìm vị trí cột (index) từ column map
//3. lấy cell ở vị trí trong đó row
//4. lấy text từ cell
//5. lưu vào rowData object



