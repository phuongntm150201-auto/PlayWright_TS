interface User {

  id: number;

  username: string;

  email: string;

}

interface Product {

  sku: string;

  price: number;

  inStock: boolean;

}

/// vỏ hộp (api response chuẩn)

//cái vỏ này chứa 1 cái ruột bí ẩn tên là T

interface ApiResponse<T> {

  statusCode: number;

  message: string;

  data: T;

}

function unwrapResponse<T>(response: ApiResponse<T>): T {

  if (response.statusCode !== 200) {

    throw new Error(`API Error: ${response.message}`);

  }

  //neu ngon lanh canh dao

  return response.data;

}

const userResponse: ApiResponse<User> = {

  statusCode: 200,

  message: 'Login success',

  data: {

    id: 1,

    username: 'admin',

    email: 'admin@example.com',

  },

};

const userData = unwrapResponse(userResponse);

console.log(userData.email);

const productResponse: ApiResponse<Product> = {

  statusCode: 200,

  message: 'Login success',

  data: {

    sku: 'IPHONE15',

    price: 20000,

    inStock: true,

  },

};

const productData = unwrapResponse(productResponse);

if (productData.inStock) {

  console.log(`Gia la ${productData.price}`);

}




// còn 1 đoạn 

const dataGoc = { user: 'Admin', money: 1000 };

const dataCuaHoang = dataGoc;

// dataCuaHoang.money = 0;

// console.log(dataGoc);

//clone

function cloneData<T>(data: T): T {

  //c1: structured clone (cong nghe moi, copy sieu sau)

  if (typeof structuredClone !== 'undefined') {

    return structuredClone(data);

  }

  //cach 2 : Json (cong nghe cu, biến thhafnh chữ rồi lại biến thành hình)

  return JSON.parse(JSON.stringify(data));

}

const dataCuaHoangMoi = cloneData(dataGoc);

dataCuaHoangMoi.money = 2000;

console.log(dataGoc.money);




const CAR_CATALOG = {

  sedans: {

    camry_standard: {

      description: 'Camry phien ban tieu chuan',

      data: {

        //1.

        model: 'Camry 2.0G',

        color: 'Black',

        isSold: false,

        engige: {

          type: '2.0L Pertrol',

          power: '200HP',

          fuel: 'Gas',

        },

        interior: {

          seats: 'Leather',

          color: 'Black',

        },

        accessories: ['Tham san', 'Phim cach nhiet'],

      },

    },

  },

};
// namespace: Khuvuc

//key: mau xe


//namespace: Khuvuc

// key: mau xe

function produceCar(namespace, key, options?) {

  console.log(`Lệnh sản xuất: ${namespace} -> ${key}`);

  //1. Lấy khung xe từ kho

  const template = CAR_CATALOG[namespace][key];

  if (!template) throw new Error('Khong tim thay mau xe');

  //2. clone (tao xe moi)

  let myCar = cloneData(template.data);

  if (options && options.overrides) {

    Object.assign(myCar, options.overrides);

  }

  if (options && options.transform) {

    myCar = options.transform(myCar);

    console.log(`Transform đã độ xe`);

  }

  return myCar;

}

const case1 = produceCar('sedans', 'camry_standard');

console.log(case1);

// muốn đổi màu sơn và đánh dấu xe đã bán

const case2 = produceCar('sedans', 'camry_standard', {

  overrides: {

    color: 'Pink',

    isSold: true,

  },

});

console.log(case2);

/// KH muon do xe thanh 500 ma luc

const case3 = produceCar('sedans', 'camry_standard', {

  transform: (car) => {

    car.engige.power = '500HP';

    return car;

  },

});

console.log(case3);




// 1 cái rì đấy :import { getTestDataSimple } from './test-data';
