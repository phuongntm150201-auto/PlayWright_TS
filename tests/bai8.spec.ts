import { test, expect } from '@playwright/test';
import {stat} from 'node:fs/promises';

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


//Shadow DOM

test('ví dụ về shadow DOM', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click();

  //shadow DOM (0PEN); Playwright tự pierce shadow, chỉ cần chain locator
  // tương tác như 1 element bình thường. chỉ cần trỏ tới thằng DOM -> và từ đó dùng locator chain để tương tác
  // phần còn lại để PW lo

    //const openHost = page.locator('open-shadow-el#open-shadow-demo');
    await page.locator('#os-input').fill('Hello Shadow');
    await page.locator('#os-btn').click();
    await expect(page.locator('#os-status')).toHaveText('You typed: Hello Shadow');
    await page.pause();

    // Shadow DOM (CLOSED): không thể pierce. Cần evaluate trong browser context nếu buộc phải chạm vào
    const closedHost = page.locator('closed-shadow-el#closed-shadow-demo');
    // Ví dụ assert chỉ quanh host (không vào bên trong):
    const shadowDomText = await closedHost.textContent ();
    console.log (shadowDomText);
    await expect(closedHost).toBeVisible();
    // Nếu cần kiểm tra text bên trong closed shadow, phải dùng page.evaluate với elementHandle (không khuyến nghị cho E2E):
    // const el = await closedHost.elementHandle();
    // const innerText = await page.evaluate(h => h.shadowRoot ? h.shadowRoot.textContent : '(closed)', el);
    // expect(innerText).toContain('closed');

});


test('ví dụ về iframe', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click();

  // Cách 1: Theo ID (dễ nhất)
  const frame = page.frameLocator('#demo-iframe');
  await frame.locator('#if-input').fill('Hello iFrame');
  await frame.locator('#if-btn').click();
  await expect(frame.locator('#if-status')).toHaveText('You typed: Hello iFrame');

  await page.pause ();

  // CÁCH 1: Theo title attribute
  const iframeSelector = 'iframe[title="payment-iframe"]';
  const iframeElement = page.locator(iframeSelector);
  await iframeElement.waitFor({ state: 'attached', timeout: 10000 });
  await iframeElement.scrollIntoViewIfNeeded();

});


test('ví dụ về evaluate', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click();

  await page.getByRole ('tab', { name : 'evaluate ()'}).click ();

  const domInfo = await page.locator ('#demo-input-1').evaluate ((el: HTMLInputElement) =>{
    return {
        value: el.value,
        placeholder: el.placeholder,
        type: el.type,
        disabled: el.disabled,
        maxLength: el.maxLength,
        className:el.className,
        defaultValue: el.defaultValue,
        selectionStart: el.selectionStart,
        selectionEnd: el.selectionEnd,
    }
  })
  console.log ('DOM Info:', domInfo)

});













