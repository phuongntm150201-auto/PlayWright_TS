import { create } from "domain";
import { eventNames } from "process";


function makeCake (
    flavor: 'chocolate' | 'vanilla', 
    layers: number,
    isVegan: boolean
) {
    console.log (`Making a ${layers} - layers ${flavor} cake.Vega ${isVegan}`);
}

type MakeCakeType = typeof makeCake;
type CakeInputs = Parameters <MakeCakeType>
type flavor = CakeInputs [0];
type layers = CakeInputs [1];
type PageName = 'Home' | 'Login' | 'Dashboard';

// -> muốn tạo ra 1 object có key là page name và value 1 string
// trong cái object đấy có bao nhiêu giá trị không cần biết
// chỉ cần biết là tôi có key là pageName và value là string
// Record

const appPages: Record <PageName, string> ={
    Home: '/home',
    Login: '/login',
    Dashboard: '/Dashboard',
};

interface Customer {
    username:string;
    password: string;
    plan: 'free' | 'vip';
    isActive: boolean;
}

function createStore <T extends Record <string, Customer>> (fixture:T) {
    return (key : keyof T) =>{
        return fixture [key];
    }
}

const getTestUser = createStore ( {
    standardUser: {
        username: 'user_123',
        password: '123',
        plan: 'free',
        isActive: true,
    },
    vipUser: {
        username: 'user_123',
        password: '123',
        plan: 'vip',
        isActive: true,
    },
});
const data = getTestUser ('standardUser')

interface CoTheCanCuoc {
    id :string ;
}

function checkIn <T extends CoTheCanCuoc> (khachHang:T) {
    console.log (`Khach hang co id ${khachHang.id} duoc phep vao`);
    return khachHang;
}

const nguoiA = {id:'123'};
checkIn (nguoiA);

const rickKid ={
    id: '9999',
    name: 'Batman',
    money :100000,
}
checkIn (rickKid) ;

const nguoiQuenVi ={
    name: 'Joker',
};
function createLogger <T extends Record <string, string>> (evenMap:T) {
    return (eventName :keyof T) => {
        const code = evenMap [eventName];
        console.log (`Gui su kien ${String (eventName)} - ma: ${code}`);
    }
};

const eventMap = {
    BTN_CLICK_SIGUP:'EVT_01',
    BTN_VIEW_HOME :'EVT_02',
}

const logEvent = createLogger (eventMap)
logEvent ('BTN_VIEW_HOME');


//kế thừa - kết hợp/ thành phần (inheritance, composition)

//kế thừa là mối quan hệ là một
//ví dụ: con mèo là 1 động vật, giám đốc là 1 nhân viên
// con cái thừa hưởng gen của bố mẹ

// kết hợp
// có xe hơi có 1 cái động cơ (chứ không phải xe hơi là động cơ)
// tư duy: lắp ráp lego, tạo 1 cái vật thể lớn từ các mảnh ghép nhỏ

class SmartDevice {
    connectWifi () {
        console.log ('connected wifi')
    }
    playMusicAndLight () {
        console.log ('vừa hát vừa chiếu sáng')
    }
}

class SmartLight extends SmartDevice {
    turnOn () {
        console.log ('Light on')
    }
}

class SmartSpeaker extends SmartDevice {
    playMusic () {
        console.log ('Music on')
    }
}

//nếu bh sếp y/c làm thiết bị đèn biết hát

//class SingingLight extends SmartLight, SmartSpeaker {}

class WifiModule {
    connect () {
        console.log ('wifi da connect')
    }
}

class LightModule {
    on () {
        console.log ('bật')
    }
    off (){
        console.log ('tắt')
    }
}

class SpeakerModule {
    play (song :string) {
        console.log (`dang hat ${song}`)
    }
}

class SingingLight {
    private wifi = new WifiModule ();
    private light = new LightModule ();
    private speaker = new SpeakerModule ();

    partyTime () {
        this.wifi.connect ();
        this.light.on ();
        this.speaker.play ('OLALA')
    }
}
const myPartyLight = new SingingLight ();
myPartyLight.partyTime ();