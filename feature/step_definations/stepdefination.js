const { Given, When, Then,setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000);
const { poManager } = require("../../pageManager/poManager");
const { expect } = require("@playwright/test");
const playwright=require('@playwright/test')

Given('I login into {string} and Login with valud {string} and {string}',{timeout:30000}, async function (url, userName, password) {

  console.log(">>> Step definitions loaded");
  
  this.productName='ADIDAS ORIGINAL';
  this.country= 'Afghanistan';
  this.userName=userName;

  this.loginPage=this.pomanager.loginPage;
    await this.loginPage.goTo(url);
    await this.loginPage.login(userName,password);
    
});

When("on dashboard page, I add product into the Cart", async function () {
   const dashboardpage=this.pomanager.dashboardPage;
   await this.page.locator('.container').waitFor();
   await dashboardpage.searchNplaceOrder(this.productName);
});


Then('I naviagte to cart Page', async function () {

  await this.page.getByRole('listitem').getByRole('button',{name:'Cart'}).click();
});

Then('I click on Checkout button', async function () {
 this. cartpage=this.pomanager.cartpage;
   const cartProductText=await this.cartpage.checkout();
   expect(cartProductText).toBeTruthy();
});

Then('I enter all the details in {string} ,{string},{string},{string},{string},{string} Payment method page and click on Place order.', async function (ccnumber,dd,yy,cvv,cardName,couponcode) {

  const actualUsername=await this.cartpage.paymentNshipping(ccnumber,dd,yy,cvv,cardName,couponcode,this.country);
   expect(actualUsername).toContain(this. userName);
});

When('on OrderConfirmation page I verify the order details', async function () {

   const orderconfirmationpage=this.pomanager.orderConfirmationPage;
    const OrderConfirmObject=await orderconfirmationpage.Orderconfirm(this.userName,this. country);
    expect(OrderConfirmObject.OrderSumamryVisible).toBeTruthy();
    expect(OrderConfirmObject.confimMessage).toContain('Thankyou for the order.');
    expect(OrderConfirmObject.userName).toContain(this.userName)
    expect(OrderConfirmObject.country).toContain(this. country);
});

Then('on MyOrders page I delete all the orders.', async function () {
 const myorderspage=this.pomanager.myordersPage;
   await myorderspage.goToMyorder();
   await myorderspage.deleteOrder();
});

Then("I verify error message displayed for invalid login.", async function () {
       const booleanValue=await this.loginPage.invalidLogin();
       expect(booleanValue).toBeTruthy();
});
