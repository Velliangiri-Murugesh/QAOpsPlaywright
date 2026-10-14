import {Page,Locator} from '@playwright/test'
export class CartPage{

    page:Page;
    productName:string;
    cartDetailVisible: Locator;
    cartProductText: Locator;
     checkoutBtn: Locator;
     paymentpage: Locator;
     creditCardnumber: Locator;
     datedropDown: Locator;
     yeardropDown: Locator;
     cvv: Locator;
     cardName: Locator;
     coupon: Locator;
     appyButton: Locator;
     couponsuccess: Locator;
     username: Locator;
     country: Locator;
     placeorder: Locator;
     orderConfirmation: Locator;



    constructor(page:Page,productName:string){

        this.page=page;
        this.productName=productName;
        this.cartDetailVisible=page.locator('div li');
        this.cartProductText=page.getByText(productName);
        this.checkoutBtn=page.getByRole('button',{name:'Checkout'});
        this.paymentpage= page.locator('div .payment');
        this.creditCardnumber=page.locator("div .input").nth(0);
        this.datedropDown=page.locator("select.ddl").first()
        this.yeardropDown=page.locator("select.ddl").last();
        this.cvv=page.locator('div .input').nth(3);
        this.cardName=page.locator('div .input').nth(4);
        this.coupon=page.locator('div .input').nth(5);
        this.appyButton=page.locator("button:has-text('Apply Coupon')");
        this.couponsuccess= page.locator('p:has-text("* Coupon Applied")');
        this.username=page.locator('.user__name [type="text"]').first();  //last
        this.country=page.locator('div .form-group');
        this.placeorder=page.locator('.actions a');
        this.orderConfirmation=page.locator('.hero-primary');
        this.username=page.locator('.user__name [type="text"]').first();


    }

    async checkout(){

        await this.cartDetailVisible.first().waitFor();
        const cartProductText=await this.cartProductText;
        await this.cartProductText.isVisible();
        await this.checkoutBtn.click();
        await this.paymentpage.waitFor();
        return cartProductText;

    }

    async paymentNshipping(ccnumber:string,dd:any,yy:any,cvv:any,cardName:any,couponcode:any,country:any){

        await this.creditCardnumber.fill(ccnumber);
        await this.datedropDown.selectOption(dd);
        await this.yeardropDown.selectOption(yy);
        await this.cvv.fill(cvv);
        await this.cardName.fill(cardName);
        await this.coupon.fill(couponcode);
        await this.appyButton.click();
        await this.couponsuccess.waitFor();
        await this.country.click();
        await this.country.pressSequentially(country);
        await this.page.locator('.ta-results').getByRole('button',{name:`${country}`}).click();
        const username=await this.username.textContent();
        await this.placeorder.click();
        await this.orderConfirmation.waitFor();
        return username;
        

    }

    



}
