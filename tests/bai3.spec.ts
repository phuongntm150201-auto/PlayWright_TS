// web accessibility(khả năng tiếp cận) - nền tảng của getByRole

// getByRole của playwright sẽ xác định những thẻ HTML có cấu trúc ntn => theo vai trò ngầm định

// interface hoặc là type alias Locator

import { test, expect } from '@playwright/test';

// test('Vai tro ngam dinh', async ({ page }) => {

//     await page.goto('https://demoapp-sable-gamma.vercel.app')

//     await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click()
//     await page.getByRole('link', { name: 'Bài tập' }).click()

    //await page.getByRole('button', { name: 'Playwright getByRole' }).click()

    //   page.getByRole('link', {name: 'Trang chủ'})

    // const linkLocator = page.getByRole('link', { name: 'Trang chủ' })
    // console. log ('phan tu o tren web', await linkLocator.count ());
    // linkLocator .nth (0).hover ()

    // //   await linkLocator.hover()

    // //await linkLocator.highlight()

    // await page.pause()// xem có lấy hightlight hay không

    //await page.getByRole ('textbox', {name: 'Tên'}).pressSequentially ('Phuong')
    //await page.locator('input[placeholder="Nhập tên"]').pressSequentially('Phuong');

    //await page.getByRole ('textbox', {name: 'Tên:'}).check ()
    //await page.getByRole ('textbox', {name: 'Tên:'}).click ()

    // await page.getByRole ('checkbox', {name: 'Đồng ý điều khoản '}).check ()
    // await page.getByRole ('radio', {name: 'Nữ '}).check ()
    // await page.getByRole ('textbox', {name: 'Email:'}).fill ('phuong@gmail.com')
    // await page.getByRole ('textbox', {name: 'Mật khẩu:'}).fill ('abc!23')
    // await page.getByRole ('textbox', {name: 'Ghi chú:'}).fill ('test')

    // const checkbox = page.getByRole ('checkbox', { name : 'Tôi đồng ý', checked: true});
    // console.log ( await checkbox.count ());
    // await expect (checkbox).toBeVisible ()

    //await page.pause ()

    // await page.getByRole ('button', {name: 'Bài tập'}).click ()
    // const buttonB = page.getByRole ('button', {name : 'More options', expanded : false})
    // await buttonB.click ()
    // const menuDuplicated = page.getByRole ('menuitem', {name: 'Duplicate'})

    // await expect (menuDuplicated).toBeVisible ()

    // await page.locator ('#username-input').fill ('Phuong')
    // await page.locator ('#password-input').fill ('123')
    // await page.locator ('#login-submit-btn').click ()

    // await page.locator ('[placeholder ="Nhập email"]').fill ('phuong@gmail.com')

    // await page.pause ()

    // const soLuongPhanTu = await page.locator ('button[id *="profile"]').count ()
    // console.log (soLuongPhanTu);
    // await page.pause ()

//     const rowThu1 = await page.locator ('.user-row').nth (0) // nth: bắt đầu index = 0
//     console.log (rowThu1)
//     await page.pause ()

// });


// test.only ('Xpath selector', async ({page}) =>{
//     await page.goto ('https://demoapp-sable-gamma.vercel.app/');
//     await page.getByRole ('link', {name: 'Bài 2: Playwright Locators' }).click ();
//     await page.getByRole ('link', {name: 'Xpath Selector' }).click ();
//     await page.locator ('//input[@name ="mail"]').fill ('phuong@gmail.com');
//     await page.pause ();
// });

test.only('Xpath selector', async ({ page }) => {
  test.setTimeout(60000); // tăng timeout test lên 60 giây

  await page.goto('https://demoapp-sable-gamma.vercel.app/');
  
  // Đợi link hiển thị rồi mới click
  await page.waitForSelector('text=Bài 2: Playwright Locators');
  await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click();

  // Đợi link “Xpath Selector” xuất hiện rồi mới click
  await page.waitForSelector('text=Xpath Selector');
  await page.getByRole('link', { name: 'Xpath Selector' }).click();

  // Đợi input email xuất hiện rồi điền
  await page.waitForSelector('//input[@name="email"]');
  await page.locator('//input[@name="email"]').fill('phuong@gmail.com');

  await page.pause(); // dừng lại để debug trong UI mode
});


// đường dẫn tuyệt đối
//  /html/body/div[1]/div/main/div/div/div[2]/div[2]/div[2]/div/div/div[1]/div/header/h1


// #id
// đường dẫn không tuyệt đối
// div[@id='root']//section[@class='hero']//span[@class='title']

// attribute

// sẽ sử dụng attribute
// a[@href]

// a
// => tìm ra tất cả trong html thẻ <a>

// [@href] => có attribute là href

// <div class="card">
//   <h4>Article</h4>
//   <p>Body</p>
//   <button>Read</button>
//   <a href ="#">More</a>
// </div>

// ở trong CSS thằng class là .card
// div[@class='card']//

// p[contains(normalize-space(.), 'Welcom to Docs')]

// p => tìm tất cả thẻ p
// => p đầu tiên
// [contains(normalize-space(.))] => dấu . ở đây cho chính cái thẻ đó 
// check có chứa dòng Welcom to Docs =? hay không

// p[contains(text(), 'Welcom to Docs')]

// nhảy cóc từ div => li (2 //)
// div[@class='menu-example']//li
// đi từng cấp 1 (1/)
// div[@class='menu-example']/ul/li

// <div class="product-card" data-category="electronics" data-price="999">
// <h5>Iphone 15</h5>
// <button>Add to Card</button> -> lại có nhiều phần tử giống nhau
// </div>

// chiến lược -> tìm mỏ neo và nhảy từ div => button
// -> bắt đầu từ mỏ neo


