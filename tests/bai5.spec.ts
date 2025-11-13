// //trên còn.1 bài
import { test, expect } from '@playwright/test';

const DEMO_URL = 'https://demoapp-sable-gamma.vercel.app/';

test('Get text() display:none', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();

  const parent = page.locator ('#demo-element-1');

  const text1 = await parent.textContent ();
  console.log ('text1',text1)

  const text2 = await parent.innerText ();
  console.log ('text2',text2)

  const text3 = await parent.innerHTML ();
  console.log ('text3',text3)

  await page.pause ();
});

test('Get text() visibility:hidden', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();

  const parent = page.locator ('#demo-element-2');

  const text1 = await parent.textContent ();
  console.log ('text1',text1)

  const text2 = await parent.innerText ();
  console.log ('text2',text2)

  const text3 = await parent.innerHTML ();
  console.log ('text3',text3)

  await page.pause ();
});


test('allTextContents ()', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();

  const parent = page.locator ('#demo-dropdown');

  const allText = await parent.allTextContents ();
  console.log ('allText',allText)

  const allTextInner = await parent.allInnerTexts ();
  console.log ('allTextInner',allTextInner)

  const innerThongThuong = await parent.innerText ();
  console.log (innerThongThuong);

  const listItems = page.locator ('.demo-list-item');
  const allTexts = await listItems.allTextContents ();
  console.log (allTexts);

  await page.pause ();
});

test('inputValue(), getAttribute()', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();

  const parent = page.locator ('#demo-input-text');

  const inputValue = await parent.inputValue ();

  const attributes = page.locator ('#demo-attributes')

  const dataStatusAttr = await attributes.getAttribute ('data-status');

  console.log (dataStatusAttr)
  console.log (inputValue)

  await page.pause ();
});

//expect không có wait
//toBeValue
//so sánh nghiêm ngặt giống '===' ở trong JS và TS => nó kiểm tra cả giá trị và kiểu dữ liệu
// toBe :so sánh cái này có chính xác bằng cái kia hay không (cùng 1 vật thể)

test ('toBe(value)', () => {
    const name: string = "Playwright";
    const version: number = 1.56;
    const isActive: boolean = true;

    //PASS
    expect (name).toBe ('Playwright');
    expect (version).toBe (1.56);
    expect (isActive).toBe (true);

    //FAIL
    expect (version).toBe ('1.56')
})

//toEqual
//so sánh giá trị nội dung của các object hoặc array, kiểm tra 2 object hoặc array có giống nhau hết
//so sánh 2 cái hộp có chứa những thứ giống nhau hết bên trong hay không 

test ('toEqual', () => {
    const user1 = { id:1, name: 'A'};
    const user2 = { id:1, name: 'A'};

    expect (user1).toEqual (user2);
})

//toContain
// kiểm tra có chứa// không check sâu được chỉ check nông
// toContainEqual

test ('toContain', () => {
    const permissions : string [] = ['read', 'write', 'delete'];
    const users: {id: number; name: string } [] =[
        { id:1, name:'A' },
        { id:2, name:'B' },

    ];

    expect (permissions).toContain ('write');

    // expect (permissions).toContain ('update')

    // expect (users).toContain ({ id:1, name:'A' })

    expect (users).toContainEqual ({ id:1, name:'A' });
})



// toBeTruthy và toBeFalsy
// so sánh xem có phải là truthy hay falsy không

test ('toBeTruthy', () => {
    expect ('hello').toBeTruthy ();
    expect ({}).toBeTruthy ();
    expect ([]).toBeTruthy ();

    expect (0).toBeFalsy ();
    expect (null).toBeFalsy ();
    expect ('').toBeFalsy ();
})


// toBeGreaterThan / toBeLessThan


test ('toBeGreaterThan', () => {
    const itemCount = 5;
    const totalPrice = 100.5;

    expect (itemCount).toBeGreaterThan (0);
    expect (totalPrice).toBeLessThan (120);
})

// VD: So sánh tên user là Playwright Learner

test ('Bài tập ecommerce', async({page}) => {
    await page.goto(DEMO_URL);

    await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
    await page.getByRole('tab',  { name: ' Expect Assertions' }).click();

    //1. so sánh tên user
    // const userName = page.locator ('#profile-name');
    // const userNameText = userName;

    // expect (userNameText).toBe ('Playwright Learner')

    //2. so sánh Profile JSON có giá trị là
//   {
//   "id": 101,
//   "role": "student", 
//   "active": true,
//   "premium": false
//}

     const jsonText = await page.locator ('#profile-json').innerText ();
     const profile = JSON.parse (jsonText);
     expect (profile).toEqual ({

         "id": 101,
         "role": "student",
         "active": true,
         "premium": false
     })
    //3. Check category chứa audio và category có độ dài là 3 phần tử
    // array.length => trả ra độ dài mảng

    const categories = await page.locator ('#categories li').allInnerTexts ();
    const categoriesWebFirst = page.locator ('#categories');
    console.log (categories);
    expect (categories.length).toBe (3);
    expect (categories).toContain ('🎧 Audio'); //toContain là phải nhập đúng 100%
    await expect (categoriesWebFirst).toContainText ('Audio')

    //4. Check trạng thái còn hàng 
    //  => muốn convert sang boolean => Boolean (value)

    const status = await page.locator ('#in-stock-flag').getAttribute ('data-value');
    const st= Boolean (status);
    expect (st).toBeTruthy ();
})

// .toHavePropert

test('toHaveProperty', () => {
  const user = {
    id: 1,
    name: 'Alice',
    adress: {
      street: '123 THD',
      city: 'HN',
    },
    isActive: true,
  };
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('name', 'Alice');

  expect(user).toHaveProperty('adress.city');
  expect(user).toHaveProperty('adress.city', 'HN');

  expect(user).toHaveProperty('isActive', true);

});

// .toHaveLength

test ('toHaveLength', () =>{

  const fruits = ['Cam', 'Xoai', 'Chuoi'];

  const emptyArry: string[] = [];

  expect(fruits).toHaveLength(3);

  expect(emptyArry).toHaveLength(0);

});

// .ojectContaining & .arrayContaining
//.toHaveLength
//expect (actualArray).toEqual (expect.arrayContaining (SubsetArray))

test('objectContaining', () => {

  const apiResponse = {

    id: 'txn-123',

    status: 'completed',

    amount: 50,

    timeStamp: '2025-10-28',

  };

  const expectedCoreData = {

    amount: 50,

    status: 'completed',

  };

  expect(apiResponse).toEqual(expect.objectContaining(expectedCoreData));

  //Fail -> object cha ko có cặp key value là status: pending

  // expect(apiResponse).toEqual(expect.objectContaining({ status: 'pending' }));

});

test('arrayContaining', () => {

  const userPermissions = ['read', 'write', 'comment', 'delete'];

  const requiredPermissions = ['delete', 'read'];

  expect(userPermissions).toEqual(expect.arrayContaining(requiredPermissions));

});


test('objectContainingnested', () => {

  const apiResponse = {

    id: 'txn-123',

    status: 'completed',

    user: {

      id: 'user=123',

      name: 'Alice',

      email: 'Alice@gmail.com',

    },

    amount: 50,

    timeStamp: '2025-10-28',

  };

  const expectedCoreData = {

    status: 'completed',

    user: expect.objectContaining({

      id: 'user=123',

      name: 'Alice',

    }),

  };

  expect(apiResponse).toEqual(expect.objectContaining(expectedCoreData));

});


// chiến lược giải quyết UI

// UI có 4 thẻ phim (4 cards)
// -> mục đích là có thể lấy được hết thông tin 4 card này
// -> for loop vòng lặp -> lặp qua từng thẻ phim -> để lấy thông tin
// cuối cùng mình đẩy thông tin vào 1 mảng có 4 phần tử

// thằng FE sẽ nhận ở BE 1 api trả về số phần tử và thông tin của phim
// thằng FE sẽ dùng những thẻ placeHolder -> <div> <h1> {{titleName}} </div>

//so sánh tên của user là Playwright learner

interface IMovieData {
    id : number
    title: string
    year: number
    genres : string []
    isLiked : boolean
    isList : boolean

}

test('Bài tập UI Movies', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();

  await page.getByRole('tab', { name: 'Expect Assertions' }).click();

  //1 tìm locator của 4 thẻ phim

  const movieCards = await page
    .locator(
      "//span[text()='Danh sách phim']/ancestor::div[@class='ant-card-head']/following-sibling::div//div[contains(@class,'movie-card')]"
    )
    .all();
  console.log('Số lượng movies,', movieCards.length);
  expect(movieCards).toHaveLength(4);

  const moviesData: IMovieData[] = [];

  for (let i = 0; i < movieCards.length; i++) {

    //index =0 => slient code

    const card = movieCards[i];

    //lấy thông tin về thẻ phim

    const dataTitle = await card.getAttribute('data-title');

    console.log(dataTitle);

    const dataYear = await card.getAttribute('data-year');

    const dataRating = await card.getAttribute('data-rating');

    const dataGenres = await card.getAttribute('data-genres');

    const titleText = await card.locator('.ant-card-meta-detail span').nth(0).innerText();

    console.log('TitleTExt', titleText);

    const ratingText = await card.locator('.ant-card-meta-detail span').nth(1).innerText();

    console.log('ratingText', ratingText);

    const yearText = await card.locator('.ant-card-meta-description div').nth(0).innerText();

    console.log('yearText', yearText);

    await page.pause();

  }

});




