import { test, expect } from '@playwright/test';
import {performance} from 'node:perf_hooks'

// test scenario ( mình nhóm các testcase cùng mục đích vào 1 nhóm)
// test suite để nhóm các test () cso liên quan lại với nhau
// test ('vao trang playwright.dev', async ({page}) =>{
//     await page.goto ('https://playwright.dev');
//     await expect (page. getByRole ('link', {name:'Docs'})).toBeVisible ();

// })

// test. describe ('Trang chu playwright.dev', () =>{
//     test.skip('TC01.Check menu hien thi DOCS', async ({page}) =>{
//     await page.goto ('https://playwright.dev');
//     await expect (page. getByRole ('link', {name:'Docs'})).toBeVisible ();
//     });

//     test ('TC02.Check URL cua trang hien thi', async ({page}) =>{
//     await page.goto ('https://playwright.dev');
//     await expect (page).toHaveTitle ('Fast and reliable end-to-end testing for modern web apps| Playwright');
//     });

// })

// test.describe('Trang nhan su anh tester', () => {
//     test('TC01.Kich ban dang nhap va kiem tra widget', async ({ page }) => {
//         await test.step('Buoc 1: Dieu huong va dang nhap', async () => {
//             await page.goto('https://hrm.anhtester.com/erp/login');
//             await page.getByRole('textbox', { name: 'Your Username' }).click();
//             await page.getByRole('textbox', { name: 'Your Username' }).fill('admin_example');
//             await page.getByRole('textbox', { name: 'Enter Password' }).click();
//             await page.getByRole('textbox', { name: 'Enter Password' }).fill('123456');
//             await page.getByRole('button', { name: ' Login' }).click();
//         })
//         await test.step ('Buoc 2: Kiem tra dang nhap thanh cong', async ()=>{
//             await expect (page.getByRole ('navigation')).toContainText ('Your Apps');
//             // // await page.pause ()
//             // const url = page.url ()
//             // console.log (url);
//             //inverval 5s tu dong check va kiem tra lai url xem co dung = url minh mong muon hay khong
//             // await page. waitForTimeout (5000)
//             // //thread.sleep ()
//             expect (page.url ()).toBe ('https://hrm.anhtester.com/erp/desk');
//         })

//     });

// })


//   waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined;

// load: (default): chờ cho toàn bộ HTML, CSS và các tài nguyên khác tải xong
// domcontentloaded: chỉ chờ cho đến khi tài liệu HTML ban được tải và không cần chờ CSS hay hình ảnh
//vàng trang web A => nó yêu cầu tải 10 api để có thể hiển thị được danh sách, nội dung web
//list danh sách các sản phẩm
//nếu là server side => BE tự động render => trả cho client 1 html chưa đầy đủ thông tin sp
// nếu là client side=> nó yêu cầu mình -> call api get danh sách sp
// networkidle... chờ cho đến khi không có hoạt động nào diễm ra trong vòng 500ms phù hợp với site client side rendering...
//commit: chỉ chờ cho đến khi nhận được phản hồi từ server và trình duyệt ấn đầu render trang
// trigger ( client nhận biết được khi nào bắt đầu tải trang)
//
//trang web nội bộ nó 1 cái nút là tải trang => khi ấn nút vào tải trang => call API -> server sẽ xử lý và phản hồi -> nhận được commit thì bắt đầu trang web mới được render và coi như hoàn thành


// const TARGET_URL = 'https://playwright.dev'

// test('TC01.Demo domcontentloaded', async ({page}) =>{
//     console.log ('DEMO WAIT UNTIL - domcontentloaded');

//     const startTime = performance.now ()

//     await page.goto ('https://playwright.dev/', {waitUntil: 'domcontentloaded'});

//     const endTime = performance.now ()

//     console.log (`Thoi gian hoan tat, ${endTime - startTime}`);

//     const rootElement = page.locator ('#_docusaurus')

//     await expect (rootElement).toBeAttached();
//     });

// // search (Ctrl+ K)    
// test('TC02.Demo load', async ({page}) =>{
//     console.log ('DEMO WAIT UNTIL - networkidle');

//     const startTime = performance.now ()

//     await page.goto ('https://playwright.dev/');

//     const endTime = performance.now ()

//     console.log (`Thoi gian hoan tat, ${endTime - startTime}`);

//     const searchButton = page.getByRole ('button', { name: 'Search (Cmd +K)'})

//     await expect (searchButton).toBeEnabled()

//     });


// test('TC03.Demo networkidle', async ({page}) =>{
//     console.log ('DEMO WAIT UNTIL - load');

//     const startTime = performance.now ()

//     await page.goto ('https://playwright.dev/', {waitUntil: 'networkidle'});

//     const endTime = performance.now ()

//     console.log (`Thoi gian hoan tat, ${endTime - startTime}`);

//     // tại thời điểm này trang đã tính và hoàn toàn sẵn sàng

//     const searchButton = page.getByRole ('button', { name: 'Search (Cmd +K)'})

//     await expect (searchButton).toBeEnabled()
//     });


test('test', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole ('link', {name: 'Bài 1 : Auto-Wait Demo'}).click ()

  //default playwright la tan 30s

//   const button = page.getByRole('button', { name: 'Click Me!' })
//   await button.click ({timeout: 500})
  
  // await page.getByRole('button', { name: 'Click Me!' }).click();
  //cost wait locator status.getText () => Button Clicked Successfully!
  await expect (page.locator ('#status')).toContainText ('Button Clicked Successfully!');
});