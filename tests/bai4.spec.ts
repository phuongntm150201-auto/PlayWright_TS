/// ở trong PW có 3 cấp độ để kiểm soát timeOut
// 1. Cấp độ cao nhất Inline Timout (Mệnh lệnh của sếp)
// locator.click ({timeOut})

// 2. Cấp độ trung bình = actionTimeOut => Quy định phòng ban
// xét trong file playwright.config.ts

// 3. Cấp độ thấp nhất = toàn cục -> quy định của công ty

//mặc định sẽ là 30s cho timeout toàn cục và 30s cho action timeout

import { test, expect } from '@playwright/test';

import { start } from 'repl';

const DEMO_URL = 'https://demoapp-sable-gamma.vercel.app/';

//Cấp 1 : Mệnh lệnh của sếp
test('Cấp 1: Mệnh lệnh của sếp', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.locator ("//span[contains (text (), 'Bắt đầu Test')]").click ();

  const slowButton1 = page.locator ('#button-1');


  //lỗi timeout 5000ms
  await slowButton1.click ({timeout : 5000});

  //await page.pause(); // dừng lại để debug trong UI mode
});
//Cấp 2: Giới hạn phòng ban
test('Cấp 2: Giới hạn phòng ban', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.locator ("//span[contains (text (), 'Bắt đầu Test')]").click ();

  const slowButton2 = page.locator ('#button-2');


  //lỗi timeout 10000ms vì trong web để 12s
  await slowButton2.click ();

  //await page.pause(); // dừng lại để debug trong UI mode
});

//Cấp 3: Giới hạn công ty
test('Cấp 3: Giới hạn công ty', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.locator ("//span[contains (text (), 'Bắt đầu Test')]").click ();

  const startBtn = page.locator ('#start-btn');

  const continueBtn = page.locator ('#continue-btn');

  const expectedBtn = page.locator ('#final-btn')

  //action timout 10s mà tiến trình có 8s

  await startBtn.click ();

  //8s <10s thoả mãn
  await continueBtn. click ();

  //tổng phải chờ là 16s
  //báo lỗi timeout 15s
  await expectedBtn.click ();

  //await page.pause(); // dừng lại để debug trong UI mode
});
// test.setTimeout (30000)
//TC sẽ pass khi set lại timeout toàn cục
test('Set lại timeout', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.locator ("//span[contains (text (), 'Bắt đầu Test')]").click ();

  const startBtn = page.locator ('#start-btn');

  const continueBtn = page.locator ('#continue-btn');

  const expectedBtn = page.locator ('#final-btn')

  //action timout 10s mầ tiến trình có 8s

  await startBtn.click ();

  //8s <10s thoả mãn
  continueBtn. click ();

  //tổng phải chờ là 16s
  //báo lỗi timeout 15s
  await expectedBtn.click ();

  //await page.pause(); // dừng lại để debug trong UI mode
});




// Web - First Assertions 

// có 2 cấp độ
//Cấp độ 1: Cao nhất -> inline timeout => mệnh lệnh tối cao
//Cấp độ 2: toàn cục - quy định chung (default là 5s)

//Cấp 1 : webfirst assertion
test('Cấp 1: Webfirst assertion', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'Web-First Assertion' }).click();

  await page.getByText ('Bắt đầu chờ').click ();

  const statusMessage = page.locator ('#status-message');


  //lỗi timeout 5000ms
  await expect (statusMessage).toHaveText ('Tải dữ liệu thành công!',{timeout : 5000});

  //await page.pause(); // dừng lại để debug trong UI mode
});

test('Cấp 2: Webfirst assertion', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'Web-First Assertion' }).click();

  await page.getByText ('Bắt đầu chờ').click ();

  const statusMessage = page.locator ('#status-message');


  //lỗi timeout 5000ms
  await expect (statusMessage).toHaveText ('Tải dữ liệu thành công!');

  //await page.pause(); // dừng lại để debug trong UI mode
});

test('Webfirst assertion passed', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'Web-First Assertion' }).click();

  await page.getByText ('Bắt đầu chờ').click ();

  const statusMessage = page.locator ('#status-message');

  //lỗi timeout 5000ms
  await expect (statusMessage).toHaveText ('Tải dữ liệu thành công!',{timeout : 8000});
});



//toBeAttached
// kiểm tra phần tử có tồn tại trong DOM hay không, nó không quan tâm có hiển thị trên màn hình không

test('toBeAttached', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.locator ('#btn-attach').click ();

  //đợi 5s để phần tử có thể gắn vào DOM
  await expect (page.locator ('#attached-node')).toBeAttached ();

});


// toBeVisible
//Kiểm tra phần tử vừa tồn tại trong DOM vừa hiển thị trên màn hình
// (nó không có display: none.visibility: hidden, có kích thước, chiều rộng chiều cao >0, không bị che khuất bởi phần tử khác... )

test('toBeVisible', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  // ẩn dialog
  await page.locator ('#btn-hide').click ();
  await page.locator ('#btn-show').click ();

  //đợi 5s để phần tử có thể gắn vào DOM
  await expect (page.locator ('#visibility-target')).toBeVisible ();
  //await page.pause ();

});


//toBeHidden
// là phủ định của visible -> check không có Dom hoặc bị ẩn

test('toBeHidden', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  // ẩn dialog
  await page.locator ('#btn-hide-for-hidden').click ();

  await expect (page.locator ('#hidden-target')).toBeHidden ();
  //await page.pause ();

});


//toBeChecked
// kiểm tra phần tử có ở trạng thái click hay không

test('toBeChecked với getAttribute', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.pause ();

  // ẩn dialog
  //await page.locator ('#tab-option').click ();

  const trangThai = await page.locator ('#tab-option').getAttribute ('aria-selected')
  console.log (trangThai);

  await page.pause ();

  //await expect (page.locator ('#tab-option')).toBeChecked ();

});


//news-check
test('toBeChecked2', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.pause ();

  // ẩn dialog
  await page.locator ('#news-check').click ();

  await expect (page.locator ('#new-check')).toBeChecked ();

});


//toBeDisable
//Check phần tử bị vô hiệu hoá

test('toBeDisabled', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.pause ();

  // ẩn dialog
  await page.locator ('#toggle-disable').click ();

  await expect (page.locator ('#email')).toBeDisabled ();

});

//toBeEnabled
// phần tử bị vô hiệu hoá và có thể tương tác phủ định trong disable


test('toBeEnable', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();


  await expect (page.locator ('#enabled-input')).toBeEnabled ();

});

//toBeEditable
// kiểm tra phần tử có thể nhận được nội dung nhập liệu hay không, không bị disable và không có thuộc tính read only

test('toBeEditable', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();


  await expect (page.locator ('#editable')).toBeEditable ();

});

//toBeEmpty
// sẽ check phần tử không chứa bất kì phần tử con nào, học không có nội dung text ()

test('toBeEmpty', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.locator ('#btn-clear').click ()
  await expect (page.locator ('#empty-box')).toBeEmpty ();

});


//toHaveCount
// sẽ check có chứa chính xác bao nhiêu phần tử

test('toHaveCount', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();


  await expect (page.locator ('#items li')).toHaveCount (2);

});


//toContainText
//kiểm tra nội dung text của phần tử, không phân biệt hoa thường và tự chuẩn hoá khoảng trắng

test('toContainText', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.locator ('#btn-set-complex-text').click ();
  await expect (page.locator ('#text-container')).toContainText (/john/i);

  await expect (page.locator ('#text-container')).toContainText ('example.com')

});


//toBeFocused
// check focus vào input con trỏ chuột nhấp nháy

test('toBeFocused', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.locator ('#btn-focus').click ();
  //await expect (page.locator ('#text-container')).toContainText (/john/i);

  await expect (page.locator ('#focusable')).toBeFocused ()

});


//toHaveValue
// check thuộc tính value của thẻ input hoặc texaerea

test('toHaveValue', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.getByText ('Set Value', {exact:true }).click ();
  //await expect (page.locator ('#text-container')).toContainText (/john/i);

  await expect (page.locator ('#text-container')).toHaveValue ('example.com')

});


//toHaveValues
//check giá trị hiện tại của 1 thẻ select multiple có bao nhiêu phần tử array

test('toHaveValues', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.getByText ('Set Values', {exact:true }).click ();
  //await expect (page.locator ('#text-container')).toContainText (/john/i);

  await expect (page.locator ('#multi-select')).toHaveValues (['Action','Drama'])

});

//toHaveClass, tôCntainerClass, toHaveCss

test('toHaveClass', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.getByText ('#btn-toggle-exact-class').click ();
  //await expect (page.locator ('#text-container')).toContainText (/john/i);

  await expect (page.locator ('#exact-class-target')).toHaveClass ('hightlight')

});

test('toHaveClass2', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.getByText ('#btn-toggle-class').click ();
  //await expect (page.locator ('#text-container')).toContainText (/john/i);

  await expect (page.locator ('#class-target')).toHaveClass ('hightlight')

});


//toHaveAttribute

test('toHaveAttribute', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.locator ('#btn-toggle-attr').click ();
  //await expect (page.locator ('#text-container')).toContainText (/john/i);

  await expect (page.locator ('#avatar')).toHaveAttribute ('alt','User Avatar')

});


//toHaveId

test('toHaveId', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await expect (page.locator ('#unique-id')).toHaveId('unique-id')

});


//toBeInViewport

test('toBeInViewport', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.locator ('#viewport-target').scrollIntoViewIfNeeded ();

  await expect (page.locator ('#viewport-target')).toBeInViewport ()
  await expect (page.locator ('#viewport-target')).toBeVisible ()

});


//toHaveText
test('toHaveText', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.locator ('#btn-whitespace-text').click ();

  const expectedMessage = page.locator ('#status-text div div').nth(1);
  await expect (expectedMessage).toHaveText ('Data loaded successfully!')

});