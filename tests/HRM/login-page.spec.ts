import { test, expect } from '@playwright/test';

//B1: Break nhỏ UI ra xem có chức năng gì
// => UI trang đăng nhập có chức năng login vào dashboard Anh Tester
//B2: xác định TC có những test case gì
//B3: xác định các step thực hiện và các step đó có liên quan đến elements nào ở trên UI và nguồn input (data test) đầu vào
//B4: xác định locator ở các elements
//có thể nắm vững 1 cách lấy locator đơn -> suy nghĩ hướng xa ra là có thể lấy locator mà áp dụng đươc cho nhiều phần tử áp dụng được cho các phần tử giống nhau nhưng khác nhau về 1 số text chăngr hạn
//

// tiến hành viết TCS

//list ra các locator sẽ dùng
// 1 là ở input name 2 là input password 3 là login button


setTimeout(() => {

  debugger;

}, 2000);

//lấy locator của modal thể hiện viễ mà loged in successfully 


const LOGIN_URL = 'https://hrm.anhtester.com/erp/login'

test.describe('HRM Login Page - Possitive case', () => {
  test('TC_LOGIN_01 - Đăng nhập thành công (click)', async ({ page }) => {
    await page.goto(LOGIN_URL)
    await expect(page.locator('h4.mb-3.f-w-600')).toContainText('Welcome to HRM | Anh Tester Demo') //(webfirst assertion)

    //expect khảng định
    //const title = await page.locator('h4').innerText()
    //expect(title).toBe('Welcome to HRM | Anh Tester Demo')
    await page.locator('#iusername').fill('admin_example');

    await page.locator('#ipassword').fill('123456');

    await page.getByRole('button', { name: 'Login' }).click();

    // 1. Kiểm tra modal/toast có text "Logged In Successfully." xuất hiện.

    await expect(page.locator('#swal2-title')).toHaveText('Logged In Successfully.');

    // 2. Kiểm tra URL của trang đã chuyển hướng (chứa /erp/desk)

    await expect(page).toHaveURL(/.*\/erp\/desk.*/); //cách 1
    //await expect(page).toHaveURL('https://hrm.anhtester.com/erp/login'); cách 2
    //await expect(page).toHaveURL(/erp\/des/'); //cách 3

  })



  test('TC_LOGIN_02 - Đăng nhập thành công (Enter)', async ({ page }) => {
    await page.goto(LOGIN_URL)
    await expect(page.locator('h4.mb-3.f-w-600')).toContainText('Welcome to HRM | Anh Tester Demo');
    await page.locator('#iusername').fill('admin_example')
    await page.locator('#ipassword').fill('123456')
    await page.locator('#ipassword').press('Enter')

    //1 kiểm tra modal/toast có text'Logged in successfully' xuất hiện
    await expect(page.locator('#swal2-title')).toHaveText('Logged In Successfully.');
    //2. kiểm tra url của trang đã chuyển hướng (chứa/erp/desk)
    //await expect(page).toHaveURL('https://hrm.anhtester.com/erp/desk')
    //await expect(page).toHaveURL(/erp\/des/');
    await expect(page).toHaveURL(/.*\/erp\/des.*/);
   });
});

test.describe('HRML Login Page - Negative case', () => {
  test('TC_LOGIN_03 - Sai mật khẩu', async ({ page }) => {
    await page.goto(LOGIN_URL)
    await expect(page.locator('h4.mb-3.f-w-600')).toContainText('Welcome to HRM | Anh Tester Demo');

    //action
    await page.locator('#iusername').fill('admin_example')
    await page.locator('#ipassword').fill('321578')
    await page.locator("//button[@type='submit']").click()

    //expect co toast message có chứa text Invalid Login Credentials
    await expect(page.locator('.toast-message')).toContainText('Invalid Login Credentials');
  });

  test('TC_LOGIN_08 - Mật khẩu quá ngắn(dưới 6 kí tự)', async ({ page }) => {
    await page.goto(LOGIN_URL)
    await expect(page.locator('h4.mb-3.f-w-600')).toContainText('Welcome to HRM | Anh Tester Demo');

    //action
    await page.locator('#iusername').fill('admin_example')
    await page.locator('#ipassword').fill('32157')
    await page.keyboard.press('Enter')

    //expect co toast message có chứa text Invalid Login Credentials
    //await expect(page.locator('.toast-message')).toContainText('Your password is too short, minimun 6 characters required.');
    await expect(page.locator('.toast-message')).toContainText('Your password is too short, minimum 6 characters required.');
  });
});

test.describe('HRML Login Page - UI', () => {
  test('TC_LOGIN_09 - Mật khẩu bị che(Masking)', async ({ page }) => {
    await page.goto(LOGIN_URL)
    await expect(page.locator('h4.mb-3.f-w-600')).toContainText('Welcome to HRM | Anh Tester Demo');

    //kiểm tra ô password có thuộc tính type là password
    //nhận vào 2 đối số. 1 là tên attribute 2 là giá trị so sánh của attribute
    //await expect (page.locator ('#avatar')).toHaveAttribute ('alt', 'User Avatar')
    await expect(page.locator('#ipassword')).toHaveAttribute('type', 'password');


  });
  test('TC_LOGIN_11 - Placeholder (Văn bản gợi ý )', async ({ page }) => {
    await page.goto(LOGIN_URL)
    await expect(page.locator('h4.mb-3.f-w-600')).toContainText('Welcome to HRM | Anh Tester Demo');

    //có 2 cách :1.là giống TC 9
    //2 là get attribute của 2 ô input và so sánh với yêu cầu của đề bài 

    await expect (page.locator ('#iusername')).toHaveAttribute ('placeholder', 'Your Username');
    await expect (page.locator ('#ipassword')).toHaveAttribute ('placeholder', 'Enter Password');

    //là page.locator ().getAttribute ('tên của attribute')
    const userNamePlaceHolder = await page.locator ('#iusername').getAttribute ('placeholder')
    expect (userNamePlaceHolder).toBe ('Your Username');

    const passwordPlaceHolder = await page.locator ('#ipassword').getAttribute ('placeholder');
    expect (passwordPlaceHolder).toBe ('Enter Password');

  });
});