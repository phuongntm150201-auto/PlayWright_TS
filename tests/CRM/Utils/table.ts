// ví dụ đời thường: Tìm chỗ ngồi cho bạn Đức

// có 1 dãy bàn gồm 3 chỗ ngồi
// nhớ 1 cách máy móc
// 1|2|3|4

// table bắt đầu 1 bảng có thể table
//table-> bảng cha
// thead -> phân vùng head -> tr (row) là 1 hàng chứa các header thuộc phân vùng thead
// cấp độ nhỏ nhất head là th
// body là thân bảng
//tbody -> tr (row) -> tương đương từng dòng trong bảng
// trong từng dòng sẽ có td => đơn vị nhỏ nhất -> hay là cell\\;\

//COloumn cap

// dữ liệu đầu vào giống như thead
 const headers = ['ID', 'Full Name', 'Email', 'Phone'];
 //headers [0] => ID
 // mục tiêu taoh ra 1 Map (sơ đồ lớp học)
 //còn 1 đoạn

 function createSimpleMap (headerList){
    const map ={};
    for (let index = 0; index < headerList.length; index ++){
        const tenCot = index; 
        // {}
        console.log (`Da ghi nho Cot $ {tenCot} nam o vi tri $ {index}`);

    }
    return map;
 }
 const myMap = createSimpleMap (headers);
 console.log (myMap ['Email']);

 myMap ['fullName'];
 myMap ['full name'];

 // sẽ viết 1 hàm biến 1 word thành camelCase
 // Full Name -> fullName [sử dụng lowerca     xccxcv.   se +split'']
 // ['full','name'] -> fullName 

 function toCamelCase (text : string): string {
    const words = text.toLowerCase ().split (' ');

    let result = words [0];
    for (let i =1; i < words.length; i++){
        const word = words [i];

        const chuHoa = word .charAt (0). toUpperCase () + word.slice (1);
        result += chuHoa ;
    }
    return result;
 }
 //helloWordCode

 const ketQua = toCamelCase ('hello Word Code');
 console.log (ketQua);

 //có trường hợp mà header của chúng ta có chứa dấu cách vid dụ
 // (' Hoc   Js  ');  => Hoc Js

 function cleanHeaderText (text : string) : string {
    const parts = text.split (' ');
    const words = parts.filter ((word)=> word !== '');
    return words.join (' ');
 }
 console.log (cleanHeaderText ('  Hoc   Js  '));
 const tableHeaders = ['   ID  ', '  Date   Created'];

 // hàm chính (logic mapping)
 //dateCreated
 //date created

 



