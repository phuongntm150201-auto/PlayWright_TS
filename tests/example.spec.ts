import { test, expect } from '@playwright/test';
import playwrightConfig from '../playwright.config';
// fixtures

// vòng đời của pages...
// 
// không cần phải tạo page => playwright sẽ tạo ra page cho mình
//1. Khởi tạo : đầu tiên PW sẽ sẽ tạo browserContext ( giống như 1 profile riêng sạch sẽ) => sau đó dẽ mở 1 page () 1 tab mới hoàn toàn trống trong context đó
//2. Sử dụng : page=> sẽ được truyền vào qua cơ chế destructering =>toàn bộ test case sẽ diễn ra { }
//3. Sau khi chạy xong => page và browercontext tương ứng sẽ bị huỷ bỏ
//TDD
//framework => sử dụng bộ khung để có thể sử dụng được

test('has title', async ({ page, context }) => {
  // tab 1 : Trang playwright
  const playwrightPage = page

  await playwrightPage.goto('https://playwright.dev/');
  await playwrightPage.getByRole('button', { name: 'Search (Command+K)' }).click();
  await playwrightPage.getByRole('searchbox', { name: 'Search' }).click();
  await playwrightPage.getByRole('searchbox', { name: 'Search' }).fill('Locators');
  console.log ('tab 1 da go locator vao o tim kiem')

  // tab 2: Trang anh tester hrm
  console.log ('Dang mo ab 2')
  const hrmPage = await context.newPage ()
  await hrmPage.goto('https://hrm.anhtester.com/');
  await hrmPage.getByRole('textbox', { name: 'Your Username' }).click();
  await hrmPage.getByRole('textbox', { name: 'Your Username' }).fill('admin_example');
  await hrmPage.getByRole('textbox', { name: 'Enter Password' }).click();
  await hrmPage.getByRole('textbox', { name: 'Enter Password' }).fill('12345678');
  console.log ('Tab 2 da dien thong tin dang nhap');

  console.log ('Back ve tab 1');

  await playwrightPage.getByRole('searchbox', { name: 'Search' }).press('Enter')
  console.log ('Tab 1 dang cho ket qua xuat hien')

  await page.pause ()

  await playwrightPage.screenshot ( {path :'screenshots/tab1-playwright.png'})
  await hrmPage.screenshot ({path: 'screenshots/tab2-hrm.png'})

});
// pause là 1 trick để mình debug
//


// echo "# PlayWright_TS" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/phuongntm150201-auto/PlayWright_TS.git
// git push -u origin main

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

//2 testcase => 2x3 =6 testcase tất cả 