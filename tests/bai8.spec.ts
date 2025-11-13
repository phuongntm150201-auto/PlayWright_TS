import { test, expect } from '@playwright/test';


test('ví dụ về upload file', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();

  await page.getByRole('tab', { name: 'Upload Files' }).click();

  const visible = page.locator('#visible-input');

  //PW tự động upload file cho chúng ta -> ok

  await visible.setInputFiles('tests/fixtures/sample1.txt');

  //div[contains(text(), '1) Input hiển thị') and @class='ant-card-head-title']/ancestor::div[@class='ant-card-head']/following-sibling::div//span

  await expect(

    page

      .locator(

        "//div[contains(text(), '1) Input hiển thị') and @class='ant-card-head-title']/ancestor::div[@class='ant-card-head']/following-sibling::div//span"

      )

      .nth(1)

  ).toContainText('sample1.txt');

  const hidden = page.locator ('#hidden-input-upload');
  await hidden.setInputFiles ('tests/fixtures/sample1.txt');
  await expect (page.locator ('#hidden-input-upload')).toBeAttached ();

  await page.pause();

  //3) Bắt sự kiện filechooser khi bắt buộc phải click nút

  const chooserPromise = page.waitForEvent('filechooser');

  await page.locator('#fancy-button').click();

  const chooser = await chooserPromise;

  await chooser.setFiles('tests/fixtures/sample1.txt');

  // 4) Nhiều file (multiple)
const multi = page.locator('#multi-input');
await multi.setInputFiles([ 'tests/fixtures/sample1.txt', 'tests/fixtures/sample2.txt']);
await expect(page.locator('text=Số file:').nth (0)).toContainText('2');

// Xoá
await multi.setInputFiles([]);
await expect(page.locator('text=Chưa có file nào').nth (1)).toBeVisible();

});






test('ví dụ về download file', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();

  await page.getByRole('tab', { name: 'Upload Files' }).click();

  // 1. Đợi event download

  //đợi cho tất cả các promise con ở trong array thực hiện thành công rồi lấy kết quả

  const [download] = await Promise.all([

    page.waitForEvent('download'),

    page.locator('#download-demo-btn').click(),

  ]);

  const fileName = download.suggestedFilename();

  console.log(fileName);

  // 2. Kiểm tra tên file (suggested)

  expect(download.suggestedFilename()).toBe('login-data.xlsx');

  await download.saveAs('downloads/login-data-verified.xlsx');

  const info = await stat('downloads/login-data-verified.xlsx');

  console.log(info.size);

  expect(info.size).toBeGreaterThan(100);

  await page.pause();

});













