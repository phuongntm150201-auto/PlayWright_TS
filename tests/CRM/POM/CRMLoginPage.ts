import {expect} from '@playwright/test'
import {BasePage } from "./BasePage";

export class CRMLoginPage extends BasePage {
    //khai báo locator
    private readonly emailInput = this.page.locator ('#email');
    private readonly passwordInput = this.page.locator ('#password');
    private readonly loginButton = this.page.getByRole ('button', {name:'Login'});
    private readonly h1Text = this.page.getByRole ('heading', {level:1});

    async goto () {
        await this.page.goto ('https://crm.anhtester.com/admin/authentication')
    }

    async expectOnPage (): Promise <void> {
        await expect (this.emailInput).toBeVisible ();
        await expect (this.passwordInput).toBeVisible ();
        await expect (this.h1Text).toContainText ('Login')
        await expect (this.page).toHaveURL (/admin\/authentication/);
    }
    async login (email:string, password: string){
        await this.fillWithLog (this.emailInput, email);
        await this.fillWithLog (this.passwordInput, password, { isSensitive: true, fillOptions: {timeout:1000}})
        await this.passwordInput.fill (password);

        await this.clickWithLog (this.loginButton);

        //1 số PW cũ sẽ dùng cách chuyển trang như thế này,
        //được gọi là page chaining
        //return newDashboardPage ()
        //if/
        //else/
        //if (isAdmin) {
          // return new adminpage
        //}else {
            // return newDashboardPage ();
            // }
            // tất cả uset được đưa tới trang newWelcomesplashpage ()
    }
    async expectLoggedIn (){
        await expect (this.page).toHaveURL (/admin/)
    }
}

//3 nhược điểm chính của page chaining
//1. vi phạm quy tắc trách nhiệm đơn lẻ
//đã ép thằng Login page phải gánh thêm 2 trách nhiệm mới
// 1 biết logic để điều hướng
// 2 khởi tạo đối tượng
//2. tạo ra liên kết chặt chẽ  (hight couping)
// thằng CRM login -> tự nhiên phụ thuộc vào thằng dashboard page

//Vấn đề thực tế:
//câu hỏi 1: điều gì xảy ra nếu đăng nhập thất bại?
//phải dùng if else

//câu hỏi 2: nếu sau khi login : điều gì xảy ra nếu admin thì vào admin page, còn user thường thì vào new dashboard page
// phụ thuộc vào thằng page khác và phải điều hướng sau khi thành công là page nào đó phải hứng được thông tin đó

//3. khó bảo trì và kém linh hoạt
