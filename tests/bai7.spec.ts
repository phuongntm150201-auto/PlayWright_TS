import { test, expect } from '@playwright/test';
import {timeStamp} from 'console';

// ví dụ checkbox đang không check ()
// locator.check () ->checkbox sẽ được check ()
//lần thứ 2 locator.check ()-> checkbox này vẫn là check ()
// locator.check () => đảm bảo ô đã check (nếu đã check -> không làm gì cả)
//locator.uncheck () => đảm bảo ô bị uncheck (nếu đã check => không làm gì cả )
// locator.setChecked (boolean) ->


// const shouldBeChecked = true;


test('ví dụ về Checkbox & Radio', async ({page}) => {


await page.goto('https://demoapp-sable-gamma.vercel.app/');

await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
await page.getByRole('tab', { name: 'Checkboxes & Radio' }).click();
    // Checkbox 1: check() / uncheck()
await page.locator('#demo-checkbox-1').check();
await expect(page.locator('#demo-checkbox-1')).toBeChecked();

await page.locator('#demo-checkbox-1').uncheck();
await expect(page.locator('#demo-checkbox-1')).not.toBeChecked();

// Checkbox 2: setChecked(true/false)
await page.locator('#demo-checkbox-2').setChecked(true);
await expect(page.locator('#demo-checkbox-2')).toBeChecked();

await page.locator('#demo-checkbox-2').setChecked(false);
await expect(page.locator('#demo-checkbox-2')).not.toBeChecked();

// Checkbox 3: Idempotent - Gọi lại nhiều lần an toàn
await page.locator('#demo-checkbox-3').setChecked(true);
await page.locator('#demo-checkbox-3').setChecked(true); // ✅ Vẫn OK, không có side effect
await expect(page.locator('#demo-checkbox-3')).toBeChecked();
});



//Dropdown

test('ví dụ về Dropdowns', async ({page}) => {

await page.goto('https://demoapp-sable-gamma.vercel.app/');

await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
//await page.getByRole('tab', { name: 'Checkboxes & Radio' }).click();

//const dropdownLocator = page.locator ('#country-select');
//await dropdownLocator.click () //không cần
// await dropdownLocator.selectOption ('Vietnam');
// //await dropdownLocator.selectOption ({ index: 3}); (hoặc có thể sử dụng index)
// await page.pause ();

// const panel = page.getByRole('tab', { name: '☑️ Checkboxes & Radio' });
// await page.locator("//div[contains(text(), Custom Dropdown (Không dùng <select>)')]/ancestor::div[@class='ant-cart-head']/following-sibling::div//div[@class,'cd-trigger']"
// ).click();

//await page.locator("//div[contains(text(), 'Custom Dropdown (Không dùng <select>)')]/ancestor::div[contains(@class, 'ant-card-head')]/following-sibling::div").click();


// Chọn mục theo text chính xác
//await page.locator("//ul[contains(@class,'cd-menu')]//li[normalize-space()='Banana']").click();

// Verify text hiển thị trên trigger đã đổi
// await expect(
//   panel.locator("xpath=//div[contains(@class,'custom-dropdown')]//span[contains(@class,'cd-value')]")
// ).toHaveText('Banana');
});


//playwright tự động xử lý và accept tất cả các dialog bởi default
test('ví dụ về Alert ', async ({page}) => {


await page.goto('https://demoapp-sable-gamma.vercel.app/');

await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
await page.getByRole('tab', { name: 'Alerts & Modals' }).click();


// ALERT → Accept và assert UI
page.once('dialog', async dialog => {
  expect(dialog.type()).toBe('alert');
  expect(dialog.message()).toContain('Hello from alert');
  await dialog.accept();
});
await page.locator('#btn-alert').click();
await expect(page.locator('#alert-result')).toHaveText('Alert acknowledged');

await page.pause ();

// CONFIRM → Accept (YES) và assert UI
page.once('dialog', async dialog => {
  expect(dialog.type()).toBe('confirm');
  expect(dialog.message()).toContain('Are you sure');
  //await dialog.dismiss () (từ chối)
  await dialog.accept(); //đồng ý 
});
await page.locator('#btn-confirm').click();
await expect(page.locator('#confirm-result')).toHaveText('Confirmed: YES');

// CONFIRM → Dismiss (NO) và assert UI
page.once('dialog', async dialog => {
  expect(dialog.type()).toBe('confirm');
  await dialog.dismiss();
});
await page.locator('#btn-confirm').click();
await expect(page.locator('#confirm-result')).toHaveText('Confirmed: NO');


// PROMPT → Accept với text và assert UI hiển thị đúng text
page.once('dialog', async dialog => {
  expect(dialog.type()).toBe('prompt');
  expect(dialog.message()).toContain('Your name');
  await dialog.accept('Tester');
});
await page.locator('#btn-prompt').click();
await expect (page.locator('#prompt-result')).toHaveText('Hello, Tester');

// PROMPT → Dismiss (Cancel) và assert UI
page.once('dialog', async dialog => {
  expect(dialog.type()).toBe('prompt');
  await dialog.dismiss();
});
await page.locator('#btn-prompt').click();
await expect(page.locator('#prompt-result')).toHaveText('Prompt canceled');


});




test('ví dụ về modal', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();

  await page.getByRole('tab', { name: 'Alerts & Modals' }).click();

  // Mở modal, điền tên, xác nhận và assert kết quả

  await page.locator('#open-basic-modal').click();

  //assert là thằng modal sẽ hiện ra để thao tác

  const dialog = page.getByRole('dialog', { name: 'Thông báo' });

  await expect(dialog).toBeVisible();

  //thao tác với modal

  await dialog.locator('#basic-modal-input').fill('Alice');

  await dialog.getByRole('button', { name: 'Đồng ý' }).click();

  await expect(dialog).toHaveCount(0);

  await expect(page.locator('#basic-modal-result')).toHaveText('Submitted: Alice');

  await page.pause();

});




