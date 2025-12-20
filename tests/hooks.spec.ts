import { test, expect, Page ,chromium} from '@playwright/test';

//rất hay dùng của các bạn hay xài selenium

//Khai báo biến toàn cục

// let page: Page;

// test.beforeAll(async () => {

//   console.log(`[Before] Khởi động DB...`);

// });

// test.beforeEach(async ({ browser }) => {

//   console.log(`[Before each] mở trang mới`);

//   const context = await browser.newContext();

//   page = await context.newPage();

//   await page.goto(process.env.BASE_URL!);

// });

// test('TC01. Login', async () => {

//   console.log(`[TC01] Dang chay`);

//   await expect(page).toHaveTitle('Please login');

// });

// test('TC02. Check footer', async () => {

//   console.log(`[TC02] Dang chay`);

//   await expect(page.locator('h1')).toBeVisible();

// });

// test.afterEach(async () => {

//   console.log(`[after each] don dep`);

//   await page.close();

// });

// test.afterAll(async () => {

//   console.log(`[after all] ngat ket noi db`);

// });

//VD về nhược điểm

test.describe.configure ({ mode: 'serial'});

let sharedPage :Page ;

test.beforeAll (async () =>{
    const browser = await chromium.launch ()

    //tao context
    const context = await browser. newContext ();
    sharedPage = await context.newPage ();
})

test.beforeEach (async () => {
    //thay vì tạo mới ta dùng lại biến shared page

    await sharedPage.goto ('http://example.com')
});

test ('Test1: User bật chế độ darkmode', async () =>{
    await sharedPage.evaluate ( () =>{
        localStorage.setItem ('theme', 'dark');
    });
    const theme = await sharedPage.evaluate ( () => localStorage.getItem ('theme'));
    expect (theme).toBe ('dark')
})

test ('Test2: User moi vao mong doi che do sang', async () =>{
    const theme = await sharedPage.evaluate ( () => localStorage.getItem ('theme'));
    expect (theme).toBeNull ()
})


