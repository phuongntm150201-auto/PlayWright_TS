import { test, expect } from '@playwright/test';
import {timeStamp} from 'console';

const DEMO_URL =''

test('ví dụ về điều kiện có thể click trong PW', async ({page}) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();

  const normalBtn = page.locator ('#force-button')

  await expect (normalBtn) . toBeVisible();

  await normalBtn.click ({force: true})

});

test('ví dụ về các loại click trong PW', async ({page}) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();

  await page.locator('//span[text()="Click Me"]').click();

  await page.locator('//span[text()="Double Click Me"]').dblclick();

  await page.locator('//span[text()="Right Click Me"]').click({ button: 'right' });

  await page.pause();

    // setTimeout(() => {

    //     debugger

    // }, 3000);

});


test('hover trong PW', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();

  await page.locator('//div[text()="Hover để xem tooltip"]').nth(0).hover();

  const toolTip = await page.locator('//div[@class="ant-tooltip-inner"]').innerText();

  console.log(toolTip);

  await expect(page.getByRole('tooltip')).toBeVisible();

  await page.pause();

});


//thẻ span: không có event listner hay thuộc disable -> nên khi disable vẫn có thể click được


test('Click element thật hay giả', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();

  await page.locator("//button[normalize-space(.)='Disable Button']").click();

  const toolTip = await page.locator('//div[@class="ant-tooltip-inner"]').innerText();

  console.log(toolTip);

  await expect(page.getByRole('tooltip')).toBeVisible();

  await page.pause();

});

test('Click nhiều button 1 lúc', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();

  const files = [

    ' Document.pdf',

    ' Image.jpg',

    ' Report.xlsx',

    ' Music.mp3',

    ' Video.mp4',

  ];

  //for each ko dung duoc await

  for (const f of files) {

    await page.getByRole('button', { name: f }).click();

  }

  await page.locator('#ac-process').click();

  const successMessage = page.locator('.ant-space-item .ant-alert-message');

  // const successMessageTxtResult = await successMessage.innerText();

  await expect(successMessage).toContainText('Processing Complete!');

});



//cơ chế trình duyệt có cái gọi là even bubbling
test('keyboard actions', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();

    await page.getByRole('tab', { name: 'Keyboard Actions' }).click();

    // // Nhấn phím Enter
    // await page.locator('input').press('Enter');

    // // Nhấn phím Delete
    // await page.locator('input').press('Delete');

    // // Nhấn phím Arrow
    // await page.locator('input').press('ArrowUp');
    // await page.locator('input').press('ArrowDown');
    // await page.locator('input').press('ArrowLeft');
    // await page.locator('input').press('ArrowRight');

    // // Nhấn phím Escape
    // await page.locator('input').press('Escape');

    // // Nhấn phím Tab
    // await page.locator('input').press('Tab');

    // // Nhấn phím Space
    // await page.locator('input').press('Space');

    // const areaInput = page.getByPlaceholder ('Vùng text cho Demo 4');
    // await areaInput.click ();

    // await page.keyboard.press ('a');

    // await page.keyboard.type ('Hello World', {delay:300 });
    // await page.keyboard.down ('Shift');
    // await page.keyboard.press ('ArrowRight');
    // await page.keyboard.up ('Shift');

    // Focus vào textarea Demo 5
    await page.locator('#demo5-textarea').click();

    // Select All, Copy, Cut, Paste
    await page.keyboard.press('Control+a');
    await page.keyboard.press('Control+c');
    await page.keyboard.press('Control+x');
    await page.locator ('#demo5-textarea').fill ('ABCD')
    await page.pause ();
    //await page.keyboard.press('Control+v');

    // Undo / Redo
    await page.keyboard.press('Control+z');
    await page.keyboard.press('Control+y');

    await page.pause();

});














