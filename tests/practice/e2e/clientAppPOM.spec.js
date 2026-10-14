const{test,expect}= require('@playwright/test');
const {poManager}=require('../../../pageManager/poManager.js');

test(`@WEB @Regression e2eWorkflow`,async({page})=>{


    const userName='areyouserious@yopmail.com';
    const password='Admin@123';
    const productName='ZARA COAT 3';
    const country= 'Afghanistan';
    const pomanager=new poManager(page,productName);


    const loginPage=pomanager.loginPage;
    loginPage.goTo();
    loginPage.login(userName,password);
    await page.locator('.container').waitFor();

    
    /*   Dashboard Page    */

   const dashboardpage=pomanager.dashboardPage;
   await dashboardpage.searchNplaceOrder(productName);
   await page.getByRole('listitem').getByRole('button',{name:'Cart'}).click();

   /* Cart Page */

   const cartpage=pomanager.cartpage;
   const cartProductText=await cartpage.checkout();
   expect(cartProductText).toBeTruthy();
   const actualUsername=await cartpage.paymentNshipping('4444223100001141','01','12','147','Paul','rahulshettyacademy',country);
   expect(actualUsername).toContain(userName);

    /* Order confim page */

    const orderconfirmationpage=pomanager.orderConfirmationPage;
    const OrderConfirmObject=await orderconfirmationpage.Orderconfirm(userName,country);
    await expect(OrderConfirmObject.OrderSumamryVisible).toBeTruthy();
    expect(OrderConfirmObject.confimMessage).toContain('Thankyou for the order.');
    expect(OrderConfirmObject.userName).toContain(userName)
    expect(OrderConfirmObject.country).toContain(country);
    

   /* My order page */

   const myorderspage=pomanager.myordersPage;
   await myorderspage.goToMyorder();
   await myorderspage.deleteOrder();





});


