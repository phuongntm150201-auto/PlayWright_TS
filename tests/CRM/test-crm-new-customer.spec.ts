import { test, expect , Page } from '@playwright/test';
import { CRMLoginPage } from './POM/CRMLoginPage';
import { CRMDashboardPage } from './POM/CRMDashboardPage';
import { CRMCustomerPage } from './POM/CRMCustomerPage';
import { CRMNewCustomerPage } from './POM/CRMNewCustomerPage';
import { createMinimalCustomerInfo } from './Utils/test-data';


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

    newCustomerPage: new CRMNewCustomerPage (page),

  };

}

test ('TC_01 - Tạo Customer (Chỉ nhập trường bắt buộc)', async ({ page }) => {

  const { dashboardPage, customersPage, newCustomerPage } = createCRMPages(page);

  await test.step('Verify dashboard da load sau khi login', async () => {

    await dashboardPage.expectOnPage();

  });

  await test.step('Navigate tu dashboardPage -> customer page', async () => {

    await dashboardPage.navigateMenu('Customers');

    await customersPage.expectOnPage();

  });

  await test.step('Navigate tu customerPage -> new Customer Page', async () => {

    await customersPage.clickAddNewCustomer ();

    await newCustomerPage.expectOnPage ();

  });

  const customerInfo = createMinimalCustomerInfo ();
  await test.step ('Fill required company field', async ()=>{
    await newCustomerPage.fillCompany (customerInfo.company);
    await newCustomerPage.clickSaveButton ();
  })

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



