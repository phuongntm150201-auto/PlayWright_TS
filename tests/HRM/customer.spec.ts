import { test, expect, Page } from '@playwright/test';

const LOGIN_URL = 'https://crm.anhtester.com/admin/authentication';

async function loginAndNavigateToNewCustomer (page: Page, tabName: string ){
    //thực hiện hành động login -> navigate tới Customer
    //1. đầu tiên goto Page
    await page.goto (LOGIN_URL);
    //2. assert page có text login
    await expect (page.getByRole ('heading', {level:1})).toContainText ('Login');
    //3. nhập thông tin username, password -> ấn Login
    await page.locator ('#email').fill ('admin@example.com');
    await page.locator ('#password').fill ('123456');
    await page.locator ("button[type='submit']").click ();

    //4. verify login thành công bởi url => và customer tab link hiển thị
    await expect (page).toHaveURL (/admin/);

    //5. click vào tap customer
    //span[normalize-space (.) = '${tabName}']//parent ::a
    //#menu a[href*='Customer']

    await expect (page.getByRole ('link', {name : `${tabName}`})).toBeVisible ();

    await page.getByRole ('link', {name : `${tabName}`}).click ();
    //await page.locator (`//span[normalize-space (.) = '${tabName}']//parent ::a`).click ();

}

test.describe ('CRM Customer Page - Possitive case', ()=>{
    test ('TC_CUST_01- Tạo Customer (Chỉ nhập trường bắt buộc', async ({page})=>{
        await loginAndNavigateToNewCustomer (page, 'Customer');
        await loginAndNavigateToNewCustomer (page, 'Subscriptions');
    });
});

// function createRandomUser() {

//   return {

//     phone: faker.string.uuid(),

//     vatNumber: faker.internet.username(),

//     website: faker.internet.web(),

//     currency: 'USD',

//     language: 'Vietnamese',

//     address: faker.date.birthdate(),

//     city: faker.date.past(),

//     state: 

//     zipcode:

//     country: 'Vietnam'

//   };

// }




