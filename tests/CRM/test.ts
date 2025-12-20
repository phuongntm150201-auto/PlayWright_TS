//1.as const (const assertion)

import { create } from "domain";

const direction = {
    UP:'up',
    DOWN:'down'
} as const;

//nghĩa là mình có thể vô tình gán lại thành chuỗi khác
//as const PI= 3.14;

//as const sẽ khoá cứng object, ngăn chặn việc sửa đổi ngớ ngẩn
//direction.UP = 'left'

const envs = ['dev','uat','prod'] as const;
//đối tượng là hằng số hoặc k thay đổi
//

//2. typeof
//dùng để copy kiểu dữ liệu từ 1 đối tượng có sẵn

const settings = {
    theme:'dark',
    notifications: true,
    version : 1.0,
}
//type
// interface Setting {
//     theme: string,
//     notifications: boolean,
//     version: number;
// }
type SettingsType = typeof settings;


//keyof

interface User {
    id: number;
    name:string;
    email:string;
}

type UserKeys = keyof User;
//tương đương với
// type UserKeys = 'id'|'name'|'email'

const Colors = {
    Red: '#FF0000',
    Green:'#00FF00',
    Blue :'#0000FF',
} as const;

//2 cách để lấy giá trị trong 1 object

// console.log (Colors.Green);
// console.log (Colors ['Blue']);

//viết 1 hàm chỉ nhận đúng tên màu có trong object
type ColorsType = typeof Colors;
//bước 1 : typeof Color => ra cái type là (red:''....)
//bước 2 : keyOf (b1) => keyOf ColorType -> union 'Red'|'Green'|'Blue'

type ColorName = keyof typeof Colors;
function changeColor (color:ColorName) {
    console.log (Colors [color])
}
changeColor ('Blue');

// const config = {
//     endPoint :'https://api1.com',
//     timeOut: 3000,
//     retries: 3,
// }
const config = {
    endPoint :'https://api2.com',
    timeOut: 3000,
    retries: 3,
}as const;

type Config = typeof config ;
type ConfigKey = keyof Config;
type ConfigDirect = keyof Config; 
//viết 1 hàm lấy giá trị của config

function getConfigValue (key:keyof typeof config) {
    return config [key];
}

const endPoint = getConfigValue ('endPoint');
const timeout = getConfigValue ('timeOut');

// có 2 THẾ GIỚI Ở TRONG TYPE SCRIPT SONG SONG VỚI NHAU
// 1. thế giới type (kiểu = bản vẽ) => interface, type
// 2. là thế giới VALUE () const let và function
// => thì KEYOF là 1 công cụ của thế giới TYPE


//3. Partial

interface UserProfile {
    id: number;
    name:string;
    email:string;
    age:number;
}
//Partial =>
// interface UserProfile {
//     id?: number;
//     name?:string;
//     email?:string;
//     age?:number;
// }

// interface updateId {
//     id?:number;
// }

//cú pháp Partial <T>
// ví dụ là tôi muốn viết 1 hàm updateProfile 
function updateProfile (original:UserProfile, updates: Partial <UserProfile>) : UserProfile {

    return {
        ...original,
        ...updates,
    };
}

const userA: UserProfile = {
    id:1,
    name:'A',
    email:'123@gmail.com',
    age:24,
}
const userB = updateProfile (userA ,{age: 24}); // bao gồm tất cả thông tin của user A và thay thế tuổi
console.log (userB)

//rest params 
// {...rest}

//VD về rest param
interface UserEnity {
    id:string;
    username : string;
    password: string;
    secretKey :string;
    role:string;
}
const dbUser : UserEnity = {
    id:'u1',
    username :'admin',
    password :'123',
    secretKey :'abc',
    role :'admin',
};

function chuanHoaUser ( user: UserEnity) {
    //sử dụng rest params và destructoring để tách password và secretKey ra khỏi phần còn lại (*)
    const {password, secretKey, ...safeUser} = user
    return safeUser;
}
const clientData = chuanHoaUser (dbUser);
console.log (clientData);


//vd (*)
// const user ={
//     name:'alice',
//     age:25,
// }

// // const name = user.name
// // const age = user.age

// //destructoring
// const {name, age} = user;
// const { name: userName} = user;

// console.log (userName);
// const color =['red', 'green'];

// const c1 = color [0];
// const [frist, second] = colors;
// console.log (frist);

// //reparam
// const setting2 = {
//     theme :'dark',
//     volume: 80,
//     wifi: true,
//     bluetooth: false,
// };

// const {theme, volume, ...others } = setting2;

// console.log (theme);
// console.log (others);


const racers = [ 'Hai', 'Minh' ,' Tung','Lan']
//racers [0]
const [winner, nhi, ...others] = racers;
console.log (winner)
console.log (others)


// RECORDS

//tư duy sử dụng records để tạo ra object giống như 1 cuốn từ điển nơi bạn chưa biết tên key cụ thể, nhưng biết kiểu dữ liệu của chúng

// {
//     productName :330
// }
// type ProductPrices ={
//     [x:string] : number;
// }
 
type ProductPrices = Record  <string, number>

const prices : ProductPrices = {
    laptop: 1500,
    mouse: 25,
}

//object laptop và 'laptop' là tương đương nhau

type OrderStatus = 'pending' | 'shipping' | 'delivered'

const statusLables : Record <OrderStatus, string> = {
    delivered :'Giao hang thanh cong',
    shipping :'đang giao hàng',
    pending :'đang chờ xử lý',
}

//CLOSURE => hàm trả về 1 hàm
//bình thường: khi 1 hàm chạy xong, nó chếc đi và quên sạch kí ức (biến cục bộ bị xoá khỏi bộ nhớ)
//closure: khi hàm cha return 1 hàm con , hàm con đó giống như đeo 1 cái balo "balo kí ức"
//trong balo chứa tất cả các biến của hàm cha dù hàm cha đã chạy xong, hàm con vẫn mang theo balo này

//VD

function hamCha (x:number) {
    //biến này nằm trong phạm vi của cha => biến cục bộ
    let bienCuaCha = x;
    return function hamCon (y:number) {
        return bienCuaCha + y;
    }
}

//cú pháp quan trọng là phải hứng giá trị của closure = 1 biến
const add5 = hamCha (5);
const ketQua1 = add5 (2)
console.log (ketQua1)

//tạo ra nhà máy tạo hamf
//tạo ra hàm nhân
function createMultiplier (factor: number) {
    return function (number: number) {
        return number* factor;
    }
};

//ví dụ tôi muốn tạo hàm nhân đôi
const double = createMultiplier (2)

console.log (double (10))

const triple = createMultiplier (3)

console.log (triple (3))

//TƯ DUY TẠO RA 1 HỆ THỐNG " ĐỒNG BỘ DỮ LIỆU"
//1. mình có 1 object gốc
//2. dùng keyof typeof để lấy danh sách key của nó
//3. dùng record để bắt buộc 1 object khác có key y hệt object gốc

//Nguồn
//const SOURCE = {key A: '...'}

// type SOURCEKEY = keyof typeof SOURCE

//const Target : Record <SOURCEKEY, ValueType>

//VD

const ORDER_STATUS = {
    CREATED : 'orderCreated',
    PAID: 'orderPaid',
    SHIPPED: 'orderShipped',
} as const;

type StatusKey = keyof typeof ORDER_STATUS;

const STATUS_COLOR: Record <StatusKey, string > = {
    CREATED : 'gray',
    PAID: 'blue',
    SHIPPED :'green',
}

// function getBadgeColor (satus: StatusKey) {
//     return STATUS_COLOR [status];
// } => không biết lỗi gì nà đỏ lòm

//getBadgeColor ('')

const ENV_LIST = {
    DEV:'development',
    STAGING:'staging',
    PROD :'prod',
} as const;
type EnvKey = keyof typeof ENV_LIST;

interface EnvConfig {
    baseUrl: string,
    retries: number,
    timeOut: number,
}

const PLAYWRIGHT_CONFIG : Record <EnvKey, EnvConfig> ={
    DEV: {
        baseUrl :'dev',
        retries: 0,
        timeOut: 300,
    },
    STAGING  :{
        baseUrl :'uat',
        retries: 0,
        timeOut: 100,
    },
    PROD : {
        baseUrl :'prod',
        retries: 1,
        timeOut: 200,
    },
};

PLAYWRIGHT_CONFIG ['PROD']

//
const MEMBERSHIP_TIERS ={
    STD: 'standard_user',
    GOLD: 'gold_user',
    VIP: 'vip_user',
}as const;

type TierKey = keyof typeof MEMBERSHIP_TIERS
type FeeConfig = Record <TierKey, number> ;

//phần clouse tạo nhà máy hàm
function createFeeCalculator (config: FeeConfig) {
    console.log ('khởi tạo bộ tính phí config')

    //closure
    return (tier: TierKey, amount:number) : number => {
        const rate = config [tier];
        const fee = rate * amount;
        console.log (`${tier} giao dich ${amount} : Phi ${fee}`)
        return fee;
    }
}

// dịp giáng sinh 
const giangSinhConfig: FeeConfig ={
    STD:0.05,
    GOLD: 0.02,
    VIP: 0.0,
}

const tetConfig: FeeConfig ={
    STD:0.1,
    GOLD: 0.05,
    VIP: 0.01,
}

// nhà máy tạo hàm
const calculateGiangSinh = createFeeCalculator (giangSinhConfig)

const calculateTet = createFeeCalculator (tetConfig)

//sử dụng

calculateGiangSinh ('GOLD', 100);
calculateTet ('VIP', 500);

//ví dụ đây là locator
type LyNuoc = string;

//viết 1 hàm nhận MENU -> trả về 1 cái nút  bấm menu
function caiDatMayBanNuoc <T extends Record <string, string | ( () => LyNuoc)>> (menu:T): (tenMon:keyof T) => LyNuoc{
    //Nút bâms trả về
    return (tenMon:keyof T):LyNuoc =>{
        const congThuc = menu [tenMon]
        if (typeof congThuc === 'function') {
            console.log (`May dang pha che mon ${String (tenMon)}`)
            return congThuc ();
        }
        console.log (`Lay ngay mon co san ${String (tenMon)}`);
        return congThuc;
    }
}
// () => string
const MENU_QUAN = {
    cocacola: 'Lon coca uop lanh',
    sinh_to_bo: () =>{
        return 'Xay bo +sua + da -> sinh to bo';
    },
    cafe_sua: 'Cafe pha phin',
}as const;

const bamNut = caiDatMayBanNuoc (MENU_QUAN);

// KHÁCH HÀNG SỬ DỤNG 
//case 1: lấy nước ngọt
const nc1 = bamNut ('cocacola');
//case 2: nuóc sinh tố
const nc2 = bamNut ('sinh_to_bo');
console.log (nc2)

/// T extends Record <string,string | ((page:Page) => Locator)
// => chúng ta sẽ nhận vào bất cứ dạng css, spath hoặc getby bởi pW



//ngày 9/12/2025

function taoQuaBom() {
  console.log(`BUM! BOM NO NGAY LAP TUC`);
  return 'Xac qua bom';
}
console.log('CO 2 cach goi');

//eager -> lam ngay

const caiBombiLoi = taoQuaBom();
console.log(`Gai xong bom loi, (nhung qua bom da no mat roi)`);

//lazy callback -> lam sau

const caiBomXin = () => taoQuaBom();
console.log(`Gai xong bom xin. Bom chua no`);
caiBomXin();

// trong TS , ham (function) cung goi la 1 kieu du lieu (giong nhu so hoac chuoi), nen minh co the truyen 1 ham
// vao ben trong 1 ham khac
//Dinh nghia ham callbak

const goiDien = () => console.log(`Reng reng! Da giat xong. moi ra lay do`);
const giaoHang = () => console.log(`Vu vu! Dang giao hang den nha ban`);
function dichVuGiatLa(quanAo: string[], hangDongSauKhiGiat: () => void) {
  console.log(`Dang giat ${quanAo.join(', ')}`);
  console.log('....Da giat xong');

  /// 3 Thuc thi callback

  hangDongSauKhiGiat();

  //console.log(`Reng reng! Da giat xong. moi ra lay do`);

}

dichVuGiatLa(['Ao so mi', 'Quan Jean'], goiDien);
dichVuGiatLa(['Chan bong'], giaoHang);

//chuong trinh may tinh don gian
// cong, tru, inKetqua

class MayTinh {
  ketQua: number;
  constructor() {
    this.ketQua = 0;
  }
  cong(so: number): this {
    this.ketQua += so;
    console.log(`Cong ${so} -> Tong La: ${this.ketQua}`);
    // <- tra ve chinh cai may tinh do de thuc hien dung tiep
    return this;
  }
  tru(so: number): this {
    this.ketQua -= so;
    console.log(`Tru ${so} -> Tong La: ${this.ketQua}`);
    // <- tra ve chinh cai may tinh do de thuc hien dung tiep
    return this;
  }
  inKetQua(): void {
    console.log(`---ket qua cuoi cung la: ${this.ketQua} ----`);
  }
}

// su dung

const calculator = new MayTinh();

// const ketQua1 = calculator.cong(10);
// const ketQua2 = calculator.cong(5);
// const ketQua3 = calculator.tru(1);
// calculator.inKetQua();
//method chaining
// calculator.cong(10).cong(5).tru(1).inKetQua();

// class BenhNhan {

//   constructor(ten, huyetAp) {
//     this.ten = ten;
//     this.huyetAp = huyetAp;
//   }

//   diVaoKham(bacSi) {
//     console.log(`${this.ten} di va kham`);
//     bacSi(this);
//   }

// }

// const bacSiHienLanh = (nguoiBenh) => {
//   console.log(`Bac si noi: Cha, huyet ap ${nguoiBenh.huyetAp} la rat khoe`);
// };

// const bacSiKhoTinh = (nguoiBenh) => {
//   console.log(`Bac si noi rang: huyet ap ${nguoiBenh.huyetAp} yeu qua, uong thuoc di`);
//   //bac si tac dong nguoc lai benh nhan
//   nguoiBenh.huyetAp += 20;
//   console.log(`Huyet ap da tang len ${nguoiBenh.huyetAp}`);
// };

// const ongThuan = new BenhNhan('ongThuan', 90);
// ongThuan.diVaoKham(bacSiHienLanh);
// ongThuan.diVaoKham(bacSiKhoTinh);

