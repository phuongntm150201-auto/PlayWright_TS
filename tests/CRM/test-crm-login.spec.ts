import { test } from '@playwright/test'
import { expect} from '@playwright/test'
import { CRMLoginPage } from './POM/CRMLoginPage';
import { CRMDashboardPage } from './POM/CRMDashboardPage';

//fixture
//AAA
// file test giống như 1 nhạc trưởng

test ('CRM Login page- login thanh cong', async ({page}) =>{
    //arrange: khởi tạo điều kiện cần thiêts
    const loginPage = new CRMLoginPage (page);
    const dashboardPage = new CRMDashboardPage (page)

    await loginPage.goto ();
    await loginPage.expectOnPage ();
    //actions: thực hiện âctions
    await loginPage.login ('admin@example.com','123456')

    //assert 
    //await expect (page).toHaveURL (/admin/);
    await dashboardPage.expectOnPage ();
});

// import { test, expect } from '@playwright/test';
// import { CRMLoginPage } from '../POM/CRMLoginPage';

// test.beforeEach(async ({ page }) => {
//   const loginPage = new CRMLoginPage(page);
//   await loginPage.goto();
//   await loginPage.login("admin@example.com", "123456");
// });

// test('CRM Customer - something...', async ({ page }) => {
//   // your test here
// });
