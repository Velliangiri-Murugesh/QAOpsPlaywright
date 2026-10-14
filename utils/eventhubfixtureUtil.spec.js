const eventfixture=require('@playwright/test');



 exports.customEventfixture= eventfixture.test.extend(


    {

    loginFixture:async({browser},use)=>{

        const context=await browser.newContext();
        const page=await context.newPage();
        await page.goto('https://eventhub.rahulshettyacademy.com/login');
        await page.locator('#email').fill('areyouserious@yopmail.com');
        await page.locator('#password').fill('Admin@123');
        await page.getByRole('button',{name:'Sign In'}).click();
        await use(page);
        await context.close();
    

    }


    



});




