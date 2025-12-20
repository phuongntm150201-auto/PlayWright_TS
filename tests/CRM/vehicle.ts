//bản thiết kế không hoàn chỉnh

abstract class Vehicle {
    protected brand : string;
    constructor (brand:string) {
        this.brand = brand;
    }

    //phương thức chung
    startEngine (){
        console.log (`Dong co cua ${this.brand} da khoi dong`);
    }

    //1 phương thức trừu tượng (chỉ có tên mà không có code)
    // chúng ta bắt buộc mọi lớp con phải tự định nghĩa
    // xem nó di chuyển như thế nào
    abstract move () : void;
}

class Car extends Vehicle {
    move () {
        console.log (`Chiec xe ${this.brand} dang chay tren 4 banh`)
    }
}

class Truck extends Vehicle {
    move () {
        console.log (`Chiec xe tai ${this.brand} dang chay tren 18 banh`)
    }
}

const myCar = new Car ('Toyota');
const myTruck = new Truck ('Huyndai');

myCar.startEngine ();
myCar.move ();

myTruck.startEngine ();
myTruck.move ();


// ngày 18/11/2025

//trong TS có 1 hàm gọi là parameters <T>